<?php

namespace App\Actions\TenantUser;

use App\Actions\Profile\V1\CreateProfileAction;
use App\Models\User;
use App\Notifications\UserPasswordNotification;
use App\Notifications\VerifyEmailNotification;

class CreateTenantUserAction
{
    private CreateProfileAction $createProfileAction;

    public function __construct(CreateProfileAction $createProfileAction)
    {
        $this->createProfileAction = $createProfileAction;
    }

    public function __invoke($request)
    {
        $password = $this->generateStrongPassword();

        $user = User::create([
            'tenant_id' => tenant()->id,
            'email' => strtolower($request->email),
            'password' => $password,
            'role' => strtolower($request->role),
        ]);

        ($this->createProfileAction)($request, $user);

        $user->notify(new UserPasswordNotification($user, $password, tenant()));
        $user->notify(new VerifyEmailNotification($user));

        return $user;
    }

    private function generateStrongPassword(): string
    {
        $upperCase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        $lowerCase = 'abcdefghijklmnopqrstuvwxyz';
        $numbers = '0123456789';
        $specialChars = '!@#$%^&*()-_=+<>?';

        $password = [
            $upperCase[random_int(0, strlen($upperCase) - 1)],
            $lowerCase[random_int(0, strlen($lowerCase) - 1)],
            $numbers[random_int(0, strlen($numbers) - 1)],
            $specialChars[random_int(0, strlen($specialChars) - 1)],
        ];

        $allCharacters = $upperCase.$lowerCase.$numbers.$specialChars;

        for ($i = 4; $i < 16; $i++) {
            $password[] = $allCharacters[random_int(0, strlen($allCharacters) - 1)];
        }

        shuffle($password);

        return implode('', $password);
    }
}
