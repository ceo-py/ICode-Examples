export function passwordValidation(password) {

    if (/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).{8,}$/.test(password)) return

    return 'Password must meet the following criteria:\n' +
        '- At least 8 characters long\n' +
        '- Contains at least one number\n' +
        '- Contains at least one lowercase letter\n' +
        '- Contains at least one uppercase letter\n' +
        '- Does not contain any spaces\n'

}