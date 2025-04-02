<?php

namespace App\Actions\License;

use App\Models\License;
use Exception;
use Illuminate\Support\Facades\Log;
use Stripe\SetupIntent;
use Stripe\Stripe;

class CreateSubscriptionAction
{
    public function __invoke($request): string
    {
        $subscription = $this->process_subscription($request);

        License::create([
            'subscription_id' => $subscription->id,
            'user_id' => auth()->id(),
            'used' => 0,
        ]);

        return 'success';
    }

    private function process_subscription($request)
    {
        try {
            Stripe::setApiKey(config('cashier.secret'));

            $user = auth()->user();

            if (! $user->stripe_id) {
                $user->createOrGetStripeCustomer([
                    'name' => $user->profile->first_name.' '.$user->profile->last_name,
                    'email' => $user->email,
                    'metadata' => [
                        'tenant_id' => tenant()->id,
                    ],
                ]);
            }

            $setupIntent = SetupIntent::retrieve($request->setup_intent);
            $user->updateDefaultPaymentMethod($setupIntent->payment_method);
            $user->save();

            $user->refresh();

            return $user->newSubscription('default', 'price_1R97ThPpltWhmAXzDJf388N6')
                ->quantity($request->quantity)
                ->create($setupIntent->payment_method);

        } catch (Exception $e) {
            Log::error('Error occurred while processing purchase: '.$e->getMessage());

            return 'error';
        }
    }
}
