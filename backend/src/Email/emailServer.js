const SibApiV3Sdk = require('@getbrevo/brevo');
const path = require('path');
const dotenv = require('dotenv');
const resetTemplate = require('./passwordResetTemplate');

const pathToEnvFile = path.resolve(__dirname, '../../../.env');
dotenv.config({ path: pathToEnvFile });


let apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

let apiKey = apiInstance.authentications['apiKey'];
apiKey.apiKey = process.env.EMAIL_API_KEY;

let sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail(); 

sendSmtpEmail.subject = "[ICode Example]: Reset your password";

sendSmtpEmail.htmlContent = resetTemplate('This is test userName');
sendSmtpEmail.sender = {"name":"ICode Example","email":"icode.example@ceo-py.eu"};
sendSmtpEmail.to = [{"email":"istrationr@gmail.com","name":"Jane Doe"}];
// sendSmtpEmail.cc = [{"email":"example2@example2.com","name":"Janice Doe"}];
// sendSmtpEmail.bcc = [{"name":"John Doe","email":"example@example.com"}];
// sendSmtpEmail.replyTo = {"email":"replyto@domain.com","name":"John Doe"};
// sendSmtpEmail.headers = {"Some-Custom-Name":"unique-id-1234"};
// sendSmtpEmail.params = {"parameter":"My param value","subject":"New Subject"};

apiInstance.sendTransacEmail(sendSmtpEmail).then(function(data) {
  console.log('API called successfully. Returned data: ' + JSON.stringify(data));

}, function(error) {
  console.error(error);
});