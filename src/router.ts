import { createWebHistory, createRouter } from "vue-router";

const routes = [
    {
        path: "/",
        component: () => import("./layouts/NavbarLayout.vue"),
        children: [
            { path: "", component: () => import("./views/HomeView.vue"), name: "home" },
            {
                path: "store",
                component: () => import("./views/StoreHome.vue"),
                meta: {
                    title: "Store",
                },
                name: "store",
            },
        ],
    },
    {
        path: "/product/:id",
		component: () => import("./views/product/_id.vue"),
		name: 'product',
    },
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

export default router;
