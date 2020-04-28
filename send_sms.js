// Download the helper library from https://www.twilio.com/docs/node/install
// Your Account Sid and Auth Token from twilio.com/console
// DANGER! This is insecure. See http://twil.io/secure
const accountSid = process.env.ACCOUNTS_ID;
const authToken = process.env.TWILIO_TOKEN;
const client = require('twilio')(accountSid, authToken);

client.messages
  .create({
     body: 'Your service request has been accepted .Soon you will be assisted.',
     from: '+15109397737',
     to: '+17788144609'
   })
  .then(message => console.log(message.sid));
