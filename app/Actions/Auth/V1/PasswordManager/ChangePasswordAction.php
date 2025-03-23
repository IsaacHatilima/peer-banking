<?php

namespace App\Actions\Auth\V1\PasswordManager;

use Illuminate\Support\Facades\Hash;

class ChangePasswordAction
{
    public function __invoke($request): void
    {
        $request->user()->update([
            'password' => Hash::make($request->password),
        ]);
    }
}
