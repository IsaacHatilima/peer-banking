import { User } from '@/types/user';
import { useForm, usePage } from '@inertiajs/react';
import { Button, Select, TextInput } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { FormEventHandler } from 'react';

interface FormProps {
    user?: User;
    buttonLabel: string;
    createTenantModalManager: {
        open: () => void;
        close: () => void;
        toggle: () => void;
    };
}

export default function UserForm({
    user,
    buttonLabel,
    createTenantModalManager,
}: FormProps) {
    const roles: Array<string> = usePage().props.tenantRoles as Array<string>;
    const { data, setData, errors, put, post, reset } = useForm({
        email: user ? user.email : '',
        first_name: user ? user.profile.first_name : '',
        last_name: user ? user.profile.last_name : '',
        role: user ? user.role : roles[0],
    });
    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();

        if (user) {
            put(route('users.update', user.id), {
                onSuccess: () => {
                    notifications.show({
                        title: 'Success',
                        message: 'User has been updated successfully!',
                        color: 'green',
                    });
                    createTenantModalManager.close();
                },
                onError: () => {},
            });
        } else {
            post(route('users.store'), {
                onSuccess: () => {
                    notifications.show({
                        title: 'Success',
                        message: 'User has been created successfully!',
                        color: 'green',
                    });
                    createTenantModalManager.close();
                    reset();
                },
                onError: () => {},
            });
        }
    };
    return (
        <form onSubmit={handleSubmit} className="mt-6 w-full">
            <div className="w-full">
                <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                    <TextInput
                        className="w-full"
                        id="first_name"
                        name="first_name"
                        value={data.first_name}
                        error={errors.first_name}
                        withAsterisk
                        autoComplete="first_name"
                        mt="md"
                        data-autofocus
                        label="First Name"
                        onChange={(e) => setData('first_name', e.target.value)}
                        inputWrapperOrder={[
                            'label',
                            'input',
                            'description',
                            'error',
                        ]}
                    />
                    <TextInput
                        className="w-full"
                        id="last_name"
                        name="last_name"
                        value={data.last_name}
                        error={errors.last_name}
                        withAsterisk
                        autoComplete="last_name"
                        mt="md"
                        label="Last Name"
                        onChange={(e) => setData('last_name', e.target.value)}
                        inputWrapperOrder={[
                            'label',
                            'input',
                            'description',
                            'error',
                        ]}
                    />
                </div>
                <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                    <TextInput
                        className="w-full"
                        id="email"
                        name="email"
                        value={data.email}
                        error={errors.email}
                        withAsterisk
                        autoComplete="email"
                        mt="md"
                        label="Email"
                        onChange={(e) => setData('email', e.target.value)}
                        inputWrapperOrder={[
                            'label',
                            'input',
                            'description',
                            'error',
                        ]}
                    />
                    <Select
                        mt="md"
                        label="Role"
                        error={errors.role}
                        value={data.role}
                        withAsterisk
                        data={roles.map((role) => ({
                            value: role,
                            label: role.charAt(0).toUpperCase() + role.slice(1),
                        }))}
                        onChange={(_value, option) =>
                            setData('role', option.value)
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
                    type="submit"
                    variant="filled"
                    color="black"
                    loaderProps={{ type: 'dots' }}
                >
                    {buttonLabel} {/* Toggle between Create and Update */}
                </Button>
            </div>
        </form>
    );
}
