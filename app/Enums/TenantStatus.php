<?php

namespace App\Enums;

enum TenantStatus: string
{
    case ACTIVE = 'active';
    case IN_ACTIVE = 'in_active';

    public static function getValues(): array
    {
        return array_map(fn ($enum) => $enum->value, self::cases());
    }
}
