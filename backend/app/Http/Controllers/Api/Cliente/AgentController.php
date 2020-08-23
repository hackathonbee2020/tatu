<?php

namespace App\Http\Controllers\Api\Cliente;

use App\Http\Controllers\Controller;
use App\Services\AgentService;
use Illuminate\Http\Request;

class AgentController extends Controller
{
    private $service;

    public function __construct(AgentService $service)
    {
        $this->service = $service;
    }

    public function index()
    {
        return response()->json($this->service->index());
    }

    public function store(Request $request)
    {
        $user = $request->user();
        \Bouncer::assign('agente')->to($user);
        return response()->json($user);
    }

    public function update(Request $request, $id)
    {
        $result = $this->service->update($request->all(), $id);
        return response()->json($result);
    }
}
