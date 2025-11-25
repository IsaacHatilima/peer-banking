# Peer Banking SaaS

# ⚠️ Important Notice

[Tenancy for Laravel v4](https://v4.tenancyforlaravel.com/introduction/) is currently unreleased and still under active
development.
Features, APIs, and installation steps may change without warning.
This implementation is intended for demonstration and testing only, not production use.

## What changed?

Nothing much, just added custom components to have input, label and error in one file. Fewer places to change. The
starter
template also includes the introduction of Repositories and DTOs.

## Added packages

### Static Analysis and Code Style

- [PHPStan](https://phpstan.org/)
  Static analysis for PHP. Development only.

- [PHP Insights](https://github.com/nunomaduro/phpinsights)
  Code quality and architecture analysis. Development only.

### Others

- [Log Viewer](https://log-viewer.opcodes.io/)
  Beautiful log viewer.

## Tool Documentation

- [Laravel](https://laravel.com/)
- [Inertia.js](https://inertiajs.com/)
- [React](https://react.dev/)
- [PHPStan](https://phpstan.org/)
- [Pest](https://pestphp.com/)
- [PHP Insights](https://github.com/nunomaduro/phpinsights)
- [Laravel Pint](https://laravel.com/docs/12.x/pint)
- [shadcn/ui](https://ui.shadcn.com/)
- [Laravel Fortify](https://laravel.com/docs/12.x/fortify#main-content)
- [Laravel Horizon](https://laravel.com/docs/12.x/horizon#running-horizon)
- [Laravel Socialite](https://laravel.com/docs/12.x/socialite)
- [Laravel Cashier (Stripe)](https://laravel.com/docs/12.x/billing)
- [Tenancy for Laravel v4](https://v4.tenancyforlaravel.com/introduction/)

## Getting Started

```bash

# App Setup
composer run setup

# Run tests and code quality checks
# Pint Expected: PASS
./vendor/bin/pint

# PHPInsights Expected: All 100%
php artisan insights

# PHPStan Expected: No Errors
./vendor/bin/phpstan analyse --level=10 app/

# Tests Expected: All to pass
composer run test

# Run local development servers
composer run dev

# Or via docker
docker compose up -d --build
 
docker compose exec app php artisan migrate --force
```
