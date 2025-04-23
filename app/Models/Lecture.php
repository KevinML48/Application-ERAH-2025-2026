<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Lecture extends Model
{
    protected $fillable = [
        'title',
        'media_url',
        'description',
        'user_id',
        'published_at',
    ];

    protected $dates = [
        'published_at',
    ];

    // Relation : une lecture appartient à un user
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
