<?php

namespace App\Actions\Auth\V1;

use App\Jobs\SendPasswordResetLink;

class ForgotPasswordAction
{
    /**
     * Create a new class instance.
     */
    public function __construct()
    {
        //
    }

    public function execute($request): void
    {
        SendPasswordResetLink::dispatch($request->email);
    }
}
