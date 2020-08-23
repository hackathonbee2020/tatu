<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\Pivot;

class ClienteUser extends Pivot
{
    public    $timestamps = false;
    protected $fillable   = ['cliente_id', 'user_id'];
    protected $table      = 'cliente_user';
}
