<?php

namespace App\Http\Controllers;

use App\Actions\Auth\V1\DeleteAccountAction;
use App\Actions\Profile\V1\UpdateProfileAction;
use App\Http\Requests\Auth\CurrentPasswordRequest;
use App\Http\Requests\ProfileUpdateRequest;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class ProfileController extends Controller
{
    public function __construct(
        private readonly DeleteAccountAction $deleteAccountAction
    ) {}

    /**
     * Display the user's profile form.
     */
    public function edit(Request $request): Response
    {
        return Inertia::render('Profile/Edit', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
        ]);
    }

    /**
     * Update the user's profile information.
     */
    public function update(ProfileUpdateRequest $request, UpdateProfileAction $updateProfileAction)
    {
        $updateProfileAction($request);

        return Redirect::route('profile.edit');
    }

    /**
     * Delete the user's account.
     */
    public function destroy(CurrentPasswordRequest $request): RedirectResponse
    {
        $this->deleteAccountAction->delete_account($request);

        return Redirect::to('/');
    }
}
