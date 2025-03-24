<?php

namespace App\Http\Requests;

use App\Rules\ExistingEmailRule;
use App\Rules\StringRule;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class ProfileUpdateRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return array_merge(
            StringRule::rules('first_name', true),
            StringRule::rules('last_name', true),
            StringRule::rules('street', false),
            StringRule::rules('house_number', false),
            StringRule::rules('zip', false),
            StringRule::rules('city', false),
            StringRule::rules('state', false),
            ExistingEmailRule::rules($this->user()->id),
            [
                'date_of_birth' => ['nullable', 'date'],
                'gender' => ['nullable', Rule::in(['male', 'female', 'other']), 'string'],
                'phone' => ['nullable', 'regex:/^(?:\+?\d{1,4}[\s\-]?)?(\(?\d{2,5}\)?[\s\-]?)?\d{7,15}$/', 'min:7', 'max:50'],
            ]
        );
    }

    public function messages(): array
    {
        return array_merge(
            StringRule::messages('first_name', true),
            StringRule::messages('last_name', true),
            StringRule::messages('street', false),
            StringRule::messages('house_number', false),
            StringRule::messages('zip', false),
            StringRule::messages('city', false),
            StringRule::messages('state', false),
            ExistingEmailRule::messages(),
            [
                'date_of_birth.date' => 'Date of birth must be a valid date.',
                'gender.in' => 'Invalid gender option.',
                'phone.regex' => 'Invalid phone number.',
            ]
        );
    }
}
