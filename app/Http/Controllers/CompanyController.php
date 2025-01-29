<?php

namespace App\Http\Controllers;

use App\Models\Company;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class CompanyController extends Controller {

	public function index(): Response {
		$companies = Company::with( array( 'industry', 'location' ) )->paginate( 10 );
		return Inertia::render( 'Companies/Index', compact( 'companies' ) );
	}

	public function create(): Response {
		return Inertia::render( 'Companies/Create' );
	}

	public function store( Request $request ) {
		$data = $request->validate(
			array(
				'name'        => 'required|string|max:255',
				'industry_id' => 'required|exists:industries,id',
				'location_id' => 'nullable|exists:locations,id',
				'website'     => 'nullable|url',
				'description' => 'nullable|string',
				'logo'        => 'nullable|string',
			)
		);

		Company::create( $data );
		return redirect()->route( 'companies.index' );
	}
}
