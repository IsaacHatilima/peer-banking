<?php

namespace App\Actions;

use Random\RandomException;

class PasswordGenerator
{
    /**
     * @throws RandomException
     */
    public function make(): string
    {
        $upperCase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        $lowerCase = 'abcdefghijklmnopqrstuvwxyz';
        $numbers = '0123456789';
        $specialChars = '!@#$%^&*()-_=+<>?';

        $password = [
            $upperCase[random_int(0, strlen($upperCase) - 1)],
            $lowerCase[random_int(0, strlen($lowerCase) - 1)],
            $numbers[random_int(0, strlen($numbers) - 1)],
            $specialChars[random_int(0, strlen($specialChars) - 1)],
        ];

        $allCharacters = $upperCase.$lowerCase.$numbers.$specialChars;

        for ($i = 4; $i < 16; $i++) {
            $password[] = $allCharacters[random_int(0, strlen($allCharacters) - 1)];
        }

        shuffle($password);

        return implode('', $password);
    }
}
