<?php

namespace App\Repositories;

use App\Models\Department;
use App\Repositories\Abstracts\BaseRepository;

final class DepartmentRepository extends BaseRepository
{
    public function __construct()
    {
        $this->model = new Department();
    }
}
