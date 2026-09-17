<?php

namespace App\Http\Requests\DemandeBourse;

use Illuminate\Foundation\Http\FormRequest;

class RejeterDemandeBourseRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'commentaire' => ['required', 'string'],
        ];
    }
}