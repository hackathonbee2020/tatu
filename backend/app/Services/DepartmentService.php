<?php

namespace App\Services;

use App\Models\Department;
use App\Repositories\DepartmentRepository;
use App\Services\Abstracts\BaseService;

final class DepartmentService extends BaseService
{
    public function __construct()
    {
        $this->repository = new DepartmentRepository();
    }


    public function indexDepartamentos($channelId)
    {
        $departamentos = Department::where('channel_id', $channelId)->get();
        return $departamentos;
    }
}
