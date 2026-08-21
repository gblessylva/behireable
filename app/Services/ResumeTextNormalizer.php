<?php

namespace App\Services;

class ResumeTextNormalizer {

	public function normalize( string $text ): string {
		$text = $this->normalizeLineEndings( $text );

		$text = $this->removeControlCharacters( $text );

		$text = $this->normalizeWhitespace( $text );

		return trim( $text );
	}

	/**
	 * Convert different line-ending formats into Unix-style line endings.
	 */
	protected function normalizeLineEndings( string $text ): string {
		return str_replace(
			array( "\r\n", "\r" ),
			"\n",
			$text
		);
	}

	/**
	 * Remove invisible control characters while preserving
	 * new lines and tabs.
	 */
	protected function removeControlCharacters( string $text ): string {
		return preg_replace(
			'/[^\P{C}\n\t]/u',
			'',
			$text
		) ?? $text;
	}

	/**
	 * Normalize spaces and excessive blank lines.
	 *
	 * We deliberately do NOT join separate lines here.
	 * Line boundaries may represent resume structure.
	 */
	protected function normalizeWhitespace( string $text ): string {
		// Convert repeated spaces/tabs into a single space.
		$text = preg_replace(
			'/[ \t]+/',
			' ',
			$text
		) ?? $text;

		// Remove spaces at the beginning/end of lines.
		$text = preg_replace(
			'/^[ \t]+|[ \t]+$/m',
			'',
			$text
		) ?? $text;

		// Maximum of two consecutive newlines.
		$text = preg_replace(
			"/\n{3,}/",
			"\n\n",
			$text
		) ?? $text;

		return $text;
	}
}
