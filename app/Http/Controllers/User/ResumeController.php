<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use App\Models\Resume;
use Inertia\Inertia;

class ResumeController extends Controller {

	public function store( Request $request ) {
		$validated = $request->validate(
			array(
				'resume' => 'required|mimes:pdf,doc,docx|max:2048',
			)
		);

		$user         = auth()->user();
		$path         = $request->file( 'resume' )->store( 'resumes/' . $user->id, 'public' );
		$originalName = $request->file( 'resume' )->getClientOriginalName();

		$resume = $user->resumes()->create(
			array(
				'file_path'          => $path,
				'original_file_name' => $originalName,
			)
		);

		return back()->with( 'success', 'Resume uploaded successfully!' );
	}

	public function index() {
		$resumes = auth()->user()->resumes()->latest()->get();

		return Inertia::render(
			'User/Resume',
			array(
				'resumes' => $resumes,
			)
		);
	}

	// Get Resume for Add New
	public function show( ) {
		$resumes = auth()->user()->resumes()->latest()->get();
		return Inertia::render(
			'User/Builder',
			array(
				'resumes' => $resumes,
			)
		);

	}

	public function destroy( $id ) {
		$resume = auth()->user()->resumes()->findOrFail( $id );

		Storage::disk( 'public' )->delete( $resume->file_path );
		$resume->delete();

		return back()->with( 'success', 'Resume deleted successfully!' );
	}
}
