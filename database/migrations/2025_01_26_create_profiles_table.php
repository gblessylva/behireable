<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class ProfilesTable extends Migration {

	public function up() {
		Schema::create(
			'profiles',
			function ( Blueprint $table ) {
				$table->id();
				$table->foreignId( 'user_id' )->constrained()->onDelete( 'cascade' );
				$table->json( 'basic_information' )->nullable();
				$table->json( 'skills' )->nullable();
				$table->json( 'experience' )->nullable();
				$table->json( 'education' )->nullable();
				$table->json( 'preferences' )->nullable();
				$table->string( 'summary' )->nullable();
				$table->string( 'social_profiles' )->nullable();
				$table->boolean( 'completed' )->default( false );
				$table->timestamps();
			}
		);
	}

	public function down() {
		Schema::dropIfExists( 'profiles' );
	}
}
