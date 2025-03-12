export default {
    important: true,
    content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx,vue}"],
    theme: { extend: {} },
    plugins: [require("tailwind-scrollbar-hide")],
};
