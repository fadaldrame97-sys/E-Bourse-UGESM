<?php

namespace App\Http\Requests\BilletRetour;

use Illuminate\Foundation\Http\FormRequest;

class RejeterBilletRetourRequest extends FormRequest
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