<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ContactController extends Controller
{
  public function show(Request $request)
    {
        $name = $request->name;
        $email = $request->email;
        $content =  $request->content;
        return <<<HTML
        <html>
        <body><h1>{$name}</h1>
        </body>
        </html>
        HTML;
    }
}