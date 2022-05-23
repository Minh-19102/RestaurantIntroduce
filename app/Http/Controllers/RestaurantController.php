<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Restaurant;
use Illuminate\Contracts\Cache\Store;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
class RestaurantController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(){
        return  Restaurant::orderBy('id')->get();
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {

    }

    public function store(Request $request)
    {
        $restaurant = new Restaurant();
        $restaurant->name = $request->input('name');
        $restaurant->introduction = $request->input('introduction');
        $restaurant->menu = $request->input('menu');
        $restaurant->active_time = $request->input('active_time');
        $restaurant->save();

        #$request->file('restaurant-image')->storeAs('public/restaurant-img/',$restaurant->id .'.jpg');
        $img = $request->input('restaurant-image');
        $replace = substr($img, 0, strpos($img, ',')+1);
        // find substring fro replace here eg: data:image/png;base64,
        $image = str_replace($replace, '', $img);
        $image = str_replace(' ', '+', $image);
        $imageName = ($restaurant->id) . '.jpg';
        Storage::disk('restaurant-img')->put($imageName, base64_decode($image));
        #$base64_str = substr(img, strpos($request->input('restaurant-image'), ",")+1);
        #$image = base64_decode($base64_str);
        return response()->json([
          'status'=> 200,
          'message'=> 'Restaurant added successfully!'
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        if(auth('sanctum')->check()){
          $user = auth('sanctum')->user();
          $detail = Restaurant::find($id);
          if($user->level==1 || $user->id == $detail->owner){
            return response()->json([
              'status' => 200,
              'data' => $detail
            ]);
          }
        }
        else return response()->json([
          'status' => 404,
          'Message' => "You don't have permission to see the detail information."
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        Restaurant::where('id', $id)->update([
          'name'=>$request->input('name'),
          'introduction'=>$request->input('introduction'),
          'menu'=>$request->input('menu'),
          'active_time'=>$request->input('active_time')
        ]);

        $img = $request->input('restaurant-image');
        if($img!=null){
          $replace = substr($img, 0, strpos($img, ',')+1);
          $image = str_replace($replace, '', $img);
          $image = str_replace(' ', '+', $image);
          $imageName = $id . '.jpg';
          Storage::disk('restaurant-img')->put($imageName, base64_decode($image));
        }
        return response()->json([
          'status'=> 200,
          'message'=> 'Restaurant updated successfully!'
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        Restaurant::destroy($id);
        Storage::disk('restaurant-img')->delete($id.'.img');
        return response()->json([
          'status'=> 200,
          'message'=> 'Restaurant deleted successfully!'
        ]);
    }
}
