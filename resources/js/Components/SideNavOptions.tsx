import { MenuItem } from '@/types/menu';
import { Link } from '@inertiajs/react';
import { NavLink } from '@mantine/core';

type SidebarNavProps = {
    items: MenuItem[];
};

function SideNavOptions(props: SidebarNavProps) {
    return (
        <>
            {props.items.map((item) => {
                // Check if current route matches the parent or any of its children
                const isActive =
                    window.location.pathname ===
                        new URL(item.href, window.location.origin).pathname ||
                    window.location.pathname.startsWith(
                        new URL(item.href, window.location.origin).pathname +
                            '/',
                    ) ||
                    item.children?.some(
                        (child) =>
                            window.location.pathname ===
                            new URL(child.href, window.location.origin)
                                .pathname,
                    );

                return (
                    <NavLink
                        key={item.label}
                        href={item.href}
                        active={isActive}
                        label={item.label}
                        leftSection={<item.icon size="1rem" />}
                        component={Link}
                        variant="subtle"
                        defaultOpened={isActive}
                    >
                        {item.children?.length
                            ? item.children.map((child) => (
                                  <NavLink
                                      key={child.label}
                                      href={child.href}
                                      variant="subtle"
                                      active={
                                          window.location.pathname ===
                                          new URL(
                                              child.href,
                                              window.location.origin,
                                          ).pathname
                                      }
                                      label={child.label}
                                      className="-ml -5 pl-8"
                                      component={Link}
                                  />
                              ))
                            : null}
                    </NavLink>
                );
            })}
        </>
    );
}

export default SideNavOptions;
