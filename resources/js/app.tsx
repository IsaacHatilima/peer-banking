/* eslint-disable prettier/prettier */
import { createInertiaApp } from '@inertiajs/react';
import { createTheme, localStorageColorSchemeManager, MantineProvider, rem } from '@mantine/core';
import '../css/app.css';

import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import { Notifications } from '@mantine/notifications';
import '@mantine/notifications/styles.css';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot, hydrateRoot } from 'react-dom/client';

import './bootstrap';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

const colorSchemeManager = localStorageColorSchemeManager({
    key: 'mantine-color-scheme-value',
});

const theme = createTheme({
    fontSizes: {
        sm: rem(13),
    },
});

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.tsx`,
            import.meta.glob('./Pages/**/*.tsx'),
        ),
    setup({ el, App, props }) {
        const RootComponent = (
            <MantineProvider
                colorSchemeManager={colorSchemeManager}
                theme={theme}
            >
                <Notifications position="top-right" limit={5} />
                <App {...props} />
            </MantineProvider>
        );

        if (import.meta.env.SSR) {
            hydrateRoot(el, RootComponent);
        } else {
            createRoot(el).render(RootComponent);
        }
    },
    progress: {
        color: '#4B5563',
    },
}).then(() => {});
