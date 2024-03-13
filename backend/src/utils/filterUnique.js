function filterUnique(comments) {
    const uniqueComments = [];
    let prevCreatedById = "";

    for (const comment of comments) {
        if (comment.createdById.toString() !== prevCreatedById.toString()) {
            uniqueComments.push(comment);
        }
        prevCreatedById = comment.createdById;
    }
    return uniqueComments

};

module.exports = filterUnique;