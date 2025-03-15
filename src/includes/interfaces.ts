export interface Selection {
    variant1: any;
    variant2: any;
    quantity: number;
}

export interface Product {
    product_name: string;
    product_type: string;
    description: string;
    price: number;
    total_stock: number;
    has_variant: boolean;
    display: boolean;
    discount: string;
    discount_type: string;
    has_discount: boolean;
    slug: string;
    id: number;
    store: string;
    temp_id: string;
    category: string | null;
    rating: string;
    review_count: number;
    rate_tracking: string;
    strict_stock_count: boolean;
    created: string;
    last_sale: string;
    SKU: string | null;
    owner: string | null;
    options1: string;
    options2: string;
    variants: string;
    combinations: string;
}