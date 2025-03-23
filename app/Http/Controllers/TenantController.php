<?php

namespace App\Http\Controllers;

use App\Actions\Tenant\V1\CreateTenantAction;
use App\Actions\Tenant\V1\DeleteTenantAction;
use App\Actions\Tenant\V1\ListTenantAction;
use App\Actions\Tenant\V1\UpdateTenantAction;
use App\Actions\TenantUser\ListTenantUserAction;
use App\Enums\TenantStatus;
use App\Enums\TimeZone;
use App\Http\Requests\Auth\CurrentPasswordRequest;
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

    public function index(Request $request, ListTenantAction $tenantListAction)
    {
        $this->authorize('viewAny', Tenant::class);

        return Inertia::render('Tenant/Index', [
            'timezones' => Timezone::getValues(),
            'tenants' => $tenantListAction($request),
            'filters' => [
                'name' => $request->name,
                'tenant_number' => $request->tenant_number,
                'contact_name' => $request->contact_name,
                'domain' => $request->domain,
                'status' => $request->status,
            ],
        ]);
    }

    public function store(TenantRequest $request, CreateTenantAction $createTenantAction)
    {
        $this->authorize('create', Tenant::class);

        $tenant = $createTenantAction($request);

        return Redirect::route('tenants.show', $tenant);
    }

    public function show(Request $request, Tenant $tenant, ListTenantUserAction $listTenantUserAction)
    {
        $this->authorize('view', $tenant);

        return Inertia::render('Tenant/TenantDetails', [
            'timezones' => Timezone::getValues(),
            'tenantStatus' => TenantStatus::getValues(),
            'tenant_data' => $tenant->load('domain'),
            'tenant_users' => Inertia::optional(fn () => $listTenantUserAction($tenant, $request)),
            'filters' => [
                'first_name' => $request->first_name,
                'last_name' => $request->last_name,
            ],
        ]);
    }

    public function update(UpdateTenantRequest $request, Tenant $tenant, UpdateTenantAction $updateTenantAction)
    {
        $this->authorize('update', $tenant);

        $updatedTenant = $updateTenantAction($request, $tenant);

        return Redirect::route('tenants.show', $updatedTenant);
    }

    public function destroy(CurrentPasswordRequest $request, Tenant $tenant, DeleteTenantAction $deleteTenantAction)
    {
        $this->authorize('delete', $tenant);

        $deleteTenantAction($tenant);

        return Redirect::route('tenants');
    }
}
