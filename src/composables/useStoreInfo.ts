import axios from "axios";
import { ref, computed, onMounted, reactive } from "vue";

export function useStoreInfo() {
    let storeInfo = reactive({
        title: "Shop smarter, live better",
        sub_title: "Shop top products and exclusive deals with ease.",
        landing_images: [
            "https://loremflickr.com/1280/720",
            "https://loremflickr.com/1280/720",
            "https://loremflickr.com/1280/720",
        ],
        fold: {
            title: "Why shop with us",
            reason_1: {
                title: "Fast & Reliable Delivery",
                content:
                    "Get your orders quickly with our efficient delivery service, ensuring your items arrive on time, every time",
            },
            reason_2: {
                title: "Top-Notch Customer Support",
                content:
                    "Our dedicated support team is always ready to assist you with any questions or concerns, providing exceptional service",
            },
            reason_3: {
                title: "Hassle-Free Returns",
                content:
                    "Enjoy a worry-free shopping experience with our easy return policy, giving you confidence in every purchase",
            },
        },
        best_sellers: {
            img1: "url1",
            img2: "url2",
            img3: "urln",
        },
        reviews: {
            // testimonials
            comment: "",
            customer: "customer_name",
            socials: {
                instagram: "@blah",
                x: "@blah",
                facebook: "@blah",
            },
            store_rating: 4.5,
            product_rating: 4.0,
        },
        categories: ["abstract", "accessories"],
        inventory: [
            {
                product_name: "Men's Blue Knight Trad with Agbada",
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
                id: 286,
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
                options1: "",
                options2: "",
                variants: ",",
                combinations: "",
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
            delivery_price: {
                location: 4500,
                Ikeja: 5000,
            },
        },
    });
    const isLoading = ref(true);
    const error = ref<unknown | null>(null);

    const fetchStoreInfo = async () => {
        try {
            isLoading.value = true;
            const response = await axios.get("/api/store");
            storeInfo = response.data;
        } catch (err) {
            error.value = err;
        } finally {
            isLoading.value = false;
        }
    };

    onMounted(fetchStoreInfo);

    return {
        storeInfo: computed(() => storeInfo), // Reactive store info
        isLoading,
        error,
        refresh: fetchStoreInfo, // Expose function to refresh store info
    };
}
