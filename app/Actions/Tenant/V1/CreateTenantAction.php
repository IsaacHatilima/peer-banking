<?php

namespace App\Actions\Tenant\V1;

use App\Actions\PasswordGenerator;
use App\Enums\TenantRole;
use App\Models\Tenant;
use App\Models\User;
use App\Notifications\UserPasswordNotification;
use App\Notifications\VerifyEmailNotification;
use Illuminate\Support\Facades\Hash;

class CreateTenantAction
{
    private PasswordGenerator $passwordGenerator;

    public function __construct(PasswordGenerator $passwordGenerator)
    {
        $this->passwordGenerator = $passwordGenerator;
    }

    public function __invoke($request)
    {
        $tenant = Tenant::create([
            'name' => strtoupper($request->name),
            'tenant_number' => $this->tenant_number(),
            'address' => ucwords($request->address),
            'city' => ucwords($request->city),
            'state' => ucwords($request->state),
            'country' => ucwords($request->country),
            'zip' => $request->zip,
            'contact_first_name' => ucwords($request->contact_first_name),
            'contact_last_name' => ucwords($request->contact_last_name),
            'contact_email' => strtolower($request->contact_email),
            'contact_phone' => $request->contact_phone,
            'timezone' => $request->timezone,
            'created_by' => auth()->id(),
        ]);

        $tenant->domain()->create([
            'domain' => strtolower($request->domain),
        ]);

        $tenant->run(function ($tenant) use ($request) {
            $password = $this->passwordGenerator->make();
            $user = User::create([
                'tenant_id' => $tenant->id,
                'email' => strtolower($request->contact_email),
                'password' => Hash::make($password),
                'role' => TenantRole::ADMIN,
            ]);

            $user->profile()->create([
                'user_id' => $user->id,
                'first_name' => ucwords($request->contact_first_name),
                'last_name' => ucwords($request->contact_last_name),
            ]);

            $user->notify(new UserPasswordNotification($user, $password, $tenant));
            $user->notify(new VerifyEmailNotification($user));
        });

        return $tenant;
    }

    private function tenant_number(): string
    {
        $tenants = Tenant::count();

        return 'TN-'.str_pad($tenants + 1, 4, '0', STR_PAD_LEFT);
    }
}
