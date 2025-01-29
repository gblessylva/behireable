<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class LocationSeeder extends Seeder {

	public function run(): void {
		$locations = array(
			array(
				'city'    => 'New York',
				'state'   => 'NY',
				'zone'    => 'USA',
				'country' => 'USA',
			),
			array(
				'city'    => 'San Francisco',
				'state'   => 'CA',
				'zone'    => 'USA',
				'country' => 'USA',
			),
			array(
				'city'    => 'Toronto',
				'state'   => 'ON',
				'zone'    => 'USA',
				'country' => 'Canada',
			),
			array(
				'city'    => 'London',
				'state'   => null,
				'zone'    => 'EMEA',
				'country' => 'UK',
			),
			array(
				'city'    => 'Berlin',
				'state'   => null,
				'zone'    => 'EMEA',
				'country' => 'Germany',
			),
		);

		foreach ( $locations as $location ) {
			DB::table( 'locations' )->insert(
				array(
					// 'id'         => Str::uuid(),
					'city'       => $location['city'],
					'state'      => $location['state'],
					'zone'       => $location['zone'],
					'country'    => $location['country'],
					'created_at' => now(),
					'updated_at' => now(),
				)
			);
		}
	}
}
