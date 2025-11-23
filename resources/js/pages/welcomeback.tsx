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

                    {/* Overlay gradient */}
                    <div className="absolute inset-0 bg-black/50" />

                    {/* Text Content */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
                        <h2 className="animate-[slideUpFade_0.6s_ease-out_forwards] text-5xl font-extrabold text-white opacity-0 drop-shadow-lg delay-100">
                            Peer Banking: Save, Lend, Earn — Together
                        </h2>

                        <p className="mt-3 max-w-4xl animate-[slideUpFade_0.6s_ease-out_forwards] text-xl text-white/90 opacity-0 delay-300">
                            A circle of friends contributes monthly to one
                            shared account (PayPal or bank). Members can take
                            quick loans and repay with a small interest (e.g.
                            5%). At cycle end, everyone gets back their
                            contributions plus an equal share of the loan
                            interest.
                        </p>

                        {/* Simple inline SVG motif */}
                        <div className="mt-5 animate-[slideUpFade_0.6s_ease-out_forwards] opacity-0 delay-500">
                            <svg
                                width="280"
                                height="80"
                                viewBox="0 0 560 160"
                                className="drop-shadow"
                                aria-hidden
                            >
                                <defs>
                                    <linearGradient
                                        id="grad"
                                        x1="0%"
                                        y1="0%"
                                        x2="100%"
                                        y2="0%"
                                    >
                                        <stop offset="0%" stopColor="#34d399" />
                                        <stop
                                            offset="100%"
                                            stopColor="#60a5fa"
                                        />
                                    </linearGradient>
                                </defs>
                                <g
                                    fill="none"
                                    stroke="url(#grad)"
                                    strokeWidth="6"
                                    strokeLinecap="round"
                                >
                                    <circle cx="80" cy="80" r="36" />
                                    <circle cx="200" cy="80" r="36" />
                                    <circle cx="320" cy="80" r="36" />
                                    <circle cx="440" cy="80" r="36" />
                                    <path d="M116 80 Q160 20 200 44" />
                                    <path d="M236 80 Q280 20 320 44" />
                                    <path d="M356 80 Q400 20 440 44" />
                                </g>
                                <g fill="#ffffff" opacity="0.95">
                                    <text
                                        x="80"
                                        y="86"
                                        textAnchor="middle"
                                        fontSize="20"
                                    >
                                        A
                                    </text>
                                    <text
                                        x="200"
                                        y="86"
                                        textAnchor="middle"
                                        fontSize="20"
                                    >
                                        B
                                    </text>
                                    <text
                                        x="320"
                                        y="86"
                                        textAnchor="middle"
                                        fontSize="20"
                                    >
                                        C
                                    </text>
                                    <text
                                        x="440"
                                        y="86"
                                        textAnchor="middle"
                                        fontSize="20"
                                    >
                                        D
                                    </text>
                                </g>
                            </svg>
                        </div>
                    </div>
                </div>
                <section
                    className="mx-5 mt-2 grid grid-cols-2 gap-4"
                    id="about-peer-banking"
                >
                    <div className="w-full animate-[slideUpFade_0.6s_ease-out_forwards] overflow-hidden rounded-lg shadow-lg delay-[0ms]">
                        <img
                            src="/images/currency-163476_1280.jpg"
                            alt="coins and currency"
                            className="h-full w-full rounded-lg object-cover"
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
                                set a cycle (e.g., 6 or 12 months).
                            </li>
                            <li className="mt-3 animate-[slideUpFade_0.9s_ease-out_forwards] opacity-0 delay-[550ms]">
                                <strong>
                                    Contribute every month (minimum):
                                </strong>{' '}
                                Each member sends the agreed minimum amount to
                                one shared account (PayPal or a regular bank
                                account).
                            </li>
                            <li className="mt-3 animate-[slideUpFade_0.9s_ease-out_forwards] opacity-0 delay-[600ms]">
                                <strong>Borrow from the group:</strong> When a
                                member needs a loan, they request it from the
                                pooled funds instead of a traditional lender.
                            </li>
                            <li className="mt-3 animate-[slideUpFade_0.9s_ease-out_forwards] opacity-0 delay-[650ms]">
                                <strong>Repay with a small interest:</strong>{' '}
                                The borrower pays back with a fixed interest
                                agreed by the circle, for example{' '}
                                <strong>5%</strong>.
                            </li>
                            <li className="mt-3 animate-[slideUpFade_0.9s_ease-out_forwards] opacity-0 delay-[700ms]">
                                <strong>Share the gains:</strong> At the end of
                                the cycle, everyone gets back the total amount
                                they contributed, plus an equal share of all
                                loan interest collected:{' '}
                                <strong>
                                    <em>total interest ÷ number of members</em>
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

                        <div className="mt-6 flex flex-col gap-2">
                            {/* Quick example card */}
                            <div className="rounded-lg border bg-card p-4 shadow-sm">
                                <h3 className="mb-2 text-lg font-semibold">
                                    Quick example
                                </h3>
                                <ul className="list-disc pl-5 text-sm">
                                    <li>
                                        4 members contribute $50/month for 6
                                        months → each puts in $300.
                                    </li>
                                    <li>
                                        Two loans happen during the cycle; total
                                        interest paid = $60 (at ~5%).
                                    </li>
                                    <li>
                                        End of cycle payout per member = $300 +
                                        ($60 ÷ 4) = $315.
                                    </li>
                                </ul>
                            </div>

                            {/* Simple formula card */}
                            <div className="rounded-lg border bg-card p-4 shadow-sm">
                                <h3 className="mb-2 text-lg font-semibold">
                                    Payout formula
                                </h3>
                                <p className="text-sm text-muted-foreground">
                                    Each member receives at the end of the
                                    cycle:
                                </p>
                                <pre className="mt-2 overflow-auto rounded bg-muted p-3 text-sm">
                                    {`your_total_contributions + (total_interest_collected ÷ members_count)`}
                                </pre>
                            </div>
                        </div>

                        <p className="mt-6 animate-[slideUpFade_0.9s_ease-out_forwards] opacity-0 delay-[1200ms]">
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
