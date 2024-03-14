function filterUnique(comments) {
    const uniqueComments = [];
    let usernames = [];

    for (const comment of comments) {
        if (!usernames.includes(comment.username)) {
            uniqueComments.push(comment);
        }
        usernames.push(comment.username);
    }
    return uniqueComments

};

module.exports = filterUnique;