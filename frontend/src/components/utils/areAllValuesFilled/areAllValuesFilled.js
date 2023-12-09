export function areAllValuesFilled(values) {
    for (const key in values) {
        if (values[key].trim() === "") {
            return false;
        }
    }
    return true;
};
