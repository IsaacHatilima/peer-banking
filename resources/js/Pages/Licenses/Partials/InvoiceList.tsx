import { Invoice, PaginatedInvoice } from '@/types/invoice';
import { Drawer, ScrollArea, Table } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

function InvoiceList({ invoices }: { invoices: PaginatedInvoice }) {
    const [opened, { open, close }] = useDisclosure(false);

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
        <>
            <Drawer
                opened={opened}
                onClose={close}
                position="right"
                size="lg"
                overlayProps={{ backgroundOpacity: 0.5, blur: 1 }}
                scrollAreaComponent={ScrollArea.Autosize}
            >
                <div className="mb-2 text-lg font-bold">License Invoices</div>
                <Table striped highlightOnHover>
                    <Table.Thead>
                        <Table.Tr>
                            <Table.Th>Invoice Number</Table.Th>
                            <Table.Th>Date</Table.Th>
                            <Table.Th>Total</Table.Th>
                            <Table.Th>Action</Table.Th>
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>{rows}</Table.Tbody>
                </Table>
            </Drawer>
            <span onClick={open} className="cursor-pointer text-sky-500">
                View Invoices
            </span>
        </>
    );
}

export default InvoiceList;
