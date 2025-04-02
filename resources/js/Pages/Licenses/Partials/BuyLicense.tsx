import { SetupIntentType } from '@/types/stripe';
import { User } from '@/types/user';
import { useForm, usePage } from '@inertiajs/react';
import { Button, Modal, NumberInput, TextInput } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import {
    PaymentElement,
    useElements,
    useStripe,
} from '@stripe/react-stripe-js';
import { FormEventHandler, useState } from 'react';

function BuyLicense({ intent }: { intent: SetupIntentType }) {
    const user: User = usePage().props.auth.user;
    const [modalState, setModalState] = useDisclosure(false);
    const [loading, { open, close }] = useDisclosure();
    const unitPrice: number = usePage().props.licensePrice as number;
    const [totalPrice, setTotalPrice] = useState(unitPrice);

    const { data, setData, errors, post, reset } = useForm<{
        quantity: number;
        unit_price: number;
        setup_intent?: string;
        card_holder: string;
    }>({
        unit_price: unitPrice,
        quantity: 1,
        setup_intent: intent.id,
        card_holder: user.profile.first_name + ' ' + user.profile.last_name,
    });

    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit: FormEventHandler = async (e) => {
        e.preventDefault();
        open();

        if (!stripe || !elements) {
            return;
        }

        const { error } = await stripe.confirmSetup({
            elements,
            confirmParams: {
                payment_method_data: {
                    billing_details: {
                        name: data.card_holder,
                    },
                },
            },
            redirect: 'if_required',
        });

        if (error?.type === 'card_error') {
            notifications.show({
                title: 'Error',
                message: 'Card error',
                color: 'red',
            });
        } else if (error?.type === 'validation_error') {
            notifications.show({
                title: 'Error',
                message: 'Card validation failed.',
                color: 'red',
            });
        }

        post(route('license.store'), {
            onSuccess: () => {
                notifications.show({
                    title: 'Success',
                    message: 'License purchase was successful!',
                    color: 'green',
                });
                setModalState.close();
                reset();
            },
            onError: (errors) => {
                if (errors.subscriptionError) {
                    notifications.show({
                        title: 'Error',
                        message: errors.subscriptionError,
                        color: 'yellow',
                    });
                }
            },
            onFinish: () => {
                close();
            },
        });
    };

    return (
        <div>
            <Modal
                size="md"
                opened={modalState}
                onClose={() => setModalState.close()}
                title="Purchase License"
            >
                <form onSubmit={handleSubmit}>
                    <div className="mb-2 flex items-center">
                        <h1 className="text-3xl font-bold">
                            Total: €{totalPrice}
                        </h1>
                    </div>
                    <div className="flex items-end">
                        <h6 className="text-md font-bold">€{unitPrice}</h6>
                        <span className="text-gray-400">/user</span>
                    </div>
                    <TextInput
                        size="md"
                        className="w-full"
                        id="card_holder"
                        name="card_holder"
                        value={data.card_holder}
                        error={errors.card_holder}
                        withAsterisk
                        autoComplete="card_holder"
                        mt="md"
                        label="Card Holder Name"
                        onChange={(e) => setData('card_holder', e.target.value)}
                        inputWrapperOrder={[
                            'label',
                            'input',
                            'description',
                            'error',
                        ]}
                    />
                    <NumberInput
                        size="md"
                        className="my-4"
                        min={1}
                        withAsterisk
                        allowNegative={false}
                        allowDecimal={false}
                        label="Number of Licenses"
                        placeholder="6"
                        value={data.quantity}
                        error={errors.quantity}
                        onChange={(value) => {
                            const quantity = Number(value) || 1;

                            setData('quantity', quantity);

                            setTotalPrice(unitPrice * quantity);
                        }}
                    />
                    <div className="mt-2">
                        <PaymentElement id="payment-element" />
                    </div>
                    <div className="mt-2 flex justify-end gap-2">
                        <Button
                            variant="default"
                            onClick={() => {
                                setModalState.close();
                            }}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="filled"
                            color="black"
                            type="submit"
                            loading={loading}
                            loaderProps={{ type: 'dots' }}
                        >
                            Buy License
                        </Button>
                    </div>
                </form>
            </Modal>

            <Button
                variant="filled"
                color="black"
                onClick={() => {
                    setModalState.open();
                }}
            >
                Buy License
            </Button>
        </div>
    );
}

export default BuyLicense;
