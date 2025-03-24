import { User } from '@/types/user';
import { useForm } from '@inertiajs/react';
import { Button, Modal, PasswordInput } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import React, { FormEventHandler, useEffect, useRef } from 'react';

function ToggleUserState({ user }: { user: User }) {
    const [openCreateTenantModal, createTenantModalManager] =
        useDisclosure(false);
    const passwordInput = useRef<HTMLInputElement>(null);

    const {
        data,
        setData,
        reset,
        delete: destroy,
        put,
        patch,
        errors,
    } = useForm({
        current_password: '',
    });

    const handleToggleState: FormEventHandler = (
        e: React.MouseEvent<HTMLButtonElement>,
    ): void => {
        e.preventDefault();
        put(route('users.toggle', user.id), {
            preserveScroll: true,
            onSuccess: () => {
                notifications.show({
                    title: 'Success',
                    message: 'Account updated successfully!',
                    color: 'green',
                });
                createTenantModalManager.close();
            },
            onError: () => passwordInput.current?.focus(),
            onFinish: () => {
                reset();
            },
        });
    };

    const handleDelete: FormEventHandler = (
        e: React.MouseEvent<HTMLButtonElement>,
    ): void => {
        e.preventDefault();
        destroy(route('users.destroy', user.id), {
            preserveScroll: true,
            onSuccess: () => {
                notifications.show({
                    title: 'Success',
                    message: 'Account deleted successfully!',
                    color: 'green',
                });
                createTenantModalManager.close();
            },
            onError: () => passwordInput.current?.focus(),
            onFinish: () => {
                reset();
            },
        });
    };

    const handleRestore: FormEventHandler = (
        e: React.MouseEvent<HTMLButtonElement>,
    ): void => {
        e.preventDefault();
        patch(route('users.restore', user.id), {
            preserveScroll: true,
            onSuccess: () => {
                notifications.show({
                    title: 'Success',
                    message: 'Account restored successfully!',
                    color: 'green',
                });
                createTenantModalManager.close();
            },
            onError: () => passwordInput.current?.focus(),
            onFinish: () => {
                reset();
            },
        });
    };

    useEffect(() => {
        const handleEnterKey = (e: KeyboardEvent) => {
            if (e.key === 'Enter') {
                e.preventDefault();
            }
        };

        window.addEventListener('keydown', handleEnterKey);

        return () => {
            window.removeEventListener('keydown', handleEnterKey);
        };
    }, []);

    return (
        <>
            <Modal
                opened={openCreateTenantModal}
                onClose={() => {
                    createTenantModalManager.close();
                }}
                size="lg"
                title="Delete User"
            >
                <header>
                    <div className="mb-2 w-full rounded-md bg-red-600 p-3">
                        <h2 className="text-lg font-medium text-white">
                            Danger Zone
                        </h2>
                    </div>

                    <h2 className="text-lg font-medium">Delete Account</h2>

                    <p className="mt-1 text-sm">
                        Once your account is deleted, all of its resources and
                        data will be permanently deleted.
                    </p>
                </header>

                <form className="mt-6 w-full">
                    <div className="w-full">
                        <div className="">
                            <PasswordInput
                                id="current_password"
                                name="current_password"
                                value={data.current_password}
                                error={errors.current_password}
                                autoComplete="password"
                                data-autofocus
                                mt="md"
                                label="Password"
                                placeholder="Password"
                                onChange={(e) =>
                                    setData('current_password', e.target.value)
                                }
                                inputWrapperOrder={[
                                    'label',
                                    'input',
                                    'description',
                                    'error',
                                ]}
                            />
                        </div>
                    </div>

                    <div className="mt-4 flex justify-end gap-2">
                        <Button
                            variant="default"
                            onClick={() => {
                                createTenantModalManager.close();
                                reset();
                            }}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="button"
                            name="action"
                            value="toggle"
                            variant="filled"
                            color={user.is_active ? 'yellow' : 'green'}
                            loaderProps={{ type: 'dots' }}
                            onClick={handleToggleState}
                        >
                            {user.is_active ? 'Deactivate' : 'Activate'}
                        </Button>

                        {user.deleted_at ? (
                            <Button
                                type="button"
                                name="action"
                                value="restore"
                                variant="filled"
                                color="green"
                                loaderProps={{ type: 'dots' }}
                                onClick={handleRestore}
                            >
                                Restore
                            </Button>
                        ) : (
                            <Button
                                type="button"
                                name="action"
                                value="delete"
                                variant="filled"
                                color="red"
                                loaderProps={{ type: 'dots' }}
                                onClick={handleDelete}
                            >
                                Delete
                            </Button>
                        )}
                    </div>
                </form>
            </Modal>

            <span
                className={`cursor-pointer ${
                    user.deleted_at
                        ? 'text-green-600'
                        : user.is_active
                          ? 'text-red-600'
                          : 'text-green-600'
                } hover:underline`}
                onClick={() => {
                    createTenantModalManager.open();
                }}
            >
                {user.deleted_at
                    ? 'Restore'
                    : user.is_active
                      ? 'Delete User'
                      : 'Activate'}
            </span>
        </>
    );
}

export default ToggleUserState;
