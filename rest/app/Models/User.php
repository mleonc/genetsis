<?php

namespace App\Models;

use App\Models\Base\BaseUser;
use Illuminate\Validation\Rule;

class User extends BaseUser
{
	static protected $public = [
		'email', 
        'birthdate',
        'gender',
        'location',
	];

	static protected $rules = [
		'email'		=> 'required|email|unique:users,email',
		'birthdate'	=> 'required|date',
		'gender' 	=> 'required|in:f,m',
		'location'	=> 'required|string',
	];

	public function __construct(Array $user = [])
    {
        if (!empty($user)) {
        	$this->setEmail($user['email']);
        	$this->setBirthdate($user['birthdate']);
        	$this->setGender($user['gender']);
        	$this->setLocation($user['location']);
        }
    }

    public function toArray()
    {
    	return [
    		'id'		=> $this->getKey(),
    		'email'		=> $this->getEmail(),
    		'birthdate'	=> $this->getBirthdate(),
    		'gender'	=> $this->getGender(),
    		'location'	=> $this->getLocation(),
    	];
    }

    static public function get($params)
    {
        $users = User::select('*');
        if (isset($params['birthdate']) && !empty($params['birthdate'])) {
            $search = '%' . $params['birthdate'] . '%';
            $users->where([['birthdate', 'LIKE', $search]]);
        }
        if (isset($params['gender']) && !empty($params['gender'])) {
            $search = $params['gender'];
            $users->where(['gender' => $search]);
        }
        if (isset($params['search']) && !empty($params['search'])) {
            $search = '%'.$params['search'].'%';
            $users->where(function($query) use ($search) {
                $query->where([['email', 'LIKE', $search]]);
                $query->orWhere([['location', 'LIKE', $search]]);
            });
        }
        if (isset($params['orderby']) && !empty($params['orderby']) && in_array($params['orderby'], self::$public)) {
            $sort = (isset($params['sort']) && !empty($params['sort'])) ? $params['sort'] : 'asc';
            $users->orderBy($params['orderby'], $sort);
        }

        return $users;
    }
}
