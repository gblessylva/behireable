<?php

namespace App\Services;

use App\Services\ResumeSectionDetector;
use App\Services\SkillsParser;

class ResumeParser {
	public function __construct(
		protected ResumeSectionDetector $sectionDetector,
		protected SkillsParser $skillsParser,
	) {
	}

	/**
	 * Parse normalized resume text into structured data.
	 */
	public function parse( string $text ): array {
		$sections = $this->sectionDetector->detect( $text );

		return array(
			'personal_information' => array(
				'full_name' => $this->extractName( $text ),
				'email'     => $this->extractEmail( $text ),
				'phone'     => $this->extractPhone( $text ),
				'location'  => null,
				'linkedin'  => $this->extractLinkedIn( $text ),
				'website'   => $this->extractWebsite( $text ),
				'github'    => $this->extractGitHub( $text ),
			),

			'summary'              => $sections['summary'] ?: null,

			'skills'               => $this->skillsParser->parse(
				$sections['skills']
			),

			'experience'           => array(),

			'education'            => array(),

			'certifications'       => array(),

			'projects'             => array(),

			'languages'            => array(),
		);
	}

	/**
	 * Extract an email address.
	 */
	protected function extractEmail( string $text ): ?string {
		preg_match(
			'/[A-Z0-9._%+\-]+@[A-Z0-9.\-]+\.[A-Z]{2,}/i',
			$text,
			$matches
		);

		return $matches[0] ?? null;
	}

	/**
	 * Extract a phone number.
	 *
	 * This intentionally supports common international and local formats
	 * without trying to determine whether the number is valid.
	 */
	protected function extractPhone( string $text ): ?string {
		preg_match(
			'/(?<!\d)(?:\+?\d[\d\s().\-]{7,}\d)(?!\d)/',
			$text,
			$matches
		);

		if ( ! isset( $matches[0] ) ) {
			return null;
		}

		return trim( $matches[0] );
	}

	/**
	 * Extract a LinkedIn profile URL.
	 */
	protected function extractLinkedIn( string $text ): ?string {
		if ( preg_match(
			'/\[[^\]]*linkedin\.com\/in\/[^\]]*\]\((https?:\/\/[^)]+)\)/i',
			$text,
			$matches
		) ) {
			return trim( $matches[1] );
		}

		if ( preg_match(
			'/(?:https?:\/\/)?(?:www\.)?linkedin\.com\/in\/[a-zA-Z0-9\-_%]+/i',
			$text,
			$matches
		) ) {
			return trim( $matches[0] );
		}

		return null;
	}

	/**
	 * Extract a GitHub profile URL.
	 */
	protected function extractGitHub( string $text ): ?string {
		if ( preg_match(
			'/\[[^\]]*github\.com\/[^\]]*\]\((https?:\/\/[^)]+)\)/i',
			$text,
			$matches
		) ) {
			return trim( $matches[1] );
		}

		if ( preg_match(
			'/(?:https?:\/\/)?(?:www\.)?github\.com\/[a-zA-Z0-9\-]+/i',
			$text,
			$matches
		) ) {
			return trim( $matches[0] );
		}

		return null;
	}

	/**
	 * Extract a personal website.
	 */
	protected function extractWebsite( string $text ): ?string {
		preg_match_all(
			'/https?:\/\/[^\s<>"\']+/i',
			$text,
			$matches
		);

		if ( empty( $matches[0] ) ) {
			return null;
		}

		foreach ( $matches[0] as $url ) {
			$cleanUrl = rtrim( $url, '.,;)' );

			if (
				stripos( $cleanUrl, 'linkedin.com' ) === false &&
				stripos( $cleanUrl, 'github.com' ) === false
			) {
				return $cleanUrl;
			}
		}

		return null;
	}

	/**
	 * Extract a likely candidate name.
	 *
	 * We deliberately keep this conservative for now.
	 */
	protected function extractName( string $text ): ?string {
		$lines = preg_split( '/\R/', trim( $text ) );

		if ( ! $lines ) {
			return null;
		}

		foreach ( $lines as $line ) {
			$line = trim( $line );

			if ( $line === '' ) {
				continue;
			}

			// Ignore obvious section headings.
			if ( $this->isSectionHeading( $line ) ) {
				continue;
			}

			// Ignore lines that clearly contain contact information.
			if (
				filter_var( $line, FILTER_VALIDATE_EMAIL ) ||
				preg_match( '/\d{5,}/', $line ) ||
				stripos( $line, 'linkedin.com' ) !== false ||
				stripos( $line, 'github.com' ) !== false
			) {
				continue;
			}

			// Names are normally short and contain alphabetic characters.
			if (
				mb_strlen( $line ) <= 80 &&
				preg_match( '/^[\p{L} .\'-]+$/u', $line ) &&
				preg_match( '/\p{L}/u', $line )
			) {
				return $line;
			}
		}

		return null;
	}

	protected function isSectionHeading( string $line ): bool {
		$line = trim( $line );

		// Remove Markdown heading markers.
		$line = preg_replace( '/^#{1,6}\s*/', '', $line ) ?? $line;

		// Remove trailing punctuation.
		$line = preg_replace( '/[:\-–—]+$/u', '', $line ) ?? $line;

		$headings = array(
			'summary',
			'professional summary',
			'profile',
			'professional profile',
			'skills',
			'technical skills',
			'core skills',
			'key skills',
			'technical expertise',
			'core competencies',
			'experience',
			'work experience',
			'professional experience',
			'work history',
			'career history',
			'employment history',
			'education',
			'educational background',
			'academic background',
			'certifications',
			'professional certifications',
			'projects',
			'personal projects',
			'professional projects',
			'languages',
			'language skills',
			'references',
		);

		return in_array(
			mb_strtolower( trim( $line ) ),
			$headings,
			true
		);
	}
	protected function cleanUrl( string $url ): string {
		// Markdown:
		// [https://example.com](https://example.com)

		if ( preg_match(
			'/\]\((https?:\/\/[^)]+)\)/i',
			$url,
			$matches
		) ) {
			return trim( $matches[1] );
		}

		return trim( $url );
	}
}
