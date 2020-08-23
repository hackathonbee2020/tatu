<?php

namespace App\Observers;

use App\Models\User as Model;

class UserObserver
{
    public function creating(Model $model): void
    {
        if ($model->isDirty('password')) {
            $model->password = bcrypt($model->password);
        }
    }
}
