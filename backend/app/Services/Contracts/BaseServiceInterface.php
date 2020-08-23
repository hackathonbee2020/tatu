<?php

namespace App\Services\Contracts;

interface BaseServiceInterface
{
    public function index();

    public function store(array $params);

    public function show($id);

    public function update(array $params, $id);

    public function destroy($id);
}
