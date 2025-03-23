<?php

namespace App\Actions\TenantUser;

class DeleteTenantUserAction
{
    public function __invoke($user): void
    {
        $user->delete();
    }
}
