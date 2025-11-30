<?php

test('profile can be updates', function () {
    // Test is randomly hitting rate limit so we bypass it.
    disableRateLimiter();
    login();

    visit(route('profile.edit'))
        ->assertSee('Save')
        ->fill('first_name', 'John')
        ->fill('last_name', 'Doe')
        ->fill('email', 'test@mail.com')
        ->press('Save')
        ->assertSee('Success')
        ->assertSee('Profile updated successfully.')
        ->assertUrlIs(route('profile.edit'));
});
