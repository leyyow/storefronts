import { createWebHistory, createRouter } from "vue-router";

const routes = [
	{
		path: "/",
		component: () => import("./layouts/NavbarLayout.vue"),
		children: [
			{ path: "", component: () => import("./views/HomeView.vue"), name: 'home' },
			{
				path: "store",
				component: () => import("./views/StoreHome.vue"),
                meta: {
                    title: 'Store',
                },
                name: 'store'
			},
		],
	},
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

export default router;
