<?php

namespace Tests\Unit\Services;

use App\Services\SkillsParser;
use Tests\TestCase;

class SkillsParserTest extends TestCase {

	public function test_it_parses_categorized_skills(): void {
		$parser = new SkillsParser();

		$text = <<<'TEXT'
Languages:
PHP
JavaScript
TypeScript

WordPress:
WordPress
WooCommerce
Gutenberg

Development Tools:
Git
GitHub
Composer
NPM
TEXT;

		$result = $parser->parse( $text );

		$this->assertContains(
			array(
				'name'     => 'PHP',
				'category' => 'Languages',
			),
			$result
		);

		$this->assertContains(
			array(
				'name'     => 'WordPress',
				'category' => 'WordPress',
			),
			$result
		);

		$this->assertContains(
			array(
				'name'     => 'Git',
				'category' => 'Development Tools',
			),
			$result
		);
	}

	public function test_it_parses_comma_separated_skills(): void {
		$parser = new SkillsParser();

		$text = <<<'TEXT'
PHP, JavaScript, React, Laravel, MySQL
TEXT;

		$result = $parser->parse( $text );

		$names = array_column( $result, 'name' );

		$this->assertSame(
			array(
				'PHP',
				'JavaScript',
				'React',
				'Laravel',
				'MySQL',
			),
			$names
		);
	}

	public function test_it_parses_semicolon_separated_skills(): void {
		$parser = new SkillsParser();

		$result = $parser->parse(
			'PHP; JavaScript; WordPress; React'
		);

		$names = array_column( $result, 'name' );

		$this->assertSame(
			array(
				'PHP',
				'JavaScript',
				'WordPress',
				'React',
			),
			$names
		);
	}

	public function test_it_removes_markdown_list_markers(): void {
		$parser = new SkillsParser();

		$text = <<<'TEXT'
- PHP
- JavaScript
- React
* WordPress
TEXT;

		$result = $parser->parse( $text );

		$names = array_column( $result, 'name' );

		$this->assertSame(
			array(
				'PHP',
				'JavaScript',
				'React',
				'WordPress',
			),
			$names
		);
	}

	public function test_it_removes_duplicate_skills_case_insensitively(): void {
		$parser = new SkillsParser();

		$text = <<<'TEXT'
PHP
php
PHP
JavaScript
javascript
TEXT;

		$result = $parser->parse( $text );

		$names = array_column( $result, 'name' );

		$this->assertSame(
			array(
				'PHP',
				'JavaScript',
			),
			$names
		);
	}

	public function test_empty_input_returns_empty_array(): void {
		$parser = new SkillsParser();

		$this->assertSame(
			array(),
			$parser->parse( '' )
		);
	}

	public function test_it_extracts_known_skills_from_competency_sentences(): void {
		$parser = new SkillsParser();

		$text = <<<'TEXT'
- 4+ Years Professional experience and strong expertise in PHP/WordPress development.
- Solid knowledge of JavaScript, PHP, WordPress, React JS, responsive design and HTML CSS (SCSS, SASS).
TEXT;

		$result = $parser->parse( $text );

		$names = array_column( $result, 'name' );

		$this->assertContains( 'PHP', $names );
		$this->assertContains( 'WordPress', $names );
		$this->assertContains( 'JavaScript', $names );
		$this->assertContains( 'React JS', $names );
		$this->assertContains( 'HTML', $names );
		$this->assertContains( 'CSS', $names );
		$this->assertContains( 'SCSS', $names );
		$this->assertContains( 'SASS', $names );
	}

    public function test_it_does_not_store_an_entire_competency_sentence_as_a_skill(): void
{
    $parser = new SkillsParser();

    $text = <<<'TEXT'
- Solid knowledge of JavaScript, PHP, WordPress, React JS, responsive design and HTML CSS (SCSS, SASS).
TEXT;

    $result = $parser->parse($text);

    $names = array_column($result, 'name');

    $this->assertNotContains(
        'Solid knowledge of JavaScript, PHP, WordPress, React JS, responsive design and HTML CSS (SCSS, SASS).',
        $names
    );
}
}
