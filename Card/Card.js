const P = require("pino");
const { berToJson } = require("../asn1/asn1");
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
                    
                    let d = hexStringToByteArray(fileIdentifier);
                    console.log({fileIdentifier, m:'debug', out:Buffer.from(d)});
                    const apdu = new APDU({cla:0x00, ins:0xA4, p1:0x00, p2:0x0c, data:hexStringToByteArray(fileIdentifier), le:2});
                    const [response,status] = await this.reader.sendAPDU(apdu.val(),2);
                    console.log("Selected file = ", fileIdentifier);
                    console.log({des:"select file", apdu:apdu.val(), status});
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

    readAttribute(attributeName){
        return new Promise((resolve, reject)=>{
            (async()=>{
                const {filePath, fileID} = this.scf.getFileInfoByAttributeName(attributeName);
               
                const dataLength = this.scf.fileSize(fileID);
               
                const fileSchema = this.scf.schema(fileID);
                console.log({filePath, dataLength});
                const fileData = await this.readFileRaw(filePath, dataLength );
                const parsedJson = await berToJson(fileData, fileSchema);
                resolve(parsedJson[attributeName]);
                return;
            })()
        });
    }

    createFile(filePath){
        return new Promise((resolve, reject)=>{

        
        (async()=>{

        
        let fileIdentifier = filePath[filePath.length -1];
        if(filePath.length > 1){
            for(var i=0;i<filePath.length-1;i++){
                await this.selectFile(filePath[i]);
            }
        }
        let fcp;
        this.scf.scf.fs.forEach((file)=>{
            if(file.fileId == fileIdentifier){
                fcp = file.FCPTLVCoding;
            }
        })
        let apdu = new APDU({cla:0x00, ins:0xE0, p1:0, p2:0, data:fcp, le:0x05});
        const [response,status] = await this.reader.sendAPDU(apdu.val(),5);

        console.log(Buffer.from(apdu.val()))

        console.log(response);
        console.log(status);

        resolve('response');
        
        })();
    });
    }

    writeFileBinary(filePath, rawData){
        return new Promise((resolve,reject)=>{
            (async()=>{
                let fileIdentifier = filePath[filePath.length-1];
                for(var i=0;i<filePath.length;i++){
                    await this.selectFile(filePath[i]);
                }
                let apdu = new APDU({cla:0x00, ins:0xD0, p1:0x0, p2:0x0, data:[...rawData], le:0x05});
                console.log({apdu:apdu.val()});
                const [response,status] = await this.reader.sendAPDU(apdu.val(),5);
                console.log({response,status});
            })()
        });
        
    }



    initCard(){
        //create all the files
        return new Promise((resolve, reject)=>{
            (async()=>
                {
                    // CREATE ALL THE FILES.
                    let fs = scf.getFiles();
                    for(file in fs){
                        await this.createFile(file.path);
                    }

                    // Add passwords
                }
            )()
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

    // verifyPassword(name,value);
    // 
}

module.exports = Card;