<?php

namespace App\Actions\Auth\V1\Registration;

use App\Actions\Profile\ProfileManagerAction;
use App\Models\User;

class GoogleRegistrationAction
{
    protected ProfileManagerAction $profileManagerAction;

    public function __construct(ProfileManagerAction $profileManagerAction)
    {
        $this->profileManagerAction = $profileManagerAction;
    }

    public function __invoke($request)
    {
        $user = User::create([
            'email' => $request->email,
            'email_verified_at' => now(),
        ]);

        $this->profileManagerAction->create_profile($request, $user);

        return $user;
    }
}
