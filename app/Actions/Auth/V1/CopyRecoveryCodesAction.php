<?php

namespace App\Actions\Auth\V1;

class CopyRecoveryCodesAction
{
    public function __invoke(): void
    {
        auth()->user()->update(['copied_fortify_codes' => true]);
    }
}
