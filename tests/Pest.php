<?php

/*
|--------------------------------------------------------------------------
| Test Case
|--------------------------------------------------------------------------
|
| The closure you provide to your test functions is always bound to a specific PHPUnit test
| case class. By default, that class is "PHPUnit\Framework\TestCase". Of course, you may
| need to change it using the "pest()" function to bind a different classes or traits.
|
*/

use App\Models\Tenant;
use App\Models\User;
use Illuminate\Cache\RateLimiting\Limit;

pest()->extend(Tests\TestCase::class)
    ->use(Illuminate\Foundation\Testing\DatabaseMigrations::class)
    ->in('Feature', 'Browser', 'Unit');

pest()->browser()->timeout(30000);

/*
|--------------------------------------------------------------------------
| Expectations
|--------------------------------------------------------------------------
|
| When you're writing tests, you often need to check that values meet certain conditions. The
| "expect()" function gives you access to a set of "expectations" methods that you can use
| to assert different things. Of course, you may extend the Expectation API at any time.
|
*/

expect()->extend('toBeOne', function () {
    return $this->toBe(1);
});

/*
|--------------------------------------------------------------------------
| Functions
|--------------------------------------------------------------------------
|
| While Pest is very powerful out-of-the-box, you may have some testing code specific to your
| project that you don't want to repeat in every file. Here you can also expose helpers as
| global functions to help you to reduce the number of lines of code in your test files.
|
*/

function createUser()
{
    return User::factory()->create([
        'email' => 'test@mail.com',
        'password' => Hash::make('Password1#'),
        'email_verified_at' => now(),
    ]);
}

function login(): void
{
    $user = createUser();

    visit(route('login'))
        ->fill('email', $user->email)
        ->fill('password', 'Password1#')
        ->press('Log in')
        ->assertUrlIs(route('dashboard'));
}

function createTenant()
{
    $tenant = Tenant::factory()->create();
    tenancy()->initialize($tenant);
    config()->set('app.url', $tenant->domain->domain);
    return $tenant;
}

function getTenantUser(Tenant $tenant, string $role): User
{
    return $tenant->run(
        fn () => User::with('profile')
            ->where('role', $role)
            ->first()
    );
}

function tenantRoute(Tenant $tenant, string $route)
{
    return 'https://' . $tenant->domain->domain . route($route, absolute: false);
}

function tenantUrl(string $routeName, string $tenantDomain, array $parameters = []): string
{
    $path = parse_url(route($routeName), PHP_URL_PATH);

    return 'https://'.$tenantDomain.$path;
}

function disableRateLimiter()
{
    // Browser testing hits rate limit so we disabled it.
    RateLimiter::clear('login');
    RateLimiter::for('login', fn () => Limit::none());
}
