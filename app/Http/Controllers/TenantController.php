<?php

namespace App\Http\Controllers;

use App\Actions\TenantAction;
use App\Actions\TenantUserAction;
use App\Http\Requests\TenantRequest;
use App\Http\Requests\UpdateTenantRequest;
use App\Models\Tenant;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class TenantController extends Controller
{
    use AuthorizesRequests;

    private TenantAction $tenantAction;

    private TenantUserAction $tenantUserAction;

    public function __construct(TenantAction $tenantAction, TenantUserAction $tenantUserAction)
    {
        $this->tenantAction = $tenantAction;
        $this->tenantUserAction = $tenantUserAction;
    }

    public function index(Request $request)
    {
        $this->authorize('viewAny', Tenant::class);

        return Inertia::render('Tenant/Index', [
            'tenants' => $this->tenantAction->get_tenants($request),
            'filters' => [
                'name' => $request->name,
                'tenant_number' => $request->tenant_number,
                'contact_name' => $request->contact_name,
                'domain' => $request->domain,
                'status' => $request->status,
            ],
        ]);
    }

    public function store(TenantRequest $request)
    {
        $this->authorize('create', Tenant::class);

        $tenant = $this->tenantAction->create_tenant($request);

        return Redirect::route('tenants.show', $tenant);
    }

    public function show(Request $request, Tenant $tenant)
    {
        $this->authorize('view', $tenant);

        return Inertia::render('Tenant/TenantDetails', [
            'tenant_data' => $tenant->load('domain'),
            'tenant_users' => Inertia::optional(fn () => $this->tenantUserAction->get_tenant_users($tenant, $request)),
            'filters' => [
                'first_name' => $request->first_name,
                'last_name' => $request->last_name,
            ],
        ]);
    }

    public function update(UpdateTenantRequest $request, Tenant $tenant)
    {
        $this->authorize('update', $tenant);

        $updatedTenant = $this->tenantAction->update_tenant($request, $tenant);

        return Redirect::route('tenants.show', $updatedTenant);
    }

    public function destroy(Request $request, Tenant $tenant)
    {
        $this->authorize('delete', $tenant);

        $request->validate([
            'current_password' => ['required', 'current_password'],
        ]);

        $this->tenantAction->delete_tenant($tenant);

        return Redirect::route('tenants');
    }
}
