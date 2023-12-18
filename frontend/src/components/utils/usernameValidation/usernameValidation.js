export function usernameValidation(username) {
    if (!/^[a-zA-Z]{3,10}$/.test(username)) {
        return 'Create a username that is at least 3-10 characters long can include only letters.';
    }
}