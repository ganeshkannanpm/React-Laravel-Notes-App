<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

// Catch-all route for React Router
Route::view('/{any}', 'welcome')->where('any', '.*');
