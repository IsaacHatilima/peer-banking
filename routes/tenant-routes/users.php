<?php

use App\Http\Controllers\Tenants\UsersController;

Route::get('/users', [UsersController::class, 'index'])->name('users');
Route::post('/users', [UsersController::class, 'store'])->name('users.store');
Route::put('/user/{user}', [UsersController::class, 'update'])->name('users.update');
Route::delete('/delete-user/{user}', [UsersController::class, 'destroy'])->name('users.destroy');
Route::patch('/restore-user/{userId}', [UsersController::class, 'restore'])->name('users.restore');
Route::put('/toggle-user-status/{user}', [UsersController::class, 'patch'])->name('users.toggle');
