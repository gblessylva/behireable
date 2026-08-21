<?php

namespace App\Services;

use PhpOffice\PhpWord\IOFactory;
use Smalot\PdfParser\Parser;
use RuntimeException;
use PhpOffice\PhpWord\Element\Table;
use PhpOffice\PhpWord\Element\Text;

class ResumeTextExtractor {

	public function extract( string $filePath, string $extension ): string {
		return match ( strtolower( $extension ) ) {
			'pdf' => $this->extractPdf( $filePath ),
			'docx' => $this->extractDocx( $filePath ),
			'doc' => $this->extractDoc( $filePath ),
			default => throw new RuntimeException(
				"Unsupported resume format: {$extension}"
			),
		};
	}

	protected function extractPdf( string $filePath ): string {
		$parser = new Parser();

		$pdf = $parser->parseFile( $filePath );

		return trim( $pdf->getText() );
	}

	protected function extractDocx( string $filePath ): string {
		$zip = new \ZipArchive();

		if ( $zip->open( $filePath ) !== true ) {
			throw new \RuntimeException(
				'Unable to open DOCX file.'
			);
		}

		$documentXml = $zip->getFromName( 'word/document.xml' );

		$zip->close();

		if ( $documentXml === false ) {
			throw new \RuntimeException(
				'DOCX document.xml could not be found.'
			);
		}

		$dom = new \DOMDocument();

		$dom->preserveWhiteSpace = false;

		if ( ! @$dom->loadXML( $documentXml ) ) {
			throw new \RuntimeException(
				'Unable to parse DOCX document XML.'
			);
		}

		$xpath = new \DOMXPath( $dom );

		$xpath->registerNamespace(
			'w',
			'http://schemas.openxmlformats.org/wordprocessingml/2006/main'
		);

		$paragraphs = array();

		foreach ( $xpath->query( '//w:body//w:p' ) as $paragraph ) {
			$text = '';

			foreach ( $xpath->query( './/w:t', $paragraph ) as $textNode ) {
				$text .= $textNode->nodeValue;
			}

			$text = trim( $text );

			if ( $text !== '' ) {
				$paragraphs[] = $text;
			}
		}

		return implode( "\n", $paragraphs );
	}

	protected function extractDoc( string $filePath ): string {
		throw new RuntimeException(
			'Legacy DOC extraction is not currently supported.'
		);
	}
	protected function extractElementText( $element ): string {
		$class = get_class( $element );

		\Log::debug(
			'Resume extraction element',
			array(
				'class'           => $class,
				'has_getText'     => method_exists( $element, 'getText' ),
				'has_getElements' => method_exists( $element, 'getElements' ),
				'has_getRows'     => method_exists( $element, 'getRows' ),
			)
		);

		if ( $element instanceof \PhpOffice\PhpWord\Element\Text ) {
			return $element->getText() . "\n";
		}

		$text = '';

		if ( $element instanceof \PhpOffice\PhpWord\Element\Table ) {
			foreach ( $element->getRows() as $row ) {
				foreach ( $row->getCells() as $cell ) {
					foreach ( $cell->getElements() as $child ) {
						$text .= $this->extractElementText( $child );
					}

					$text .= "\n";
				}
			}

			return $text;
		}

		if ( method_exists( $element, 'getElements' ) ) {
			foreach ( $element->getElements() as $child ) {
				$text .= $this->extractElementText( $child );
			}
		}

		return $text;
	}
}
