<?php

namespace App\Actions\Stripe\V1;

class UpdateStripeAuthAction
{
    public function __invoke($stripeAuth, $request): void
    {
        $stripeAuth->update([
            'stripe_key' => $request->stripe_key,
            'stripe_secret' => $request->stripe_secret,
            'stripe_webhook_secret' => $request->stripe_webhook_secret,
            'currency' => $request->currency,
            'currency_locale' => $request->currency == 'eur' ? 'de_DE' : 'en_US',
            'updated_by' => auth()->id(),
        ]);
    }
}
