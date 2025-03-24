<?php

namespace App\Enums;

enum CentralRole: string
{
    case ADMIN = 'admin';
    case USER = 'user';

    public static function getValues(): array
    {
        return array_map(fn ($enum) => $enum->value, self::cases());
    }
}
