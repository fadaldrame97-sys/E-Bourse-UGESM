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
        'type' => 'required|in:diplome,abandon',
        'motif' => 'required|string|max:1000',

        'diplome' => [
            'required_if:type,diplome',
            'file',
            'mimes:pdf,jpg,jpeg,png',
            'max:5120',
        ],
    ];
}
}