<?php

use Illuminate\Support\Facades\Route;

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
});
Route::get('/Contact', function () {
  return view('index');
});