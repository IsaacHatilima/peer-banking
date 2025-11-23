'use client';

import AppearanceMode from '@/components/appearance-mode';
import { Card } from '@/components/ui/card';
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    navigationMenuTriggerStyle
} from '@/components/ui/navigation-menu';
import { useIsMobile } from '@/hooks/use-mobile';
import { home } from '@/routes';
import type { SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';

export default function Welcome() {
    const page = usePage<SharedData>();
    const isMobile = useIsMobile();
    return (
        <div>
            <Card className="flex h-18 w-full flex-row items-center justify-between">
                <h2 className="text-md ml-5 font-semibold">
                    {page.props.name}
                </h2>
                <div className="flex flex-row items-center justify-between">
                    <NavigationMenu viewport={isMobile}>
                        <NavigationMenuList className="flex-wrap">
                            <NavigationMenuItem>
                                <NavigationMenuLink
                                    asChild
                                    className={navigationMenuTriggerStyle()}
                                >
                                    <Link href={home()}>Home</Link>
                                </NavigationMenuLink>
                            </NavigationMenuItem>
                            <NavigationMenuItem>
                                <NavigationMenuLink
                                    asChild
                                    className={navigationMenuTriggerStyle()}
                                >
                                    <Link href={home()}>About</Link>
                                </NavigationMenuLink>
                            </NavigationMenuItem>
                            <NavigationMenuItem>
                                <NavigationMenuLink
                                    asChild
                                    className={navigationMenuTriggerStyle()}
                                >
                                    <Link href={home()}>Other</Link>
                                </NavigationMenuLink>
                            </NavigationMenuItem>
                        </NavigationMenuList>
                    </NavigationMenu>
                    <div className="mr-5">
                        <AppearanceMode />
                    </div>
                </div>
            </Card>
            <div className="m-1 mt-3">
                <div className="relative aspect-[16/6] w-full overflow-hidden rounded-lg">
                    {/* Image */}
                    <img
                        src="/images/finance-8836903_1920.jpg"
                        alt="financial banner"
                        className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
                    />

                    {/* Overlay gradient (optional but sexy) */}
                    <div className="absolute inset-0 bg-black/40" />

                    {/* Text Content */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
                        <h2 className="animate-[slideUpFade_0.6s_ease-out_forwards] text-5xl font-bold text-white opacity-0 drop-shadow-lg delay-100">
                            Your Financial Safety Net Starts Here
                        </h2>

                        <p className="mt-2 animate-[slideUpFade_0.6s_ease-out_forwards] text-2xl text-white/80 opacity-0 delay-300">
                            Smart tools, clear insights — zero nonsense.
                        </p>
                    </div>
                </div>
                <section
                    className="mx-5 mt-2 grid grid-cols-2 gap-4"
                    id="about-peer-banking"
                >
                    <div className="w-full animate-[slideUpFade_0.6s_ease-out_forwards] overflow-hidden rounded-lg shadow-lg delay-[0ms]">
                        <img
                            src="/images/about.jpg"
                            alt="financial banner"
                            className="h-full w-full rounded-lg"
                        />
                    </div>
                    <div>
                        <div className="flex flex-row items-center justify-center px-6 text-center">
                            <h2 className="animate-[slideUpFade_0.9s_ease-out_forwards] text-5xl font-bold text-black opacity-0 drop-shadow-lg delay-100 delay-[200ms] dark:text-white">
                                About Peer Banking
                            </h2>
                        </div>
                        <p className="flex flex-row items-center justify-center px-6 text-center">
                            <h2 className="animate-[slideUpFade_0.9s_ease-out_forwards] text-2xl font-bold text-black opacity-0 drop-shadow-lg delay-100 delay-[400ms] dark:text-white">
                                Here’s how it works:
                            </h2>
                        </p>

                        <ul>
                            <li className="mt-5 animate-[slideUpFade_0.9s_ease-out_forwards] opacity-0 delay-[500ms]">
                                <strong>Create a circle:</strong> A group of
                                friends agrees to join a peer banking circle and
                                set a cycle (for example, 6 or 12 months).
                            </li>
                            <li className="mt-3 animate-[slideUpFade_0.9s_ease-out_forwards] opacity-0 delay-[550ms]">
                                <strong>Contribute every month:</strong> Each
                                member sends a minimum agreed amount to one
                                shared account (this can be a PayPal account or
                                a regular bank account).
                            </li>
                            <li className="mt-3 animate-[slideUpFade_0.9s_ease-out_forwards] opacity-0 delay-[600ms]">
                                <strong>Borrow from the group:</strong> When a
                                member needs a loan, they can request it from
                                the shared pool instead of a traditional lender.
                            </li>
                            <li className="mt-3 animate-[slideUpFade_0.9s_ease-out_forwards] opacity-0 delay-[650ms]">
                                <strong>Repay with a small interest:</strong>{' '}
                                The borrower pays back the loan with a small
                                fixed interest agreed by the, for example{' '}
                                <strong>5%</strong>.
                            </li>
                            <li className="mt-3 animate-[slideUpFade_0.9s_ease-out_forwards] opacity-0 delay-[700ms]">
                                <strong>Share the gains:</strong> At the end of
                                the cycle, everyone gets back the total amount
                                they contributed, plus an equal share of all
                                loan interest collected:
                                <strong>
                                    <em>interest earned ÷ number of members</em>
                                </strong>
                                .
                            </li>
                        </ul>

                        <p className="mt-3 animate-[slideUpFade_0.9s_ease-out_forwards] opacity-0 delay-[1000ms]">
                            The idea is simple: you and your friends pool money,
                            support each other with quick loans, and everyone
                            benefits from the interest instead of a bank. Peer
                            Banking makes this process transparent, trackable,
                            and organized, so your circle always knows who paid,
                            who borrowed, and how much is owed.
                        </p>

                        <p className="mt-3 animate-[slideUpFade_0.9s_ease-out_forwards] opacity-0 delay-[1200ms]">
                            <strong>
                                #Save together. #Lend together. #Grow together.
                            </strong>
                        </p>
                    </div>
                </section>
            </div>
        </div>
    );
}
