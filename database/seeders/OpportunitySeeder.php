<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class OpportunitySeeder extends Seeder {

	public function run(): void {
		$opportunities = array(
			array(
				'title'         => 'Software Engineer',
				'description'   => 'Develop and maintain web applications using Laravel and React.',
				'location_id'   => DB::table( 'locations' )->inRandomOrder()->value( 'id' ),
				'type'          => 'full-time',
				'location_type' => 'remote',
				'industry_id'   => DB::table( 'industries' )->inRandomOrder()->value( 'id' ),
				'company_id'    => DB::table( 'companies' )->inRandomOrder()->value( 'id' ),
				'salary'        => 85000,
				'urgency'       => 'immediate',  // Changed from 'high'
				'experience'    => 3,  // Changed from '3+ years' to integer
			),
			array(
				'title'         => 'Data Analyst',
				'description'   => 'Analyze and interpret complex datasets to drive business insights.',
				'location_id'   => DB::table( 'locations' )->inRandomOrder()->value( 'id' ),
				'type'          => 'contract',
				'location_type' => 'hybrid',
				'industry_id'   => DB::table( 'industries' )->inRandomOrder()->value( 'id' ),
				'company_id'    => DB::table( 'companies' )->inRandomOrder()->value( 'id' ),
				'salary'        => 65000,
				'urgency'       => 'soon',  // Changed from 'medium'
				'experience'    => 2,  // Changed from '2+ years' to integer
			),
			array(
				'title'         => 'Marketing Manager',
				'description'   => 'Lead marketing campaigns and optimize brand visibility.',
				'location_id'   => DB::table( 'locations' )->inRandomOrder()->value( 'id' ),
				'type'          => 'full-time',
				'location_type' => 'on-site',
				'industry_id'   => DB::table( 'industries' )->inRandomOrder()->value( 'id' ),
				'company_id'    => DB::table( 'companies' )->inRandomOrder()->value( 'id' ),
				'salary'        => 75000,
				'urgency'       => 'flexible',  // Changed from 'low'
				'experience'    => 5,  // Changed from '5+ years' to integer
			),
		);

		foreach ( $opportunities as $opportunity ) {
			DB::table( 'opportunities' )->insert(
				array(
					'id'            => Str::uuid(),
					'title'         => $opportunity['title'],
					'description'   => $opportunity['description'],
					'location_id'   => $opportunity['location_id'],
					'type'          => $opportunity['type'],
					'location_type' => $opportunity['location_type'],
					'industry_id'   => $opportunity['industry_id'],
					'company_id'    => $opportunity['company_id'],
					'salary'        => $opportunity['salary'],
					'urgency'       => $opportunity['urgency'],
					'experience'    => $opportunity['experience'],
					'created_at'    => now(),
					'updated_at'    => now(),
				)
			);
		}
	}
}
