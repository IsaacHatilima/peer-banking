<?php

namespace App\Http\Controllers;

use App\Http\Requests\StripeAuthRequest;
use App\Models\StripeAuth;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

class StripeAuthController extends Controller
{
    use AuthorizesRequests;

    public function index()
    {
        $this->authorize('viewAny', StripeAuth::class);

        return StripeAuth::all();
    }

    public function store(StripeAuthRequest $request)
    {
        $this->authorize('create', StripeAuth::class);

        return StripeAuth::create($request->validated());
    }

    public function show(StripeAuth $stripeAuth)
    {
        $this->authorize('view', $stripeAuth);

        return $stripeAuth;
    }

    public function update(StripeAuthRequest $request, StripeAuth $stripeAuth)
    {
        $this->authorize('update', $stripeAuth);

        $stripeAuth->update($request->validated());

        return $stripeAuth;
    }

    public function destroy(StripeAuth $stripeAuth)
    {
        $this->authorize('delete', $stripeAuth);

        $stripeAuth->delete();

        return response()->json();
    }
}
