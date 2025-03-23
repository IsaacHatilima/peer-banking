<?php

namespace App\Actions\Domain;

class UpdateDomainAction
{
    /**
     * Create a new class instance.
     */
    public function __construct()
    {
        //
    }

    public function __invoke($domain, $request): void
    {
        $domain->update(['domain' => $request->domain]);
    }
}
