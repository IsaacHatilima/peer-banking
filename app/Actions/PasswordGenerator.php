<?php

namespace App\Actions;

class PasswordGenerator
{
    public function make(): string
    {
        $upperCase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        $lowerCase = 'abcdefghijklmnopqrstuvwxyz';
        $numbers = '0123456789';
        $specialChars = '!@#$%^&*()-_=+<>?';

        $password = [
            $upperCase[mt_rand(0, strlen($upperCase) - 1)],
            $lowerCase[mt_rand(0, strlen($lowerCase) - 1)],
            $numbers[mt_rand(0, strlen($numbers) - 1)],
            $specialChars[mt_rand(0, strlen($specialChars) - 1)],
        ];

        $allCharacters = $upperCase.$lowerCase.$numbers.$specialChars;

        for ($i = 4; $i < 16; $i++) {
            $password[] = $allCharacters[mt_rand(0, strlen($allCharacters) - 1)];
        }

        shuffle($password);

        return implode('', $password);
    }
}
