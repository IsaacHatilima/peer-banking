<?php

use App\Http\Controllers\LicenseController;

Route::get('/buy', [LicenseController::class, 'index'])->name('license.index');
Route::post('/buy', [LicenseController::class, 'store'])->name('license.store');

Route::get('/completion', [LicenseController::class, 'completion'])->name('license.completion');
