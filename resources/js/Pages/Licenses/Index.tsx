import Layout from '@/Layouts/AuthenticatedLayout';
import BuyLicense from '@/Pages/Licenses/Partials/BuyLicense';
import InvoiceList from '@/Pages/Licenses/Partials/InvoiceList';
import { PaginatedInvoice } from '@/types/invoice';
import { LicenseType, PaginatedLicenseType } from '@/types/license';
import { SetupIntentType } from '@/types/stripe';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { Card, Group, Pagination, Table } from '@mantine/core';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useEffect, useState } from 'react';

export default function Index() {
    const licenses: PaginatedLicenseType = usePage().props
        .licenses as PaginatedLicenseType;
    const invoices: PaginatedInvoice = usePage().props
        .invoices as PaginatedInvoice;
    const intent: SetupIntentType = usePage().props.intent as SetupIntentType;
    const licensePrice: number = usePage().props.licensePrice as number;

    const stripeKey: string = usePage().props.stripeKey as string;

    const stripePromise = loadStripe(stripeKey);

    const [clientSecret, setClientSecret] = useState('');

    useEffect(() => {
        if (intent?.client_secret) {
            setClientSecret(intent.client_secret);
        }
    }, [intent]);

    if (!clientSecret) {
        return (
            <div>
                Error: Unable to load payment details. Please try again later.
            </div>
        );
    }

    const rows = licenses?.data.map((license: LicenseType) => (
        <Table.Tr key={license.id}>
            <Table.Td>€{licensePrice}</Table.Td>
            <Table.Td>{license.subscription.quantity}</Table.Td>
            <Table.Td>€{license.subscription.quantity * licensePrice}</Table.Td>
            <Table.Td>{license.used}</Table.Td>
            <Table.Td>{license.subscription.stripe_status}</Table.Td>
            <Table.Td>
                <div className="flex gap-2">
                    <InvoiceList invoices={invoices} />
                    <Link
                        href={route('license.show', license.id)}
                        className="cursor-pointer text-teal-700"
                    >
                        Issue License
                    </Link>
                </div>
            </Table.Td>
        </Table.Tr>
    ));
    return (
        <Layout>
            <Head title="Licenses" />
            <Card
                shadow="sm"
                padding="lg"
                radius="md"
                withBorder
                className="mt-2"
            >
                <div className="flex justify-between">
                    <h2 className="mb-4 text-lg font-semibold">
                        Subscriptions
                    </h2>
                    <Elements
                        stripe={stripePromise}
                        options={{
                            clientSecret: clientSecret,
                            appearance: {
                                theme: 'stripe',
                            },
                        }}
                    >
                        <BuyLicense intent={intent} />
                    </Elements>
                </div>
                <Table striped highlightOnHover>
                    <Table.Thead>
                        <Table.Tr>
                            <Table.Th>Unit Price</Table.Th>
                            <Table.Th>Quantity</Table.Th>
                            <Table.Th>Total Price</Table.Th>
                            <Table.Th>Used</Table.Th>
                            <Table.Th>Status</Table.Th>
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>{rows}</Table.Tbody>
                </Table>

                <div className="mt-4 flex justify-end">
                    <Pagination.Root
                        total={licenses.last_page}
                        value={licenses.current_page}
                        getItemProps={(page) => ({
                            href: licenses.links[page]?.url,
                            onClick: () => {
                                if (licenses.links[page]?.url) {
                                    router.get(licenses.links[page].url);
                                }
                            },
                        })}
                    >
                        <Group gap={5} justify="center">
                            <Pagination.First
                                onClick={() => router.visit(licenses.path)}
                            />
                            <Pagination.Previous
                                onClick={() =>
                                    router.visit(licenses.prev_page_url)
                                }
                            />

                            <Pagination.Items />

                            <Pagination.Next
                                onClick={() =>
                                    router.visit(licenses.next_page_url)
                                }
                            />
                            <Pagination.Last
                                onClick={() =>
                                    router.visit(licenses.last_page_url)
                                }
                            />
                        </Group>
                    </Pagination.Root>
                </div>
                <div className="mt-4 flex justify-end">
                    <p className="text-sm font-thin text-gray-400">
                        {licenses.from} to {licenses.to} of {licenses.total}
                    </p>
                </div>
            </Card>
        </Layout>
    );
}
