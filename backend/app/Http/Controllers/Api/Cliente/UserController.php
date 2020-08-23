<?php

namespace App\Http\Controllers\Api\Cliente;

use App\Http\Controllers\Controller;
use App\Services\AgentService;
use App\Services\UserService;
use Carbon\Carbon;
use Illuminate\Http\Request;

class UserController extends Controller
{
    private $service;

    public function __construct(UserService $service)
    {
        $this->service = $service;
    }


    public function index()
    {
        return response()->json($this->service->index());
    }
    
}
