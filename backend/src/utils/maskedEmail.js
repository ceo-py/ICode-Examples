function maskedEmail(email) {
    return `${email.substring(0, 3)}${'*'.repeat(email.indexOf('@') - 3)}@${email.substring(email.indexOf('@') + 1)}`;
}

module.exports = maskedEmail;