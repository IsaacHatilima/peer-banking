<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StripeAuthRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'stripe_key' => ['required'],
            'stripe_secret' => ['required'],
            'stripe_webhook_secret' => ['required'],
            'currency' => ['required'],
            'currency_locale' => ['required'],
        ];
    }

    public function authorize(): bool
    {
        return true;
    }
}
