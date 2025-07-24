<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BlongsTo;

class Task extends Model
{
    protected $fillable =[
        'title',
        'description',
        'is_completed',
        'due_date',
        'list_id'
    ];

    public function list(): belongsTo
    {
        return $this->belongsTo(TaskList::class,'list_id');
    }
}
