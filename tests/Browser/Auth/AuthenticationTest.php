<?php

test('show login page', function () {
    disableRateLimiter();
    $page = visit(route('login'));

    $page->assertSee('Log in to your account');

    $page->assertTitleContains('Log in');
});

test('user can sign in', function () {
    disableRateLimiter();
    createUser();

    $page = visit(route('login'));

    $page->assertSee('Log in')
        ->fill('email', 'test@mail.com')
        ->fill('password', 'Password1#')
        ->click('Log in')
        ->assertSee('Dashboard');

    $this->assertAuthenticated();
});
