<?php

namespace App\Http\Controllers\PaymentSetup;

use App\Actions\Stripe\V1\CreateStripeAuthAction;
use App\Actions\Stripe\V1\UpdateStripeAuthAction;
use App\Http\Controllers\Controller;
use App\Http\Requests\StripeAuthRequest;
use App\Models\StripeAuth;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Inertia\Inertia;

class StripeAuthController extends Controller
{
    use AuthorizesRequests;

    public function index()
    {
        $this->authorize('viewAny', StripeAuth::class);

        return Inertia::render('TenantPages/PaymentSetup/Stripe', [
            'stripeAuth' => StripeAuth::first(),
        ]);
    }

    public function store(StripeAuthRequest $request, CreateStripeAuthAction $createStripeAuthAction)
    {
        $this->authorize('create', StripeAuth::class);
        $createStripeAuthAction($request);

        return redirect()->back();
    }

    public function show(StripeAuth $stripeAuth)
    {
        $this->authorize('view', $stripeAuth);

        return $stripeAuth;
    }

    public function update(StripeAuthRequest $request, StripeAuth $stripeAuth, UpdateStripeAuthAction $updateStripeAuthAction)
    {
        $this->authorize('update', $stripeAuth);

        $updateStripeAuthAction($stripeAuth, $request);

        return redirect()->back();
    }

    public function destroy(StripeAuth $stripeAuth)
    {
        $this->authorize('delete', $stripeAuth);

        $stripeAuth->delete();

        return response()->json();
    }
}
