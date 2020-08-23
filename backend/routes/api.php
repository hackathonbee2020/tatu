<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::namespace('Api')->group(function () {
    // Controllers Within The "App\Http\Controllers\Api" Namespace
    Route::post('/register'     , 'AuthController@register'         )->name('register');
    Route::post('/login'        , 'AuthController@login'            )->name('login');

    Route::middleware(['cliente'])->group(function () {
        Route::resource('conversations' , 'Cliente\ConversationController', ['as' => 'conversations']);
        Route::post('conversations/transfer', 'Cliente\ConversationController@transfer');
    });

});

Route::middleware('auth:api')->group(function() {

    /* AUTH ROUTES */
    Route::namespace('Api')->group(function () {
        // Controllers Within The "App\Http\Controllers\Api" Namespace
        Route::get('logout'     ,'AuthController@logout'            )->name('logout');
        Route::get('user/me'    ,'AuthController@user'              )->name('user.me');

        Route::namespace('Master')->group(function () {
            // Controllers Within The "App\Http\Controllers\Api\Master" Namespace
            Route::resources([
                'clientes' => 'ClienteController',
            ]);
        });

        Route::namespace('Cliente')->group(function () {
            Route::get('users', 'UserController@index');
            // Controllers Within The "App\Http\Controllers\Api\Master" Namespace
            Route::middleware(['cliente'])->group(function () {
                Route::resources([
                    'channels'      => 'ChannelController',
                    'departments'   => 'DepartmentController',
                    'agents'        => 'AgentController',
                ]);
            });
            Route::prefix('relatorios')->group(function () {
                Route::get('status', 'RelatorioController@status');
                Route::get('top', 'RelatorioController@top');
                Route::get('departamentos', 'RelatorioController@departamentos');
                Route::get('conversations', 'RelatorioController@conversations');
            });
        });
    });
});

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});
