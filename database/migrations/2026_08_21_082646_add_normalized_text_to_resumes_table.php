<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class() extends Migration
{
	public function up(): void {
		Schema::table(
			'resumes',
			function ( Blueprint $table ) {
				$table->longText( 'normalized_text' )
				->nullable()
				->after( 'extracted_text' );
			}
		);
	}

	public function down(): void {
		Schema::table(
			'resumes',
			function ( Blueprint $table ) {
				$table->dropColumn( 'normalized_text' );
			}
		);
	}
};
