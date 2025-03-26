import { defineStore } from "pinia";
import { shallowReactive, computed } from "vue";

export const useStoreInfo = defineStore(
    "storeInfo",
    () => {
        let storeInfo = shallowReactive({
            title: "Shop smarter, live better",
            sub_title: "Shop top products and exclusive deals with ease.",
            landing_images: [
            "https://res.cloudinary.com/du5cun8t9/image/upload/v1689341264/samples/shoe.jpg",
            "https://res.cloudinary.com/du5cun8t9/image/upload/v1689341240/samples/animals/cat.jpg",
            "https://res.cloudinary.com/du5cun8t9/image/upload/v1689341237/sample.jpg",
            ],
            fold: {
            title: "Why shop with us?",
            content:
                "Discover the benefits that make your shopping experience effortless, enjoyable, and rewarding.",
            reasons: [
                {
                title: "Fast & Reliable Delivery",
                content:
                    "Get your orders quickly with our efficient delivery service, ensuring your items arrive on time, every time",
                },
                {
                title: "Top-Notch Customer Support",
                content:
                    "Our dedicated support team is always ready to assist you with any questions or concerns, providing exceptional service",
                },
                {
                title: "Hassle-Free Returns",
                content:
                    "Enjoy a worry-free shopping experience with our easy return policy, giving you confidence in every purchase",
                },
            ],
            },
            best_sellers: [
            {
                product_name: "Apple",
                image: "https://res.cloudinary.com/du5cun8t9/image/upload/v1689341264/samples/shoe.jpg",
                product_type: "",
                description: "",
                price: 400,
                total_stock: 3,
                has_variant: false,
                display: true,
                discount: "",
                discount_type: "0",
                has_discount: false,
                slug: "demo",
                id: "k286",
                store: "Demo",
                temp_id: "",
                category: "abstract",
                rating: "0.0",
                review_count: 0,
                rate_tracking: "0,0,0,0,0",
                strict_stock_count: false,
                created: "2024-07-16T07:52:11.111894+01:00",
                last_sale: "2025-01-14T16:46:49.741547+01:00",
                SKU: null,
                owner: null,
                options1: "Red,Blue,Green", // Example
                options2: "Small,Medium,Large, xl",
                variants: "Color",
                combinations:
                "0,0,2000,4;0,1,3000,6;0,2,3500,5;1,0,3000,7;1,1,4000,4;1,2,5000,6;2,0,4200,5;2,1,5200,7;2,2,6200,7;",
            },
            {
                product_name: "Ball",
                image: "https://res.cloudinary.com/du5cun8t9/image/upload/v1689341237/sample.jpg",
                product_type: "",
                description: "",
                price: 4000,
                total_stock: 40,
                has_variant: false,
                display: true,
                discount: "",
                discount_type: "0",
                has_discount: false,
                slug: "demo",
                id: "k287",
                store: "Demo",
                temp_id: "",
                category: "accessories",
                rating: "0.0",
                review_count: 0,
                rate_tracking: "0,0,0,0,0",
                strict_stock_count: false,
                created: "2024-07-16T07:52:11.111894+01:00",
                last_sale: "2025-01-14T16:46:49.741547+01:00",
                SKU: null,
                owner: null,
                options1: "Red,Blue,Green", // Example
                    combinations:
                        "0,0,2000,4;0,1,3000,6;0,2,3500,5;1,0,3000,7;1,1,4000,4;1,2,5000,6;2,0,4200,5;2,1,5200,7;2,2,6200,7;",
                },
                {
                    product_name: "Cat",
                    image: "https://res.cloudinary.com/du5cun8t9/image/upload/v1689341240/samples/animals/cat.jpg",
                    product_type: "",
                    description: "",
                    price: 10000,
                    total_stock: 50,
                    has_variant: false,
                    display: true,
                    discount: "",
                    discount_type: "0",
                    has_discount: false,
                    slug: "demo",
                    id: "k288",
                    store: "Demo",
                    temp_id: "",
                    category: "abstract",
                    rating: "0.0",
                    review_count: 0,
                    rate_tracking: "0,0,0,0,0",
                    strict_stock_count: false,
                    created: "2024-07-16T07:52:11.111894+01:00",
                    last_sale: "2025-01-14T16:46:49.741547+01:00",
                    SKU: null,
                    owner: null,
                    options1: "Red,Blue,Green", // Example
                    options2: "Small,Medium,Large",
                    variants: "",
                    combinations:
                        "0,0,2000,4;0,1,3000,6;0,2,3500,5;1,0,3000,7;1,1,4000,4;1,2,5000,6;2,0,4200,5;2,1,5200,7;2,2,6200,7;",
                },
            ],
            reviews: [
                {
                    // testimonials
                    comment:
                        "Absolutely love this store! The quality is unmatched, and the delivery was super fast. Highly recommend!",
                    customer: "customer_name",
                    socials: {
                        instagram: "@blah",
                        x: "@blah",
                        facebook: "@blah",
                    },
                    store_rating: 4.5,
                    product_rating: 4.0,
                },
                {
                    // testimonials
                    comment:
                        "Absolutely love this store! The quality is unmatched, and the delivery was super fast. Highly recommend!",
                    customer: "customer_name",
                    socials: {
                        instagram: "@blah",
                        x: "@blah",
                        facebook: "@blah",
                    },
                    store_rating: 4.5,
                    product_rating: 4.0,
                },
                {
                    // testimonials
                    comment:
                        "Absolutely love this store! The quality is unmatched, and the delivery was super fast. Highly recommend!",
                    customer: "customer_name",
                    socials: {
                        instagram: "@blah",
                        x: "@blah",
                        facebook: "@blah",
                    },
                    store_rating: 4.5,
                    product_rating: 4.0,
                },
            ],
            categories: ["abstract", "accessories", "abstracts", "access", "mens", "womens", "kids", "geezers"],
            inventory: [
                {
                    product_name: "Apple with a hint of Apple",
                    image: "https://res.cloudinary.com/du5cun8t9/image/upload/v1689341264/samples/shoe.jpg",
                    product_type: "",
                    description: "",
                    price: 400,
                    total_stock: 3,
                    has_variant: false,
                    display: true,
                    discount: "",
                    discount_type: "0",
                    has_discount: false,
                    slug: "demo",
                    id: "k286",
                    store: "Demo",
                    temp_id: "",
                    category: "abstract",
                    rating: "0.0",
                    review_count: 0,
                    rate_tracking: "0,0,0,0,0",
                    strict_stock_count: false,
                    created: "2024-07-16T07:52:11.111894+01:00",
                    last_sale: "2025-01-14T16:46:49.741547+01:00",
                    SKU: null,
                    owner: null,
                    options1: "Red,Blue,Green", // Example
                    options2: "Small,Medium,Large, xl",
                    variants: "Color",
                    combinations: "0,200,4;1,400,0;2,500,5;",
                },
                {
                    product_name: "Ball",
                    image: "https://res.cloudinary.com/du5cun8t9/image/upload/v1689341237/sample.jpg",
                    product_type: "",
                    description: "",
                    price: 4000,
                    total_stock: 40,
                    has_variant: false,
                    display: true,
                    discount: "",
                    discount_type: "0",
                    has_discount: false,
                    slug: "demo",
                    id: "k287",
                    store: "Demo",
                    temp_id: "",
                    category: "accessories",
                    rating: "0.0",
                    review_count: 0,
                    rate_tracking: "0,0,0,0,0",
                    strict_stock_count: false,
                    created: "2024-07-16T07:52:11.111894+01:00",
                    last_sale: "2025-01-14T16:46:49.741547+01:00",
                    SKU: null,
                    owner: null,
                    options1: "Red,Blue,Green", // Example
                    options2: "Small,Medium,Large",
                    variants: "Color,Size",
                    combinations:
                        "0,0,2000,4;0,1,3000,6;0,2,3500,5;1,0,3000,7;1,1,4000,4;1,2,5000,6;2,0,4200,5;2,1,5200,7;2,2,6200,7;",
                },
                {
                    product_name: "Cat",
                    image: "https://res.cloudinary.com/du5cun8t9/image/upload/v1689341240/samples/animals/cat.jpg",
                    product_type: "",
                    description: "",
                    price: 10000,
                    total_stock: 50,
                    has_variant: false,
                    display: true,
                    discount: "",
                    discount_type: "0",
                    has_discount: false,
                    slug: "demo",
                    id: "k288",
                    store: "Demo",
                    temp_id: "",
                    category: "abstract",
                    rating: "0.0",
                    review_count: 0,
                    rate_tracking: "0,0,0,0,0",
                    strict_stock_count: false,
                    created: "2024-07-16T07:52:11.111894+01:00",
                    last_sale: "2025-01-14T16:46:49.741547+01:00",
                    SKU: null,
                    owner: null,
                    options1: "Red,Blue,Green", // Example
                    options2: "Small,Medium,Large",
                    variants: "",
                    combinations: "",
                },
                {
                    product_name: "Dog",
                    image: "https://res.cloudinary.com/du5cun8t9/image/upload/v1689341264/samples/shoe.jpg",
                    product_type: "",
                    description: "",
                    price: 40000,
                    total_stock: 10,
                    has_variant: false,
                    display: true,
                    discount: "",
                    discount_type: "0",
                    has_discount: false,
                    slug: "demo",
                    id: "k289",
                    store: "Demo",
                    temp_id: "",
                    category: "accessories",
                    rating: "0.0",
                    review_count: 0,
                    rate_tracking: "0,0,0,0,0",
                    strict_stock_count: false,
                    created: "2024-07-16T07:52:11.111894+01:00",
                    last_sale: "2025-01-14T16:46:49.741547+01:00",
                    SKU: null,
                    owner: null,
                    options1: "Red,Blue,Green", // Example
                    options2: "Small,Medium,Large",
                    variants: "Color,Size",
                    combinations:
                        "0,0,2000,4;0,1,3000,6;0,2,3500,5;1,0,3000,7;1,1,4000,4;1,2,5000,6;2,0,4200,5;2,1,5200,7;2,2,6200,7;",
                },
                {
                    product_name: "Eraser",
                    image: "https://res.cloudinary.com/du5cun8t9/image/upload/v1689341264/samples/shoe.jpg",
                    product_type: "",
                    description: "",
                    price: 40,
                    total_stock: 20,
                    has_variant: false,
                    display: true,
                    discount: "",
                    discount_type: "0",
                    has_discount: false,
                    slug: "demo",
                    id: "k290",
                    store: "Demo",
                    temp_id: "",
                    category: "accessories",
                    rating: "0.0",
                    review_count: 0,
                    rate_tracking: "0,0,0,0,0",
                    strict_stock_count: false,
                    created: "2024-07-16T07:52:11.111894+01:00",
                    last_sale: "2025-01-14T16:46:49.741547+01:00",
                    SKU: null,
                    owner: null,
                    options1: "Red,Blue,Green", // Example
                    options2: "Small,Medium,Large",
                    variants: "Color,Size",
                    combinations:
                        "0,0,2000,4;0,1,3000,6;0,2,3500,5;1,0,3000,7;1,1,4000,4;1,2,5000,6;2,0,4200,5;2,1,5200,7;2,2,6200,7;",
                },
                {
                    product_name: "Fruit",
                    image: "https://res.cloudinary.com/du5cun8t9/image/upload/v1689341264/samples/shoe.jpg",
                    product_type: "",
                    description: "",
                    price: 400,
                    total_stock: 0,
                    has_variant: false,
                    display: true,
                    discount: "",
                    discount_type: "0",
                    has_discount: false,
                    slug: "demo",
                    id: "k291",
                    store: "Demo",
                    temp_id: "",
                    category: "accessories",
                    rating: "0.0",
                    review_count: 0,
                    rate_tracking: "0,0,0,0,0",
                    strict_stock_count: false,
                    created: "2024-07-16T07:52:11.111894+01:00",
                    last_sale: "2025-01-14T16:46:49.741547+01:00",
                    SKU: null,
                    owner: null,
                    options1: "Red,Blue,Green", // Example
                    options2: "Small,Medium,Large",
                    variants: "Color,Size",
                    combinations:
                        "0,0,2000,4;0,1,3000,6;0,2,3500,5;1,0,3000,7;1,1,4000,4;1,2,5000,6;2,0,4200,5;2,1,5200,7;2,2,6200,7;",
                },
                {
                    product_name: "Goat",
                    image: "https://res.cloudinary.com/du5cun8t9/image/upload/v1689341264/samples/shoe.jpg",
                    product_type: "",
                    description: "",
                    price: 100000,
                    total_stock: 7,
                    has_variant: false,
                    display: true,
                    discount: "",
                    discount_type: "0",
                    has_discount: false,
                    slug: "demo",
                    id: "k292",
                    store: "Demo",
                    temp_id: "",
                    category: null,
                    rating: "0.0",
                    review_count: 0,
                    rate_tracking: "0,0,0,0,0",
                    strict_stock_count: false,
                    created: "2024-07-16T07:52:11.111894+01:00",
                    last_sale: "2025-01-14T16:46:49.741547+01:00",
                    SKU: null,
                    owner: null,
                    options1: "Red,Blue,Green", // Example
                    options2: "Small,Medium,Large",
                    variants: "Color,Size",
                    combinations:
                        "0,0,2000,4;0,1,3000,6;0,2,3500,5;1,0,3000,7;1,1,4000,4;1,2,5000,6;2,0,4200,5;2,1,5200,7;2,2,6200,7;",
                },
                {
                    product_name: "Horse",
                    image: "https://res.cloudinary.com/du5cun8t9/image/upload/v1689341264/samples/shoe.jpg",
                    product_type: "",
                    description: "",
                    price: 400000,
                    total_stock: 0,
                    has_variant: false,
                    display: true,
                    discount: "",
                    discount_type: "0",
                    has_discount: false,
                    slug: "demo",
                    id: "k293",
                    store: "Demo",
                    temp_id: "",
                    category: null,
                    rating: "0.0",
                    review_count: 0,
                    rate_tracking: "0,0,0,0,0",
                    strict_stock_count: false,
                    created: "2024-07-16T07:52:11.111894+01:00",
                    last_sale: "2025-01-14T16:46:49.741547+01:00",
                    SKU: null,
                    owner: null,
                    options1: "Red,Blue,Green", // Example
                    options2: "Small,Medium,Large",
                    variants: "Color,Size",
                    combinations:
                        "0,0,2000,4;0,1,3000,6;0,2,3500,5;1,0,3000,7;1,1,4000,4;1,2,5000,6;2,0,4200,5;2,1,5200,7;2,2,6200,7;",
                },
                {
                    product_name: "Ink",
                    image: "https://res.cloudinary.com/du5cun8t9/image/upload/v1689341264/samples/shoe.jpg",
                    product_type: "",
                    description: "",
                    price: 400,
                    total_stock: 100,
                    has_variant: false,
                    display: true,
                    discount: "",
                    discount_type: "0",
                    has_discount: false,
                    slug: "demo",
                    id: "k294",
                    store: "Demo",
                    temp_id: "",
                    category: null,
                    rating: "0.0",
                    review_count: 0,
                    rate_tracking: "0,0,0,0,0",
                    strict_stock_count: false,
                    created: "2024-07-16T07:52:11.111894+01:00",
                    last_sale: "2025-01-14T16:46:49.741547+01:00",
                    SKU: null,
                    owner: null,
                    options1: "Red,Blue,Green", // Example
                    options2: "Small,Medium,Large",
                    variants: "Color,Size",
                    combinations:
                        "0,0,2000,4;0,1,3000,6;0,2,3500,5;1,0,3000,7;1,1,4000,4;1,2,5000,6;2,0,4200,5;2,1,5200,7;2,2,6200,7;",
                },
                {
                    product_name: "Jug",
                    image: "https://res.cloudinary.com/du5cun8t9/image/upload/v1689341264/samples/shoe.jpg",
                    product_type: "",
                    description: "",
                    price: 5000,
                    total_stock: 76,
                    has_variant: false,
                    display: true,
                    discount: "",
                    discount_type: "0",
                    has_discount: false,
                    slug: "demo",
                    id: "k295",
                    store: "Demo",
                    temp_id: "",
                    category: null,
                    rating: "0.0",
                    review_count: 0,
                    rate_tracking: "0,0,0,0,0",
                    strict_stock_count: false,
                    created: "2024-07-16T07:52:11.111894+01:00",
                    last_sale: "2025-01-14T16:46:49.741547+01:00",
                    SKU: null,
                    owner: null,
                    options1: "Red,Blue,Green", // Example
                    options2: "Small,Medium,Large",
                    variants: "Color,Size",
                    combinations:
                        "0,0,2000,4;0,1,3000,6;0,2,3500,5;1,0,3000,7;1,1,4000,4;1,2,5000,6;2,0,4200,5;2,1,5200,7;2,2,6200,7;",
                },
                {
                    product_name: "Knife",
                    image: "https://res.cloudinary.com/du5cun8t9/image/upload/v1689341264/samples/shoe.jpg",
                    product_type: "",
                    description: "",
                    price: 2000,
                    total_stock: 30,
                    has_variant: false,
                    display: true,
                    discount: "",
                    discount_type: "0",
                    has_discount: false,
                    slug: "demo",
                    id: "k296",
                    store: "Demo",
                    temp_id: "",
                    category: null,
                    rating: "0.0",
                    review_count: 0,
                    rate_tracking: "0,0,0,0,0",
                    strict_stock_count: false,
                    created: "2024-07-16T07:52:11.111894+01:00",
                    last_sale: "2025-01-14T16:46:49.741547+01:00",
                    SKU: null,
                    owner: null,
                    options1: "Red,Blue,Green", // Example
                    options2: "Small,Medium,Large",
                    variants: "Color,Size",
                    combinations:
                        "0,0,2000,4;0,1,3000,6;0,2,3500,5;1,0,3000,7;1,1,4000,4;1,2,5000,6;2,0,4200,5;2,1,5200,7;2,2,6200,7;",
                },
                {
                    product_name: "Lemon",
                    image: "https://res.cloudinary.com/du5cun8t9/image/upload/v1689341264/samples/shoe.jpg",
                    product_type: "",
                    description: "",
                    price: 1500,
                    total_stock: 50,
                    has_variant: false,
                    display: true,
                    discount: "",
                    discount_type: "0",
                    has_discount: false,
                    slug: "demo",
                    id: "k297",
                    store: "Demo",
                    temp_id: "",
                    category: null,
                    rating: "0.0",
                    review_count: 0,
                    rate_tracking: "0,0,0,0,0",
                    strict_stock_count: false,
                    created: "2024-07-16T07:52:11.111894+01:00",
                    last_sale: "2025-01-14T16:46:49.741547+01:00",
                    SKU: null,
                    owner: null,
                    options1: "Red,Blue,Green", // Example
                    options2: "Small,Medium,Large",
                    variants: "Color,Size",
                    combinations:
                        "0,0,2000,4;0,1,3000,6;0,2,3500,5;1,0,3000,7;1,1,4000,4;1,2,5000,6;2,0,4200,5;2,1,5200,7;2,2,6200,7;",
                },
                {
                    product_name: "Men's Blue Knight Trad with Agbada",
                    image: "https://res.cloudinary.com/du5cun8t9/image/upload/v1689341264/samples/shoe.jpg",
                    product_type: "",
                    description: "",
                    price: 50000,
                    total_stock: 40,
                    has_variant: false,
                    display: true,
                    discount: "",
                    discount_type: "0",
                    has_discount: false,
                    slug: "demo",
                    id: "k298",
                    store: "Demo",
                    temp_id: "",
                    category: null,
                    rating: "0.0",
                    review_count: 0,
                    rate_tracking: "0,0,0,0,0",
                    strict_stock_count: false,
                    created: "2024-07-16T07:52:11.111894+01:00",
                    last_sale: "2025-01-14T16:46:49.741547+01:00",
                    SKU: null,
                    owner: null,
                    options1: "Red,Blue,Green", // Example
                    options2: "Small,Medium,Large",
                    variants: "Color,Size",
                    combinations:
                        "0,0,2000,4;0,1,3000,6;0,2,3500,5;1,0,3000,7;1,1,4000,4;1,2,5000,6;2,0,4200,5;2,1,5200,7;2,2,6200,7;",
                },
                {
                    product_name: "Ninja",
                    image: "https://res.cloudinary.com/du5cun8t9/image/upload/v1689341264/samples/shoe.jpg",
                    product_type: "",
                    description: "",
                    price: 40000,
                    total_stock: 20,
                    has_variant: false,
                    display: true,
                    discount: "",
                    discount_type: "0",
                    has_discount: false,
                    slug: "demo",
                    id: "k299",
                    store: "Demo",
                    temp_id: "",
                    category: null,
                    rating: "0.0",
                    review_count: 0,
                    rate_tracking: "0,0,0,0,0",
                    strict_stock_count: false,
                    created: "2024-07-16T07:52:11.111894+01:00",
                    last_sale: "2025-01-14T16:46:49.741547+01:00",
                    SKU: null,
                    owner: null,
                    options1: "Red,Blue,Green", // Example
                    options2: "Small,Medium,Large",
                    variants: "Color,Size",
                    combinations:
                        "0,0,2000,4;0,1,3000,6;0,2,3500,5;1,0,3000,7;1,1,4000,4;1,2,5000,6;2,0,4200,5;2,1,5200,7;2,2,6200,7;",
                },
                {
                    product_name: "Orange",
                    image: "https://res.cloudinary.com/du5cun8t9/image/upload/v1689341264/samples/shoe.jpg",
                    product_type: "",
                    description: "",
                    price: 500,
                    total_stock: 50,
                    has_variant: false,
                    display: true,
                    discount: "",
                    discount_type: "0",
                    has_discount: false,
                    slug: "demo",
                    id: "k300",
                    store: "Demo",
                    temp_id: "",
                    category: null,
                    rating: "0.0",
                    review_count: 0,
                    rate_tracking: "0,0,0,0,0",
                    strict_stock_count: false,
                    created: "2024-07-16T07:52:11.111894+01:00",
                    last_sale: "2025-01-14T16:46:49.741547+01:00",
                    SKU: null,
                    owner: null,
                    options1: "Red,Blue,Green", // Example
                    options2: "Small,Medium,Large",
                    variants: "Color,Size",
                    combinations:
                        "0,0,2000,4;0,1,3000,6;0,2,3500,5;1,0,3000,7;1,1,4000,4;1,2,5000,6;2,0,4200,5;2,1,5200,7;2,2,6200,7;",
                },
                {
                    product_name: "Pawpaw",
                    image: "https://res.cloudinary.com/du5cun8t9/image/upload/v1689341264/samples/shoe.jpg",
                    product_type: "",
                    description: "",
                    price: 600,
                    total_stock: 60,
                    has_variant: false,
                    display: true,
                    discount: "",
                    discount_type: "0",
                    has_discount: false,
                    slug: "demo",
                    id: "k301",
                    store: "Demo",
                    temp_id: "",
                    category: null,
                    rating: "0.0",
                    review_count: 0,
                    rate_tracking: "0,0,0,0,0",
                    strict_stock_count: false,
                    created: "2024-07-16T07:52:11.111894+01:00",
                    last_sale: "2025-01-14T16:46:49.741547+01:00",
                    SKU: null,
                    owner: null,
                    options1: "Red,Blue,Green", // Example
                    options2: "Small,Medium,Large",
                    variants: "Color,Size",
                    combinations:
                        "0,0,2000,4;0,1,3000,6;0,2,3500,5;1,0,3000,7;1,1,4000,4;1,2,5000,6;2,0,4200,5;2,1,5200,7;2,2,6200,7;",
                },
                {
                    product_name: "Queen",
                    image: "https://res.cloudinary.com/du5cun8t9/image/upload/v1689341264/samples/shoe.jpg",
                    product_type: "",
                    description: "",
                    price: 5050,
                    total_stock: 30,
                    has_variant: false,
                    display: true,
                    discount: "",
                    discount_type: "0",
                    has_discount: false,
                    slug: "demo",
                    id: "k302",
                    store: "Demo",
                    temp_id: "",
                    category: null,
                    rating: "0.0",
                    review_count: 0,
                    rate_tracking: "0,0,0,0,0",
                    strict_stock_count: false,
                    created: "2024-07-16T07:52:11.111894+01:00",
                    last_sale: "2025-01-14T16:46:49.741547+01:00",
                    SKU: null,
                    owner: null,
                    options1: "Red,Blue,Green", // Example
                    options2: "Small,Medium,Large",
                    variants: "Color,Size",
                    combinations:
                        "0,0,2000,4;0,1,3000,6;0,2,3500,5;1,0,3000,7;1,1,4000,4;1,2,5000,6;2,0,4200,5;2,1,5200,7;2,2,6200,7;",
                },
                {
                    product_name: "Rice",
                    image: "https://res.cloudinary.com/du5cun8t9/image/upload/v1689341264/samples/shoe.jpg",
                    product_type: "",
                    description: "",
                    price: 40000,
                    total_stock: 0,
                    has_variant: false,
                    display: true,
                    discount: "",
                    discount_type: "0",
                    has_discount: false,
                    slug: "demo",
                    id: "k303",
                    store: "Demo",
                    temp_id: "",
                    category: null,
                    rating: "0.0",
                    review_count: 0,
                    rate_tracking: "0,0,0,0,0",
                    strict_stock_count: false,
                    created: "2024-07-16T07:52:11.111894+01:00",
                    last_sale: "2025-01-14T16:46:49.741547+01:00",
                    SKU: null,
                    owner: null,
                    options1: "Red,Blue,Green", // Example
                    options2: "Small,Medium,Large",
                    variants: "Color,Size",
                    combinations:
                        "0,0,2000,4;0,1,3000,6;0,2,3500,5;1,0,3000,7;1,1,4000,4;1,2,5000,6;2,0,4200,5;2,1,5200,7;2,2,6200,7;",
                },
            ],
            store: {
                name: "",
                logo_url: "",
                custom_url: false, // false: use subdomain
                status: 0 / 1, // open/closed
                all_day: true, // true - 24hrs
                hours: {
                    start: "08:00",
                    end: "15:00",
                },
                email: "support@email.com",
                tel: "08098765463",
                address: "1 This street, Some place, Ikeja",
                courier: 0,
                delivery_price: [
                    {
                        location: "Badagry",
                        price: 5000,
                    },
                    {
                        location: "Ikeja",
                        price: 4500,
                    },
                    {
                        location: "Shomolu",
                        price: 3000,
                    },
                    {
                        location: "Yaba",
                        price: 2500,
                    },
                ],
            },
        });

        const updateStoreInfo = (info: any) => { 
            storeInfo = info;
        };

        return {
            storeInfo: computed(() => storeInfo),
            updateStoreInfo,
        };
    },

    {
        persist: {
            key: "storeInfo",
            storage: sessionStorage,
        },
    },
);
