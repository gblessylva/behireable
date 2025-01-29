<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class OpportunityRequest extends FormRequest {

	public function authorize(): bool {
		return true;
	}

	public function rules(): array {
		return array(
			'title'         => 'required|string|max:255',
			'description'   => 'nullable|string',
			'location_id'   => 'required|exists:locations,id',
			'type'          => 'required|in:full-time,contract,freelance',
			'location_type' => 'required|in:remote,hybrid,on-site',
			'industry_id'   => 'required|exists:industries,id',
			'company_id'    => 'required|exists:companies,id',
			'salary'        => 'nullable|numeric|min:0',
			'urgency'       => 'required|in:immediate,soon,flexible',
			'experience'    => 'required|integer|min:0',
		);
	}
}
