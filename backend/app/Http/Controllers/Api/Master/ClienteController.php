<?php

namespace App\Http\Controllers\Api\Master;

use App\Http\Controllers\Controller;
use App\Services\ClienteService;
use Illuminate\Http\Request;

class ClienteController extends Controller
{
    private $service;

    public function __construct(ClienteService $service)
    {
        $this->service = $service;
    }

    public function index()
    {
        $result = $this->service->index();
        return response()->json($result);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name'     => 'required',
            'email'    => 'email|required',
            'password' => 'required',
        ]);

        $result = $this->service->store($request->all());
        return response()->json($result);
    }

    public function update(Request $request, $id)
    {
        $result = $this->service->update($request->all(), $id);
        return response()->json($result);
    }
}
