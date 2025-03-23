<?php

namespace App\Http\Requests;

use App\Enums\TenantStatus;
use App\Enums\TimeZone;
use App\Rules\StringRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateTenantRequest extends FormRequest
{
    public function rules(): array
    {
        $id = $this->route('tenant');

        return array_merge(
            [
                'status' => ['required', Rule::in(TenantStatus::getValues())],
                'timezone' => ['required', Rule::in(Timezone::getValues())],
                'name' => ['required', 'min:3', 'max:50', Rule::unique('tenants')->ignore($id)],
                'zip' => ['required', 'numeric', 'digits_between:3,10'],
                'contact_phone' => ['required', 'regex:/^(?:\+?\d{1,4}[\s\-]?)?(\(?\d{2,5}\)?[\s\-]?)?\d{7,15}$/', 'min:7', 'max:50'],
            ],
            StringRule::rules('address', true),
            StringRule::rules('city', true),
            StringRule::rules('state', true),
            StringRule::rules('country', true),
            StringRule::rules('contact_first_name', true),
            StringRule::rules('contact_last_name', true),
            StringRule::rules('contact_email', true),
        );
    }

    public function messages(): array
    {
        return array_merge(
            StringRule::messages('address', true),
            StringRule::messages('city', true),
            StringRule::messages('state', true),
            StringRule::messages('country', true),
            StringRule::messages('contact_first_name', true),
            StringRule::messages('contact_last_name', true),

            [
                'contact_email.required' => 'Contact E-Mail is required.',
                'contact_email.email' => 'Invalid Contact E-Mail.',
                'contact_email.max' => 'Contact E-Mail is too long.',
                'contact_email.string' => 'Contact E-Mail must be a string.',
                'contact_email.unique' => 'Contact E-Mail already exists.',
                'contact_email.lowercase' => 'Invalid Contact E-Mail.',

                'name.required' => 'Tenant Name is required.',
                'name.min' => 'Tenant Name must be at least 3 characters.',
                'name.max' => 'Tenant Name may not be greater than 50 characters.',
                'name.unique' => 'Tenant Name has already been taken.',

                'zip.required' => 'Postal Code is required.',
                'zip.numeric' => 'Postal Code must be numeric.',

                'contact_phone.required' => 'Phone Number is required.',
                'contact_phone.min' => 'Phone Number must be at least 3 characters.',
                'contact_phone.max' => 'Phone Number may not be greater than 50 characters.',
                'contact_phone.integer' => 'Phone Number must be numeric.',

                'domain.required' => 'Domain is required.',
                'domain.min' => 'Domain must be at least 3 characters.',
                'domain.max' => 'Domain may not be greater than 10 characters.',
                'domain.unique' => 'Domain has already been taken.',

                'timezone.required' => 'Timezone is required.',
                'timezone.in' => 'The selected timezone is invalid. Please choose a valid timezone.',

                'status.required' => 'Status is required.',
                'status.in' => 'Selected status is invalid.',
            ]
        );
    }

    public function authorize(): bool
    {
        return true;
    }
}
