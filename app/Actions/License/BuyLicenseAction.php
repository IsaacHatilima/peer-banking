<?php

namespace App\Actions\License;

use App\Models\License;
use Exception;
use Illuminate\Support\Facades\Log;
use Stripe\SetupIntent;
use Stripe\Stripe;

class BuyLicenseAction
{
    public function __invoke($request): string
    {
        /*        try {
                    Stripe::setApiKey(config('cashier.secret'));

                    $user = $request->user();

                    $setupIntent = SetupIntent::retrieve($request->setup_intent);

                    License::create([
                        'unit_price' => $request->unit_price,
                        'quantity' => $request->quantity,
                        'total_price' => $request->unit_price * $request->quantity,
                        'status' => 'active',
                        'payment_method' => $setupIntent->payment_method,
                        'user_id' => $user->id,
                    ]);

                    // Subscribe user to plan
                    $subscription = $user->newSubscription('default', 'price_1R7ZzjLCIwOX44eiG2msya0I')
                        ->quantity($request->quantity)
                        ->create($setupIntent->payment_method);

                    // Update License with the subscription ID
                    License::latest()->first()->update([
                        'stripe_subscription_id' => $subscription->id,
                    ]);

                    return 'success';
                } catch (Exception $e) {
                    Log::error('Error occurred while processing purchase: '.$e->getMessage());

                    return 'error';
                }*/
        try {
            Stripe::setApiKey(config('cashier.secret'));

            $user = $request->user();

            if (! $user->hasStripeId()) {
                $user->createAsStripeCustomer();
            }

            $setupIntent = SetupIntent::retrieve($request->setup_intent);
            $user->updateDefaultPaymentMethod($setupIntent->payment_method);
            $user->save();

            $user->refresh();

            $user->newSubscription('default', 'price_1R7ZzjLCIwOX44eiG2msya0I')
                ->quantity($request->quantity)
                ->create($setupIntent->payment_method);

            License::create([
                'unit_price' => $request->unit_price,
                'quantity' => $request->quantity,
                'total_price' => $request->unit_price * $request->quantity,
                'status' => 'active',
                'payment_method' => $setupIntent->payment_method,
                'user_id' => $user->id,
            ]);

            return 'success';
        } catch (Exception $e) {
            Log::error('Error occurred while processing purchase: '.$e->getMessage());

            return 'error';
        }

    }
}
