export function passwordValidation(password) {
    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=\S+$).{6,}$/.test(password)) {
        return 'Create a password that is at least 6 characters long, includes both uppercase and lowercase letters, and has at least one number.';
    }
}