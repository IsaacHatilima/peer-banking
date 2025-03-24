import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import EmailTwoFactor from '@/Pages/Profile/Partials/EmailTwoFactor';
import TwoFactorConfig from '@/Pages/Profile/Partials/TwoFactorConfig';
import { User } from '@/types/user';
import { Head, usePage } from '@inertiajs/react';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';

export default function Security() {
    const fortify: boolean = usePage().props.fortify as boolean;
    const user: User = usePage().props.auth.user;

    return (
        <AuthenticatedLayout>
            <Head title="Profile" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
                    <UpdatePasswordForm />

                    {user.two_factor_type != 'fortify' && (
                        <EmailTwoFactor user={user} />
                    )}

                    {fortify && <TwoFactorConfig />}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
