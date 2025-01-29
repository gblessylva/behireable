<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Concerns\HasUuids;

class Company extends Model {

	use HasFactory;
	use HasUuids;

	protected $fillable = array( 'name', 'email', 'website', 'description', 'logo' );

	

	public function opportunities(): HasMany {
		return $this->hasMany( Opportunity::class );
	}
}
