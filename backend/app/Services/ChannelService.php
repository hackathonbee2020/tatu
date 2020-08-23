<?php

namespace App\Services;

use App\Repositories\ChannelRepository;
use App\Services\Abstracts\BaseService;

final class ChannelService extends BaseService
{
    public function __construct()
    {
        $this->repository = new ChannelRepository();
    }
}
