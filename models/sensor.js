function Sensor(obj){
    this.sid = obj[1];
    // this.group = obj[2];
    this.module = obj[3];
    this.num = obj[4];
    this.class = obj[5].toString();
    this.type =obj[6].toString();
    this.name=obj[7].toString();
    this.state=obj[8].toString();
    this.value=obj[9].toString();
    // this.spec=obj[10];
}

module.exports = Sensor;
