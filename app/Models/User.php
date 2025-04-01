<?php

namespace App\Models;

use Database\Factories\UserFactory;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Cashier\Billable;
use Laravel\Fortify\TwoFactorAuthenticatable;

/**
 * @property mixed $tenant_id
 */
class User extends Authenticatable implements MustVerifyEmail
{
    /** @use HasFactory<UserFactory> */
    use Billable, HasFactory, HasUuids, Notifiable, SoftDeletes, TwoFactorAuthenticatable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    /*protected $guarded = [
        'id',
    ];*/

    /*
     * Because this is a shared model, using fillable instead of guarded
     * as it throws an error on tenant create with tenant_id null.
     * */

    protected $fillable = [
        'tenant_id',
        'email',
        'email_verified_at',
        'password',
        'is_active',
        'last_login_at',
        'two_factor_type',
        'two_factor_code',
        'two_factor_expires_at',
        'copied_codes',
        'role',
        'stripe_id',
        'pm_type',
        'pm_last_four',
        'created_by',
        'updated_by',
        'deleted_at',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /*public static function createSetupIntent(): array
    {
        Stripe::setApiKey(config('cashier.secret'));

        $setupIntent = SetupIntent::create([
            'payment_method_types' => ['card'],
        ]);

        return [
            'id' => $setupIntent->id,
            'client_secret' => $setupIntent->client_secret,
        ];
    }*/

    protected static function booted(): void
    {
        static::deleting(function ($user) {
            $user->profile()->delete();
            $user->updated_by = auth()->id();
            $user->save();
        });

        static::restoring(function ($user) {
            $user->profile()->withTrashed()->restore();
            $user->updated_by = auth()->id();
            $user->save();
        });
    }

    public function profile(): HasOne
    {
        return $this->hasOne(Profile::class);
    }

    public function generateTwoFactorCode(): void
    {
        $this->timestamps = false;
        $this->two_factor_code = rand(100000, 999999);
        $this->two_factor_expires_at = now()->addMinutes(5);
        $this->save();
    }

    public function resetTwoFactorCode(): void
    {
        $this->timestamps = false;
        $this->two_factor_code = null;
        $this->two_factor_expires_at = null;
        $this->save();
    }

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }
}
