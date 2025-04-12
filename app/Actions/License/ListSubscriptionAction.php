<?php

namespace App\Actions\License;

use App\Models\License;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Collection;
use NumberFormatter;
use Stripe\Customer;
use Stripe\Exception\ApiErrorException;
use Stripe\Invoice;
use Stripe\Price;
use Stripe\Stripe;

class ListSubscriptionAction
{
    /**
     * @throws ApiErrorException
     */
    public function getSubscriptionPrice(): string
    {
        Stripe::setApiKey(config('cashier.secret'));

        $price = Price::retrieve(config('cashier.price'));

        return number_format($price->unit_amount / 100, 2, '.', '');
    }

    public function paymentIntent()
    {
        return auth()->user()->createSetupIntent(
            [
                'payment_method_configuration' => config('cashier.payment_method'), // Payment options configured from stripe dashboard
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

    public function invoices(): LengthAwarePaginator
    {
        $currency = config('cashier.currency', 'EUR');
        $locale = config('cashier.currency_locale', 'de_DE');

        $formatter = new NumberFormatter($locale, NumberFormatter::CURRENCY);

        Stripe::setApiKey(config('cashier.secret'));

        $tenantId = tenant()->id;

        // Fetch all Stripe customers (limited to 100 at a time)
        $allCustomers = $this->fetchAllStripeCustomers();

        // Filter to only customers that belong to this tenant (via metadata)
        $tenantAdminCustomers = collect($allCustomers)->filter(function ($customer) use ($tenantId) {
            return isset($customer->metadata['tenant_id']) && $customer->metadata['tenant_id'] == $tenantId;
        });

        // Fetch invoices for each tenant admin/customer
        $allInvoices = $tenantAdminCustomers->flatMap(function ($customer) {
            return Invoice::all([
                'customer' => $customer->id,
                'limit' => 100,
            ])->data;
        });

        // Step 4: Format invoices
        $formattedInvoices = collect($allInvoices)->map(function ($invoice) use ($formatter, $currency) {
            return [
                'id' => $invoice->id,
                'number' => $invoice->number,
                'created' => Carbon::createFromTimestamp($invoice->created)->format('Y-m-d'),
                'total' => $formatter->formatCurrency($invoice->total / 100, strtoupper($currency)),
                'download_url' => route('license.download', $invoice->id),
            ];
        });

        // Paginate subscription
        $perPage = 10;
        $currentPage = request()->query('page', 1);
        $currentItems = $formattedInvoices->slice(($currentPage - 1) * $perPage, $perPage)->values();

        return new LengthAwarePaginator(
            $currentItems,
            $formattedInvoices->count(),
            $perPage,
            $currentPage,
            ['path' => request()->url(), 'query' => request()->query()]
        );
    }

    protected function fetchAllStripeCustomers(): Collection
    {
        $allCustomers = collect();
        $hasMore = true;
        $startingAfter = null;

        while ($hasMore) {
            $params = ['limit' => 100];
            if ($startingAfter) {
                $params['starting_after'] = $startingAfter;
            }

            $response = Customer::all($params);
            $customers = collect($response->data);

            $allCustomers = $allCustomers->merge($customers);

            $hasMore = $response->has_more;
            $startingAfter = $customers->last()?->id;
        }

        return $allCustomers;
    }

    public function unlicensedUsers(): object
    {
        return User::whereNull('license_id')->paginate(10);
    }
}
