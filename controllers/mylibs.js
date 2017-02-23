/* <-- Rattapum Puttaraksa --> */
/* Used net-snmp library */
// Copyright 2013 Stephen Vickers
var snmp = require ("net-snmp");
    Monitor = require("../models/monitor.js");
    Sensor = require("../models/sensor")

/*
sessionInfo = {
    var targetIP = "161.246.6.96",
    var community = "read", // read(read data) or write(set data)
}

*/
function MonitorObj (sessionInfo) {
    this.sessionInfo = sessionInfo;
    this.session = snmp.createSession (sessionInfo.targetIP, sessionInfo.community, {version: snmp.Version2c});
}

MonitorObj.prototype.getSnmpInfo = function() {
    return this.sessionInfo;
};

MonitorObj.prototype.getElementsTable = function(maxRepetitions, callback){
    // maxRepetitions parameter specifies how many OIDs lexicographically
    // following an OID for which varbinds should be fetched, and defaults to 20

    //1.3.6.1.4.1.39052.1.3 = ctlUnitElementsTable's OID in vutlan.mib
    this.session.table ("1.3.6.1.4.1.39052.1.3", maxRepetitions, function(err, table){
        var monitor;
        if (err) {
    		callback(err.toString (), null);
    	} else {
            var sensors =  [];
            var indexes = [];

            for (index in table) indexes.push(index);//search for index's name

            for (var i=indexes.length-1; i>=0; i--) {
                // console.log(i);
                if(i==0){ //1st row is monitor information
                    // console.log(table[indexes[i]]);
                    monitor = new Monitor("161.246.6.96", table[indexes[i]][7], new Date(), sensors);
                }else{
                    sensors.push(new Sensor(table[indexes[i]]));
                }
            }
    	}
        callback(null, monitor)
    });
}

//now can only set sensor's name. It will set another in this evening. Sorry!
MonitorObj.prototype.setSensorById = function(setData, callback){
    var setting = {
        sid : setData.sid,
        sclass : setData.class,
        setName : setData.set.name,
        setLowAlarm : setData.set.lowAlarm,
        setLowWarning : setData.set.lowWarning,
        setHighWarning : setData.set.highWarning,
        setHighAlarm : setData.set.highAlarm,
        setAt0 : setData.set.at0,
        setAt75 : setData.set.at75,
        setInitState : setData.set.initial,
        setPulse : setData.set.pulse
    }
    // console.log(setting);
    setName(this.session, setting.sid, setting.setName, function(err,res){
        if(err) callback(err);
        else callback(res);
    });
}




/*============================== Internal functions ==========================*/
function setName(ss, id, name, callback){
    var varbinds = [{
    	oid: "1.3.6.1.4.1.39052.1.3.1.7." + id,
    	type: snmp.ObjectType.OctetString,
    	value: name
    }];
    // console.log(varbinds);
    ss.set (varbinds, function (error, varbinds) {
        console.log(varbinds);
    	if (error) callback(error.toString ());
    	else callback(id + " change Name: " + varbinds[0].value);
    });
}

function setInternalLowAlarm(ss, id, la, callback){
    var varbinds = [{
    	oid: "1.3.6.1.4.1.39052.5.2.1.10." + id,
    	type: snmp.ObjectType.OctetString,
    	value: la
    }];
    // console.log(varbinds);
    ss.set (varbinds, function (error, varbinds) {
        console.log(varbinds);
    	if (error) callback(error.toString ());
    	else callback(id + " change low alarm: " + varbinds[0].value);
    });
}

function setInternalLowWarning(ss, id, lw, callback){
    var varbinds = [{
    	oid: "1.3.6.1.4.1.39052.5.2.1.11." + id,
    	type: snmp.ObjectType.OctetString,
    	value: lw
    }];
    // console.log(varbinds);
    ss.set (varbinds, function (error, varbinds) {
        console.log(varbinds);
    	if (error) callback(error.toString ());
    	else callback(id + " change low warning: " + varbinds[0].value);
    });
}

function setInternalLowWarning(ss, id, lw, callback){
    var varbinds = [{
    	oid: "1.3.6.1.4.1.39052.5.2.1.11." + id,
    	type: snmp.ObjectType.OctetString,
    	value: lw
    }];
    // console.log(varbinds);
    ss.set (varbinds, function (error, varbinds) {
        console.log(varbinds);
    	if (error) callback(error.toString ());
    	else callback(id + " change low warning: " + varbinds[0].value);
    });
}

function setInternalHighWarning(ss, id, hw, callback){
    var varbinds = [{
    	oid: "1.3.6.1.4.1.39052.5.2.1.12." + id,
    	type: snmp.ObjectType.OctetString,
    	value: hw
    }];
    // console.log(varbinds);
    ss.set (varbinds, function (error, varbinds) {
        console.log(varbinds);
    	if (error) callback(error.toString ());
    	else callback(id + " change high warning: " + varbinds[0].value);
    });
}

function setInternalHighAlarm(ss, id, ha, callback){
    var varbinds = [{
    	oid: "1.3.6.1.4.1.39052.5.2.1.13." + id,
    	type: snmp.ObjectType.OctetString,
    	value: lw
    }];
    // console.log(varbinds);
    ss.set (varbinds, function (error, varbinds) {
        console.log(varbinds);
    	if (error) callback(error.toString ());
    	else callback(id + " change high alarm: " + varbinds[0].value);
    });
}

function setInternalAt0(ss, id, at0, callback){
    var varbinds = [{
    	oid: "1.3.6.1.4.1.39052.5.2.1.14." + id,
    	type: snmp.ObjectType.OctetString,
    	value: at0
    }];
    // console.log(varbinds);
    ss.set (varbinds, function (error, varbinds) {
        console.log(varbinds);
    	if (error) callback(error.toString ());
    	else callback(id + " change At0: " + varbinds[0].value);
    });
}

function setInternalAt75(ss, id, value, callback){
    var varbinds = [{
    	oid: "1.3.6.1.4.1.39052.5.2.1.15." + id,
    	type: snmp.ObjectType.OctetString,
    	value: value
    }];
    // console.log(varbinds);
    ss.set (varbinds, function (error, varbinds) {
        console.log(varbinds);
    	if (error) callback(error.toString ());
    	else callback(id + " change At75: " + varbinds[0].value);
    });
}

function setInternalExpression(ss, id, value, callback){
    var varbinds = [{
    	oid: "1.3.6.1.4.1.39052.5.2.1.16." + id,
    	type: snmp.ObjectType.OctetString,
    	value: value
    }];
    // console.log(varbinds);
    ss.set (varbinds, function (error, varbinds) {
        console.log(varbinds);
    	if (error) callback(error.toString ());
    	else callback(id + " change Expression: " + varbinds[0].value);
    });
}

function setCANReset(ss, id, value, callback){
    var varbinds = [{
    	oid: "1.3.6.1.4.1.39052.6.1.1.8." + id,
    	type: snmp.ObjectType.Integer,
    	value: value
    }];
    // console.log(varbinds);
    ss.set (varbinds, function (error, varbinds) {
        console.log(varbinds);
    	if (error) callback(error.toString ());
    	else callback(id + " change alarm duration: " + varbinds[0].value);
    });
}

function setCANLevel(ss, id, value, callback){
    var varbinds = [{
    	oid: "1.3.6.1.4.1.39052.6.1.1.9." + id,
    	type: snmp.ObjectType.Integer,
    	value: value
    }];
    // console.log(varbinds);
    ss.set (varbinds, function (error, varbinds) {
        console.log(varbinds);
    	if (error) callback(error.toString ());
    	else callback(id + " change level: " + varbinds[0].value);
    });
}

function setCANReverse(ss, id, value, callback){
    var varbinds = [{
    	oid: "1.3.6.1.4.1.39052.6.1.1.10." + id,
    	type: snmp.ObjectType.Integer,
    	value: value
    }];
    // console.log(varbinds);
    ss.set (varbinds, function (error, varbinds) {
        console.log(varbinds);
    	if (error) callback(error.toString ());
    	else callback(id + " change level: " + varbinds[0].value);
    });
}

function setInternalInitial(ss, id, value, callback){
    var varbinds = [{
    	oid: "1.3.6.1.4.1.39052.5.3.1.8." + id,
    	type: snmp.ObjectType.OctetString,
    	value: value
    }];
    // console.log(varbinds);
    ss.set (varbinds, function (error, varbinds) {
        console.log(varbinds);
    	if (error) callback(error.toString ());
    	else callback(id + " change level: " + varbinds[0].value);
    });
}

function setInternalPulse(ss, id, value, callback){
    var varbinds = [{
    	oid: "1.3.6.1.4.1.39052.5.3.1.9." + id,
    	type: snmp.ObjectType.Integer,
    	value: value
    }];
    // console.log(varbinds);
    ss.set (varbinds, function (error, varbinds) {
        console.log(varbinds);
    	if (error) callback(error.toString ());
    	else callback(id + " change level: " + varbinds[0].value);
    });
}

/* ================================ Exports ================================ */
exports.MonitorObj = MonitorObj;
