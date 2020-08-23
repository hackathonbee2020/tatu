<?php

namespace App\Services;

use App\Repositories\UserRepository;
use App\Services\Abstracts\BaseService;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

final class UserService extends BaseService
{
    public function __construct()
    {
        $this->repository = new UserRepository();
    }

    public function uploadAvatarUser($image)
    {
        $image_64  = $image;
        $extension = explode('/', explode(':', substr($image_64, 0, strpos($image_64, ';')))[1])[1];
        $replace   = substr($image_64, 0, strpos($image_64, ',') + 1);
        $image     = str_replace($replace, '', $image_64);
        $image     = str_replace(' ', '+', $image);
        $imageName = 'users/' . Str::random(10) . '.' . $extension;
        Storage::disk('public')->put($imageName, base64_decode($image));
        return $imageName;
    }
}
