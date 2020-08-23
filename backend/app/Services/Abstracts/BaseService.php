<?php

namespace App\Services\Abstracts;

use App\Repositories\Abstracts\BaseRepository;
use App\Services\Contracts\BaseServiceInterface;

abstract class BaseService implements BaseServiceInterface
{
    /** @var BaseRepository */
    protected $repository;

    public function index()
    {
        return $this->repository->all();
    }

    public function store(array $params)
    {
        return $this->repository->create($params);
    }

    public function show($id)
    {
        return $this->repository->getById($id);
    }

    public function update(array $params, $id)
    {
        return $this->repository->updateById($id, $params);
    }

    public function destroy($id)
    {
        // TODO: TRATAR PARA DELETAR CHANNEL APENAS SE ELE NAO TIVER DEPARTAMENTOS COM CONVERSAS ABERTAS
        return $this->repository->deleteById($id);
    }
}
