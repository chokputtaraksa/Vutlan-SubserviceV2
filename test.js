var snmp = require ("net-snmp");


var target = "203.151.85.73";
var community = "write";
var version = snmp.Version2c;

var typeOrOid = "1.3.6.1.4.1.39052.1.3";

var session = snmp.createSession (target, community, {version: version});

// address will be ignored for version 2c
session.trap (snmp.TrapType[typeOrOid] || typeOrOid, function (error) {
    console.log("send");
    if (error)
		console.trace ("Trap failed: " + error);
});