<?php

namespace App\Http\Requests\DemandeBourse;

use Illuminate\Foundation\Http\FormRequest;

class StoreDemandeBourseRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'type' => ['required', 'in:premiere_attribution,renouvellement'],
            'passeport' => ['required', 'file', 'max:5120'],
            'attestation_inscription' => ['required', 'file', 'max:5120'],
            'attestation_reussite' => ['required', 'file', 'max:5120'],
        ];
    }
}