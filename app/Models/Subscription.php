<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Subscription extends Model
{
    protected $table = 'subscriptions';

    protected $guarded = [];

    public function getStripeStatusAttribute($value): string
    {
        return ucwords($value);
    }
}
