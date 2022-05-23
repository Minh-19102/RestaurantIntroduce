<?php

use Illuminate\Support\Facades\Route;
use App\Http\Middleware\checkLogin;
Route::get('/', function () {
    return view('index');
});
Route::get('/AboutUs', function () {
  return view('index');
});
Route::get('/RestaurantsList', function () {
  return view('index');
});
Route::get('/RestaurantsList/{id}', function ($id) {
  return view('index');
})->middleware('auth:sanctum');
Route::get('/Contact', function () {
  return view('index');
});
Route::get('/Login', function(){
  return view('index');
});
