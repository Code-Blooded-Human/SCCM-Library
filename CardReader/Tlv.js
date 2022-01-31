
class TLV{
    constructor(tag, value, description = "None"){
        this.tag = tag;
        this.value = value;
        this.len =0;
        this.description = description;

        if(value instanceof Number){
            this.len = 1;
            return; 
        }
        
        if(value instanceof Array || value instanceof Buffer || value instanceof ArrayBuffer){
            for(i in value){
                if(value[i] instanceof Number){
                    this.len++;
                }else if(value[i] instanceof TLV){
                    this.len = value[i].len +2;
                }
            }
            return;
        }
        
        if(value instanceof TLV ){
            this.len = value.len + 2;
            return;
        }
    }

    getValue(){
        let tlvArray = [this.tag, this.len];
        if(this.value instanceof Array)
    }

}