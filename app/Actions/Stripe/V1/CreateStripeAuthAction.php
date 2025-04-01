<?php

namespace App\Actions\Stripe\V1;

use App\Models\StripeAuth;

class CreateStripeAuthAction
{
    public function __invoke($request): void
    {
        StripeAuth::create([
            'stripe_key' => $request->stripe_key,
            'stripe_secret' => $request->stripe_secret,
            'stripe_webhook_secret' => $request->stripe_webhook_secret,
            'currency' => $request->currency,
            'currency_locale' => $request->currency == 'eur' ? 'de_DE' : 'en_US',
            'created_by' => auth()->id(),
        ]);
    }
}
