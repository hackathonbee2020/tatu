<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ClienteUser;
use App\Models\User;
use App\Services\UserService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class AuthController extends Controller
{
    private $service;

    public function __construct(UserService $service)
    {
        $this->middleware('auth')->except(['register', 'login']);
        $this->service = $service;
    }

    public function register(Request $request)
    {
        DB::beginTransaction();

        $request->validate([
            'name'       => 'required|max:55',
            'email'      => 'email|required|unique:users',
            'password'   => 'required',
            'cliente_id' => 'required|exists:clientes,id',
        ]);

        $avatar = '';
        if ($request->avatar) {
            $avatar = $this->service->uploadAvatarUser($request->get('avatar'));
        }

        $user = User::create([
            'name'     => $request->get('name'),
            'email'    => $request->get('email'),
            'password' => $request->get('password'),
            'avatar'   => $avatar ?? '',
        ]);

        ClienteUser::create([
            'cliente_id' => $request->get('cliente_id'),
            'user_id'    => $user->id,
        ]);

        $success['token'] = $user->createToken('authToken')->accessToken;
        $success['user']  = $user;

        \Bouncer::assign('agente')->to($user);

        $success['user']['cliente_id'] = $request->get('cliente_id');
        $success['user']['type']       = 'agente';

        DB::commit();

        return response()->json(['success' => $success]);
    }

    public function login(Request $request)
    {
        $data = $request->validate([
            'email'    => 'email|required',
            'password' => 'required',
        ]);

        Auth::attempt($data);

        if (!Auth::attempt($data)) {
            throw new \Exception('E-mail ou senha inválido(s)');
        }

        $success['token'] = Auth::user()->createToken('authToken')->accessToken;
        $success['user']  = Auth::user();

        $role = Auth::user()->roles()->get();

        if (!Auth::user()->isAn('master')) {
            $cliente = DB::table('cliente_user')
                ->select('cliente_id')
                ->where('user_id', Auth::user()->id)
                ->first();

            if($cliente)
                $success['user']['cliente_id'] = $cliente->cliente_id;
        }

            if (count($role)) {
                $success['user']['type'] = $role[0]->name;
            } else {
                $success['user']['type'] = 'agente';
            }


        return response()->json(['success' => $success]);
    }

    public function logout(Request $request)
    {
        if (!Auth::user()) {
            return response()->json(['error' => 'Usuário não encontrado'], 404);
        }

        $token = Auth::user()->token();
        $token->revoke();

        DB::table('oauth_access_tokens')
            ->where('user_id', Auth::user()->id)
            ->update([
                'revoked' => true
            ]);

        return response()->json(['success' => 'Deslogado com sucesso'], 200);
    }

    public function user(Request $request)
    {
        $user = $request->user();

        if ($user->get('avatar')) {
            $user->avatar = \Storage::disk('public')->url($user->avatar);
        }

        $success['user'] = $user;
        $success['type'] = $user->roles()->first() ?? null;

        return response()->json(['success' => $success], 200);
    }
}
