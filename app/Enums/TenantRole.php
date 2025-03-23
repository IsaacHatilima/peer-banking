<?php

namespace App\Enums;

enum TenantRole: string
{
    case ADMIN = 'admin';
    case MEMBER = 'member';

    public static function getValues(): array
    {
        return array_map(fn ($enum) => $enum->value, self::cases());
    }
}
