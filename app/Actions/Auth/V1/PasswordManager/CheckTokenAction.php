<?php

namespace App\Actions\Auth\V1\PasswordManager;

use Illuminate\Support\Facades\DB;

class CheckTokenAction
{
    public function __invoke($email): bool
    {
        return DB::table('password_reset_tokens')
            ->where('email', $email)
            ->exists();
    }
}
