<?php

namespace App\Actions\TenantUser;

class PatchTenantUserAction
{
    public function __invoke($user): void
    {
        $user->is_active = ! $user->is_active;
        $user->updated_by = auth()->id();
        $user->save();
    }
}
