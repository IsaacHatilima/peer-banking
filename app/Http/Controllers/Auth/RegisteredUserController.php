<?php

namespace App\Http\Controllers\Auth;

use App\Actions\Auth\V1\Registration\RegistrationAction;
use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\RegisterRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Inertia\Response;

class RegisteredUserController extends Controller
{
    /**
     * Handle an incoming registration request.
     *
     * @throws ValidationException
     */
    public function store(RegisterRequest $request, RegistrationAction $registerAction)
    {
        $user = $registerAction($request);

        Auth::login($user);

        return redirect(route('dashboard', absolute: false));

    }

    /**
     * Display the registration view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Register');
    }
}
