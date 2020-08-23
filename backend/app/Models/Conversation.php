<?php

namespace App\Models;

use App\Traits\UuidTrait;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Conversation extends Model
{
    use SoftDeletes, UuidTrait;

    public    $incrementing = false;
    protected $keyType      = 'string';

    protected $table = 'conversations';

    protected $dates = ['deleted_at'];

    protected $fillable = [
        'user_id',
        'conversation_id',
        'user_department_id',
        'agent_id',
        'channel_id',
        'department_id',
        'cliente_id',
        'user_name',
        'user_cpf',
        'user_telefone',
        'user_foto',
        'user_email',
        'status',
        'recent_message'
    ];

    protected $appends = ['statusFormatted'];

    protected static function booted()
    {
        $last_status = array_keys(self::$status);
        $last_status = end($last_status);

        static::addGlobalScope('status', function ($builder) use ($last_status) {
            $builder->where('status', '!=', $last_status);
        });
    }

    public static $status = [
        '01' => 'Esperando Atendimento',
        '02' => 'Em Atendimento',
        '03' => 'Finalizada'
    ];

    public function getStatusFormattedAttribute()
    {
        return [
            'codigo' => $this->status ? $this->status : '01',
            'titulo' => self::$status[$this->status ? $this->status : '01'],
        ];
    }

    public function cliente()
    {
        return $this->belongsTo(Cliente::class);
    }

    public function department()
    {
        return $this->belongsTo(Department::class);
    }

    public function channel()
    {
        return $this->belongsTo(Channel::class);
    }

    public function users()
    {
        return $this->belongsToMany(User::class, 'user_conversation');
    }
}
