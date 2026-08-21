<?php

namespace Tests\Unit\Services;

use App\Services\ResumeParser;
use Tests\TestCase;

class ResumeParserTest extends TestCase {

	public function test_it_extracts_basic_personal_information(): void {
		$parser = new ResumeParser();

		$text = <<<'TEXT'
Sylvanus Godbless

WordPress Engineer

Email: sylvanus@example.com
Phone: +234 801 234 5678
LinkedIn: https://linkedin.com/in/sylvanusgodbless
GitHub: https://github.com/gblessylva
Website: https://example.com

PROFESSIONAL SUMMARY

WordPress Engineer with over four years of experience.
TEXT;

		$result = $parser->parse( $text );

		$personal = $result['personal_information'];

		$this->assertSame(
			'Sylvanus Godbless',
			$personal['full_name']
		);

		$this->assertSame(
			'sylvanus@example.com',
			$personal['email']
		);

		$this->assertSame(
			'+234 801 234 5678',
			$personal['phone']
		);

		$this->assertSame(
			'https://linkedin.com/in/sylvanusgodbless',
			$personal['linkedin']
		);

		$this->assertSame(
			'https://github.com/gblessylva',
			$personal['github']
		);

		$this->assertSame(
			'https://example.com',
			$personal['website']
		);
	}

	public function test_it_returns_null_when_contact_information_is_missing(): void {
		$parser = new ResumeParser();

		$result = $parser->parse(
			"John Doe\n\nSoftware Developer\n\nPHP\nLaravel\nReact"
		);

		$personal = $result['personal_information'];

		$this->assertSame(
			'John Doe',
			$personal['full_name']
		);

		$this->assertNull( $personal['email'] );
		$this->assertNull( $personal['phone'] );
		$this->assertNull( $personal['linkedin'] );
		$this->assertNull( $personal['github'] );
		$this->assertNull( $personal['website'] );
	}

	public function test_it_does_not_treat_linkedin_as_a_website(): void {
		$parser = new ResumeParser();

		$text = <<<'TEXT'
John Doe

https://linkedin.com/in/johndoe
TEXT;

		$result = $parser->parse( $text );

		$this->assertSame(
			'https://linkedin.com/in/johndoe',
			$result['personal_information']['linkedin']
		);

		$this->assertNull(
			$result['personal_information']['website']
		);
	}

	public function test_it_does_not_treat_github_as_a_website(): void {
		$parser = new ResumeParser();

		$text = <<<'TEXT'
John Doe

https://github.com/johndoe
TEXT;

		$result = $parser->parse( $text );

		$this->assertSame(
			'https://github.com/johndoe',
			$result['personal_information']['github']
		);

		$this->assertNull(
			$result['personal_information']['website']
		);
	}
	public function test_it_extracts_clean_urls_from_markdown_links(): void {
		$parser = new ResumeParser();

		$text = <<<'TEXT'
John Doe

[https://github.com/johndoe](https://github.com/johndoe)
[https://linkedin.com/in/johndoe](https://linkedin.com/in/johndoe)
TEXT;

		$result = $parser->parse( $text );

		$this->assertSame(
			'https://github.com/johndoe',
			$result['personal_information']['github']
		);

		$this->assertSame(
			'https://linkedin.com/in/johndoe',
			$result['personal_information']['linkedin']
		);
	}
}
