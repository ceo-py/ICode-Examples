export function parseNestedObjects(obj) {
    for (const key in obj) {
        if (typeof obj[key] === 'string') {
            try {
                obj[key] = JSON.parse(obj[key]);
            } catch (error) {
            }
        } else if (typeof obj[key] === 'object') {
            obj[key] = parseNestedObjects(obj[key]);
        }
    }
    return obj;
}

