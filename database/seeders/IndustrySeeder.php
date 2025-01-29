<?php

namespace Database\Seeders;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class IndustrySeeder extends Seeder {

	/**
	 * Run the database seeds.
	 */
	public function run(): void {
		$industries = array(
			array( 'name' => 'Accounting' ),
			array( 'name' => 'Advertising' ),
			array( 'name' => 'Aerospace' ),
			array( 'name' => 'Agriculture' ),
			array( 'name' => 'Airline' ),
			array( 'name' => 'Airport' ),
			array( 'name' => 'Alcohol' ),
			array( 'name' => 'Aluminium' ),
			array( 'name' => 'Automotive' ),
			array( 'name' => 'Banking' ),
			array( 'name' => 'Biotechnology' ),
			array( 'name' => 'Broadcasting' ),
			array( 'name' => 'Telecommunications' ),
			array( 'name' => 'Technology' ),
			array( 'name' => 'Finance' ),
			array( 'name' => 'Farming' ),
			array( 'name' => 'Food' ),
			array( 'name' => 'Furniture' ),
			array( 'name' => 'Gaming' ),
		);

		foreach ( $industries as $industry ) {
			DB::table( 'industries' )
						->insert(
							array(
								'name'       => $industry['name'],
								'created_at' => now(),
								'updated_at' => now(),
							)
						);
		}
	}
}
