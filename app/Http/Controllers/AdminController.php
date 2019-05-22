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

        $uploaded_images_path = session()->get( 'textile-images-uploaded' ) !== null 
                                ? session()->get( 'textile-images-uploaded' ) : array();
                                
        if( ! $req -> hasFile( 'textile_image' ) ) {

            $responseMsg = 'No file found';

            session()->flash('textile-image-upload-response', $responseMsg );

            return redirect()->back();

        }

        foreach ($req->textile_image as $textileImage) {

            $path = $textileImage->store('textile-images', 'public');
            
            $responseMsg = $path ? $this -> store_data_in_db( $req, $path ) : 'failed';

            if( $responseMsg === 'success' ) $uploaded_images_path[] = 'storage/' . $path;

        }

        session()->put( 'textile-images-uploaded', $uploaded_images_path ); 

        return redirect()->back();

    } 

    public function store_data_in_db( $req, $filePath ) {

        return TextileImage::firstOrCreate([
                'name' => 'storage/' . $filePath,
                'user_id' => Auth::user()->id,
                'scale_value' => $req->scale_value,
                'scale_unit' => $req->scale_unit
            ])->wasRecentlyCreated ? 'success' : 'failed';

    }


}
