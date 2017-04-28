# vutlan-snmp.js

This module's implemented on top of net-snmp.js to access data from vutlan device.
It must use with snmp v2c

Now, this module is not public

To understand this module you must read the method in net-snmp(https://github.com/stephenwvickers/node-net-snmp)

Here's how to use it : 

# Create session

```javascript
var Monitor = require("./models/monitor.js"); // import monitor model
    Sensor = require("./models/sensor.js");  // import sensor model
    mylibs = require("./controllers/mylibs"); // import my core module

sessionInfo = {
    targetIP : monitorIP,
    community : "write", // read(read data) or write(set&read data)
}

var session = new mylibs.MonitorObj(sessionInfo); // create snmp session
```

# get all sensors data from vutlan monitor

```javascript
session.getElementsTable(20, function(err,res){
    if(err){
        console.log(err);
    }else{
        console.log(res); // Get result to do some work.
    }
});
```

# Set sensors value

```javascript
setData = { // look at jsonModel folder to understand model
    "sid":"203001",
    "class":"analog", 
    "type":"Internal", 
    "set":{ 
        "name":"Masda5",  
        "lowAlarm" : "3",
        "lowWarning" : "10",
        "highWarning" : "40",
        "highAlarm" : "60",
        "at0" : "2",
        "at75" : "1",
    }
}

session.setSensorById(setData, function(err, res){
    console.log(res); // response is return in List. You can check which sensor is set.
});

```

# send sms to target number

```javascript
var sms = require('./controllers/sms.js');

var message = new sms.SmsObj(monitorIP, username, password);

message.sendSms(phoneNum, message) // phoneNum is start with country code (TH: +66)
```