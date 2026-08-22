<?php

namespace App\Services;

class ResumeSectionDetector {

	/**
	 * Detect the major sections of a resume.
	 *
	 * Returns the raw text belonging to each recognized section.
	 */
	public function detect( string $text ): array {
		$lines = preg_split( '/\R/', $text );

		$sections = array(
			'summary'        => '',
			'skills'         => '',
			'experience'     => '',
			'education'      => '',
			'certifications' => '',
			'projects'       => '',
			'languages'      => '',
		);

		$currentSection = null;

		foreach ( $lines as $line ) {
			$line = trim( $line );

			if ( $line === '' ) {
				if ( $currentSection !== null ) {
					$sections[ $currentSection ] .= "\n";
				}

				continue;
			}

			$detectedSection = $this->detectSection( $line );

			if ( $detectedSection !== null ) {
				$currentSection = $detectedSection;

				continue;
			}

			if ( $currentSection !== null ) {
				$sections[ $currentSection ] .= $line . "\n";
			}
		}

		return array_map(
			static fn ( string $section ): string => trim( $section ),
			$sections
		);
	}

	/**
	 * Determine whether a line represents a known resume section.
	 */
	protected function detectSection( string $line ): ?string {
		$normalized = $this->normalizeHeading( $line );

		foreach ( $this->sectionHeadings() as $section => $headings ) {
			if ( in_array( $normalized, $headings, true ) ) {
				return $section;
			}
		}

		return null;
	}

	/**
	 * Normalize headings before matching them.
	 */
	protected function normalizeHeading( string $heading ): string {
		$heading = trim( $heading );

		/*
		* Remove Markdown heading markers.
		*
		* Examples:
		*
		* # Skills
		* ## Skills
		* ### Professional Experience
		*/
		$heading = preg_replace( '/^#{1,6}\s*/', '', $heading ) ?? $heading;

		/*
		* Remove common heading punctuation.
		*/
		$heading = preg_replace(
			'/[:\-–—]+$/u',
			'',
			$heading
		) ?? $heading;

		/*
		* Collapse whitespace.
		*/
		$heading = preg_replace(
			'/\s+/u',
			' ',
			$heading
		) ?? $heading;

		/*
		* Compare headings case-insensitively.
		*/
		return mb_strtolower( trim( $heading ) );
	}

	/**
	 * Known variations of common resume section headings.
	 */
	protected function sectionHeadings(): array {
		return array(
			'summary'        => array(
				'summary',
				'professional summary',
				'career summary',
				'professional profile',
				'profile',
				'career profile',
				'about me',
				'about',
				'objective',
				'career objective',
				'professional objective',
			),

			'skills'         => array(
				'skills',
				'technical skills',
				'core skills',
				'key skills',
				'professional skills',
				'technical expertise',
				'core competencies',
				'competencies',
				'areas of expertise',
				'areas of expertise and skills',
			),

			'experience'     => array(
				'experience',
				'work experience',
				'professional experience',
				'employment history',
				'work history',
				'career history',
				'professional history',
				'employment experience',
			),

			'education'      => array(
				'education',
				'educational background',
				'educational qualifications',
				'academic background',
				'academic qualifications',
				'academic history',
			),

			'certifications' => array(
				'certifications',
				'certificates',
				'professional certifications',
				'licenses and certifications',
				'licenses & certifications',
				'certification',
			),

			'projects'       => array(
				'projects',
				'personal projects',
				'professional projects',
				'key projects',
				'selected projects',
				'project experience',
			),

			'languages'      => array(
				'languages',
				'language skills',
				'languages spoken',
			),
		);
	}
}
