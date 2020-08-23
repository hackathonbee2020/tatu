<?php

namespace App\Traits;

use Ramsey\Uuid\Uuid;

trait UuidTrait
{
    public static function bootUuidTrait()
    {
        static::creating(function ($model) {
            $model->{$model->getKeyName()} = Uuid::uuid4();
        });
    }
}
