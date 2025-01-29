<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class() extends Migration {
	public function up(): void {
		if ( ! Schema::hasTable( 'companies' ) ) {
			Schema::create(
				'companies',
				function ( Blueprint $table ) {
					$table->id()->primary();
					$table->string( 'name' );
					$table->string( 'website' )->nullable();
					$table->text( 'description' )->nullable();
					$table->string( 'email' )->nullable();
					$table->string( 'logo' )->nullable();
					$table->timestamps();
				}
			);
		}
	}

	public function down(): void {
		Schema::dropIfExists( 'companies' );
	}
};
