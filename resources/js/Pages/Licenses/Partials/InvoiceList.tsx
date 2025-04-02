import { Invoice, PaginatedInvoice } from '@/types/invoice';
import { router } from '@inertiajs/react';
import { Card, Group, Pagination, Table } from '@mantine/core';

function InvoiceList({ invoices }: { invoices: PaginatedInvoice }) {
    const rows = invoices?.data.map((invoices: Invoice) => (
        <Table.Tr key={invoices.id}>
            <Table.Td>{invoices.number}</Table.Td>
            <Table.Td>{invoices.created}</Table.Td>
            <Table.Td>{invoices.total}</Table.Td>
            <Table.Td>
                <a
                    href={invoices.download_url}
                    className="text-sky-500"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Download
                </a>
            </Table.Td>
        </Table.Tr>
    ));
    return (
        <Card shadow="sm" padding="lg" radius="md" withBorder className="mt-2">
            <div className="mb-2 text-lg font-bold">License Invoices</div>
            <Table striped highlightOnHover>
                <Table.Thead>
                    <Table.Tr>
                        <Table.Th>Invoice Number</Table.Th>
                        <Table.Th>Date</Table.Th>
                        <Table.Th>Total</Table.Th>
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>{rows}</Table.Tbody>
            </Table>

            <div className="mt-4 flex justify-end">
                <Pagination.Root
                    total={invoices.last_page}
                    value={invoices.current_page}
                    getItemProps={(page) => ({
                        href: invoices.links[page]?.url,
                        onClick: () => {
                            if (invoices.links[page]?.url) {
                                router.get(invoices.links[page].url);
                            }
                        },
                    })}
                >
                    <Group gap={5} justify="center">
                        <Pagination.First
                            onClick={() => router.visit(invoices.path)}
                        />
                        <Pagination.Previous
                            onClick={() => router.visit(invoices.prev_page_url)}
                        />

                        <Pagination.Items />

                        <Pagination.Next
                            onClick={() => router.visit(invoices.next_page_url)}
                        />
                        <Pagination.Last
                            onClick={() => router.visit(invoices.last_page_url)}
                        />
                    </Group>
                </Pagination.Root>
            </div>
            <div className="mt-4 flex justify-end">
                <p className="text-sm font-thin text-gray-400">
                    {invoices.from} to {invoices.to} of {invoices.total}
                </p>
            </div>
        </Card>
    );
}

export default InvoiceList;
