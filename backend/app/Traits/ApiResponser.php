<?php

namespace App\Traits;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Response;

trait ApiResponser
{
    /**
     * @param $data
     * @param int $code
     * @return Response
     */
    public function successResponse($data, int $code = Response::HTTP_OK): Response
    {
        return response($data, $code)->header('Content-Type', 'application/json');
    }

    /**
     * @param $data
     * @param int $code
     * @return JsonResponse
     */
    public function validResponse($data, int $code = Response::HTTP_OK): JsonResponse
    {
        return response()->json(['data' => $data], $code);
    }

    /**
     * @param $data
     * @param int $code
     * @return JsonResponse
     */
    public function errorResponse($data, int $code = Response::HTTP_BAD_REQUEST): JsonResponse
    {
        return response()->json(['error' => $data, 'code' => $code], $code);
    }

    /**
     * @param $message
     * @param int $code
     * @return Response
     */
    public function errorMessage($message, int $code = Response::HTTP_BAD_REQUEST): Response
    {
        return response($message, $code)->header('Content-Type', 'application/json');
    }
}
