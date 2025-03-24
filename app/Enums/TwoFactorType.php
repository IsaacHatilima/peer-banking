<?php

namespace App\Enums;

enum TwoFactorType: string
{
    const FORTIFY = 'fortify';

    const EMAIL = 'email';
}
