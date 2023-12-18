export function usernameValidation(username) {
    if (!/^[a-zA-Z]{4,10}$/.test(username)) {
        return 'Create a username that is at least 4-10 characters long can include only letters.';
    }
}