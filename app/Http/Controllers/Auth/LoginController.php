<?php

namespace App\Http\Controllers\Auth;

use App\Enums\TenantStatus;
use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Models\Tenant;
use App\Models\User;
use App\Notifications\SendTwoFactorCode;
use Hash;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class LoginController extends Controller
{
    public function create(): Response
    {
        return Inertia::render('Auth/Login', [
            'status' => session('status'),
            'tenantState' => session('tenantState'),
            'twoFactorType' => session('email') ? $this->auth_type(session('email')) : null,
            'fortifyAuth' => config('auth.fortify_auth'),
        ]);
    }

    /**
     * Display the login view.
     */
    public static function auth_type($email)
    {
        return User::where('email', $email)->first()?->two_factor_type;
    }

    public function auth_check(LoginRequest $request)
    {
        /** @var Tenant $tenant */
        $tenant = tenant();

        if ($tenant?->status == TenantStatus::IN_ACTIVE->value) {
            return back()->withErrors([
                'tenantState' => 'Group is Inactive.',
            ]);
        }

        $twoFactorType = $this->auth_type($request->email);

        if ($twoFactorType) {
            session(['email' => $request->email]);
        }

        return redirect()->back();
    }

    public function authenticate(LoginRequest $request)
    {
        $user = $this->get_user($request->email);

        if ($user && Hash::check($request->password, $user->password)) {

            if ($user->two_factor_type == 'custom') {
                $user->generateTwoFactorCode();
                $user->notify(new SendTwoFactorCode);

                return redirect()->route('login.email.two.factor');
            }

            if ($user->two_factor_type == null) {
                $this->login($user, $request);
            }
        }

        return back()->withErrors([
            'email' => 'Invalid E-mail or Password provided.',
        ])->onlyInput('email');
    }

    private function get_user($email)
    {
        return User::where('email', $email)->first();
    }

    private function login($user, $request): void
    {
        Auth::login($user);
        $request->session()->regenerate();

        session(['tenant_id' => tenant('id')]);

        redirect()->intended(route('dashboard'));
    }

    public function email_two_factor(): Response
    {
        return Inertia::render('Auth/EmailTwoFactor', [
            'codeRequested' => session()->pull('codeRequested'),
        ]);
    }

    public function email_two_factor_authenticate(Request $request)
    {
        $user = User::firstWhere('two_factor_code', $request->code);

        if (now() > $user?->email_two_factor_expires_at) {
            return back()->withErrors([
                'code' => 'Invalid or Expired code provided.',
            ]);
        }

        if ($user) {
            $user->resetTwoFactorCode();

            $this->login($user, $request);
        }

        return back()->withErrors([
            'code' => 'Invalid or Expired code provided.',
        ]);
    }

    public function request_new_code()
    {
        $user = $this->get_user(session('email'));
        $user->generateTwoFactorCode();
        $user->notify(new SendTwoFactorCode);

        session(['codeRequested' => 'We have sent you a new code to your email.']);

        return redirect()->back();
    }
}
