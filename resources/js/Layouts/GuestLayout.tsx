import { Card, Container } from '@mantine/core';
import { PropsWithChildren } from 'react';
import Logo from '../Components/Logo';

export default function Guest({ children }: PropsWithChildren) {
    return (
        <Container className="flex min-h-screen flex-col items-center justify-center">
            <Logo />

            <Card
                shadow="sm"
                radius="md"
                withBorder
                className="mt-6 w-full overflow-hidden shadow-md sm:max-w-md sm:rounded-lg"
            >
                {children}
            </Card>
        </Container>
    );
}
