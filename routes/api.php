<?php 

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\NoteController;
use App\Http\Controllers\AuthController;

Route::resource('notes', NoteController::class);

//Auth
Route::post('/register',[AuthController::class, 'register']);