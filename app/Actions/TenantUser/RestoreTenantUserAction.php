<?php

namespace App\Actions\TenantUser;

class RestoreTenantUserAction
{
    public function __invoke($user): void
    {
        $user->restore();
    }
}
