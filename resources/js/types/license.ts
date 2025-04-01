import { PaginationLink } from '@/types/tenant';
import { User } from '@/types/user';

export type LicenseType = {
    id: string;
    user: User;
    subscription: Subscription;
};

export type Subscription = {
    id: string;
    stripe_status: string;
    quantity: number;
    ends_at: string;
};

export type PaginatedLicenseType = {
    current_page: number;
    data: LicenseType[];
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    links: PaginationLink[];
    next_page_url: string | URL;
    path: string;
    per_page: number;
    prev_page_url: string | URL;
    to: number;
    total: number;
};
