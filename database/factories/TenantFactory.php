<?php

namespace Database\Factories;

use App\Models\Tenant;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Carbon;

/**
 * @extends Factory<Tenant>
 */
class TenantFactory extends Factory
{
    public function definition(): array
    {
        return [
            'tenant_number' => $this->faker->unique()->randomNumber(),
            'tenant_name' => strtoupper($this->faker->company()),
            'contact_email' => $this->faker->unique()->email(),
            'contact_phone' => '+49'.$this->faker->unique()->numerify('###########'),
            'contact_first_name' => $this->faker->firstName(),
            'contact_last_name' => $this->faker->lastName(),
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
        ];
    }

    public function configure(): TenantFactory
    {
        return $this->afterCreating(function (Tenant $tenant) {
            $tenant->run(function ($tenant) {
                /** @var Tenant $tenant */
                $tenant->domain()->create(['domain' => $this->faker->unique()->slug().'.peer-banking.test']);

                User::factory(3)->admin()->create();

                User::factory(7)->member()->create();
            });
        });
    }
}
