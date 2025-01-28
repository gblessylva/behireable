<?php
namespace Database\Seeders;

use App\Models\User\Profile;
use App\Models\User;
use Illuminate\Database\Seeder;

class ProfileSeeder extends Seeder {

	public function run() {
		User::all()->each(
			function ( $user ) {
				Profile::firstOrCreate( array( 'user_id' => $user->id ) );
			}
		);
	}
}
