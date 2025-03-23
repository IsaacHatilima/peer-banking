import CentralSideNav from '@/Components/CentralSideNav';
import TenantSideNav from '@/Components/TenantSideNav';
import TopNav from '@/Components/TopNav';
import { Tenant } from '@/types/tenant';
import { User } from '@/types/user';
import { usePage } from '@inertiajs/react';
import { ActionIcon, AppShell, Burger, ScrollArea } from '@mantine/core';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import { IconCircleArrowUpFilled } from '@tabler/icons-react';
import {
    PropsWithChildren,
    ReactNode,
    useEffect,
    useRef,
    useState,
} from 'react';

export default function Authenticated({
    children,
}: PropsWithChildren<{ header?: ReactNode }>) {
    const user: User = usePage().props.auth.user;
    const tenant: Tenant = usePage().props.tenant;
    const [opened, { toggle }] = useDisclosure();
    const viewport = useRef<HTMLDivElement>(null);
    const [showScrollButton, setShowScrollButton] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (viewport.current) {
                setShowScrollButton(viewport.current.scrollTop > 100);
            }
        };

        const scrollEl = viewport.current;
        scrollEl?.addEventListener('scroll', handleScroll);

        return () => {
            scrollEl?.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const scrollToTop = () => {
        viewport.current?.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <AppShell
            header={{ height: 60 }}
            navbar={{
                width: 300,
                breakpoint: 'sm',
                collapsed: { mobile: !opened },
            }}
            padding="md"
        >
            <AppShell.Header>
                <div className="flex h-full w-full items-center justify-between">
                    <div className="ml-4">
                        <Burger
                            opened={opened}
                            onClick={toggle}
                            hiddenFrom="sm"
                            size="md"
                        />
                        {useMediaQuery('(min-width: 56.25em)') && <h1>Logo</h1>}
                    </div>
                    <TopNav user={user} />
                </div>
            </AppShell.Header>
            <AppShell.Navbar p="md">
                {!tenant ? <CentralSideNav /> : <TenantSideNav user={user} />}
            </AppShell.Navbar>
            <AppShell.Main>
                <ScrollArea
                    h="calc(100vh - 140px)"
                    type="never"
                    viewportRef={viewport}
                    scrollbarSize={0}
                >
                    {children}
                </ScrollArea>

                {showScrollButton && (
                    <div className="fixed bottom-5 right-5">
                        <ActionIcon
                            variant="filled"
                            size="lg"
                            aria-label="Scroll to top"
                            onClick={scrollToTop}
                            className="shadow-2xl"
                        >
                            <IconCircleArrowUpFilled
                                style={{ width: '70%', height: '70%' }}
                                stroke={1.5}
                            />
                        </ActionIcon>
                    </div>
                )}
            </AppShell.Main>
        </AppShell>
    );
}
