export function usernameValidation(username) {

    if (/^(?!.*\s)[a-zA-Z0-9]{3,}$/.test(username)) return

    return 'Username must meet the following criteria:\n' +
        '- At least 3 characters long\n' +
        '- Contains only letters and numbers\n' +
        '- Does not contain any spaces\n'

}