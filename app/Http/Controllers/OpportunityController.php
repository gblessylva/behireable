<?php

namespace App\Http\Controllers;

use App\Http\Requests\OpportunityRequest;
use App\Models\Opportunity;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class OpportunityController extends Controller {

	/**
	 * Display a listing of opportunities.
	 */
	public function index( Request $request ): Response {
		$search        = $request->query( 'search' );
		$datePost      = $request->query( 'datePost' ); // Date filter
		$jobTypes      = $request->query( 'jobTypes', array() ); // Array of job types
		$locationTypes = $request->query( 'locationType', array() ); // Array of locations
		$salaryMin     = $request->query( 'salaryRange.min' );
		$salaryMax     = $request->query( 'salaryRange.max' );

		$query = Opportunity::with( 'company' );

		// 🔍 Search Query
		if ( $search ) {
			$query->where(
				function ( $q ) use ( $search ) {
					$q->where( 'title', 'LIKE', "%{$search}%" )
					->orWhere( 'description', 'LIKE', "%{$search}%" )
					->orWhereHas(
						'company',
						function ( $q ) use ( $search ) {
							$q->where( 'name', 'LIKE', "%{$search}%" );
						}
					);
				}
			);
		}

		// 📅 Date Filter (Today, Past Week, Past Month)
		if ( $datePost === 'today' ) {
			$query->whereDate( 'created_at', Carbon::today() );
		} elseif ( $datePost === 'week' ) {
			$query->whereBetween( 'created_at', array( Carbon::now()->subWeek(), Carbon::now() ) );
		} elseif ( $datePost === 'month' ) {
			$query->whereBetween( 'created_at', array( Carbon::now()->subMonth(), Carbon::now() ) );
		}

		// 🏢 Job Type Filter
		if ( ! empty( $jobTypes ) ) {
			$query->whereIn( 'type', $jobTypes );
		}

		// 📍 Location Type Filter
		if ( ! empty( $locationTypes ) ) {
			$query->whereIn( 'location_type', $locationTypes );
		}

		// 💰 Salary Range Filter
		if ( $salaryMin !== null && $salaryMax !== null ) {
			$query->whereBetween( 'salary', array( (int) $salaryMin, (int) $salaryMax ) );
		}

		// Fetch Results
		$opportunities = $query->latest()
			->paginate( 10 )
			->withQueryString(); // Preserve query params

		return Inertia::render(
			'Opportunities/Index',
			array(
				'opportunities' => $opportunities,
				'filters'       => array(
					'search'       => $search,
					'datePost'     => $datePost,
					'jobTypes'     => $jobTypes,
					'locationType' => $locationTypes,
					'salaryRange'  => array(
						'min' => $salaryMin,
						'max' => $salaryMax,
					),
				),
			)
		);
	}


	/**
	 * Show the form for creating a new opportunity.
	 */
	public function create(): Response {
		return Inertia::render( 'Opportunities/Create' );
	}

	/**
	 * Store a newly created opportunity.
	 */
	public function store( OpportunityRequest $request ) {
		Opportunity::create( $request->validated() );

		return redirect()->route( 'opportunities.index' )->with( 'success', 'Opportunity created successfully.' );
	}

	/**
	 * Display the specified opportunity.
	 */
	public function show( Opportunity $opportunity ): Response {
		return Inertia::render(
			'Opportunities/Show',
			array(
				'opportunity' => $opportunity->load( array( 'company', 'industry', 'location' ) ),
			)
		);
	}

	/**
	 * Show the form for editing the specified opportunity.
	 */
	public function edit( Opportunity $opportunity ): Response {
		return Inertia::render(
			'Opportunities/Edit',
			array(
				'opportunity' => $opportunity,
			)
		);
	}

	/**
	 * Update the specified opportunity.
	 */
	public function update( OpportunityRequest $request, Opportunity $opportunity ) {
		$opportunity->update( $request->validated() );

		return redirect()->route( 'opportunities.index' )->with( 'success', 'Opportunity updated successfully.' );
	}

	/**
	 * Remove the specified opportunity.
	 */
	public function destroy( Opportunity $opportunity ) {
		$opportunity->delete();

		return redirect()->route( 'opportunities.index' )->with( 'success', 'Opportunity deleted successfully.' );
	}
}
