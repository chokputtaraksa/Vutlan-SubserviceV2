
var crypto = require('crypto');
//da39a3ee5e6b4b0d3255bfef95601890afd80709
//35675e68f4b5af7b995d9205ad0fc43842f16450
//35675e68f4b5af7b995d9205ad0fc43842f16450
var request = require('request');
var parseString = require('xml2js').parseString;

var SmsObj = function(hostIP, username, password){
    this.hostIP = hostIP;
    this.username = username;
    this.password = password;
}


SmsObj.prototype.sendSms = function(toPhone ,message){
    var host_ip = this.hostIP;
    var phone_num = toPhone;
    var username =  this.username;
    var password = this.password;
    var message = message;

    var hash = crypto.createHash('sha1').update(password).digest("hex");// hash password with digest sha1
    var options = {// prepare data
        url: 'http://'+ host_ip + '/engine.htm',
        method: 'POST',
        body: 'querytype=auth&name='+username+'&h=' + hash 
    };
    // console.log(options);

    request(options, function(error, response, body) { // send request to get access_key
        if (!error && response.statusCode == 200) {
            parseString(body, function (err, result) { // parse xml to json
                var options2 = {                        // prepare data 
                    method: 'POST',
                    url: 'http://' + host_ip + '/engine.htm',  
                    headers: 
                    { 
                        'content-type': 'application/x-www-form-urlencoded',
                    },
                    form: 
                    { 
                        querytype: 'send_sms_message',  // query type
                        k: result.user.$.k,             // access_key
                        to_phone: phone_num,         // phone_number
                        message: message           // message
                    } 
                };
                // console.log(options2);
                request(options2, function (error, response, body) {
                    if (error) console.log(error);
                    else console.log(body);
                });
            });
        }
    });
}
exports.SmsObj = SmsObj;