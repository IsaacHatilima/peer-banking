import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import TenantData from '@/Pages/Central/Tenant/Partials/TenantData';
import TenantUsers from '@/Pages/Central/Tenant/Partials/TenantUsers';
import UpdateSubdomain from '@/Pages/Central/Tenant/Partials/UpdateSubdomain';
import { Tenant } from '@/types/tenant';
import { Head, usePage, WhenVisible } from '@inertiajs/react';
import { Badge, Card, Divider, Tabs, Text, Title } from '@mantine/core';
import { useEffect, useState } from 'react';
import {
    MdOutlineContactMail,
    MdOutlinePayments,
    MdOutlinePeopleAlt,
    MdOutlineStickyNote2,
} from 'react-icons/md';

function TenantDetails() {
    const tenant_data: Tenant = usePage().props.tenant_data as Tenant;
    const defaultTab = 'details';
    const queryParams = new URLSearchParams(window.location.search);
    const initialTab = queryParams.get('tab') || defaultTab;
    const [activeTab, setActiveTab] = useState(initialTab);

    const handleTabChange = (value: string | null) => {
        if (!value) return;

        setActiveTab(value);

        const newUrl = new URL(window.location.href);
        newUrl.searchParams.set('tab', value);
        window.history.pushState({}, '', newUrl);
    };

    useEffect(() => {
        const queryParams = new URLSearchParams(window.location.search);
        if (!queryParams.has('tab')) {
            setActiveTab(defaultTab);
        }
    }, []);

    return (
        <AuthenticatedLayout>
            <Head title="Tenants" />

            <Tabs
                variant="pills"
                color="blue"
                value={activeTab}
                onChange={handleTabChange}
            >
                <Tabs.List>
                    <Tabs.Tab
                        value="details"
                        leftSection={<MdOutlineContactMail size={15} />}
                    >
                        Tenant Details
                    </Tabs.Tab>
                    <Tabs.Tab
                        value="users"
                        leftSection={<MdOutlinePeopleAlt size={15} />}
                    >
                        Users
                    </Tabs.Tab>
                    <Tabs.Tab
                        value="payments"
                        leftSection={<MdOutlinePayments size={15} />}
                    >
                        Payments
                    </Tabs.Tab>
                    <Tabs.Tab
                        value="licenses"
                        leftSection={<MdOutlineStickyNote2 size={15} />}
                    >
                        Licenses
                    </Tabs.Tab>
                </Tabs.List>

                <Card
                    shadow="sm"
                    padding="lg"
                    radius="md"
                    withBorder
                    className="mt-2"
                >
                    <Tabs.Panel value="details">
                        <div>
                            <Title order={3}>Tenant Details</Title>
                            <div className="mt-2 flex items-center gap-2">
                                <Text c="dimmed">
                                    {tenant_data.tenant_number}
                                </Text>
                                <Badge
                                    color={
                                        tenant_data.status == 'active'
                                            ? 'green'
                                            : 'red'
                                    }
                                    variant="outline"
                                    size="sm"
                                >
                                    {tenant_data.status}
                                </Badge>
                            </div>

                            <TenantData tenant={tenant_data} />
                        </div>

                        <Divider my="md" />

                        <div>
                            <Title order={3}>Domain Details</Title>
                            <UpdateSubdomain tenant={tenant_data} />
                        </div>
                    </Tabs.Panel>

                    <Tabs.Panel value="users">
                        <WhenVisible data="tenant_users" fallback="Loading">
                            <TenantUsers tenant={tenant_data} />
                        </WhenVisible>
                    </Tabs.Panel>

                    <Tabs.Panel value="payments">
                        Settings tab content
                    </Tabs.Panel>
                    <Tabs.Panel value="licenses">
                        Licenses tab content
                    </Tabs.Panel>
                </Card>
            </Tabs>
        </AuthenticatedLayout>
    );
}

export default TenantDetails;
