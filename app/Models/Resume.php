<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Resume extends Model {

	use HasFactory;

	protected $fillable = array(
		'file_path',
		'original_file_name',
		'user_id',
	);

	public function user() {
		return $this->belongsTo( User::class );
	}
}
