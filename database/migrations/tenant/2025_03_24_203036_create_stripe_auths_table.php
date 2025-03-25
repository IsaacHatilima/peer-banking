<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('stripe_auths', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('stripe_key');
            $table->string('stripe_secret');
            $table->string('stripe_webhook_secret');
            $table->string('currency');
            $table->string('currency_locale');
            $table->foreignUuid('created_by')->constrained('users');
            $table->foreignUuid('updated_by')->constrained('users');
            $table->timestamps();
            $table->softDeletes();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('stripe_auths');
    }
};
