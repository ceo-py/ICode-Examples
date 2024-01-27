function reorderKeyToEnd(obj, keyToMove) {
    function reorder(obj) {
        const newObj = {};
        for (const key in obj) {
            if (key !== keyToMove && Object.values(obj[key]).length > 0) {
                newObj[key] = typeof obj[key] === 'object' ? reorder(obj[key]) : obj[key];
            }
        }
        if (keyToMove in obj) {
            newObj.files = obj.files;
        }
        return newObj;
    }

    return reorder(obj);
}

module.exports = reorderKeyToEnd;