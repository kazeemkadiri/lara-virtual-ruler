<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/



Auth::routes();

Route::get('/', function(){
    return redirect()->route( 'product-catalog' );
});

Route::get('login', 'Auth\LoginController@showLoginForm')->name('login');

Route::post('image-upload', 'AdminController@image_upload')->name('image-upload');

Route::get('product-catalog', 'AdminController@product_catalog')->name('product-catalog');

Route::get('products', 'AdminController@single_product')->name('products');

Route::get('/home', 'HomeController@index')->name('home');
