<?php

namespace App\Models\Base;

class BaseUser extends BaseModel
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'email', 
        'birthdate',
        'gender',
        'location',
    ];

    public function getEmail() 
    {
        return $this->email;
    }

    public function getBirthdate() 
    {
        return $this->birthdate;
    }

    public function getGender() 
    {
        return $this->gender;
    }

    public function getLocation() 
    {
        return $this->location;
    }

    public function setEmail($value) 
    {
        $this->email = $value;
        return $this;
    }

    public function setBirthdate($value) 
    {
        $this->birthdate = $value;
        return $this;
    }

    public function setGender($value) 
    {
        $this->gender = $value;
        return $this;
    }

    public function setLocation($value) 
    {
        $this->location = $value;
        return $this;
    }
}
