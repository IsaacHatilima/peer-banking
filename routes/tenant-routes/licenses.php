<?php

use App\Http\Controllers\LicenseController;
use App\Http\Controllers\LicenseIssuerController;

Route::get('/license', [LicenseController::class, 'index'])->name('license.index');
Route::post('/license', [LicenseController::class, 'store'])->name('license.store');
Route::get('/license-download/{licenseId}', [LicenseController::class, 'downloadInvoice'])->name('license.download');
Route::get('/issue-license/{license}', [LicenseIssuerController::class, 'show'])->name('license.show');
