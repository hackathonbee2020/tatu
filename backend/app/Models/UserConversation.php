<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\Pivot;

class UserConversation extends Pivot
{
    public $timestamps = false;

    protected $fillable = [
        'user_id',
        'conversation_id'
    ];

    protected $table = 'user_conversation';
}
