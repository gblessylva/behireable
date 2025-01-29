<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class CompanySeeder extends Seeder {

	public function run(): void {
		$companies = array(
			array(
				'name'        => 'Tech Innovators Inc.',
				'website'     => 'https://techinnovators.com',
				'email'       => 'contact@techinnovators.com',
				'description' => 'We are a leading technology company specializing in innovative solutions.',
				'logo'        => 'URL_ADDRESSinnovators.com/logo.png',
			),
			array(
				'name'        => 'FinCorp Solutions',
				'website'     => 'https://fincorp.com',
				'email'       => 'info@fincorp.com',
				'description' => 'We provide financial services and solutions to our clients.',
				'logo'        => 'URL_ADDRESSfincorp.com/logo.png',
			),
			array(
				'name'        => 'HealthTech Systems',
				'website'     => 'https://healthtech.com',
				'email'       => 'support@healthtech.com',
				'description' => 'We offer healthcare solutions and services to our customers.',
				'logo'        => 'URL_ADDRESShealthtech.com/logo.png',
			),
			array(
				'name'        => 'EduGrowth Labs',
				'website'     => 'https://edugrowth.com',
				'email'       => 'hello@edugrowth.com',
				'description' => 'We provide education solutions and services to our students.',
				'logo'        => 'URL_ADDRESSedugrowth.com/logo.png',

			),
			array(
				'name'        => 'MarketPros Ltd.',
				'website'     => 'https://marketpros.com',
				'email'       => 'sales@marketpros.com',
				'description' => 'We offer market analysis and insights to our clients.',
				'logo'        => 'URL_ADDRESSmarketpros.com/logo.png',
			),
		);

		foreach ( $companies as $company ) {
			DB::table( 'companies' )->insert(
				array(
					'name'        => $company['name'],
					'description' => $company['description'],
					'website'     => $company['website'],
					'email'       => $company['email'],
					'logo'        => $company['logo'],
					'created_at'  => now(),
					'updated_at'  => now(),
				)
			);
		}
	}
}
