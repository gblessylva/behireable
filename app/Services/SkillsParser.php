<?php

namespace App\Services;

class SkillsParser {

	/**
	 * Known technologies/skills that can be extracted from
	 * competency-style resume statements.
	 */
	protected array $knownSkills = array(
		// Programming languages
		'PHP',
		'JavaScript',
		'TypeScript',
		'Python',
		'Java',
		'C#',
		'C++',
		'Ruby',
		'Go',
		'Rust',

		// Frontend
		'HTML',
		'CSS',
		'SCSS',
		'SASS',
		'React',
		'React JS',
		'Vue',
		'Angular',
		'jQuery',
		'Next.js',
		'NextJS',

		// WordPress
		'WordPress',
		'WooCommerce',
		'Gutenberg',
		'Elementor',
		'WPBakery',

		// Backend/frameworks
		'Laravel',
		'Symfony',
		'Node.js',
		'NodeJS',
		'Express',
		'NestJS',

		// Databases
		'MySQL',
		'PostgreSQL',
		'MongoDB',
		'Redis',

		// Tools
		'Git',
		'GitHub',
		'GitLab',
		'Composer',
		'NPM',
		'Yarn',
		'Docker',

		// APIs / technologies
		'REST API',
		'GraphQL',
		'JWT',
		'AWS',
		'Azure',
		'Google Cloud',
	);

	public function parse( string $text ): array {
		if ( trim( $text ) === '' ) {
			return array();
		}

		$lines = preg_split( '/\R/', $text );

		$skills = array();

		$currentCategory = null;

		foreach ( $lines as $line ) {

			$line = trim( $line );

			if ( $line === '' ) {
				continue;
			}

			/*
			* Detect the category BEFORE removing Markdown list markers.
			*
			* This allows:
			*
			* WordPress:
			*
			* to be treated as a category while:
			*
			* - WordPress
			*
			* remains a skill.
			*/
			$category = $this->detectCategory( $line );

			if ( $category !== null ) {
				$currentCategory = $category;

				/*
				 * If the category has content after the colon:
				 *
				 * WordPress: WordPress, WooCommerce
				 *
				 * parse that content as skills.
				 */
				$parts = preg_split(
					'/:\s*/u',
					$line,
					2
				);

				$line = trim( $parts[1] ?? '' );

				if ( $line === '' ) {
					continue;
				}
			}

			/*
			* Only now remove Markdown list markers.
			*/
			$line = $this->cleanLine( $line );

			if ( $line === '' ) {
				continue;
			}

			$lineSkills = $this->splitSkills( $line );

			if ( $this->looksLikeSentence( $line ) ) {
				$lineSkills = $this->extractKnownSkills( $line );
			}

			foreach ( $lineSkills as $skill ) {
				$skill = $this->cleanSkill( $skill );

				if ( $skill === '' ) {
					continue;
				}

				$skills[] = array(
					'name'     => $skill,
					'category' => $currentCategory,
				);
			}
		}

		return $this->removeDuplicates( $skills );
	}

	protected function cleanLine( string $line ): string {
		$line = trim( $line );

		// Markdown list markers.
		$line = preg_replace(
			'/^[-*•▪◦]+\s*/u',
			'',
			$line
		) ?? $line;

		return trim( $line );
	}

	protected function detectCategory( string $line ): ?string {
		$line = trim( $line );

		/*
		* A category should normally be explicitly followed by a colon.
		*
		* Examples:
		*
		* WordPress:
		* Frontend:
		* Databases:
		* Development Tools:
		*/
		if ( ! preg_match( '/^(.+?):\s*(.*)$/u', $line, $matches ) ) {
			return null;
		}

		$category = trim( $matches[1] );

		if ( ! $this->looksLikeCategory( $category ) ) {
			return null;
		}

		return $category;
	}

	protected function looksLikeCategory( string $value ): bool {
		$normalized = mb_strtolower( trim( $value ) );

		$knownCategories = array(
			'languages',
			'wordpress',
			'backend',
			'frontend',
			'database',
			'databases',
			'development',
			'development tools',
			'tools',
			'package managers',
			'version control',
			'api integration',
			'website operations',
			'cloud platforms',
			'testing',
			'frameworks',
			'libraries',
			'soft skills',
			'technical skills',
			'technical expertise',
			'core competencies',
		);

		return in_array( $normalized, $knownCategories, true );
	}

	protected function splitSkills( string $line ): array {
		return array_values(
			array_filter(
				preg_split(
					'/\s*[,;|]\s*/u',
					$line
				) ?: array(),
				static fn ( $skill ) => trim( $skill ) !== ''
			)
		);
	}

	/**
	 * Determine whether the line is a competency sentence.
	 */
	protected function looksLikeSentence( string $line ): bool {
		$wordCount = preg_match_all( '/\b[\p{L}\d]+\b/u', $line );

		if ( $wordCount === false ) {
			return false;
		}

		return $wordCount > 8;
	}

	/**
	 * Extract explicitly known technologies from a sentence.
	 */
	protected function extractKnownSkills( string $line ): array {
		$found = array();

		/*
		 * Sort longest names first so:
		 *
		 * React JS
		 *
		 * is detected before:
		 *
		 * React
		 */
		$skills = $this->knownSkills;

		usort(
			$skills,
			static fn ( $a, $b ) => mb_strlen( $b ) <=> mb_strlen( $a )
		);

		foreach ( $skills as $skill ) {
			$pattern = '/(?<![\p{L}\d])'
				. preg_quote( $skill, '/' )
				. '(?![\p{L}\d])/iu';

			if ( preg_match( $pattern, $line ) ) {
				$found[] = $skill;
			}
		}

		return $found;
	}

	protected function cleanSkill( string $skill ): string {
		$skill = trim( $skill );

		// Markdown formatting.
		$skill = preg_replace(
			'/\*\*(.*?)\*\*/u',
			'$1',
			$skill
		) ?? $skill;

		$skill = preg_replace(
			'/__(.*?)__/u',
			'$1',
			$skill
		) ?? $skill;

		$skill = preg_replace(
			'/`(.*?)`/u',
			'$1',
			$skill
		) ?? $skill;

		return trim( $skill );
	}

	protected function removeDuplicates( array $skills ): array {
		$seen   = array();
		$result = array();

		foreach ( $skills as $skill ) {
			$key = mb_strtolower( $skill['name'] );

			if ( isset( $seen[ $key ] ) ) {
				continue;
			}

			$seen[ $key ] = true;

			$result[] = $skill;
		}

		return $result;
	}
}
