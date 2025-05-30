<?php

namespace App\Http\Controllers\Auth;

use App\Actions\Auth\V1\PasswordManager\CheckTokenAction;
use App\Actions\Auth\V1\PasswordManager\SetPasswordAction;
use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\SetPasswordRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Password;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Inertia\Response;

class NewPasswordController extends Controller
{
    /**
     * Display the password reset view.
     */
    public function create(Request $request, CheckTokenAction $checkTokenAction): Response
    {
        $tokenValidity = $checkTokenAction($request->email);

        return Inertia::render($tokenValidity ? 'Auth/ResetPassword' : 'Errors/PasswordReset', [
            'email' => $request->email,
            'token' => $request->route('token'),
        ]);
    }

    /**
     * Handle an incoming new password request.
     *
     * @throws ValidationException
     */
    public function store(SetPasswordRequest $request, SetPasswordAction $setPasswordAction): RedirectResponse
    {
        $status = $setPasswordAction($request);

        if ($status == Password::PASSWORD_RESET) {
            return redirect()->route('login')->with('status', __($status));
        }

        throw ValidationException::withMessages([
            'email' => [trans($status)],
        ]);
    }
}
