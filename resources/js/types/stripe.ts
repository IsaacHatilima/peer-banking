export interface StripeType {
    id: string;
    stripe_key: string;
    stripe_secret: string;
    stripe_webhook_secret: string;
    currency: string;
}

export interface SetupIntentType {
    id: string;
    client_secret: string;
}
