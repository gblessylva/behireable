<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;

use App\Models\User\Profile;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable {

	/** @use HasFactory<\Database\Factories\UserFactory> */
	use HasFactory;
	use Notifiable;

	/**
	 * The attributes that are mass assignable.
	 *
	 * @var list<string>
	 */
	protected $fillable = array(
		'name',
		'email',
		'password',
	);

	/**
	 * The attributes that should be hidden for serialization.
	 *
	 * @var list<string>
	 */
	protected $hidden = array(
		'password',
		'remember_token',
	);

	/**
	 * Get the attributes that should be cast.
	 *
	 * @return array<string, string>
	 */
	protected function casts(): array {
		return array(
			'email_verified_at' => 'datetime',
			'password'          => 'hashed',
		);
	}

	/**
	 * Get the resumes for the user.
	 */
	public function resumes() {
		return $this->hasMany( Resume::class );
	}
	/**
	 * Undocumented function
	 *
	 * @return HasOne
	 */
	public function profile(): HasOne {
		return $this->hasOne( Profile::class );
	}
}
