<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Str;

class Opportunity extends Model {

	use HasFactory;

	protected $keyType   = 'string';
	public $incrementing = false;

	protected $fillable = array(
		'id',
		'title',
		'description',
		'location_id',
		'type',
		'location_type',
		'industry_id',
		'company_id',
		'salary',
		'urgency',
		'experience',
	);

	protected static function boot() {
		parent::boot();

		static::creating(
			function ( $opportunity ) {
				$opportunity->id = Str::uuid();
			}
		);
	}

	public function location(): BelongsTo {
		return $this->belongsTo( Location::class );
	}

	public function industry(): BelongsTo {
		return $this->belongsTo( Industry::class );
	}

	public function company(): BelongsTo {
		return $this->belongsTo( Company::class );
	}
	public function scopeSearch( Builder $query, $term ) {
		if ( $term ) {
			$query->where( 'title', 'LIKE', "%{$term}%" )
				->orWhere( 'description', 'LIKE', "%{$term}%" )
				->orWhereHas(
					'company',
					function ( $q ) use ( $term ) {
						$q->where( 'name', 'LIKE', "%{$term}%" );
					}
				);
		}
	}
}
