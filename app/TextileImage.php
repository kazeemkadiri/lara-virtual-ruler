<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class TextileImage extends Model
{
    protected $table = 'textile_image';

    protected $fillable = [
        'name',
        'user_id',
        'scale_unit',
        'scale_value'
    ];

}
