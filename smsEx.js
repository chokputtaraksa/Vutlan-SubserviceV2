var sms = require('./controllers/sms.js');

var message = new sms.SmsObj("161.246.6.96", 'guest', 'guest', "+66871363515", "alert from monitor");

setTimeout(function(err,res){message.sendSms("+66871363515", "warning at monitors")}, 1000);