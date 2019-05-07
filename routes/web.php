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

Route::get('/', function () {
    return view('welcome');
});

Auth::routes();

Route::get('login', 'Auth\LoginController@showLoginForm');

Route::get('/product-catalog', 'AdminController@product_catalog');

Route::get('/single-product', 'AdminController@single_product');


Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');