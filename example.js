
// Copyright 2013 Stephen Vickers


var Monitor = require("./models/monitor.js");
    Sensor = require("./models/sensor.js");
    mylibs = require("./controllers/mylibs");

sessionInfo = {
    targetIP : "161.246.6.96",
    community : "write", // read(read data) or write(set data)
}

var session = new mylibs.MonitorObj(sessionInfo);

setData = { // look at jsonModel/JsonEx.json
    "sid":"302001",
    "class":"switch", //analog/discret/switch
    "type":"Internal", //Internal/CAN/Rs
    "set":{ //if don't want to set something don't fill it
        "name":"Masda2",  //like I didn't want to set name just delete it from Json
    }
}

session.setSensorById(setData, function(err, res){
    if(err) console.log(err);
    else console.log(res);
});

sessionInfo2 = {
    targetIP : "161.246.6.96",
    community : "read", // read(read data) or write(set data)
}
var session2 = new mylibs.MonitorObj(sessionInfo2);

session2.getElementsTable(20, function(err,res){
    if(err) console.log(err);
    else console.log(res);
});
