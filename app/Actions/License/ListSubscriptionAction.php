<?php

namespace App\Actions\License;

use App\Models\License;
use Stripe\Exception\ApiErrorException;
use Stripe\Price;
use Stripe\Stripe;

class ListSubscriptionAction
{
    /**
     * @throws ApiErrorException
     */
    public function get_subscription_price(): string
    {
        Stripe::setApiKey(config('cashier.secret'));

        $price = Price::retrieve('price_1R97ThPpltWhmAXzDJf388N6');

        return number_format($price->unit_amount / 100, 2, '.', '');
    }

    public function payment_intent()
    {
        return auth()->user()->createSetupIntent(
            [
                'payment_method_configuration' => 'pmc_1R98VnPpltWhmAXzWCZWpRJV', // Payment options configured from stripe dashboard
                'automatic_payment_methods' => [
                    'enabled' => true,
                ],
            ],
        );
    }

    public function subscriptions(): object
    {
        return License::with('subscription')->paginate(10);
    }
}
