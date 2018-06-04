<?php

namespace App\Exceptions;

use Exception;

class HttpException extends Exception 
{
	public function __construct(string $text)
	{
		parent::__construct($text, get_called_class()::$_error);
	}
}