const SibApiV3Sdk = require('@getbrevo/brevo');
const path = require('path');
const dotenv = require('dotenv');
const resetTemplate = require('./passwordResetTemplate');
const maskedEmail = require('../utils/maskedEmail');

const pathToEnvFile = path.resolve(__dirname, '../../../.env');
dotenv.config({ path: pathToEnvFile });


const email = () => {
  try {
    let apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

    let apiKey = apiInstance.authentications['apiKey'];
    apiKey.apiKey = process.env.EMAIL_API_KEY;

    return [new SibApiV3Sdk.SendSmtpEmail(), apiInstance];
  } catch (error) {
    console.error('Error Email Connect', error)
  }

}

const sendEmail = async (username, emailAddress, token) => {
  const [sendSmtpEmail, apiInstance] = email()
  if (!sendSmtpEmail) return {
    message: 'We are currently experiencing technical difficulties that are preventing us from sending emails. Please try again later.',
    code: 500,
  };

  sendSmtpEmail.subject = "iCode Example]: Reset your password";

  sendSmtpEmail.htmlContent = resetTemplate(username, token);
  sendSmtpEmail.sender = { "name": "iCode Example", "email": "icode.example@ceo-py.eu" };
  sendSmtpEmail.to = [{ "email": emailAddress, "name": username }];

  try {
    await apiInstance.sendTransacEmail(sendSmtpEmail)
    return {
      message: `We've successfully received your password reset request. You'll receive an email at ${maskedEmail(emailAddress)} with instructions on how to reset your password. Please check your inbox for further details.`,
      code: 200,
    };
  } catch (error) {
    console.error('Error sending email', error);
    return {
      message: 'We are currently experiencing technical difficulties that are preventing us from sending emails. Please try again later.',
      code: 500,
    };
  }
}

module.exports = sendEmail;