class APDU{
    constructor({cla, ins, p1, p2, data, le=0xFF}){
        this.apdu = [cla, ins, p1, p2]
        let lc = data.length;
        
        if(lc > 0){
            this.apdu.push(lc);
            this.apdu = this.apdu.concat(data);
        }
        this.apdu.push(le);
    }
    val(){
        return this.apdu;
    }
}

module.exports = APDU;