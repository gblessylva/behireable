<?php

namespace App\Services;

class SkillsParser {

	/**
	 * Parse a resume skills section.
	 *
	 * Returns:
	 *
	 * [
	 *     [
	 *         'name' => 'PHP',
	 *         'category' => 'Languages',
	 *     ],
	 * ]
	 */
	public function parse( string $text ): array {
		if ( trim( $text ) === '' ) {
			return array();
		}

		$lines = preg_split( '/\R/', $text );

		$skills = array();

		$currentCategory = null;

		foreach ( $lines as $line ) {
			$line = $this->cleanLine( $line );

			if ( $line === '' ) {
				continue;
			}

			/*
			 * Detect category-style lines such as:
			 *
			 * Languages:
			 * WordPress Development:
			 * Backend Development:
			 * Development Tools
			 */
			$category = $this->detectCategory( $line );

			if ( $category !== null ) {
				$currentCategory = $category;

				continue;
			}

			/*
			 * A line may contain multiple comma/semicolon separated skills.
			 */
			$lineSkills = $this->splitSkills( $line );

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

		/*
		 * Remove common Markdown list markers.
		 */
		$line = preg_replace( '/^[-*•▪◦]+\s*/u', '', $line ) ?? $line;

		return trim( $line );
	}

	/**
	 * Detect whether a line is a skill category.
	 */
	protected function detectCategory( string $line ): ?string {
		$line = trim( $line );

		/*
		 * Explicit category syntax:
		 *
		 * Languages:
		 * Backend Development:
		 */
		if ( preg_match( '/^(.+?):\s*$/u', $line, $matches ) ) {
			$category = trim( $matches[1] );

			if ( $this->looksLikeCategory( $category ) ) {
				return $category;
			}
		}

		/*
		 * Known category names without a colon.
		 */
		$normalized = mb_strtolower( $line );

		$knownCategories = array(
			'languages',
			'wordpress',
			'wordpress development',
			'backend development',
			'frontend development',
			'frontend',
			'backend',
			'databases',
			'database',
			'development tools',
			'tools',
			'development tools & package managers',
			'build tools & package managers',
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

		if ( in_array( $normalized, $knownCategories, true ) ) {
			return $line;
		}

		return null;
	}

	protected function looksLikeCategory( string $value ): bool {
		$normalized = mb_strtolower( trim( $value ) );

		$knownKeywords = array(
			'language',
			'wordpress',
			'backend',
			'frontend',
			'database',
			'development',
			'tool',
			'package',
			'version control',
			'api',
			'website',
			'cloud',
			'testing',
			'framework',
			'library',
			'competenc',
			'expertise',
			'soft skill',
		);

		foreach ( $knownKeywords as $keyword ) {
			if ( str_contains( $normalized, $keyword ) ) {
				return true;
			}
		}

		return false;
	}

	/**
	 * Split a line containing multiple skills.
	 */
	protected function splitSkills( string $line ): array {
		/*
		 * Don't split on commas inside parentheses.
		 */
		$skills = preg_split(
			'/\s*[,;|]\s*/u',
			$line
		);

		return array_values(
			array_filter(
				$skills ?: array(),
				static fn ( $skill ) => trim( $skill ) !== ''
			)
		);
	}

	protected function cleanSkill( string $skill ): string {
		$skill = trim( $skill );

		/*
		 * Remove common Markdown formatting.
		 */
		$skill = preg_replace( '/\*\*(.*?)\*\*/u', '$1', $skill ) ?? $skill;
		$skill = preg_replace( '/__(.*?)__/u', '$1', $skill ) ?? $skill;
		$skill = preg_replace( '/`(.*?)`/u', '$1', $skill ) ?? $skill;

		return trim( $skill );
	}

	/**
	 * Remove duplicate skills while preserving order.
	 */
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
