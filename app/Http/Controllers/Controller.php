<?php

namespace App\Http\Controllers;

use App\Models\Tenant;
use App\Models\User;

abstract class Controller
{
    public function currentUser(): User
    {
        $user = auth()->user();

        if (! $user) {
            abort(401, 'Unauthenticated.');
        }

        return $user;
    }

    public function currentTenant(): Tenant
    {
        /** @var ?Tenant $tenant */
        $tenant = tenant();

        if (! $tenant) {
            abort(401, 'Tenant not found.');
        }

        return $tenant;
    }
}
