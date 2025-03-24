<?php

namespace App\Enums;

enum TimeZone: string
{
    case EU = 'Europe/Berlin';
    case SOUTHERN_AFRICA = 'Africa/Lusaka';

    public static function getValues(): array
    {
        return array_map(fn ($enum) => $enum->value, self::cases());
    }
}
