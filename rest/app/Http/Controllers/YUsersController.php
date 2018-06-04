<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Exceptions\BadRequestException;
use Illuminate\Database\QueryException;
use Yajra\DataTables\Facades\DataTables;

class YUsersController extends Controller
{
	public function store(Request $request)
	{
		try {
			$validation = User::validate($request->all());
			if ($validation === false) {
				throw new BadRequestException();
			}

			$user = new User($request->all());
			$user->save();

			return $user->toArray();
		} catch (QueryException $exception) {
			throw new BadRequestException($exception->getMessage());
		}
	}

	public function update(Request $request, int $id)
	{
		try {
			$user = User::findOrFail($id);
			if ($request->method() === 'PUT') {
				$validation = User::validate($request->all());
				if ($validation === false) {
					throw new BadRequestException();
				}
			}

			$user->update($request->all());

			return $user->toArray();
		} catch (QueryException $exception) {
			throw new BadRequestException($exception->getMessage());
		}
	}

	public function index(Request $request)
	{
		$model = User::query();
		$request->request->add(['start' => $request->get('page')? $request->get('page') * 10 - 10: 0]);

    	$users = DataTables::eloquent($model);
    	
		$users->filter(function ($query) use ($request) {
			if (null !== $request->get('gender') && !empty($request->get('gender'))) {
				$query->where(['gender' => $request->get('gender')]);
			}
			if (null !== $request->get('birthdate') && !empty($request->get('birthdate'))) {
				$query->where([['birthdate', 'LIKE', $request->get('birthdate')]]);
			}
			if (null !== $request->get('search') && !empty($request->get('search'))) {
				$search = '%'.$request->get('search').'%';
				$query->where(function($aQuery) use ($search) {
					$aQuery->where([['email', 'LIKE', $search]]);
					$aQuery->orWhere([['location', 'LIKE', $search]]);
				});
			}
		})->order(function ($query) use ($request) {
			if (null !== $request->get('orderby') && !empty($request->get('orderby'))) {
				$sort = null !== $request->get('sort') ? 'desc' : 'asc';
				$query->orderBy($request->get('orderby'), $sort);
			}
		});
    	
    	$users->paging();

		$count = User::get($request->all())->count();

		return $users->with([
			'count' 	=> $count,
			'page'		=> $request->get('page')? : 0,
			'per_page'	=> 10,
		])->make(true);
	}

	public function show(Request $request, int $id)
	{
		try {
			$user = User::findOrFail($id);

			return $user->toArray();
		} catch (QueryException $exception) {
			throw new BadRequestException($exception->getMessage());
		}
	}
}