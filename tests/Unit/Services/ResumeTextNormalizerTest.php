<?php

namespace Tests\Unit\Services;

use App\Services\ResumeTextNormalizer;
use Tests\TestCase;

class ResumeTextNormalizerTest extends TestCase
{
    public function test_it_normalizes_line_endings(): void
    {
        $normalizer = new ResumeTextNormalizer();

        $input = "John Doe\r\nSoftware Developer\r\n\r\nSkills";

        $result = $normalizer->normalize($input);

        $this->assertSame(
            "John Doe\nSoftware Developer\n\nSkills",
            $result
        );
    }

    public function test_it_removes_excessive_blank_lines(): void
    {
        $normalizer = new ResumeTextNormalizer();

        $input = "John Doe\n\n\n\nSoftware Developer";

        $result = $normalizer->normalize($input);

        $this->assertSame(
            "John Doe\n\nSoftware Developer",
            $result
        );
    }

    public function test_it_normalizes_repeated_spaces(): void
    {
        $normalizer = new ResumeTextNormalizer();

        $input = "John    Doe\t\tSoftware    Developer";

        $result = $normalizer->normalize($input);

        $this->assertSame(
            "John Doe Software Developer",
            $result
        );
    }

    public function test_it_preserves_resume_line_structure(): void
    {
        $normalizer = new ResumeTextNormalizer();

        $input = <<<TEXT
Professional Summary

WordPress Developer

Skills

PHP
Laravel
React
TEXT;

        $result = $normalizer->normalize($input);

        $this->assertSame($input, $result);
    }
}