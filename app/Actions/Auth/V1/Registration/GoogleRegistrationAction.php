<?php

namespace App\Actions\Auth\V1\Registration;

use App\Actions\Profile\V1\CreateProfileAction;
use App\Models\User;

class GoogleRegistrationAction
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
            'email_verified_at' => now(),
        ]);

        ($this->createProfileAction)($request, $user);

        return $user;
    }
}
