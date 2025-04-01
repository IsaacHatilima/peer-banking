<?php

namespace App\Actions\License;

use App\Models\License;
use Exception;
use Illuminate\Support\Facades\Log;
use Stripe\PaymentMethod;
use Stripe\SetupIntent;
use Stripe\Stripe;

class BuyLicenseAction
{
    public function __invoke($request): string
    {
        $subscription = $this->process_subscription($request->user, $request);

        License::create([
            'subscription_id' => $subscription->id,
            'user_id' => $request->user->id,
            'used' => 0,
        ]);

        return 'success';
    }

    private function process_subscription($user, $request)
    {
        try {
            Stripe::setApiKey(config('cashier.secret'));

            if (! $user->hasStripeId()) {
                $user->createAsStripeCustomer();
            }

            $user->updateStripeCustomer([
                'email' => $user->email,
                'name' => $user->profile->first_name.' '.$user->profile->last_name,
            ]);

            $paymentMethod = PaymentMethod::retrieve($user->defaultPaymentMethod()->id);

            PaymentMethod::update(
                $paymentMethod->id,
                [
                    'billing_details' => [
                        'name' => $user->profile->first_name.' '.$user->profile->last_name,
                    ],
                ]
            );

            $setupIntent = SetupIntent::retrieve($request->setup_intent);
            $user->updateDefaultPaymentMethod($setupIntent->payment_method);
            $user->save();

            $user->refresh();

            return $user->newSubscription('default', 'price_1R7ZzjLCIwOX44eiG2msya0I')
                ->quantity($request->quantity)
                ->create($setupIntent->payment_method);

        } catch (Exception $e) {
            Log::error('Error occurred while processing purchase: '.$e->getMessage());

            return 'error';
        }
    }
}
