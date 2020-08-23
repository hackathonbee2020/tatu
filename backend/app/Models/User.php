<?php

namespace App\Models;

use App\Traits\UuidTrait;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Passport\HasApiTokens;
use Silber\Bouncer\Database\HasRolesAndAbilities;

class User extends Authenticatable
{
    use Notifiable, HasApiTokens, SoftDeletes, UuidTrait, HasRolesAndAbilities;

    public    $incrementing = false;
    protected $keyType      = 'string';
    protected $casts        = [
        'id'                => 'string',
        'email_verified_at' => 'datetime',
    ];

    protected $fillable = [
        'name',
        'email',
        'password',
        'avatar'
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    public function clientes()
    {
        return $this->belongsToMany(Cliente::class, 'cliente_user');
    }

    public function conversations()
    {
        return $this->belongsToMany(Conversation::class, 'user_conversation');
    }

    public function channels()
    {
        return $this->hasManyThrough(Channel::class, Department::class);
    }
}
