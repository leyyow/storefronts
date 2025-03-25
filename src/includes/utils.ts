export const convertArrayToString = (value: unknown) => {
    return Array.isArray(value) ? value.join(", ") : value;
};