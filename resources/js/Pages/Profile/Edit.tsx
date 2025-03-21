import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { PageProps } from '@/types';
import { Head } from '@inertiajs/react';
import { Card } from '@mantine/core';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';

export default function Edit({
    mustVerifyEmail,
    status,
}: PageProps<{ mustVerifyEmail: boolean; status?: string }>) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Profile
                </h2>
            }
        >
            <Head title="Profile" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
                    <Card
                        shadow="sm"
                        padding="lg"
                        radius="md"
                        withBorder={false}
                    >
                        <UpdateProfileInformationForm
                            mustVerifyEmail={mustVerifyEmail}
                            status={status}
                        />
                    </Card>

                    <Card
                        shadow="sm"
                        padding="lg"
                        radius="md"
                        withBorder={false}
                    >
                        <DeleteUserForm />
                    </Card>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
