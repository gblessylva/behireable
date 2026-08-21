<?php

namespace App\Jobs;

use App\Models\Resume;
use App\Services\ResumeTextExtractor;
use App\Services\ResumeTextNormalizer;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Support\Facades\Storage;
use Throwable;

use function Laravel\Prompts\error;

class ExtractResumeText implements ShouldQueue {

	use Queueable;

	public function __construct(
		public Resume $resume
	) {
	}

	public function handle(
		ResumeTextExtractor $extractor,
		ResumeTextNormalizer $normalizer
	): void {
		$this->resume->update(
			array(
				'extraction_status' => 'processing',
				'extraction_error'  => null,
				'extracted_text'    => null,
				'normalized_text'   => null,
				'extracted_at'      => null,
			)
		);

		try {
			$extension = pathinfo(
				$this->resume->original_file_name,
				PATHINFO_EXTENSION
			);

			$absolutePath = Storage::disk( 'public' )
				->path( $this->resume->file_path );

			$text = $extractor->extract(
				$absolutePath,
				$extension
			);

			if ( trim( $text ) === '' ) {
				throw new \RuntimeException(
					'No readable text could be extracted from this resume.'
				);
			}

			$normalizedText = $normalizer->normalize( $text );

			if ( $normalizedText === '' ) {
				throw new \RuntimeException(
					'Resume text could not be normalized.'
				);
			}

			$this->resume->update(
				array(
					'extraction_status' => 'completed',
					'extracted_text'    => $text,
					'normalized_text'   => $normalizedText,
					'extracted_at'      => now(),
					'extraction_error'  => null,
				)
			);
		} catch ( Throwable $exception ) {
			$this->resume->update(
				array(
					'extraction_status' => 'failed',
					'extraction_error'  => $exception->getMessage(),
				)
			);

			throw $exception;
		}
	}
}
