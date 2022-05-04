<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Response;
class ImagesController extends Controller
{
    public function show($name){
      $path = 'public/restaurant-img/'.$name.'.jpg';
      if(!Storage::exists($path))
        return Response::make('File not found!', 404);
      else {
        $file = Storage::get($path);
        $type = Storage::mimeType($path);
        $response = Response::make($file, 200)->header("Content-Type", $type);
        return $response;
      }
    }
    public function store(Request $request){

    }

}