import { User } from '@/types/user';
import { useForm, usePage } from '@inertiajs/react';
import { Button, Card, Modal, PasswordInput } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import { FormEventHandler, useRef } from 'react';

export default function EmailTwoFactor({ user }: { user: User }) {
    const twoFactorTypeEmail: string = usePage().props
        .twoFactorTypeEmail as string;
    const [openCreateTenantModal, createTenantModalManager] =
        useDisclosure(false);
    const passwordInput = useRef<HTMLInputElement>(null);
    const [loading, { open, close }] = useDisclosure(false);
    const { data, setData, errors, processing, reset, put } = useForm({
        current_password: '',
    });

    const handleTwoFAUpdate: FormEventHandler = (e) => {
        e.preventDefault();
        open();

        const type =
            user.two_factor_type != twoFactorTypeEmail
                ? twoFactorTypeEmail
                : 'disable';

        put(route('email.fa', { type }), {
            preserveScroll: true,
            onSuccess: () => {
                notifications.show({
                    title: 'Success',
                    message: 'E-Mail 2FA enabled successfully!',
                    color: 'green',
                });
                createTenantModalManager.close();
            },
            onError: () => passwordInput.current?.focus(),
            onFinish: () => {
                reset();
                close();
            },
        });
    };
    return (
        <Card shadow="sm" padding="lg" radius="md" withBorder={false}>
            <header>
                <h2 className="text-lg font-medium">
                    E-Mail Two Factor Authentication
                </h2>

                <p className="mt-1 text-sm">Enable for added security.</p>
            </header>
            <div className="mt-4">
                <Modal
                    opened={openCreateTenantModal}
                    onClose={() => {
                        createTenantModalManager.close();
                    }}
                    size="md"
                    title="Enable E-Mail Two Factor Authentication"
                >
                    <p className="font-semibold">
                        {user.two_factor_type == twoFactorTypeEmail
                            ? 'Are you sure you want to make this change?'
                            : 'Hurray for extra protection!'}
                    </p>
                    <div className="px-4">
                        <form onSubmit={handleTwoFAUpdate}>
                            <PasswordInput
                                mt="xl"
                                label="Password"
                                placeholder="Password"
                                error={errors.current_password}
                                withAsterisk
                                inputWrapperOrder={['label', 'input', 'error']}
                                name="current_password"
                                value={data.current_password}
                                onChange={(e) =>
                                    setData('current_password', e.target.value)
                                }
                            />

                            <div className="my-4 flex items-center gap-4">
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="filled"
                                    color={
                                        user.two_factor_type ==
                                        twoFactorTypeEmail
                                            ? 'red'
                                            : 'green'
                                    }
                                    disabled={processing}
                                    loading={loading}
                                    loaderProps={{
                                        type: 'dots',
                                    }}
                                >
                                    {user.two_factor_type == twoFactorTypeEmail
                                        ? 'De-Activate 2FA'
                                        : 'Activate 2FA'}
                                </Button>
                            </div>
                        </form>
                    </div>
                </Modal>

                <Button
                    variant="filled"
                    color={
                        user.two_factor_type == twoFactorTypeEmail
                            ? 'red'
                            : 'black'
                    }
                    onClick={() => {
                        createTenantModalManager.open();
                    }}
                >
                    {user.two_factor_type == twoFactorTypeEmail
                        ? 'Disable E-Mail Two Factor AuthenticationA'
                        : 'Enable E-Mail Two Factor Authentication'}
                </Button>
            </div>
        </Card>
    );
}
