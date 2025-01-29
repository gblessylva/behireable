<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Concerns\HasUuids;

class Industry extends Model {

	use HasFactory;
	use HasUuids;

	protected $fillable = array( 'name' );

	public function companies(): HasMany {
		return $this->hasMany( Company::class );
	}
}
