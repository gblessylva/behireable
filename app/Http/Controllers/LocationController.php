<?php

namespace App\Http\Controllers;

use App\Models\Location;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class LocationController extends Controller {

	public function index(): Response {
		$locations = Location::paginate( 10 );
		return Inertia::render( 'Locations/Index', compact( 'locations' ) );
	}

	public function store( Request $request ) {
		$data = $request->validate(
			array(
				'city'    => 'required|string',
				'state'   => 'nullable|string',
				'country' => 'required|string',
                'zone'    => 'nullable|string',
			)
		);

		Location::create( $data );
		return redirect()->route( 'locations.index' );
	}
}
