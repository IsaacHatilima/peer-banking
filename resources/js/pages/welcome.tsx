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
import { Link } from '@inertiajs/react';

export default function Welcome() {
    const isMobile = useIsMobile();
    return (
        <div>
            <Card className="flex h-24 w-full flex-row items-center justify-between">
                <img
                    src="/images/Logo.png"
                    alt="coins and currency"
                    className="h-24"
                />
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
                {/* HERO */}
                <div className="relative aspect-[16/6] w-full overflow-hidden rounded-lg">
                    <img
                        src="/images/finance-8836903_1920.jpg"
                        alt="financial banner"
                        className="h-full w-full object-cover"
                    />

                    <div className="absolute inset-0 bg-black/50" />

                    <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
                        <h2 className="animate-[slideUpFade_0.6s_ease-out_forwards] text-5xl font-extrabold text-white opacity-0 drop-shadow-lg delay-100">
                            Peer Banking — A Smarter Way to Save, Lend & Grow
                            Together
                        </h2>

                        <p className="mt-3 max-w-4xl animate-[slideUpFade_0.6s_ease-out_forwards] text-xl text-white/90 opacity-0 delay-300">
                            Turn your group of friends or family into a shared
                            financial safety net. Contribute monthly, borrow
                            when life happens, and earn interest as a team —
                            without banks, fees, or complexity.
                        </p>
                    </div>
                </div>

                {/* ABOUT SECTION */}
                <section
                    className="mx-5 mt-10 flex items-center justify-center"
                    id="about-peer-banking"
                >
                    {/* IMAGE */}
                    <div className="flex h-full w-full animate-[slideUpFade_0.6s_ease-out_forwards] items-center justify-center overflow-hidden delay-[0ms]">
                        <img
                            src="/images/wallet.svg"
                            alt="coins and currency"
                            className="h-[600px] w-[600px] rounded-full object-cover shadow-lg"
                        />
                    </div>

                    <div>
                        <div className="flex h-full w-full flex-row items-center justify-center px-6 text-center">
                            <h2 className="animate-[slideUpFade_0.9s_ease-out_forwards] text-5xl font-bold text-[#46acb8] opacity-0 drop-shadow-lg delay-[200ms]">
                                What is Peer Banking?
                            </h2>
                        </div>

                        <p className="mt-4 animate-[slideUpFade_0.9s_ease-out_forwards] px-6 text-center text-lg text-muted-foreground opacity-0 delay-[400ms]">
                            Peer Banking is a simple, community-powered savings
                            system where members support each other financially.
                            Everyone contributes monthly into one shared
                            account. Anyone can borrow when needed, repay with a
                            small agreed interest, and at the end of the cycle,
                            the interest is shared equally by all members.
                        </p>
                    </div>
                </section>

                {/* How it works */}
                <div className="flex items-center justify-center">
                    <h1 className="animate-[slideUpFade_0.6s_ease-out_forwards] text-7xl font-extrabold text-[#46acb8] underline opacity-0 drop-shadow-lg delay-100">
                        How it works
                    </h1>
                </div>

                {/* CYCLE */}
                <section
                    className="mx-5 mt-10 flex items-center justify-center"
                    id="cycle"
                >
                    {/* TEXT */}
                    <div>
                        <div className="flex h-full w-full flex-row items-center justify-center px-6 text-center">
                            <h2 className="animate-[slideUpFade_0.9s_ease-out_forwards] text-5xl font-bold text-[#46acb8] opacity-0 drop-shadow-lg delay-[200ms]">
                                Cycle
                            </h2>
                        </div>

                        <p className="mt-4 animate-[slideUpFade_0.9s_ease-out_forwards] px-6 text-center text-lg text-muted-foreground opacity-0 delay-[400ms]">
                            As a group, you agree on how long the cycle will be.
                            There is no limit on the cycle length, typically 12
                            months is a good cycle to work with.
                        </p>
                    </div>
                    {/* IMAGE */}
                    <div className="flex h-full w-full animate-[slideUpFade_0.6s_ease-out_forwards] items-center justify-center overflow-hidden delay-[0ms]">
                        <img
                            src="/images/cycle2.png"
                            alt="coins and currency"
                            className="h-[500px] w-[500px] rounded-full object-cover shadow-lg"
                        />
                    </div>
                </section>

                {/* Contribution */}
                <section
                    className="mx-5 mt-10 flex items-center justify-center"
                    id="contribution"
                >
                    {/* IMAGE */}
                    <div className="flex h-full w-full animate-[slideUpFade_0.6s_ease-out_forwards] items-center justify-center overflow-hidden delay-[0ms]">
                        <img
                            src="/images/send.svg"
                            alt="coins and currency"
                            className="h-[500px] w-[500px] rounded-full object-cover shadow-lg"
                        />
                    </div>
                    {/* TEXT */}
                    <div>
                        <div className="flex h-full w-full flex-row items-center justify-center px-6 text-center">
                            <h2 className="animate-[slideUpFade_0.9s_ease-out_forwards] text-5xl font-bold text-[#46acb8] opacity-0 drop-shadow-lg delay-[200ms]">
                                Contributions
                            </h2>
                        </div>

                        <p className="mt-4 animate-[slideUpFade_0.9s_ease-out_forwards] px-6 text-center text-lg text-muted-foreground opacity-0 delay-[400ms]">
                            As a group, you agree on how much the minimum
                            contribution amount will be. This minimum
                            contribution amount should be something that is
                            manageable by all members but not too low.
                        </p>
                    </div>
                </section>
                {/* LOAN */}
                <section
                    className="mx-5 mt-10 flex items-center justify-center"
                    id="loan"
                >
                    {/* TEXT */}
                    <div>
                        <div className="flex h-full w-full flex-row items-center justify-center px-6 text-center">
                            <h2 className="animate-[slideUpFade_0.9s_ease-out_forwards] text-5xl font-bold text-[#46acb8] opacity-0 drop-shadow-lg delay-[200ms]">
                                Loans
                            </h2>
                        </div>

                        <p className="mt-4 animate-[slideUpFade_0.9s_ease-out_forwards] px-6 text-center text-lg text-muted-foreground opacity-0 delay-[400ms]">
                            Loans can be borrowed from the contributed amounts
                            which will be paid back by an agreed interest rate.
                            The interest rate cannot change once there has been
                            a loan taken out, the percentage has to run for the
                            entire cycle.
                        </p>
                    </div>
                    {/* IMAGE */}
                    <div className="flex h-full w-full animate-[slideUpFade_0.6s_ease-out_forwards] items-center justify-center overflow-hidden delay-[0ms]">
                        <img
                            src="/images/loan.svg"
                            alt="coins and currency"
                            className="h-[500px] w-[500px] rounded-full object-cover shadow-lg"
                        />
                    </div>
                </section>
                {/* PAYOUT */}
                <section
                    className="mx-5 mt-10 flex items-center justify-center"
                    id="payout"
                >
                    {/* IMAGE */}
                    <div className="flex h-full w-full animate-[slideUpFade_0.6s_ease-out_forwards] items-center justify-center overflow-hidden delay-[0ms]">
                        <img
                            src="/images/chill.svg"
                            alt="coins and currency"
                            className="h-[500px] w-[500px] rounded-full object-cover shadow-lg"
                        />
                    </div>
                    {/* TEXT */}
                    <div>
                        <div className="flex h-full w-full flex-row items-center justify-center px-6 text-center">
                            <h2 className="animate-[slideUpFade_0.9s_ease-out_forwards] text-5xl font-bold text-[#46acb8] opacity-0 drop-shadow-lg delay-[200ms]">
                                Payout
                            </h2>
                        </div>

                        <div className="mt-6 flex animate-[slideUpFade_0.9s_ease-out_forwards] flex-col gap-2 opacity-0 delay-[400ms]">
                            {/* Quick example card */}
                            <div className="p-4">
                                <h3 className="mb-2 text-lg font-semibold">
                                    Quick example
                                </h3>
                                <ul className="list-disc pl-5 text-sm text-muted-foreground">
                                    <li>
                                        4 members contribute €50/month for 6
                                        months → each puts in €300.
                                    </li>
                                    <li>
                                        Two loans happen during the cycle; total
                                        interest paid = €60 (at ~5%).
                                    </li>
                                    <li>
                                        End of cycle payout per member = €300 +
                                        (€60 ÷ 4) = €315.
                                    </li>
                                </ul>
                            </div>

                            {/* Simple formula card */}
                            <div className="p-4">
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
                    </div>
                </section>

                {/* GET STARTED */}
                <section className="mx-auto mt-20 max-w-6xl px-6">
                    <h2 className="text-center text-4xl font-bold text-gray-900 dark:text-white">
                        Pricing
                    </h2>
                    <p className="mt-3 text-center text-lg text-gray-600 dark:text-gray-300">
                        Simple, transparent plans designed for every circle
                        size.
                    </p>

                    <div className="mt-12 grid gap-8 md:grid-cols-4">
                        {/* FREE */}
                        <div className="rounded-xl border bg-white p-6 text-center shadow-sm hover:border-2 hover:border-[#77ebfc] dark:border-gray-700 dark:bg-gray-900">
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                                Free
                            </h3>
                            <p className="mt-2 text-gray-500 dark:text-gray-400">
                                For small friend groups starting out.
                            </p>

                            <div className="my-6 text-4xl font-extrabold text-gray-900 dark:text-white">
                                €0
                                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                    /mo
                                </span>
                            </div>

                            <ul className="space-y-3 text-sm text-gray-700 dark:text-gray-300">
                                <li>✔ Up to 5 members</li>
                                <li>✔ 1 active circle</li>
                                <li>✔ Basic interest tracking</li>
                            </ul>

                            <button className="mt-6 w-full rounded-lg bg-[#77ebfc] px-4 py-2 font-medium text-gray-900 hover:shadow-lg">
                                Get Started
                            </button>
                        </div>

                        {/* BASIC */}
                        <div className="rounded-xl border-2 bg-white p-6 text-center shadow-md hover:border-2 hover:border-[#77ebfc] dark:border-[#77ebfc] dark:bg-gray-900">
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                                Basic
                            </h3>
                            <p className="mt-2 text-gray-500 dark:text-gray-400">
                                Perfect for active peer groups.
                            </p>

                            <div className="my-6 text-4xl font-extrabold text-gray-900 dark:text-white">
                                €15
                                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                    /mo
                                </span>
                            </div>

                            <ul className="space-y-3 text-sm text-gray-700 dark:text-gray-300">
                                <li>✔ Up to 50 members</li>
                                <li>✔ Unlimited circles</li>
                                <li>✔ Smart loan reminders</li>
                                <li>✔ Custom cycle durations</li>
                            </ul>

                            <button className="mt-6 w-full rounded-lg bg-[#77ebfc] px-4 py-2 font-medium text-gray-900 transition-all hover:-translate-y-1 hover:shadow-xl">
                                Choose Standard
                            </button>
                        </div>

                        {/* STANDARD */}
                        <div className="rounded-xl border-2 border-[#77ebfc] bg-white p-6 text-center shadow-md hover:border-2 hover:border-[#77ebfc] dark:border-[#77ebfc] dark:bg-gray-900">
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                                Standard
                            </h3>
                            <p className="mt-2 text-gray-500 dark:text-gray-400">
                                Perfect for active peer groups.
                            </p>

                            <div className="my-6 text-4xl font-extrabold text-gray-900 dark:text-white">
                                €35
                                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                    /mo
                                </span>
                            </div>

                            <ul className="space-y-3 text-sm text-gray-700 dark:text-gray-300">
                                <li>✔ Up to 100 members</li>
                                <li>✔ Unlimited circles</li>
                                <li>✔ Smart loan reminders</li>
                                <li>✔ Custom cycle durations</li>
                                <li>✔ Dashboard export</li>
                            </ul>

                            <button className="mt-6 w-full rounded-lg bg-[#77ebfc] px-4 py-2 font-medium text-gray-900 transition-all hover:-translate-y-1 hover:shadow-xl">
                                Choose Standard
                            </button>
                        </div>

                        {/* PREMIUM */}
                        <div className="rounded-xl border bg-white p-6 text-center shadow-sm hover:border-2 hover:border-[#77ebfc] dark:border-gray-700 dark:bg-gray-900">
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                                Premium
                            </h3>
                            <p className="mt-2 text-gray-500 dark:text-gray-400">
                                For large communities & savings clubs.
                            </p>

                            <div className="my-6 text-4xl font-extrabold text-gray-900 dark:text-white">
                                €65
                                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                    /mo
                                </span>
                            </div>

                            <ul className="space-y-3 text-sm text-gray-700 dark:text-gray-300">
                                <li>✔ Unlimited members</li>
                                <li>✔ Priority support</li>
                                <li>✔ Advanced analytics</li>
                                <li>✔ Scheduled loan rules</li>
                                <li>✔ Full export & audit history</li>
                            </ul>

                            <button className="mt-6 w-full rounded-lg bg-[#77ebfc] px-4 py-2 font-medium text-gray-900 hover:shadow-lg">
                                Go Premium
                            </button>
                        </div>
                    </div>
                </section>

                <div className="my-20 flex items-center justify-center">
                    <button
                        type="button"
                        className="rounded-lg bg-[#77ebfc] px-6 py-3.5 text-base font-medium text-white transition-all duration-300 ease-out hover:-translate-y-1 hover:scale-[1.03] hover:shadow-2xl"
                    >
                        Get started
                    </button>
                </div>

                {/* FOOTER */}
                <footer className="mt-20 w-full rounded-2xl bg-[#77ebfc] py-10 text-white">
                    <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-6 md:grid-cols-3">
                        {/* Address */}
                        <div>
                            <h3 className="mb-3 text-xl font-semibold">
                                Address
                            </h3>
                            <p className="text-sm leading-relaxed">
                                Peer Banking HQ
                                <br />
                                Ostheim 2A
                                <br />
                                93055 Regensburg
                                <br />
                                Germany
                            </p>
                        </div>

                        {/* Contact */}
                        <div>
                            <h3 className="mb-3 text-xl font-semibold">
                                Contact
                            </h3>
                            <p className="mb-2 text-sm">
                                Do you have any question? Feel free to reach
                                out.
                            </p>
                            <a
                                href="#contact"
                                className="inline-block text-sm font-medium underline hover:opacity-80"
                            >
                                Let&apos;s Chat
                            </a>
                        </div>

                        {/* Resources */}
                        <div>
                            <h3 className="mb-3 text-xl font-semibold">
                                Resources
                            </h3>
                            <ul className="space-y-2 text-sm">
                                <li>
                                    <a
                                        href="/policy"
                                        className="hover:underline"
                                    >
                                        Policy
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="/impressum"
                                        className="hover:underline"
                                    >
                                        Impressum
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="/privacy"
                                        className="hover:underline"
                                    >
                                        Privacy & Terms
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="/stories"
                                        className="hover:underline"
                                    >
                                        Customer Stories
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Bottom bar */}
                    <div className="mt-10 border-t border-white/20 pt-5 text-center text-xs opacity-80">
                        © {new Date().getFullYear()} Peer Banking. All rights
                        reserved.
                    </div>
                </footer>
            </div>
        </div>
    );
}
