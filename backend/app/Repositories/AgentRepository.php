<?php

namespace App\Repositories;

use App\Repositories\Abstracts\BaseUserRoleRepository;

final class AgentRepository extends BaseUserRoleRepository
{
    public function __construct()
    {
        parent::__construct('agent');
    }
}
