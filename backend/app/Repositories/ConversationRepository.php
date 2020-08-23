<?php

namespace App\Repositories;

use App\Models\Conversation;
use App\Models\UserConversation;
use App\Repositories\Abstracts\BaseRepository;
use http\Client\Curl\User;
use Illuminate\Support\Facades\Log;

final class ConversationRepository extends BaseRepository
{
    public function __construct()
    {
        $this->model = new Conversation();
    }

    public function getStatusList(): array
    {
        return Conversation::$status;
    }

    public function upsert(array $params, array $values = [])
    {
        $conversation = Conversation::where($params)->first();

        if (empty($conversation)) {
            $params     = array_merge($params, $values);
            $conversa   = Conversation::create($params);
            return $conversa;
        }

        $conversation->touch();

        return $conversation;
    }
}
