import { SetupIntentType } from '@/types/stripe';
import { useForm } from '@inertiajs/react';
import { Button, Modal, NumberInput } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import {
    PaymentElement,
    useElements,
    useStripe,
} from '@stripe/react-stripe-js';
import { FormEventHandler } from 'react';

function BuyLicense({ intent }: { intent: SetupIntentType }) {
    const [modalState, setModalState] = useDisclosure(false);
    const [loading, { open, close }] = useDisclosure();

    const unitPrice = 2.5;
    const quantity = 1;
    const totalPrice = (unitPrice * quantity).toFixed(2);

    const { data, setData, errors, post, reset } = useForm<{
        quantity: string | number;
        unit_price: string;
        setup_intent?: string;
    }>({
        unit_price: unitPrice.toString(),
        quantity: quantity,
        setup_intent: intent.id,
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
                return_url: `${window.location.origin}/completion`,
            },
            redirect: 'if_required',
        });

        if (error?.type === 'card_error') {
            notifications.show({
                title: 'Error',
                message: 'card_error.',
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
                notifications.show({
                    title: 'Error',
                    message: errors.error,
                    color: 'red',
                });
            },
            onFinish: () => {
                close();
            },
        });
    };

    return (
        <div>
            <Modal
                opened={modalState}
                onClose={() => setModalState.close()}
                title="Purchase License"
            >
                <form onSubmit={handleSubmit}>
                    <div className="flex items-end">
                        <h1 className="text-3xl font-bold">€{totalPrice}</h1>
                        <span className="text-gray-400">/user</span>
                    </div>
                    <NumberInput
                        min={1}
                        withAsterisk
                        allowNegative={false}
                        allowDecimal={false}
                        label="Number of Licenses"
                        placeholder="6"
                        value={data.quantity}
                        error={errors.quantity}
                        onChange={(value) => setData('quantity', value ?? 1)}
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
