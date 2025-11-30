<?php

use App\Models\Tenant;
use Illuminate\Support\Facades\RateLimiter;
use Inertia\Testing\AssertableInertia as Assert;
use Laravel\Fortify\Features;

test('login screen can be rendered', function () {
    createTenant();

    $this->get(route('login'))
        ->assertInertia(
            fn (Assert $page) => $page
                ->component('auth/login')
        );
});

test('tenant users can authenticate on tenant domain', function () {
    $tenant = createTenant();
    $user = getTenantUser($tenant, 'admin');

    $response = $this->post(route('login.store'), [
        'email' => $user->email,
        'password' => 'Password1#',
    ]);

    $this->assertAuthenticated();
    $response->assertRedirect(route('tenant.dashboard', absolute: false));
});

test('tenant users cannot authenticate on central domain', function () {
    $tenant = Tenant::factory()->create();
    $user = getTenantUser($tenant, 'admin');


    $this->post(route('login.store'), [
        'email' => $user->email,
        'password' => 'Password1#',
    ]);

    $this->assertGuest();
});

test('users with two factor enabled are redirected to two factor challenge', function () {
    if (! Features::canManageTwoFactorAuthentication()) {
        $this->markTestSkipped('Two-factor authentication is not enabled.');
    }

    Features::twoFactorAuthentication([
        'confirm' => true,
        'confirmPassword' => true,
    ]);

    $tenant = createTenant();
    $user = getTenantUser($tenant, 'admin');

    $user->forceFill([
        'two_factor_secret' => encrypt('test-secret'),
        'two_factor_recovery_codes' => encrypt(json_encode(['code1', 'code2'])),
        'two_factor_confirmed_at' => now(),
    ])->save();

    $response = $this->post(route('login'), [
        'email' => $user->email,
        'password' => 'Password1#',
    ]);

    $response->assertRedirect(route('two-factor.login'));

    $response = $this->followingRedirects()->get(route('two-factor.login'));

    $response->assertInertia(
        fn (Assert $page) => $page->component('auth/two-factor-challenge')
    );

    $response->assertSessionHas('login.id', $user->id);
    $this->assertGuest();
});

test('users can not authenticate with invalid password', function () {
    $tenant = createTenant();
    $user = getTenantUser($tenant, 'admin');

    $this->post(route('login.store'), [
        'email' => $user->email,
        'password' => 'wrong-password',
    ]);

    $this->assertGuest();
});

test('users can logout', function () {
    $tenant = createTenant();
    $user = getTenantUser($tenant, 'admin');

    $response = $this->actingAs($user)->post(route('logout'));

    $this->assertGuest();
    $response->assertRedirect(route('home'));
});

test('users are rate limited', function () {
    $tenant = createTenant();
    $user = getTenantUser($tenant, 'admin');

    RateLimiter::increment(md5('login'.implode('|', [$user->email, '127.0.0.1'])), amount: 5);

    $response = $this->post(route('login.store'), [
        'email' => $user->email,
        'password' => 'wrong-password',
    ]);

    $response->assertTooManyRequests();
});
