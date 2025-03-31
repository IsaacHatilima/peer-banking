import { PaginationLink } from '@/types/tenant';

export type LicenseType = {
    id: string;
    status: string;
    unit_price: string;
    quantity: string;
    total_price: string;
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
