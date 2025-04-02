import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InvoiceList from '@/Pages/Licenses/Partials/InvoiceList';
import { PaginatedInvoice } from '@/types/invoice';
import { LicenseType } from '@/types/license';
import { Head, usePage } from '@inertiajs/react';
import { Badge, Card } from '@mantine/core';

function LicenseDetails() {
    const license: LicenseType = usePage().props.license as LicenseType;
    const invoices: PaginatedInvoice = usePage().props
        .invoices as PaginatedInvoice;
    return (
        <AuthenticatedLayout>
            <Head title="License Details" />
            <div className="mb-2 flex items-center gap-4 text-lg font-bold">
                License Details{' '}
                <Badge
                    color={
                        license.subscription.stripe_status == 'active'
                            ? 'green'
                            : 'red'
                    }
                    variant="filled"
                    size="sm"
                >
                    {license.subscription.stripe_status}
                </Badge>
            </div>
            <div className="flex items-center justify-between gap-4">
                <Card
                    shadow="sm"
                    padding="lg"
                    radius="md"
                    withBorder
                    className="mt-2 w-full"
                >
                    <h1>Quantity: {license.subscription.quantity}</h1>
                </Card>
                <Card
                    shadow="sm"
                    padding="lg"
                    radius="md"
                    withBorder
                    className="mt-2 w-full"
                >
                    <h1>Used: {license.used}</h1>
                </Card>
                {license.subscription.stripe_status == 'active' ? (
                    ''
                ) : (
                    <Card
                        shadow="sm"
                        padding="lg"
                        radius="md"
                        withBorder
                        className="mt-2 w-full"
                    >
                        <h1>Ends: {license.subscription.ends_at}</h1>
                    </Card>
                )}
            </div>
            <InvoiceList invoices={invoices} />
        </AuthenticatedLayout>
    );
}

export default LicenseDetails;
