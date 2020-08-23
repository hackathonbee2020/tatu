<?php

namespace App\Services;

use App\Models\UserConversation;
use App\Repositories\ConversationRepository;
use App\Services\Abstracts\BaseService;
use App\Services\Contracts\UpsertServiceInterface;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Mockery\Exception;

final class ConversationService extends BaseService implements UpsertServiceInterface
{
    public function __construct()
    {
        $this->repository = new ConversationRepository();
    }

    public function index()
    {
        return $this->repository
            ->with(['department', 'channel'])
            ->orderBy('created_at')
            ->all();
    }

    public function upsert(array $params, array $values = [])
    {
        return $this->repository->upsert($params, $values);
    }

    public function update(array $params, $id)
    {
        try {
            DB::beginTransaction();

            if (isset($params['agente_id'])) {
                $userConversation                   = new UserConversation();
                $userConversation->user_id          = $params['agente_id'];
                $userConversation->conversation_id  = $id;
                $userConversation->save();
            }

            $return = $this->repository->updateById($id, $params);

            DB::commit();

            return $return;

        } catch (\Exception $exception) {
            DB::rollBack();
            return $exception;
        }

    }

    public function getStatusList(): array
    {
        return $this->repository->getStatusList();
    }

    public function getStatusWithJoin(bool $shift = false): string
    {
        $statuses = $this->repository->getStatusList();

        $keys = array_keys($statuses);

        if (!!$shift) {
            array_shift($keys);
        }

        return implode(',', $keys);
    }
}
