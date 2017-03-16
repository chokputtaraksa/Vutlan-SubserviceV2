
// Copyright 2013 Stephen Vickers


var Monitor = require("./models/monitor.js");
    Sensor = require("./models/sensor.js");
    mylibs = require("./controllers/mylibs");

sessionInfo = {
    targetIP : "161.246.6.96",
    community : "write", // read(read data) or write(set&read data)
}

var session = new mylibs.MonitorObj("username", "password", sessionInfo);
// // console.log(session.getSnmpInfo());
setData = { // look at jsonModel/JsonEx.json
    "sid":"203001",
    "class":"analog", //analog/discret/switch
    "type":"Internal", //Internal/CAN/Rs
    "set":{ //if don't want to set something don't fill it
        "name":"Masda5",  //like I didn't want to set name just delete it from Json
        "lowAlarm" : "3",
        "lowWarning" : "10",
        "highWarning" : "40",
        "highAlarm" : "60",
        "at0" : "2",
        "at75" : "1",
    }
}

session.setSensorById(setData, function(err, res){
    // if(err) console.log(err);
    console.log(res);
});


session.getElementsTable(20, function(err,res){
    if(err){
        console.log(err);
    }else{
        console.log(res);
    }
});
