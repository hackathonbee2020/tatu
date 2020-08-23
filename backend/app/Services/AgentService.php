<?php

namespace App\Services;

use App\Repositories\AgentRepository;
use App\Services\Abstracts\BaseService;

final class AgentService extends BaseService
{
    public function __construct()
    {
        $this->repository = new AgentRepository();
    }
}
