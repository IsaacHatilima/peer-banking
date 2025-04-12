import TablePagination from '@/Components/TablePagination';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { PaginatedUsers, TenantUserFilter, User } from '@/types/user';
import { Head, router, useForm, usePage } from '@inertiajs/react';
import { Badge, Card, Table, TextInput } from '@mantine/core';
import { debounce } from 'lodash';
import { useEffect, useState } from 'react';

export default function UserLicenseManager() {
    const licenseId: string = usePage().props.licenseId as string;
    const [isFiltering, setIsFiltering] = useState(false);
    const tenantUsers = usePage().props.users as PaginatedUsers;
    const filters: TenantUserFilter = usePage().props
        .filters as TenantUserFilter;
    const { data, setData } = useForm({
        first_name: filters?.first_name || '',
        last_name: filters?.last_name || '',
        email: filters?.email || '',
        role: filters?.role || '',
        verified: filters?.verified || '',
        active: filters?.active || '',
    });

    const rows = tenantUsers?.data.map((user: User) => (
        <Table.Tr key={user.id} className={user.deleted_at ? 'bg-red-50' : ''}>
            <Table.Td>
                {user.profile.first_name}
                {user.deleted_at ? '  ' : ''}
                <span className="text-red-500">
                    {user.deleted_at && (
                        <Badge color="red" variant="filled" size="xs">
                            Deleted
                        </Badge>
                    )}
                </span>
            </Table.Td>
            <Table.Td>{user.profile.last_name}</Table.Td>
            <Table.Td>{user.email}</Table.Td>
            <Table.Td>
                <Badge
                    color={user.license_id != null ? 'green' : 'yellow'}
                    variant="outline"
                    size="sm"
                >
                    {user.license_id != null ? 'Assigned' : 'Unassigned'}
                </Badge>
            </Table.Td>
            <Table.Td className="flex gap-4">
                {user.license_id != null ? (
                    <span className="text-red-500 hover:cursor-pointer hover:underline">
                        Revoke
                    </span>
                ) : (
                    <span className="text-green-500 hover:cursor-pointer hover:underline">
                        Assign
                    </span>
                )}
            </Table.Td>
        </Table.Tr>
    ));

    const handleSearch = debounce(() => {
        setIsFiltering(true);

        const urlParams = new URLSearchParams(window.location.search);
        const currentPage = urlParams.get('page') || '1';

        const filtersPresent = Object.keys(data).some(
            (key) => data[key as keyof TenantUserFilter] !== '',
        );

        const setOrDeleteParam = (key: string, value: string | undefined) => {
            if (value) {
                urlParams.set(key, value);
            } else {
                urlParams.delete(key);
            }
        };

        setOrDeleteParam('first_name', data.first_name);
        setOrDeleteParam('last_name', data.last_name);
        setOrDeleteParam('email', data.email);

        urlParams.set('page', filtersPresent ? '1' : currentPage);

        const targetUrl = `${route('license.show', licenseId)}?${urlParams.toString()}`;

        router.get(
            targetUrl,
            {},
            {
                replace: true,
                preserveState: true,
                preserveScroll: true,
            },
        );
    }, 300);

    useEffect(() => {
        if (isFiltering) {
            handleSearch();
        }
    }, [data, handleSearch, isFiltering]);

    return (
        <AuthenticatedLayout>
            <Head title="Tenant Users" />
            <Card
                shadow="sm"
                padding="lg"
                radius="md"
                withBorder
                className="mt-2"
            >
                <div className="flex justify-between">
                    <h2 className="mb-4 text-lg font-semibold">Users</h2>
                </div>
                <Table striped highlightOnHover>
                    <Table.Thead>
                        <Table.Tr>
                            <Table.Th>First Name</Table.Th>
                            <Table.Th>Last Name</Table.Th>
                            <Table.Th>Email</Table.Th>
                            <Table.Th>Action</Table.Th>
                        </Table.Tr>
                        <Table.Tr>
                            <Table.Th>
                                <TextInput
                                    size="xs"
                                    className="font-medium"
                                    id="first_name"
                                    name="first_name"
                                    placeholder="First Name"
                                    value={data.first_name}
                                    onChange={(e) => {
                                        setData('first_name', e.target.value);
                                        setIsFiltering(true);
                                    }}
                                />
                            </Table.Th>
                            <Table.Th>
                                <TextInput
                                    size="xs"
                                    className="font-medium"
                                    id="last_name"
                                    name="last_name"
                                    placeholder="Last Name"
                                    value={data.last_name}
                                    onChange={(e) => {
                                        setData('last_name', e.target.value);
                                        setIsFiltering(true);
                                    }}
                                />
                            </Table.Th>
                            <Table.Th>
                                <TextInput
                                    size="xs"
                                    className="font-medium"
                                    id="email"
                                    name="email"
                                    placeholder="E-Mail"
                                    value={data.email}
                                    onChange={(e) => {
                                        setData('email', e.target.value);
                                        setIsFiltering(true);
                                    }}
                                />
                            </Table.Th>
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>{rows}</Table.Tbody>
                </Table>

                <TablePagination data={tenantUsers} />
            </Card>
        </AuthenticatedLayout>
    );
}
