function Monitor(addr, name, date_time, sensors){
    this.addr=addr;
    this.name=name.toString();
    // this.date_time=date_time;
    this.sensors=sensors;
}
module.exports = Monitor;
