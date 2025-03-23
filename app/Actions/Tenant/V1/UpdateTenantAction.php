<?php

namespace App\Actions\Tenant\V1;

class UpdateTenantAction
{
    public function __invoke($request, $tenant)
    {
        $tenant->update([
            'name' => strtoupper($request->name),
            'status' => $request->status,
            'address' => ucwords($request->address),
            'city' => ucwords($request->city),
            'state' => ucwords($request->state),
            'country' => ucwords($request->country),
            'zip' => $request->zip,
            'contact_first_name' => ucwords($request->contact_first_name),
            'contact_last_name' => ucwords($request->contact_last_name),
            'contact_email' => strtolower($request->contact_email),
            'contact_phone' => $request->contact_phone,
            'updated_by' => auth()->user()->id,
        ]);

        return $tenant->refresh();
    }
}
