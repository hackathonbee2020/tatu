<?php

namespace App\Models;

use App\Traits\UuidTrait;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Cliente extends Model
{
    use SoftDeletes, UuidTrait;

    public    $incrementing = false;
    protected $keyType      = 'string';

    protected $table = 'clientes';

    protected $dates = ['deleted_at'];

    protected $fillable = [
        'name',
    ];

    public function channel()
    {
        return $this->hasMany(Channel::class);
    }

    public function users()
    {
        return $this->belongsToMany(User::class, 'cliente_user');
    }
}
