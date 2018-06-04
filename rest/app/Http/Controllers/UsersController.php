<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Exceptions\BadRequestException;
use Illuminate\Database\QueryException;

class UsersController extends Controller
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
		$users = User::get($request->all());

		return $users->paginate();
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