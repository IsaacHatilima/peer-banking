<?php

use App\Models\Tenant;
use App\Models\User;
use Illuminate\Auth\Events\Verified;
use Illuminate\Support\Facades\Event;
use Illuminate\Support\Facades\URL;
use Inertia\Testing\AssertableInertia as Assert;

test('email verification screen can be rendered', function () {
    $tenant = Tenant::factory()->create();
    $user = $tenant->run(function ($tenant) {
        /** @var Tenant $tenant */
        $tenant->domain()->create(['domain' => 'groupa.peer-banking.test']);

        return User::factory()->admin()->unverified()->create();
    });

    tenancy()->initialize($tenant);

    $response = $this
        ->actingAs($user)
        ->get(route('verification.notice'))
        ->assertInertia(
            fn (Assert $page) => $page
                ->component('auth/verify-email')
        );

    $response->assertStatus(200);
});

test('email can be verified', function () {
    $tenant = Tenant::factory()->create();
    $user = $tenant->run(function ($tenant) {
        /** @var Tenant $tenant */
        $tenant->domain()->create(['domain' => 'groupa.peer-banking.test']);

        return User::factory()->admin()->unverified()->create();
    });

    tenancy()->initialize($tenant);

    Event::fake();

    $verificationUrl = URL::temporarySignedRoute(
        'verification.verify',
        now()->addMinutes(60),
        ['id' => $user->id, 'hash' => sha1($user->email)]
    );

    $response = $this->actingAs($user)->get($verificationUrl);

    Event::assertDispatched(Verified::class);
    expect($user->fresh()->hasVerifiedEmail())->toBeTrue();
    $response->assertRedirect(route('tenant.dashboard', absolute: false).'?verified=1');
});

test('email is not verified with invalid hash', function () {
    $tenant = Tenant::factory()->create();
    $user = $tenant->run(function ($tenant) {
        /** @var Tenant $tenant */
        $tenant->domain()->create(['domain' => 'groupa.peer-banking.test']);

        return User::factory()->admin()->unverified()->create();
    });

    tenancy()->initialize($tenant);

    $verificationUrl = URL::temporarySignedRoute(
        'verification.verify',
        now()->addMinutes(60),
        ['id' => $user->id, 'hash' => sha1('wrong-email')]
    );

    $this->actingAs($user)->get($verificationUrl);

    expect($user->fresh()->hasVerifiedEmail())->toBeFalse();
});

test('email is not verified with invalid user id', function () {
    $tenant = Tenant::factory()->create();
    $user = $tenant->run(function ($tenant) {
        /** @var Tenant $tenant */
        $tenant->domain()->create(['domain' => 'groupa.peer-banking.test']);

        return User::factory()->admin()->create([
            'email_verified_at' => null,
        ]);
    });

    tenancy()->initialize($tenant);

    $verificationUrl = URL::temporarySignedRoute(
        'verification.verify',
        now()->addMinutes(60),
        ['id' => 123, 'hash' => sha1($user->email)]
    );

    $this->actingAs($user)->get($verificationUrl);

    expect($user->fresh()->hasVerifiedEmail())->toBeFalse();
});

test('verified user is redirected to dashboard from verification prompt', function () {
    $tenant = Tenant::factory()->create();
    $user = $tenant->run(function ($tenant) {
        /** @var Tenant $tenant */
        $tenant->domain()->create(['domain' => 'groupa.peer-banking.test']);

        return User::factory()->admin()->create([
            'email_verified_at' => now(),
        ]);
    });

    tenancy()->initialize($tenant);

    $response = $this->actingAs($user)->get(route('verification.notice'));

    $response->assertRedirect(route('tenant.dashboard', absolute: false));
});

test('already verified user visiting verification link is redirected without firing event again', function () {
    $tenant = Tenant::factory()->create();
    $user = $tenant->run(function ($tenant) {
        /** @var Tenant $tenant */
        $tenant->domain()->create(['domain' => 'groupa.peer-banking.test']);

        return User::factory()->admin()->create([
                                                    'email_verified_at' => now(),
                                                ]);
    });

    tenancy()->initialize($tenant);

    Event::fake();

    $verificationUrl = URL::temporarySignedRoute(
        'verification.verify',
        now()->addMinutes(60),
        ['id' => $user->id, 'hash' => sha1($user->email)]
    );

    $this->actingAs($user)->get($verificationUrl)
        ->assertRedirect(route('tenant.dashboard', absolute: false).'?verified=1');

    expect($user->fresh()->hasVerifiedEmail())->toBeTrue();
    Event::assertNotDispatched(Verified::class);
});
