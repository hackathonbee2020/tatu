<?php

namespace App\Repositories;

use App\Models\Channel;
use App\Repositories\Abstracts\BaseRepository;

final class ChannelRepository extends BaseRepository
{
    public function __construct()
    {
        $this->model = new Channel();
    }
}
