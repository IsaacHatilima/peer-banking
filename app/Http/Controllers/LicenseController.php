<?php

namespace App\Http\Controllers;

use App\Actions\License\CreateSubscriptionAction;
use App\Actions\License\ListSubscriptionAction;
use App\Http\Requests\LicenseRequest;
use App\Models\License;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Inertia\Inertia;
use Stripe\Exception\ApiErrorException;

class LicenseController extends Controller
{
    use AuthorizesRequests;

    /**
     * @throws ApiErrorException
     */
    public function index(ListSubscriptionAction $listSubscriptionAction)
    {
        $this->authorize('viewAny', License::class);

        return Inertia::render('Licenses/Index', [
            'licenses' => $listSubscriptionAction->subscriptions(),
            'licensePrice' => $listSubscriptionAction->get_subscription_price(),
            'intent' => $listSubscriptionAction->payment_intent(),
            'stripeKey' => config('cashier.key'),
        ]);
    }

    public function store(LicenseRequest $request, CreateSubscriptionAction $buyLicenseAction)
    {
        $this->authorize('create', License::class);

        $response = $buyLicenseAction($request);

        if ($response == 'success') {
            return redirect()->back();
        }

        return redirect()->back()->withErrors(['subscriptionError' => 'An error occurred while processing your subscription.']);
    }

    public function show(License $license)
    {
        $this->authorize('view', $license);

        return $license;
    }
}
