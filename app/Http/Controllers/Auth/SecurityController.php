<?php

namespace App\Http\Controllers\Auth;

use App\Actions\Auth\V1\CopyRecoveryCodesAction;
use App\Actions\Auth\V1\PasswordManager\ChangePasswordAction;
use App\Actions\Auth\V1\ToggleEmailTwoFactor;
use App\Enums\TwoFactorType;
use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\ChangePasswordRequest;
use App\Http\Requests\Auth\CurrentPasswordRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class SecurityController extends Controller
{
    public function show(Request $request): Response
    {
        return Inertia::render('Profile/Security', [
            'otpCode' => auth()->user()->two_factor_secret ? decrypt(auth()->user()->two_factor_secret) : '',
            'fortify' => config('auth.fortify_auth'),
            'social_auth' => $request->user()?->password === null,
            'twoFactorTypeEmail' => TwoFactorType::EMAIL,
        ]);
    }

    public function copy_recovery_codes(CopyRecoveryCodesAction $copyRecoveryCodesAction)
    {
        $copyRecoveryCodesAction();

        return redirect()->back();
    }

    public function email_two_factor(CurrentPasswordRequest $request, ToggleEmailTwoFactor $toggleEmailTwoFactor, $authType): RedirectResponse
    {
        $toggleEmailTwoFactor($authType);

        return back();
    }

    public function update(ChangePasswordRequest $request, ChangePasswordAction $changePassword): RedirectResponse
    {
        $changePassword($request);

        return back();
    }
}
