import Layout from '@/Layouts/AuthenticatedLayout';
import { StripeType } from '@/types/stripe';
import { Head, useForm, usePage } from '@inertiajs/react';
import { Button, Card, Select, TextInput } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { FormEventHandler } from 'react';

export default function Stripe() {
    const stripeAuth: StripeType = usePage().props.stripeAuth as StripeType;
    const { data, setData, errors, post, put } = useForm({
        stripe_key: stripeAuth ? stripeAuth.stripe_key : '',
        stripe_secret: stripeAuth ? stripeAuth.stripe_secret : '',
        stripe_webhook_secret: stripeAuth
            ? stripeAuth.stripe_webhook_secret
            : '',
        currency: stripeAuth ? stripeAuth.currency : 'eur',
    });

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();

        if (stripeAuth) {
            put(route('stripe.update', stripeAuth.id), {
                onSuccess: () => {
                    notifications.show({
                        title: 'Success',
                        message: 'Stripe credentials updated successfully!',
                        color: 'green',
                    });
                },
                onError: () => {},
            });
        } else {
            post(route('stripe.store'), {
                onSuccess: () => {
                    notifications.show({
                        title: 'Success',
                        message: 'Stripe credentials created successfully!',
                        color: 'green',
                    });
                },
                onError: () => {},
            });
        }
    };
    return (
        <Layout>
            <Head title="Stripe" />
            <div className="flex items-center justify-center">
                <Card
                    shadow="sm"
                    padding="lg"
                    radius="md"
                    withBorder
                    className="mt-2 w-1/2"
                >
                    <form onSubmit={handleSubmit} className="mt-6 w-full">
                        <div className="w-full">
                            <h1 className="text-lg font-bold">
                                Stripe Credentials
                            </h1>
                            <TextInput
                                className="w-full"
                                id="stripe_key"
                                name="stripe_key"
                                value={data.stripe_key}
                                error={errors.stripe_key}
                                withAsterisk
                                autoComplete="stripe_key"
                                mt="md"
                                data-autofocus
                                label="Stripe Key"
                                onChange={(e) =>
                                    setData('stripe_key', e.target.value)
                                }
                                inputWrapperOrder={[
                                    'label',
                                    'input',
                                    'description',
                                    'error',
                                ]}
                            />
                            <TextInput
                                className="w-full"
                                id="stripe_secret"
                                name="stripe_secret"
                                value={data.stripe_secret}
                                error={errors.stripe_secret}
                                withAsterisk
                                autoComplete="stripe_secret"
                                mt="md"
                                label="Stripe Secrete"
                                onChange={(e) =>
                                    setData('stripe_secret', e.target.value)
                                }
                                inputWrapperOrder={[
                                    'label',
                                    'input',
                                    'description',
                                    'error',
                                ]}
                            />
                            <TextInput
                                className="w-full"
                                id="stripe_webhook_secret"
                                name="stripe_webhook_secret"
                                value={data.stripe_webhook_secret}
                                error={errors.stripe_webhook_secret}
                                withAsterisk
                                autoComplete="stripe_webhook_secret"
                                mt="md"
                                label="Stripe Webhook Secret"
                                onChange={(e) =>
                                    setData(
                                        'stripe_webhook_secret',
                                        e.target.value,
                                    )
                                }
                                inputWrapperOrder={[
                                    'label',
                                    'input',
                                    'description',
                                    'error',
                                ]}
                            />
                            <Select
                                mt="md"
                                label="Currency"
                                error={errors.currency}
                                value={data.currency}
                                withAsterisk
                                data={[
                                    { value: 'eur', label: 'EUR' },
                                    { value: 'usd', label: 'USD' },
                                ]}
                                onChange={(_value, option) =>
                                    setData('currency', option.value)
                                }
                                inputWrapperOrder={[
                                    'label',
                                    'input',
                                    'description',
                                    'error',
                                ]}
                            />
                        </div>

                        <div className="mt-4 flex justify-end gap-2">
                            <Button
                                type="submit"
                                variant="filled"
                                color="black"
                                loaderProps={{ type: 'dots' }}
                            >
                                Save
                            </Button>
                        </div>
                    </form>
                </Card>
            </div>
        </Layout>
    );
}
