import { nextTick } from "vue";
import { createWebHistory, createRouter } from "vue-router";

const routes = [
    {
        path: "/",
        component: () => import("./layouts/NavbarLayout.vue"),
        children: [
            { path: "", component: () => import("./views/HomeView.vue"), name: "Home" },
            {
                path: "store",
                component: () => import("./views/StoreHome.vue"),
                meta: {
                    title: "Store",
                },
                name: "Store",
            },
        ],
    },
    {
        path: "/store/product",
        component: () => import("./views/ProductDetails.vue"),
        name: "ProductDetail",
    },
    {
        path: "/store/cart",
        component: () => import("./views/CartPage.vue"),
        name: "Cart",
    },
    {
        path: "/store/order-successful/:id",
        component: () => import("./views/OrderSuccessful.vue"),
        name: "OrderSuccessful",
    },
    {
        path: "/store/order/summary",
        component: () => import("./views/OrderSummary.vue"),
        name: "OrderSummary",
    },
    {
        path: "/store/order/shipping",
        component: () => import("./views/ShippingDetails.vue"),
        name: "ShippingDetails",
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior(to) {
        return new Promise((resolve) => {
            nextTick(() => {
                if (to.hash) {
                    const id = to.hash.replace("#", "");

                    const scrollToElement = () => {
                        const el = document.getElementById(id);
                        if (el) {
                            el.scrollIntoView({ behavior: "auto" });
                            resolve(); // finish the scroll behavior
                        } else {
                            // Keep checking until the element appears
                            setTimeout(scrollToElement, 100);
                        }
                    };

                    scrollToElement();
                } else {
                    window.scrollTo({ top: 0, behavior: "auto" });
                    resolve();
                }
            });
        });
    },
});

export default router;
