<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class RegistrationController extends Controller
{
    public function store(Request $request){
      $request->validate([
        'name' => 'required',
        'email' => 'required|email',
        'password' => 'required'
      ]);
      $user = new User();
      $user->name = $request->name;
      $user->email = $request->email;
      $user->password = $request->password;
      $user->save();
      auth()->login($user);
      return response()->json([],200);
    }
}
