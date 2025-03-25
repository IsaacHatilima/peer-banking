<?php

namespace Database\Factories;

use App\Models\StripeAuth;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Carbon;

class StripeAuthFactory extends Factory
{
    protected $model = StripeAuth::class;

    /**
     * Define the model's default state.
     */
    public function definition(): array
    {
        return [
            'stripe_key' => $this->faker->word(),
            'stripe_secret' => $this->faker->word(),
            'stripe_webhook_secret' => $this->faker->word(),
            'currency' => $this->faker->word(),
            'currency_locale' => $this->faker->word(),
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),

            'created_by' => User::factory(),
            'updated_by' => User::factory(),
        ];
    }
}
