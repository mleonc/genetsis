<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Exceptions\BadRequestException;
use Illuminate\Database\QueryException;

class GendersController extends Controller
{
	public function store(Request $request)
	{
		throw new BadRequestException('Unsupported');
	}

	public function update(Request $request, int $id)
	{
		throw new BadRequestException('Unsupported');
	}

	public function index(Request $request)
	{
		$genders = User::select('gender')->distinct('gender');

		return $genders->get();
	}

	public function show(Request $request, int $id)
	{
		throw new BadRequestException('Unsupported');
	}
}