export const convertArrayToString = (value: unknown) => {
    return Array.isArray(value) ? value.join(", ") : value;
};

export function getCurrentStoreSlug(): string {
    const segments = window.location.pathname.split("/").filter(Boolean);
    return segments[0] || "";
}