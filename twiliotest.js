const accountSid = 'AC8fa7cda0e72502b8f5707889348a1b88';
const authToken = '7cc746ac155a43419d4479a58d0cc87f';
const client = require('twilio')(accountSid, authToken);

var phoneNumber = '+19413029794';
orderConfirmation('Paul Stephen', 'Hutchinson Maltaghati', phoneNumber);

function orderConfirmation(firstName, lastName, phoneNum) {
    setTimeout(() => {
        alert1(phoneNum)
    }, 5000);
    var messageText = 'Hello ' + firstName + ' ' + lastName + ', your order has been placed and will be ready in 50 seconds.';
    client.messages
    .create({
       body: messageText,
       from: '+16172748307',
       to: phoneNum
     })
    .then(message => console.log(message.sid))
    .done();
}

function alert1(phoneNumber) {
    client.messages
    .create({
       body: 'Your food is ready for pickup.',
       from: '+16172748307',
       to: phoneNumber
     })
    .then(message => console.log(message.sid))
    .done();
}
