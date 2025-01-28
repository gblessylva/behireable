<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\User\ResumeController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
Route::get(
	'/',
	function () {
		return Inertia::render(
			'Welcome',
			array(
				'canLogin'       => Route::has( 'login' ),
				'canRegister'    => Route::has( 'register' ),
				'laravelVersion' => Application::VERSION,
				'phpVersion'     => PHP_VERSION,
			)
		);
	}
);

Route::get(
	'/dashboard',
	function () {
		return Inertia::render( 'Dashboard' );
	}
)->middleware( array( 'auth', 'verified' ) )->name( 'dashboard' );

/**
 * Resume Routes
 */

Route::middleware( array( 'auth' ) )->group(
	function () {
		Route::post( '/resume/upload', array( ResumeController::class, 'store' ) )->name( 'resume.upload' );
		Route::get( 'dashboard/resume/add-new', array( ResumeController::class, 'show' ) )->name( 'resume.new' );
		Route::get( 'dashboard/resumes', array( ResumeController::class, 'index' ) )->name( 'resumes' );
		Route::delete( '/resume/{id}', array( ResumeController::class, 'destroy' ) )->name( 'resume.destroy' );
	}
);

Route::middleware( 'auth' )->group(
	function () {
		Route::get( '/profile', array( ProfileController::class, 'edit' ) )->name( 'profile.edit' );
		Route::patch( '/profile', array( ProfileController::class, 'update' ) )->name( 'profile.update' );
		Route::delete( '/profile', array( ProfileController::class, 'destroy' ) )->name( 'profile.destroy' );

		Route::get( '/profile/setup', array( ProfileController::class, 'setup' ) )->name( 'profile.setup' );
		Route::post( '/profile/setup/{step}', array( ProfileController::class, 'saveStep' ) )->name( 'profile.setup.saveStep' );
	}
);

require __DIR__ . '/auth.php';
