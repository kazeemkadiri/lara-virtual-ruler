<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

use App\TextileImage;
use App\User;

use Illuminate\Support\Facades\Auth;


class AdminController extends Controller
{
    //
    public function __construct() {
        $this -> middleware('auth');
    }

    public function product_catalog() {

        return view( 'product-catalog' );

    }

    public function single_product( Request $request ) {

        // Get all the images uploaded by this user

        $textileImages = $request -> user() -> textileImages;

        //send to view

        return view( 'single-product', compact('textileImages') );

    }

    public function image_upload ( Request $req ) {

        $responseMsg = '';

        if( ! $req -> hasFile( 'textile_image' ) 
            || ! $req->file( 'textile_image' )->isValid()) {

            $responseMsg = 'No file found';

            session()->flash('textile-image-upload-response', $responseMsg );

            return redirect()->back();

        }

        $path = $req->file('textile_image')->store('textile-images', 'public');

        $responseMsg = $path ? $this -> store_path_in_db( $path ) : 'failed';

        session()->flash('textile-image-upload-response', $responseMsg );

        return redirect()->back();

    } 

    public function store_path_in_db( $filePath ) {

        return TextileImage::firstOrCreate([
                'name' => 'storage/' . $filePath,
                'user_id' => Auth::user()->id
            ])-> wasRecentlyCreated ? 'success' : 'failed';

    }


}
