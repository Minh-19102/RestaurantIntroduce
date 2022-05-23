<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ImagesController;
use App\Http\Controllers\RestaurantController;
use App\Http\Controllers\RegistrationController;
use App\Http\Controllers\LoginController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {

});
Route::resource('restaurant-image', ImagesController::class);
Route::resource('restaurants',RestaurantController::class);
Route::post('registration', [RegistrationController::class, 'store']);
Route::post('login', [LoginController::class, 'getLogin']);
Route::post('logout', [LoginController::class, 'getLogout']);
#Route::get('getuser', [LoginController::class, 'getUser'])->middleware('auth:sanctum');