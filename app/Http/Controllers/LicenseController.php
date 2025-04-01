<?php

namespace App\Http\Controllers;

use App\Actions\License\BuyLicenseAction;
use App\Http\Requests\LicenseRequest;
use App\Models\License;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Inertia\Inertia;

class LicenseController extends Controller
{
    use AuthorizesRequests;

    public function index()
    {
        $this->authorize('viewAny', License::class);

        return Inertia::render('Licenses/Index', [
            'licenses' => License::with('subscription')->paginate(10),
            'intent' => auth()->user()->createSetupIntent(['payment_method_types' => ['card']]),
            'stripeKey' => config('cashier.key'),
        ]);
    }

    public function store(LicenseRequest $request, BuyLicenseAction $buyLicenseAction)
    {
        $this->authorize('create', License::class);

        $response = $buyLicenseAction($request);

        if ($response == 'success') {
            return redirect()->back();
        }

        return redirect()->back()->withErrors(['error' => 'An error occurred while processing your subscription.']);
    }

    public function show(License $license)
    {
        $this->authorize('view', $license);

        return $license;
    }

    public function update(LicenseRequest $request, License $license)
    {
        $this->authorize('update', $license);

        $license->update($request->validated());

        return $license;
    }

    public function destroy(License $license)
    {
        $this->authorize('delete', $license);

        $license->delete();

        return response()->json();
    }
}
