<?php

use App\Models\Tenant;
use App\Models\User;
use Illuminate\Auth\Notifications\VerifyEmail;
use Illuminate\Support\Facades\Notification;

test('sends verification notification', function () {
    Notification::fake();

    $tenant = Tenant::factory()->create();
    $user = $tenant->run(function ($tenant) {
        /** @var Tenant $tenant */
        $tenant->domain()->create(['domain' => 'groupa.peer-banking.test']);

        return User::factory()->admin()->unverified()->create();
    });

    tenancy()->initialize($tenant);

    $this->actingAs($user)
        ->post(route('verification.send'))
        ->assertRedirect(route('home'));

    Notification::assertSentTo($user, VerifyEmail::class);
});

test('does not send verification notification if email is verified', function () {
    Notification::fake();

    $tenant = Tenant::factory()->create();
    $user = $tenant->run(function ($tenant) {
        /** @var Tenant $tenant */
        $tenant->domain()->create(['domain' => 'groupa.peer-banking.test']);

        return User::factory()->admin()->create([
            'email_verified_at' => now(),
        ]);
    });

    tenancy()->initialize($tenant);

    $this->actingAs($user)
        ->post(route('verification.send'))
        ->assertRedirect(route('tenant.dashboard', absolute: false));

    Notification::assertNothingSent();
});
