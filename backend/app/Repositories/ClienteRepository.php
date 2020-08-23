<?php

namespace App\Repositories;

use App\Models\Cliente;
use App\Repositories\Abstracts\BaseRepository;

final class ClienteRepository extends BaseRepository
{
    public function __construct()
    {
        $this->model = new Cliente();
    }
}
