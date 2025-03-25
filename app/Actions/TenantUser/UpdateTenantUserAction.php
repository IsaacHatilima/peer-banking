<?php

namespace App\Actions\TenantUser;

class UpdateTenantUserAction
{
    public function __invoke($request, $user): void
    {
        $user->profile->first_name = ucwords($request->first_name);
        $user->profile->last_name = ucwords($request->last_name);
        $user->profile->gender = $request->gender;
        $user->profile->date_of_birth = $request->date_of_birth;

        $user->email = strtolower($request->email);
        $user->role = strtolower($request->role);
        $user->updated_by = auth()->id();

        if ($user->isDirty('email')) {
            $user->email_verified_at = null;
        }

        $user->profile->save();
        $user->save();
    }
}
