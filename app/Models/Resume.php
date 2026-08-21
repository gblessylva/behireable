<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Resume extends Model {

	use HasFactory;

	protected $fillable = array(
		'user_id',
		'file_path',
		'original_file_name',
		'extraction_status',
		'extracted_text',
		'normalized_text',
		'extraction_error',
		'extracted_at',
		'parsed_data',
	);
	protected $casts    = array(
		'extracted_at' => 'datetime',
		'parsed_data' => 'array',
	);
	public function user() {
		return $this->belongsTo( User::class );
	}
}
