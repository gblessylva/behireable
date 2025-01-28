<?php

namespace App\Models\User;

use App\Models\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Profile extends Model {

	protected $fillable = array(
		'user_id',
		'basic_information',
		'skills',
		'experience',
		'education',
		'preferences',
		'summary',
        'completed',
		'social_profiles',
	);

	protected $casts = array(
		'basic_information' => 'array',
		'skills'            => 'array',
		'experience'        => 'array',
		'education'         => 'array',
		'preferences'       => 'array',
		'summary'           => 'array',
		'social_profiles'   => 'array',
        'completed'         => 'boolean',
	);

	public function user(): BelongsTo {
		return $this->belongsTo( User::class );
	}
}
