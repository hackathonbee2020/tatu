<?php

namespace App\Models;

use App\Traits\UuidTrait;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Department extends Model
{
    use SoftDeletes, UuidTrait;

    public    $incrementing = false;
    protected $keyType      = 'string';

    protected $table = 'departments';

    protected $dates = ['deleted_at'];

    protected $fillable = [
        'name',
        'status',
        'cliente_id',
        'channel_id',
    ];

    public function cliente()
    {
        return $this->belongsTo(Cliente::class);
    }

    public function channel()
    {
        return $this->belongsTo(Channel::class);
    }

    public function conversations()
    {
        return $this->hasMany(Conversation::class);
    }
}
