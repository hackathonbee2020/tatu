<?php

namespace App\Repositories\Abstracts;

use App\Models\User;

abstract class BaseUserRoleRepository extends BaseRepository
{
    private $role;

    public function __construct($role)
    {
        $this->role = $role;

        $this->model = (new User())->whereIs($this->role);
    }
}
