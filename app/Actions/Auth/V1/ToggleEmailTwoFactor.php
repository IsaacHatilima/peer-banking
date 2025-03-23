<?php

namespace App\Actions\Auth\V1;

use App\Enums\TwoFactorType;

class ToggleEmailTwoFactor
{
    public function __invoke($authType): void
    {
        auth()->user()->update([
            'two_factor_type' => $authType == 'disable' ? null : $authType,
            'two_factor_secret' => $authType != TwoFactorType::FORTIFY ? null : auth()->user()->two_factor_secret,
            'two_factor_confirmed_at' => $authType != TwoFactorType::FORTIFY ? null : auth()->user()->two_factor_confirmed_at,
            'two_factor_recovery_codes' => $authType != TwoFactorType::FORTIFY ? null : auth()->user()->two_factor_recovery_codes,
        ]);
    }
}
