<?php

namespace App\Actions\Auth\V1\Registration;

use App\Actions\Profile\V1\CreateProfileAction;
use App\Models\User;
use App\Notifications\VerifyEmailNotification;

class ManualRegistrationAction
{
    protected CreateProfileAction $createProfileAction;

    public function __construct(CreateProfileAction $createProfileAction)
    {
        $this->createProfileAction = $createProfileAction;
    }

    public function __invoke($request)
    {
        $user = User::create([
            'email' => $request->email,
            'password' => $request->password,
        ]);

        ($this->createProfileAction)($request, $user);

        $user->notify(new VerifyEmailNotification($user));

        return $user;
    }
}
