import { store } from '@/routes/register';
import { Form, Head } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import AuthLayout from '@/layouts/auth-layout';
import InputWithError from '@/components/input-with-error';
import PasswordInputWithError from '@/components/password-input-with-error';
import { InputGroup, InputGroupAddon, InputGroupInput, InputGroupText } from '@/components/ui/input-group';
import { Label } from '@/components/ui/label';
import React from 'react';

export default function Register() {
    return (
        <AuthLayout
            title="Create an account"
            description="Enter your details below to create your account"
        >
            <Head title="Register" />
            <Form
                {...store.form()}
                resetOnSuccess={['password', 'password_confirmation']}
                disableWhileProcessing
                className="flex flex-col gap-6"
            >
                {({ processing }) => (
                    <>
                        <div className="grid gap-6">
                            <div className="grid gap-2">
                                <InputWithError
                                    label="Group Name"
                                    name="group_name"
                                    type="text"
                                    required
                                    autoFocus
                                    tabIndex={1}
                                    autoComplete="group_name"
                                    placeholder="Group Alpha"
                                />
                            </div>
                            <div>
                                <Label htmlFor="group_domain">Domain</Label>
                                <InputGroup>
                                    <InputGroupAddon>
                                        <InputGroupText>
                                            https://
                                        </InputGroupText>
                                    </InputGroupAddon>
                                    <InputGroupInput
                                        tabIndex={2}
                                        placeholder="groupalpha"
                                        className="!pl-0.5"
                                        required
                                        name="group_domain"
                                        pattern="[A-Za-z-]+"
                                        onKeyDown={(e) => {
                                            if (
                                                !/^[A-Za-z-]$/.test(e.key) &&
                                                e.key !== 'Backspace'
                                            ) {
                                                e.preventDefault();
                                            }
                                        }}
                                        onChange={(e) => {
                                            e.target.value =
                                                e.target.value.replace(
                                                    /[^A-Za-z-]/g,
                                                    '',
                                                );
                                        }}
                                    />
                                    <InputGroupAddon align="inline-end">
                                        <InputGroupText>
                                            .peer-banking.com
                                        </InputGroupText>
                                    </InputGroupAddon>
                                </InputGroup>
                            </div>
                            <div className="grid gap-2">
                                <InputWithError
                                    label="First Name"
                                    name="first_name"
                                    type="text"
                                    required
                                    tabIndex={3}
                                    autoComplete="first_name"
                                    placeholder="John"
                                />
                            </div>

                            <div className="grid gap-2">
                                <InputWithError
                                    label="Last Name"
                                    name="last_name"
                                    type="test"
                                    required
                                    tabIndex={4}
                                    autoComplete="last_name"
                                    placeholder="Doe"
                                />
                            </div>

                            <div className="grid gap-2">
                                <InputWithError
                                    label="Email Address"
                                    name="email"
                                    type="email"
                                    required
                                    tabIndex={5}
                                    autoComplete="email"
                                    placeholder="email@example.com"
                                />
                            </div>

                            <div className="grid gap-2">
                                <PasswordInputWithError
                                    label="Password"
                                    name="password"
                                    forgotPassword={false}
                                    required
                                    tabIndex={6}
                                    autoComplete="password"
                                />
                            </div>

                            <div className="grid gap-2">
                                <PasswordInputWithError
                                    label="Confirm Password"
                                    name="password_confirmation"
                                    forgotPassword={false}
                                    required
                                    tabIndex={7}
                                    autoComplete="password_confirmation"
                                />
                            </div>

                            <Button
                                type="submit"
                                className="mt-2 w-full"
                                tabIndex={8}
                                data-test="register-user-button"
                            >
                                {processing && <Spinner />}
                                Create account
                            </Button>
                        </div>
                    </>
                )}
            </Form>
        </AuthLayout>
    );
}
