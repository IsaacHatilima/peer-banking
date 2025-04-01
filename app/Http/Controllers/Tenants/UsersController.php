<?php

namespace App\Http\Controllers\Tenants;

use App\Actions\TenantUser\CreateTenantUserAction;
use App\Actions\TenantUser\DeleteTenantUserAction;
use App\Actions\TenantUser\ListTenantUserAction;
use App\Actions\TenantUser\PatchTenantUserAction;
use App\Actions\TenantUser\RestoreTenantUserAction;
use App\Actions\TenantUser\UpdateTenantUserAction;
use App\Enums\TenantRole;
use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\CurrentPasswordRequest;
use App\Http\Requests\CreateTenantUsersRequest;
use App\Http\Requests\UpdateTenantUserRequest;
use App\Models\User;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UsersController extends Controller
{
    use AuthorizesRequests;

    public function index(Request $request, ListTenantUserAction $listTenantUserAction)
    {
        $this->authorize('viewAny', [User::class, tenant()]);

        return Inertia::render('TenantPages/Users', [
            'tenantRoles' => TenantRole::getValues(),
            'users' => $listTenantUserAction(tenant(), $request),
            'filters' => $request->only(['first_name', 'last_name', 'email', 'role', 'verified', 'active']),
        ]);
    }

    public function store(CreateTenantUsersRequest $request, CreateTenantUserAction $createTenantUserAction)
    {
        $this->authorize('create', [User::class, tenant()]);

        $createTenantUserAction($request);

        return redirect()->back();
    }

    public function update(UpdateTenantUserRequest $request, User $user, UpdateTenantUserAction $updateTenantUserAction)
    {
        $this->authorize('update', [User::class, tenant()]);
        $updateTenantUserAction($request, $user);

        return redirect()->back();
    }

    public function destroy(CurrentPasswordRequest $request, User $user, DeleteTenantUserAction $deleteTenantUserAction)
    {
        $this->authorize('delete', [User::class, tenant()]);
        $deleteTenantUserAction($user);

        return redirect()->back();
    }

    public function restore(CurrentPasswordRequest $request, $userId, RestoreTenantUserAction $restoreTenantUserAction)
    {
        $user = User::withTrashed()->firstWhere('id', $userId);
        $this->authorize('restore', [User::class, tenant()]);
        $restoreTenantUserAction($user);

        return redirect()->back();
    }

    public function patch(CurrentPasswordRequest $request, User $user, PatchTenantUserAction $patchTenantUserAction)
    {
        $this->authorize('delete', [User::class, tenant()]);
        $patchTenantUserAction($user);

        return redirect()->back();
    }
}
