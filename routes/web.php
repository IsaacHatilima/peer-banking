<?php

use App\Http\Controllers\Auth\GoogleAuthController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;
use Stancl\Tenancy\Middleware\InitializeTenancyByDomain;

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

Route::middleware([
    InitializeTenancyByDomain::class,
    'universal',
])->group(function () {
    Route::get('/', function () {
        return Inertia::render('welcome', [
            'canRegister' => Features::enabled(Features::registration()),
        ]);
    })->name('home');
});

Route::get('/google/redirect', [GoogleAuthController::class, 'redirectToGoogle'])
    ->name('google.redirect');

Route::get('/auth/callback', [GoogleAuthController::class, 'handleGoogleCallback'])
    ->name('google.callback');

require __DIR__.'/settings.php';
