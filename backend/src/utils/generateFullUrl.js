function genTaskDesc(task) {
    const { language, course, module, taskName } = task
    return `${language}&course=${course}&module=${module}&problem=${taskName}`
        .replace(/-./g, "")
        .replace(/ /g, "-")
        .replace(/#/g, "Sharp")
        .replace(/'/g, "");
};

function genFullURL(task) {
    return `https://icode-example.ceo-py.eu/solution?language=${genTaskDesc(task)}&id=${task._id}`
};

module.exports = genFullURL;