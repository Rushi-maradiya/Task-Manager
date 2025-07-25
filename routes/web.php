<?php

use App\Http\Controllers\Taskcontroller;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\Listcontroller;
use App\Http\Controllers\DashboardController;


Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::resource('lists',Listcontroller::class); 
    Route::resource('tasks', Taskcontroller::class);
   Route::get('/dashboard', [DashboardController::class,'index'])->name('dashboard');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
