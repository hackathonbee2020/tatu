<?php

namespace App\Http\Controllers\Api\Cliente;

use App\Http\Controllers\Controller;
use App\Services\DepartmentService;
use Illuminate\Http\Request;

class DepartmentController extends Controller
{
    private $service;

    public function __construct(DepartmentService $service)
    {
        $this->service = $service;
    }

    public function index(Request $request)
    {
        $request->validate([
            'channel_id' => 'required',
        ]);

        return response()->json($this->service->indexDepartamentos($request->get('channel_id')));
    }

    public function store(Request $request)
    {
        $request->validate([
            'name'       => 'required',
            'cliente_id' => 'required',
            'channel_id' => 'required',
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
