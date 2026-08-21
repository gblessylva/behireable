<?php

namespace Tests\Unit\Services;

use App\Services\SkillsParser;
use Tests\TestCase;

class SkillsParserTest extends TestCase
{
    public function test_it_parses_categorized_skills(): void
    {
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

        $result = $parser->parse($text);

        $this->assertContains(
            [
                'name' => 'PHP',
                'category' => 'Languages',
            ],
            $result
        );

        $this->assertContains(
            [
                'name' => 'WordPress',
                'category' => 'WordPress',
            ],
            $result
        );

        $this->assertContains(
            [
                'name' => 'Git',
                'category' => 'Development Tools',
            ],
            $result
        );
    }

    public function test_it_parses_comma_separated_skills(): void
    {
        $parser = new SkillsParser();

        $text = <<<'TEXT'
PHP, JavaScript, React, Laravel, MySQL
TEXT;

        $result = $parser->parse($text);

        $names = array_column($result, 'name');

        $this->assertSame(
            [
                'PHP',
                'JavaScript',
                'React',
                'Laravel',
                'MySQL',
            ],
            $names
        );
    }

    public function test_it_parses_semicolon_separated_skills(): void
    {
        $parser = new SkillsParser();

        $result = $parser->parse(
            'PHP; JavaScript; WordPress; React'
        );

        $names = array_column($result, 'name');

        $this->assertSame(
            [
                'PHP',
                'JavaScript',
                'WordPress',
                'React',
            ],
            $names
        );
    }

    public function test_it_removes_markdown_list_markers(): void
    {
        $parser = new SkillsParser();

        $text = <<<'TEXT'
- PHP
- JavaScript
- React
* WordPress
TEXT;

        $result = $parser->parse($text);

        $names = array_column($result, 'name');

        $this->assertSame(
            [
                'PHP',
                'JavaScript',
                'React',
                'WordPress',
            ],
            $names
        );
    }

    public function test_it_removes_duplicate_skills_case_insensitively(): void
    {
        $parser = new SkillsParser();

        $text = <<<'TEXT'
PHP
php
PHP
JavaScript
javascript
TEXT;

        $result = $parser->parse($text);

        $names = array_column($result, 'name');

        $this->assertSame(
            [
                'PHP',
                'JavaScript',
            ],
            $names
        );
    }

    public function test_empty_input_returns_empty_array(): void
    {
        $parser = new SkillsParser();

        $this->assertSame(
            [],
            $parser->parse('')
        );
    }
}