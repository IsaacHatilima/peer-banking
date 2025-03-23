<?php

namespace App\Actions\Tenant\V1;

class DeleteTenantAction
{
    public function __invoke($tenant): void
    {
        $tenant->delete();
    }
}
