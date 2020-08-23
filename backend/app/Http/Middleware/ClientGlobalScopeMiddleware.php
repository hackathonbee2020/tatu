<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;

class ClientGlobalScopeMiddleware
{
    public function handle(Request $request, Closure $next)
    {
        $cliente_id = $request->get('cliente_id');

        Model::addGlobalScope('cliente_id', function ($builder) use ($cliente_id) {
            $builder->where('cliente_id', $cliente_id);
        });

        return $next($request);
    }
}
