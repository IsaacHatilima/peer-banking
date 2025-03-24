<?php

namespace App\Actions\Tenant\V1;

use App\Models\Tenant;

class ListTenantAction
{
    public function __invoke($request)
    {
        $query = Tenant::query()->with(['domain', 'createdBy.profile', 'updatedBy.profile'])->orderBy('id', $request->sorting ?: 'desc');

        if (auth()->user()->role === 'admin') {
            $query->withTrashed();
        }

        if ($request->filled('tenant_number')) {
            $query->where('tenant_number', 'like', '%'.strtoupper($request->tenant_number).'%');
        }

        if ($request->filled('name')) {
            $query->where('name', 'like', '%'.strtoupper($request->name).'%');
        }

        if ($request->filled('domain')) {
            $query->whereHas('domain', function ($q) use ($request) {
                $q->where('domain', 'like', '%'.strtolower($request->domain).'%');
            });
        }

        if ($request->filled('status')) {
            $query->where('status', strtolower($request->status));
        }

        if ($request->filled('contact_name')) {
            $query->where(function ($query) use ($request) {
                $query->where('contact_first_name', 'like', '%'.ucwords($request->contact_name).'%')
                    ->orWhere('contact_last_name', 'like', '%'.ucwords($request->contact_name).'%');
            });
        }

        $query->orderBy('id', $request->sorting ?: 'desc');

        return $query->paginate(10)->withQueryString();
    }
}
