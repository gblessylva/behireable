<?php

namespace App\Http\Controllers;

use App\Models\User\Profile;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProfileController extends Controller {

	/**
	 * Display the user's profile.
	 */
	public function edit( Request $request ) {
		$profile = $request->user()->profile;

		return Inertia::render(
			'Profile/Edit',
			array(
				'profile' => $profile,
			)
		);
	}

	private function isProfileComplete( Profile $profile ): bool {
		return ! empty( $profile->basic_information )
		&& ! empty( $profile->experience )
		&& ! empty( $profile->skills )
		&& ! empty( $profile->preferences );
	}

	/**
	 * Update the user's profile.
	 */
	public function update( Request $request ) {
		$request->validate(
			array(
				'basic_information' => array( 'nullable', 'array' ),
				'skills'            => array( 'nullable', 'array' ),
				'experience'        => array( 'nullable', 'array' ),
				'education'         => array( 'nullable', 'array' ),
				'preferences'       => array( 'nullable', 'array' ),
				'summary'           => array( 'nullable', 'array' ),
				'social_profiles'   => array( 'nullable', 'array' ),
			)
		);

		$profile = Profile::updateOrCreate(
			array(
				'user_id' => $request->user()->id,
			),
			array(
				'basic_information' => $request->input( 'basic_information', array() ),
				'skills'            => $request->input( 'skills', array() ),
				'experience'        => $request->input( 'experience', array() ),
				'education'         => $request->input( 'education', array() ),
				'preferences'       => $request->input( 'preferences', array() ),
				'summary'           => $request->input( 'summary', array() ),
				'social_profiles'   => $request->input( 'social_profiles', array() ),
			)
		);

		return redirect()
			->route( 'profile.edit' )
			->with( 'success', 'Profile updated successfully.' );
	}

	/**
	 * Display the profile setup wizard.
	 */
	public function setup( Request $request ) {
		$profile = $request->user()->profile;

		return Inertia::render(
			'Profile/Setup',
			array(
				'profile' => $profile,
				'steps'   => array(
					'basic-information',
					'professional-details',
					'skills',
					'preferences',
					'education',
					'social-profiles',
				),
			)
		);
	}

	/**
	 * Save an individual profile setup step.
	 */
	public function saveStep( Request $request, string $step ) {
		$profile = Profile::firstOrCreate(
			array(
				'user_id' => $request->user()->id,
			)
		);

		$step_map = array(
			'basic-information'    => 'basic_information',
			'professional-details' => 'experience',
			'skills'               => 'skills',
			'preferences'          => 'preferences',
			'education'            => 'education',
			'social-profiles'      => 'social_profiles',
		);

		if ( ! array_key_exists( $step, $step_map ) ) {
			abort( 404 );
		}

		$profile_field = $step_map[ $step ];

		$data = $request->input( 'data', array() );

		if (
		is_array( $data ) &&
		array_key_exists( $profile_field, $data )
		) {
			$profile->$profile_field = $data[ $profile_field ];
		} else {
			$profile->$profile_field = $data;
		}

		$profile->save();

		return back()->with(
			'success',
			'Step saved successfully.'
		);
	}


	/**
	 * Mark profile setup as completed.
	 */
	public function complete( Request $request ) {
		$profile = Profile::firstOrCreate(
			array(
				'user_id' => $request->user()->id,
			)
		);

		if ( ! $this->isProfileComplete( $profile ) ) {
			return back()->with(
				'error',
				'Please complete the required profile sections before continuing.'
			);
		}

		$profile->completed = true;
		$profile->save();

		return redirect()
		->route( 'dashboard' )
		->with(
			'success',
			'Your profile has been completed.'
		);
	}
}
