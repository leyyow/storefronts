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
];

const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior(to) {
        return new Promise(() => {
            nextTick(() => {
                if (to.hash) {
                    const element = document.querySelector(to.hash);
                    if (element) {
                        element.scrollIntoView({ behavior: "smooth" });
                    }
                } else {
                    window.scrollTo({ top: 0, behavior: "smooth" });
                }
            });
        });
    },
});

export default router;
