<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Str;

return new class() extends Migration {
	/**
	 * Run the migrations.
	 */
	public function up(): void {
		// if ( ! Schema::hasTable( 'opportunities' ) ) {
			Schema::create(
				'opportunities',
				function ( Blueprint $table ) {
					$table->uuid( 'id' )->primary()->default( Str::uuid() );
					$table->string( 'title' );
					$table->text( 'description' )->nullable();
					$table->foreignId( 'location_id' )->constrained( 'locations' )->onDelete( 'cascade' );
					$table->enum( 'type', array( 'full-time', 'contract', 'freelance' ) );
					$table->enum( 'location_type', array( 'remote', 'hybrid', 'on-site' ) );
					$table->foreignId( 'industry_id' )->constrained( 'industries' )->onDelete( 'cascade' );
					$table->foreignId( 'company_id' )->constrained( 'companies' )->onDelete( 'cascade' );
					$table->decimal( 'salary', 10, 2 )->nullable();
					$table->enum( 'urgency', array( 'immediate', 'soon', 'flexible' ) );
					$table->integer( 'experience' )->comment( 'Years of experience required' );
					$table->timestamps();
				}
			);
		// }
	}

	/**
	 * Reverse the migrations.
	 */
	public function down(): void {
		Schema::dropIfExists( 'opportunities' );
	}
};
