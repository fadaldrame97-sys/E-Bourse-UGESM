<?php

namespace App\Http\Requests\BilletRetour;

use Illuminate\Foundation\Http\FormRequest;

class StoreBilletRetourRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'type' => ['required', 'in:diplome,abandon'],
            'motif' => ['required', 'string'],
            'preuve_diplome' => ['required_if:type,diplome', 'file', 'max:5120'],
        ];
    }
}