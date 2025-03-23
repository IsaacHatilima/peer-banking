<?php

namespace App\Actions\Profile\V1;

use App\Models\Profile;

class CreateProfileAction
{
    public function __invoke($request, $user)
    {
        return Profile::create([
            'user_id' => $user->id,
            'first_name' => ucwords($request->first_name),
            'last_name' => ucwords($request->last_name),
        ]);
    }
}
