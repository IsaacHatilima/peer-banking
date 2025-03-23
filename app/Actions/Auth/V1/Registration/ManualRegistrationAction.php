<?php

namespace App\Actions\Auth\V1\Registration;

use App\Actions\Profile\ProfileManagerAction;
use App\Models\User;
use App\Notifications\VerifyEmailNotification;

class ManualRegistrationAction
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
            'password' => $request->password,
        ]);

        $this->profileManagerAction->create_profile($request, $user);

        $user->notify(new VerifyEmailNotification($user));

        return $user;
    }
}
