<?php

use Illuminate\Support\Facades\Route;

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

Route::get('/testes', function () {

    $conversation = \App\Models\Conversation::with('channel')->first();
    dd($conversation, $conversation->channel_id, $conversation->channel);

    $user =

    $user = \App\Models\User::where('email', 'wilton@gmail.com')->first();
    dd($user->roles()->first()->name);
    \Bouncer::assign('admin')->to($user);
    dd($user);

    $user = \App\Models\User::first();
    dd($user);
    dd($user, $user->roles()->first()->name);

    $base_url = url('/ok');

    dd($base_url);

    $data = [
        'name' => 'RAMONZIN DAS MENINAS'
    ];

    $user = \App\Models\User::where('name', 'Ramonzinho')->first();
    $user->update($data);
    dd($user);
    \Bouncer::assign('cliente')->to($user);

    dd($user, $user->roles()->first()->name);

    dd($user);
    dd("a", $user, $user->roles()->first()->name);
    \Illuminate\Support\Facades\Auth::user();
    return view('welcome');
});

Route::get('/', function () {
    return view('welcome');
});

Route::get('chat', function () {
    return view('chat');
});
