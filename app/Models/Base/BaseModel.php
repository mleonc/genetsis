<?php

namespace App\Models\Base;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Validator;

class BaseModel extends Model
{
    static public function validate(Array $data)
    {
        $validator = Validator::make($data, get_called_class()::$rules);
        return !$validator->fails();
    }
}
