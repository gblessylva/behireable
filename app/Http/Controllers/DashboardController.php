<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller {

	/**
	 * Display the authenticated user's career dashboard.
	 */
	public function index( Request $request ): Response {
		$user    = $request->user();
		$profile = $user->profile;
		$resume  = $user->resumes()->latest()->first();

		return Inertia::render(
			'Dashboard',
			array(
				'user' => array(
					'name' => $user->name,
				),
				'profile' => array(
					'completed' => (bool) ( $profile?->completed ?? false ),
				),
				'resume' => $resume ? array(
					'id'                => $resume->id,
					'original_file_name' => $resume->original_file_name,
					'created_at'        => $resume->created_at?->toISOString(),
				) : null,
				'onboarding' => array(
					'profileCompleted'     => (bool) ( $profile?->completed ?? false ),
					'resumeUploaded'       => $resume !== null,
					'resumeAnalyzed'       => false,
					'jobMatchesAvailable'  => false,
				),
			)
		);
	}
}
