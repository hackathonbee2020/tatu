<?php

namespace App\Repositories;

use App\Models\User;
use App\Repositories\Abstracts\BaseRepository;

final class UserRepository extends BaseRepository
{
    public function __construct()
    {
        $this->model = new User();
    }
}
