<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
class LoginController extends Controller
{
    public function getLogin(Request $request){
      $data = [
        'name' => $request->name,
        'password' => $request->password
      ];
      if (Auth::attempt($data, true)){
        $user = User::where('name', '=', $request->name)->first();
        Auth::login($user, true);
        $tokenResult = $user->createToken('authToken')->plainTextToken;
        return response()->json([
          'status' => 200,
          'access_token' => $tokenResult,
          'username' => $user->name
        ]);
      }
      else {
        return response()->json([
          'status' => 400,
          'message' => 'Wrong username or Password'
        ]);
      }
    }
    public function getUser(){
      if(Auth::check() || Auth::viaRemember())
        return response()->json([
          'status' => 200,
          'username'=>Auth::user()->name
        ]);
      else return response()->json([
        'status' => 404,
      ]);
    }
    public function getLogout(Request $request)
    {
        $request->user()->tokens()->delete();
        return redirect('/');
    }
}
