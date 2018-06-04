<?php

namespace App\Exceptions;

class BadRequestException extends HttpException 
{
	static public $_error = 400;
}