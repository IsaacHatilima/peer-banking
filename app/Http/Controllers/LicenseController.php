<?php

namespace App\Http\Controllers;

use App\Actions\License\BuyLicenseAction;
use App\Http\Requests\LicenseRequest;
use App\Models\License;
use App\Models\User;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Stripe\SetupIntent;
use Stripe\Stripe;

class LicenseController extends Controller
{
    use AuthorizesRequests;

    public function index()
    {
        $this->authorize('viewAny', License::class);

        $intent = User::createSetupIntent();

        return Inertia::render('Licenses/Index', [
            'licenses' => License::paginate(10),
            'intent' => $intent,
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

    public function completion(Request $request)
    {
        $setupIntentId = $request->query('setup_intent');

        Stripe::setApiKey(env('STRIPE_SECRET'));

        $setupIntent = SetupIntent::retrieve($setupIntentId);

        session(['payment_method' => $setupIntent->payment_method]);

        return redirect()->back();
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
