const P = require("pino");
const APDU = require("../CardReader/Apdu");
const hexStringToByteArray = require("../utils/hexToBytes");

class Card{
    
    constructor(reader, scf){
        this.reader = reader;
        this.cardInUse = false; // Lock APDU Transmissions
        this.scf = scf;
    }


    selectFile(fileIdentifier){
        return new Promise((resolve,reject)=>{
            (async()=>{
                try{
                    const apdu = new APDU({cla:0x00, ins:0xA4, p1:0x00, p2:0x0c, data:hexStringToByteArray(fileIdentifier), le:2});
                    const [response,status] = await this.reader.sendAPDU(apdu.val(),2);
                    console.log("Selected file = ", fileIdentifier);
                    resolve(response);
                }catch(e){
                    console.log(e);
                    reject(e);
                }
            })()
        }) 
    }



    readSelectedFileRaw(offset,totalLength){
        
        return new Promise((resolve, reject)=>{
            (async () =>{
                try{
                    const apduOffeset = 0x0000 | offset;
                    const b1 = (apduOffeset & 0xFF00)/256;
                    const b2 = (apduOffeset & 0x00FF);
                    const apdu = new APDU({cla:0x00, ins:0xB0, p1:b1, p2:b2, data:[], le:totalLength});
                    const [fileData,status] = await this.reader.sendAPDU(apdu.val(),totalLength+2);
                    resolve(fileData);
                }catch(e){
                    reject(e);
                }
            })()
        })

    }

    readFileRaw(filepath, dataLength){
        return new Promise((resolve, reject)=>{
            ( async()=>{
                for(let fileIndex in filepath){
                    const fileIdentifier = filepath[fileIndex];
                    await this.selectFile(fileIdentifier);
                }

                if(dataLength < 0xFF){
                    const data = await this.readSelectedFileRaw(0, dataLength);
                    resolve(data);
                    
                }else{
                    let readData =0;
                    let completeData = []
                    while(readData < dataLength){
                        let readLen = 255
                        if(dataLength - readData < 255){
                            readLen = dataLength - readData;
                        }
                        const data = await this.readSelectedFileRaw(readData, readLen);
                        readData = readData + 255;
                        completeData = completeData.concat(data);
                    }
                    resolve(Buffer.concat(completeData));
                } 
            })()
        })
    }





    // //PUBLIC FUNCTIONS EXPOSED OUTSIDE

    // readFile(filePath)
    // writeFile(filePath, data);
    // updateFile(filePath, data);


    // registerPassword();
    // registerKey();

    // readAttribute();
    // writeAttribute();
    // updateAttribute();
    // initCard(); // Generate File Structure and store keys and passwords on card. 
}

module.exports = Card;