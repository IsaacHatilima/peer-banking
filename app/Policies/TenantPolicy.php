<?php

namespace App\Policies;

use App\Models\Tenant;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class TenantPolicy
{
    use HandlesAuthorization;

    public function viewAny(User $user): bool
    {
        return tenant() == null;
    }

    public function view(User $user, Tenant $tenant): bool
    {
        return tenant() == null;
    }

    public function create(User $user): bool
    {
        return tenant() == null;
    }

    public function update(User $user, Tenant $tenant): bool
    {
        return tenant() == null;
    }

    public function delete(User $user, Tenant $tenant): bool
    {
        return tenant() == null;
    }
}
