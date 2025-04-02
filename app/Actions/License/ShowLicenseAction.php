<?php

namespace App\Actions\License;

use Carbon\Carbon;
use Illuminate\Pagination\LengthAwarePaginator;
use NumberFormatter;

class ShowLicenseAction
{
    public function retrieve_license($license): object
    {
        return $license->load('subscription');
    }

    public function invoices(): LengthAwarePaginator
    {
        $user = auth()->user();
        $currency = config('cashier.currency', 'EUR');
        $locale = config('cashier.currency_locale', 'nl_BE');

        $formatter = new NumberFormatter($locale, NumberFormatter::CURRENCY);

        $invoices = collect($user->invoices())->map(function ($invoice) use ($formatter, $currency) {
            return [
                'id' => $invoice->id,
                'number' => $invoice->number,
                'created' => Carbon::createFromTimestamp($invoice->created)->format('Y-m-d'),
                'total' => $formatter->formatCurrency($invoice->total / 100, strtoupper($currency)),
                'download_url' => route('license.download', $invoice->id),
            ];
        });

        $perPage = 10;
        $currentPage = request()->query('page', 1);
        $currentItems = $invoices->slice(($currentPage - 1) * $perPage, $perPage)->values();

        return new LengthAwarePaginator(
            $currentItems,
            $invoices->count(),
            $perPage,
            $currentPage,
            ['path' => request()->url(), 'query' => request()->query()]
        );
    }
}
