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
				$table->string( 'extraction_status' )
				->default( 'pending' )
				->after( 'original_file_name' );

				$table->longText( 'extracted_text' )
				->nullable()
				->after( 'extraction_status' );

				$table->text( 'extraction_error' )
				->nullable()
				->after( 'extracted_text' );

				$table->timestamp( 'extracted_at' )
				->nullable()
				->after( 'extraction_error' );
			}
		);
	}

	public function down(): void {
		Schema::table(
			'resumes',
			function ( Blueprint $table ) {
				$table->dropColumn(
					array(
						'extraction_status',
						'extracted_text',
						'extraction_error',
						'extracted_at',
					)
				);
			}
		);
	}
};
