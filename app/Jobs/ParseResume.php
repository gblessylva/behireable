<?php

namespace App\Jobs;

use App\Models\Resume;
use App\Services\ResumeParser;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Throwable;

class ParseResume implements ShouldQueue {

	use Dispatchable;
	use InteractsWithQueue;
	use Queueable;
	use SerializesModels;

	public function __construct(
		public Resume $resume
	) {
	}

	public function handle( ResumeParser $parser ): void {
		$this->resume->update(
			array(
				'parsing_status' => 'processing',
			)
		);

		try {
			$text = $this->resume->normalized_text;

			if ( ! $text ) {
				throw new \RuntimeException(
					'Resume has no normalized text to parse.'
				);
			}

			$parsedData = $parser->parse( $text );

			$this->resume->update(
				array(
					'parsed_data'    => $parsedData,
					'parsing_status' => 'completed',
				)
			);
		} catch ( Throwable $exception ) {
			$this->resume->update(
				array(
					'parsing_status' => 'failed',
				)
			);

			throw $exception;
		}
	}
}
