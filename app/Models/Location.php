<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Concerns\HasUuids;

class Location extends Model {

	use HasFactory;
	use HasUuids;

	protected $fillable = array( 'city', 'state', 'country', 'zone' );

	public function companies(): HasMany {
		return $this->hasMany( Company::class );
	}
}
