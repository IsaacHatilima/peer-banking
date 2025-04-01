<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Carbon;

class Profile extends Model
{
    use HasFactory, HasUuids, SoftDeletes;

    protected $fillable = [
        'first_name',
        'user_id',
        'last_name',
        'gender',
        'phone',
        'street',
        'house_number',
        'city',
        'zip',
        'state',
        'date_of_birth',
        'deleted_at',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function getDateOfBirthAttribute($value): string
    {
        return Carbon::parse($value)->format('Y-m-d');
    }

    protected function casts(): array
    {
        return [
            'date_of_birth' => 'date',
        ];
    }
}
