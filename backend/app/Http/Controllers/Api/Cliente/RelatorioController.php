<?php

namespace App\Http\Controllers\Api\Cliente;

use App\Http\Controllers\Controller;
use App\Models\Conversation;
use App\Models\Department;
use App\Models\User;
use Illuminate\Support\Facades\DB;

class RelatorioController extends Controller
{
    public function status()
    {
        $conversations = DB::table('conversations')->select('status', DB::raw('count(id) as quantidade'))->groupBy('status')->get();

        foreach ($conversations as $index => $conversation) {
            $conversation->status_name = Conversation::$status[$conversation->status];
        }

        $agente = User::whereIs('agente')->count();

        return [
            'conversations' => $conversations,
            'agentes'       => $agente,
        ];
    }

    public function top()
    {

        $agentes = User::whereIs('agente')->withCount('conversations')
            ->orderBy('conversations_count', 'desc')
            ->limit(3)
            ->get();

        return $agentes;

    }

    public function departamentos()
    {
        return Department::withCount('conversations')->get();
    }

    public function conversations()
    {
        return DB::table('conversations')
            ->selectRaw('count(*) as total, date_format(created_at, "%d/%m/%Y") as day')
            ->groupBy('day')
            ->orderByRaw('date_format(day, "%Y-%m-%d")')
            ->get();
    }
}
