<?php

namespace Tests\Unit\Services;

use App\Services\ResumeSectionDetector;
use Tests\TestCase;

class ResumeSectionDetectorTest extends TestCase
{
    public function test_it_detects_standard_resume_sections(): void
    {
        $detector = new ResumeSectionDetector();

        $text = <<<'TEXT'
SYLVANUS GODBLESS

WordPress Engineer

PROFESSIONAL SUMMARY

Highly skilled WordPress developer with over four years of experience.

SKILLS

PHP
WordPress
JavaScript
React
Laravel

PROFESSIONAL EXPERIENCE

Senior WordPress Engineer
Company A
2024 - Present

EDUCATION

Bachelor of Arts
Theatre Arts
University

CERTIFICATIONS

AWS Certified Cloud Practitioner

PROJECTS

BeHirable

LANGUAGES

English
TEXT;

        $result = $detector->detect($text);

        $this->assertSame(
            'Highly skilled WordPress developer with over four years of experience.',
            $result['summary']
        );

        $this->assertStringContainsString(
            'PHP',
            $result['skills']
        );

        $this->assertStringContainsString(
            'WordPress',
            $result['skills']
        );

        $this->assertStringContainsString(
            'Senior WordPress Engineer',
            $result['experience']
        );

        $this->assertStringContainsString(
            'Bachelor of Arts',
            $result['education']
        );

        $this->assertStringContainsString(
            'AWS Certified Cloud Practitioner',
            $result['certifications']
        );

        $this->assertStringContainsString(
            'BeHirable',
            $result['projects']
        );

        $this->assertSame(
            'English',
            $result['languages']
        );
    }

    public function test_it_recognizes_heading_variations(): void
    {
        $detector = new ResumeSectionDetector();

        $text = <<<'TEXT'
CAREER PROFILE

Experienced software engineer.

TECHNICAL EXPERTISE

PHP
Laravel
React

WORK HISTORY

Senior Developer
Company A

ACADEMIC BACKGROUND

Bachelor of Science
Computer Science

SELECTED PROJECTS

Project One
TEXT;

        $result = $detector->detect($text);

        $this->assertSame(
            'Experienced software engineer.',
            $result['summary']
        );

        $this->assertStringContainsString(
            'PHP',
            $result['skills']
        );

        $this->assertStringContainsString(
            'Senior Developer',
            $result['experience']
        );

        $this->assertStringContainsString(
            'Bachelor of Science',
            $result['education']
        );

        $this->assertStringContainsString(
            'Project One',
            $result['projects']
        );
    }

    public function test_it_handles_headings_with_punctuation(): void
    {
        $detector = new ResumeSectionDetector();

        $text = <<<'TEXT'
SUMMARY:

Software developer with five years of experience.

SKILLS:

PHP
Laravel
React

EDUCATION:

Bachelor of Science
Computer Science
TEXT;

        $result = $detector->detect($text);

        $this->assertSame(
            'Software developer with five years of experience.',
            $result['summary']
        );

        $this->assertStringContainsString(
            'PHP',
            $result['skills']
        );

        $this->assertStringContainsString(
            'Bachelor of Science',
            $result['education']
        );
    }

    public function test_unrecognized_sections_are_not_lost(): void
    {
        $detector = new ResumeSectionDetector();

        $text = <<<'TEXT'
John Doe

INTERESTS

Photography
Reading

SKILLS

PHP
Laravel
TEXT;

        $result = $detector->detect($text);

        $this->assertStringContainsString(
            'PHP',
            $result['skills']
        );

        $this->assertStringNotContainsString(
            'Photography',
            $result['skills']
        );
    }

    public function test_empty_sections_are_returned_as_empty_strings(): void
    {
        $detector = new ResumeSectionDetector();

        $result = $detector->detect(
            "John Doe\n\nSKILLS\n\nPHP\nLaravel"
        );

        $this->assertSame('', $result['summary']);
        $this->assertSame('', $result['experience']);
        $this->assertSame('', $result['education']);
        $this->assertSame('', $result['certifications']);
        $this->assertSame('', $result['projects']);
        $this->assertSame('', $result['languages']);
    }
}