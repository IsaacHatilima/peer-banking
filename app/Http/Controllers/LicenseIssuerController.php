<?php

namespace App\Http\Controllers;

use App\Actions\License\LicenseIssuerAction;
use App\Models\License;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Http\Request;
use Inertia\Inertia;

class LicenseIssuerController extends Controller
{
    use AuthorizesRequests;

    public function show(Request $request, License $license, LicenseIssuerAction $licenseIssuerAction)
    {
        $this->authorize('view', $license);

        return Inertia::render('Licenses/UserLicenseManager', [
            'licenseId' => $license->id,
            'users' => $licenseIssuerAction->execute($license->id, $request),
        ]);
    }

    public function edit($id) {}

    public function update(Request $request, $id) {}

    public function destroy($id) {}
}
