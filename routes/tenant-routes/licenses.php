<?php

use App\Http\Controllers\LicenseController;

Route::get('/license', [LicenseController::class, 'index'])->name('license.index');
Route::post('/license', [LicenseController::class, 'store'])->name('license.store');
