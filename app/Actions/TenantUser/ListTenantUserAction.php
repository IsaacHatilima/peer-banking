<?php

namespace App\Actions\TenantUser;

use App\Models\User;

class ListTenantUserAction
{
    public function __invoke($tenant, $request)
    {
        return $tenant->run(function () use ($request) {
            $query = User::query()->with('profile')->orderBy('created_at', 'desc');

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

            if ($request->filled('role')) {
                $query->where('role', strtolower($request->role));
            }

            if ($request->filled('verified')) {
                if ($request->verified == 'false') {
                    $query->whereNull('email_verified_at');
                } else {
                    $query->whereNotNull('email_verified_at');
                }
            }

            if ($request->filled('active')) {
                $query->where('is_active', ! ($request->active == 'false'));
            }

            return $query->paginate(10)->withQueryString()->toArray();
        });
    }
}
