<?php

namespace App\Policies;

use App\Enums\TenantRole;
use App\Models\License;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class LicensePolicy
{
    use HandlesAuthorization;

    public function viewAny(User $user): bool
    {
        return $user->role == TenantRole::ADMIN->value;
    }

    public function view(User $user, License $license): bool
    {
        return $user->role == TenantRole::ADMIN->value;
    }

    public function create(User $user): bool
    {
        return $user->role == TenantRole::ADMIN->value;
    }

    public function update(User $user, License $license): bool
    {
        return $user->role == TenantRole::ADMIN->value;
    }

    public function delete(User $user, License $license): bool
    {
        return false;
    }

    public function restore(User $user, License $license): bool
    {
        return false;
    }

    public function forceDelete(User $user, License $license): bool
    {
        return false;
    }
}
