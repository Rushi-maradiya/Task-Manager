<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class TaskList extends Model
{   
         protected $table ='lists';

        protected $fillable =[
        'title',
        'description',
        'user_id'
    ];

    public function tasks(): HasMany
    {
        return $this->HasMany(Task::class);
    }

     public function user(): belongsTo
    {
        return $this->BelongsTo(USer::class);
    }
}
