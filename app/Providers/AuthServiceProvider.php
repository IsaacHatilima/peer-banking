<?php

namespace App\Providers;

use App\Models\License;
use App\Models\StripeAuth;
use App\Models\Tenant;
use App\Models\User;
use App\Policies\LicensePolicy;
use App\Policies\StripeAuthPolicy;
use App\Policies\TenantPolicy;
use App\Policies\UserPolicy;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;

class AuthServiceProvider extends ServiceProvider
{
    protected $policies = [
        Tenant::class => TenantPolicy::class,
        User::class => UserPolicy::class,
        StripeAuth::class => StripeAuthPolicy::class,
        License::class => LicensePolicy::class,
    ];

    /**
     * Register services.
     */
    public function register(): void {}

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        $this->registerPolicies();
    }
}
