<?php

use App\Http\Controllers\LicenseController;

Route::get('/license', [LicenseController::class, 'index'])->name('license.index');
Route::post('/license', [LicenseController::class, 'store'])->name('license.store');
Route::get('/license/{license}', [LicenseController::class, 'show'])->name('license.show');
Route::get('/license-download/{licenseId}', [LicenseController::class, 'download_invoice'])->name('license.download');
