import { PaginationLink } from '@/types/tenant';

export type Invoice = {
    id: string;
    number: string;
    created: string;
    total: string;
    download_url: string;
};

export type PaginatedInvoice = {
    current_page: number;
    data: Invoice[];
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
