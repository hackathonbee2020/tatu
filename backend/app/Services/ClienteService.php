<?php

namespace App\Services;

use App\Models\Cliente;
use App\Models\ClienteUser;
use App\Models\User;
use App\Repositories\ClienteRepository;
use App\Repositories\UserRepository;
use App\Services\Abstracts\BaseService;
use Illuminate\Support\Facades\DB;

final class ClienteService extends BaseService
{
    public function __construct()
    {
        $this->repository       = new ClienteRepository();
        $this->userRepository   = new UserRepository();
    }

    public function store(array $params)
    {
        try {
            DB::beginTransaction();
            $user       = $this->userRepository->create($params);
            $cliente    = $this->repository->create($params);

            $clienteUser                = new ClienteUser();
            $clienteUser->user_id       = $user->id;
            $clienteUser->cliente_id    = $cliente->id;
            $clienteUser->save();

            \Bouncer::assign('cliente')->to($user);
//            $user->clientes()->attach($cliente->id);
            DB::commit();
            return $cliente;
        }catch (\Exception $exception){
            DB::rollBack();
            return $exception;
        }

    }
}
