<?php

test('password confirm page', function () {
    disableRateLimiter();
    login();

    visit(route('password.confirm'))
        ->assertSee('Confirm Password')
        ->fill('password', 'Password1#')
        ->press('Confirm password');
});
