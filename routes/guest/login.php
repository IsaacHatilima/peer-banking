<?php

use App\Http\Controllers\Auth\LoginController;

Route::get('/', [LoginController::class, 'create'])
    ->name('login');

Route::post('/', [LoginController::class, 'authenticate'])
    ->name('login.post');

Route::post('/auth-check', [LoginController::class, 'auth_check'])
    ->name('login.auth.check');

Route::get('/two-factor', [LoginController::class, 'email_two_factor'])
    ->name('login.email.two.factor');

Route::post('/two-factor', [LoginController::class, 'email_two_factor_authenticate'])
    ->name('login.email.two.post');

Route::get('/new-two-factor', [LoginController::class, 'request_new_code'])
    ->name('new.two.factor.code');

Route::get('/two-factor-challenge', function () {
    return Inertia::render('Auth/TwoFactorChallenge');
})->name('two-factor.login');
