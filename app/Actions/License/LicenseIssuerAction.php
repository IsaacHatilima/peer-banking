<?php

namespace App\Actions\License;

use App\Models\User;

class LicenseIssuerAction
{
    public function execute($license, $request): array
    {
        $query = User::query()
            ->with('profile')
            ->where(function ($q) use ($license) {
                $q->where('license_id', $license)
                    ->orWhereNull('license_id');
            })
            ->orderBy('created_at', 'desc');

        if ($request->filled('first_name')) {
            $query->whereHas('profile', function ($q) use ($request) {
                $q->where('first_name', 'like', '%'.ucwords($request->first_name).'%');
            });
        }

        if ($request->filled('last_name')) {
            $query->whereHas('profile', function ($q) use ($request) {
                $q->where('last_name', 'like', '%'.ucwords($request->last_name).'%');
            });
        }

        if ($request->filled('email')) {
            $query->where('email', 'like', '%'.strtolower($request->email).'%');
        }

        return $query->paginate(10)->withQueryString()->toArray();
    }
}
