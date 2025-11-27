<?php

namespace App\Models;

use Carbon\Carbon;
use Database\Factories\TenantFactory;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Stancl\Tenancy\Database\Concerns\HasDatabase;
use Stancl\Tenancy\Database\Concerns\HasDomains;
use Stancl\Tenancy\Database\Contracts\TenantWithDatabase;
use Stancl\Tenancy\Database\Models\Tenant as BaseTenant;

/**
 * App\Models\User
 *
 * @property string $id
 * @property string $tenant_number
 * @property string $tenant_name
 * @property string $contact_first_name
 * @property string $contact_last_name
 * @property string $contact_email
 * @property string $contact_phone
 * @property bool $is_active
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * @property-read Domain $domain
 */
class Tenant extends BaseTenant implements TenantWithDatabase
{
    /** @use HasFactory<TenantFactory> */
    use HasFactory;

    use HasDatabase;
    use HasDomains;
    use HasUuids;

    protected $attributes = [
        'is_active' => true,
    ];

    /**
     * @return array<string>
     */
    public static function getCustomColumns(): array
    {
        return [
            'id',
            'tenant_number',
            'tenant_name',
            'contact_first_name',
            'contact_last_name',
            'contact_email',
            'contact_phone',
            'is_active',
            'tenancy_db_name',
        ];
    }

    /**
     * @return HasOne<Domain, $this>
     */
    public function domain(): HasOne
    {
        return $this->hasOne(Domain::class);
    }

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'data' => 'array',
            'is_active' => 'boolean',
        ];
    }
}
