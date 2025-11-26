<?php

declare(strict_types=1);

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class () extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('tenants', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('tenant_number')->unique();
            $table->string('tenant_name')->unique();
            $table->string('contact_first_name');
            $table->string('contact_last_name');
            $table->string('contact_email')->unique();
            $table->string('contact_phone');
            $table->boolean('is_active');
            $table->string('tenancy_db_name')->nullable();
            $table->timestamps();
            $table->json('data')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tenants');
    }
};
