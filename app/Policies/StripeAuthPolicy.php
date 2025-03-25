<?php

namespace App\Policies;

use App\Models\StripeAuth;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class StripeAuthPolicy
{
    use HandlesAuthorization;

    /**
     * Determine whether the user can view any stripe auths.
     */
    public function viewAny(User $user): bool {}

    /**
     * Determine whether the user can view the stripe auth.
     */
    public function view(User $user, StripeAuth $stripeAuth): bool {}

    /**
     * Determine whether the user can create stripe auths.
     */
    public function create(User $user): bool {}

    /**
     * Determine whether the user can update the stripe auth.
     */
    public function update(User $user, StripeAuth $stripeAuth): bool {}

    /**
     * Determine whether the user can delete the stripe auth.
     */
    public function delete(User $user, StripeAuth $stripeAuth): bool {}

    /**
     * Determine whether the user can restore the stripe auth.
     */
    public function restore(User $user, StripeAuth $stripeAuth): bool {}

    /**
     * Determine whether the user can permanently delete the stripe auth.
     */
    public function forceDelete(User $user, StripeAuth $stripeAuth): bool {}
}
