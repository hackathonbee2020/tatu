<?php

namespace App\Http\Controllers\Api\Cliente;

use App\Http\Controllers\Controller;
use App\Services\ConversationService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class ConversationController extends Controller
{
    private $service;

    public function __construct(ConversationService $service)
    {
        $this->service = $service;
    }

    public function index()
    {
        return response()->json($this->service->index());
    }

    public function store(Request $request)
    {
        $request->validate([
            'user_id'         => 'required',
            'user_name'       => 'required',
            'user_telefone'   => 'required',
            'user_cpf'        => 'required',
            'user_email'      => 'required',
            'department_id'   => 'required',
            'channel_id'      => 'required',
            'conversation_id' => 'nullable',
            'cliente_id'      => 'required',
        ]);

        $exists = [
            'conversation_id' => $request->get('conversation_id'),
            'user_cpf'        => $request->get('user_cpf'),
            'user_email'      => $request->get('user_email'),
            'channel_id'      => $request->get('channel_id'),
            'cliente_id'      => $request->get('cliente_id'),
            'department_id'   => $request->get('department_id'),
        ];

        $data = [
            'user_telefone'  => $request->get('user_telefone'),
            'user_name'      => $request->get('user_name'),
            'user_id'        => $request->get('user_id'),
            'recent_message' => $request->get('recent_message'),
        ];

        $result = $this->service->upsert($exists, $data);
        return response()->json($result);
    }

    public function update(Request $request, $id)
    {
        $status = $this->service->getStatusWithJoin(true);

        $data = $request->validate([
            'agente_id'       => 'required',
            'status'          => 'required|in:' . $status,
        ]);

        $result = $this->service->update($data, $id);
        return response()->json($result);
    }

    public function transfer(Request $request)
    {
        $data = $request->validate([
            'agente_id'     => 'required',
            'department_id' => 'required',
        ]);

        $result = $this->service->update($data, $request->get('id'));
        return response()->json($result);
    }
}
