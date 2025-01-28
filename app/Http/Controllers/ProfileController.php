<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use App\Models\User\Profile;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class ProfileController extends Controller {

	/**
	 * Display the user's profile form.
	 */
	public function edit( Request $request ): Response {
		return Inertia::render(
			'Profile/Edit',
			array(
				'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
				'status'          => session( 'status' ),
			)
		);
	}

	/**
	 * Update the user's profile information.
	 */
	public function update( ProfileUpdateRequest $request ): RedirectResponse {
		$user = $request->user();
		$user->fill( $request->validated() );

		if ( $user->isDirty( 'email' ) ) {
			$user->email_verified_at = null;
		}

		$user->save();

		return Redirect::route( 'profile.edit' );
	}

	/**
	 * Delete the user's account.
	 */
	public function destroy( Request $request ): RedirectResponse {
		$request->validate(
			array(
				'password' => array( 'required', 'current_password' ),
			)
		);

		$user = $request->user();

		Auth::logout();

		$user->delete();

		$request->session()->invalidate();
		$request->session()->regenerateToken();

		return Redirect::to( '/' );
	}

	/**
	 * Display the user's profile setup form.
	 */
	public function setup(): Response {
		return Inertia::render(
			'Profile/Setup',
			array(
				'steps' => array(
					'Basic Information',
					'Skills & Expertise',
					'Work Experience',
					'Education',
					'Career Preferences',
					'Profile Photo & Summary',
					'Review',
				),
				'user'  => Auth::user()->load( 'profile' ),
			)
		);
	}

	/**
	 * Save a step in the profile setup process.
	 *
	 * @param Request $request
	 * @param string  $step
	 */
	public function saveStep( Request $request, $step ) {
		$user = $request->user();

		// Find or create the profile for the authenticated user.
		$profile = Profile::firstOrCreate(
			array( 'user_id' => $user->id ),
			array(
				'basic_information' => null,
				'experience'        => null,
				'skills'            => null,
				'education'         => null,
				'preferences'       => null,
				'summary'           => null,
			)
		);

		// Handle step-specific data saving.
		switch ( $step ) {
			case 'basic-information': // Basic Information.
				$validated                  = $request->validate(
					array(
						'phone'    => 'required|string|max:255',
						'location' => 'required|string|max:255',
						'bio'      => 'required|string|max:1055',
					)
				);
				$profile->basic_information = $validated;
				break;
			case 'experience':
				$validated           = $request->validate(
					array(
						'title'            => 'required|string|max:255',
						'experience_years' => 'nullable|string',
						'industry'         => 'nullable|string',
					)
				);
				$profile->experience = $validated;
				break;
			case 'skills':
				$validated = $request->validate(
					array(
						'skills' => 'required|array',

					)
				);
				$profile->skills = $validated;
				break;

			case 'social_profiles': // Social Profiles
				$validated                = $request->validate(
					array(
						'linkedin' => 'nullable|string',
						'github'   => 'nullable|string',
						'twitter'  => 'nullable|string',
					)
				);
				$profile->social_profiles = $validated;
				break;

			case 'preferences': // Skills & Preferences.
				$validated = $request->validate(
					array(
						'preferences'        => 'required|array',
						'salary_expectation' => 'nullable|integer',

					)
				);

				$profile->preferences = $validated;
				break;

			case 'education':
				$validated          = $request->validate(
					array(
						'education' => 'required|array',
					)
				);
				$profile->education = $validated;
				break;
			case 'completed':
				$profile->completed = true;
				break;
			default:
				return response()->json(
					array(
						'error' => 'Invalid step',
						$step,
					),
					400
				);
		}

		// Save the updated profile.
		if ( ! $profile->save() ) {
			return response()->json(
				array(
					'error' => 'Failed to save profile details',
				),
				500
			);
		}
		$profile->save();

		return redirect()->back()->with( 'success', ucfirst( str_replace( '-', ' ', $step ) ) . ' saved successfully.' );
	}
}
