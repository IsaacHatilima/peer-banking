<?php

use App\Http\Controllers\PaymentSetup\StripeAuthController;

Route::get('/stripe', [StripeAuthController::class, 'index'])->name('stripe.index');
Route::post('/stripe', [StripeAuthController::class, 'store'])->name('stripe.store');
Route::put('/stripe/{stripeAuth}', [StripeAuthController::class, 'update'])->name('stripe.update');
