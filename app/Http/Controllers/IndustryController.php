<?php

namespace App\Http\Controllers;

use App\Models\Industry;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class IndustryController extends Controller {

	public function index(): Response {
		$industries = Industry::paginate( 10 );
		return Inertia::render( 'Industries/Index', compact( 'industries' ) );
	}

	public function store( Request $request ) {
		$data = $request->validate( array( 'name' => 'required|string|unique:industries,name' ) );
		Industry::create( $data );
		return redirect()->route( 'industries.index' );
	}
}
