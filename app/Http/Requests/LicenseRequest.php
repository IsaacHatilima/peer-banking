<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class LicenseRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'unit_price' => ['required', 'numeric'],
            'quantity' => ['required', 'integer'],
            'setup_intent' => ['required', 'string'],
            'card_holder' => ['required'],
        ];
    }

    public function authorize(): bool
    {
        return true;
    }
}
