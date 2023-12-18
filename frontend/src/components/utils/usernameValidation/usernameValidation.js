export function usernameValidation(username) {
    if (!/^[a-zA-Z]{4,}$/.test(username)) {
        return 'Create a username that is at least 4 characters long can include only letters.';
    }
}