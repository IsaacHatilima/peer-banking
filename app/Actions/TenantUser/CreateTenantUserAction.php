<?php

namespace App\Actions\TenantUser;

use App\Actions\PasswordGenerator;
use App\Actions\Profile\V1\CreateProfileAction;
use App\Models\User;
use App\Notifications\UserPasswordNotification;
use App\Notifications\VerifyEmailNotification;
use Illuminate\Support\Facades\Hash;

class CreateTenantUserAction
{
    private CreateProfileAction $createProfileAction;

    private PasswordGenerator $passwordGenerator;

    public function __construct(CreateProfileAction $createProfileAction, PasswordGenerator $passwordGenerator)
    {
        $this->createProfileAction = $createProfileAction;
        $this->passwordGenerator = $passwordGenerator;
    }

    public function __invoke($request)
    {
        $password = $this->passwordGenerator->make();

        $user = User::create([
            'tenant_id' => tenant()->id,
            'email' => strtolower($request->email),
            'password' => Hash::make($password),
            'role' => strtolower($request->role),
        ]);

        ($this->createProfileAction)($request, $user);

        $user->notify(new UserPasswordNotification($user, $password, tenant()));
        $user->notify(new VerifyEmailNotification($user));

        return $user;
    }
}
