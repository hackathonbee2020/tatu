<?php

namespace App\Services\Contracts;

interface UpsertServiceInterface
{
    public function upsert(array $params, array $values = []);
}
