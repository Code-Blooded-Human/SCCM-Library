const P = require("pino");
const { berToJson, jsonToBer } = require("../asn1/asn1");
const APDU = require("../CardReader/Apdu");
const asciiToBytes  = require("../utils/asciiToBytes");
const hexStringToByteArray = require("../utils/hexToBytes");

class Card{
    
    constructor(reader, scf){
        this.reader = reader;
        this.cardInUse = false; // Lock APDU Transmissions
        this.scf = scf;
        if(this.reader.passwords){
            this.passwords = JSON.parse(JSON.stringify(this.reader.passwords)); // Create copy
        }
        if(this.reader.keys){
            this.keys = JSON.parse(JSON.stringify(this.reader.keys)); // Create copy
        }
        
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

    _readFileAsJSON(filePath){
        return new Promise((resolve, reject)=>{
            (async()=>{
                const fileID = filePath[filePath.length-1];
                const dataLength = this.scf.fileSize(fileID);
                const fileSchema = this.scf.schema(fileID);
                console.log({dataLength,fileSchema});
                const fileData = await this.readFileRaw(filePath, dataLength );
                
                if(fileData.length == 0){
                    resolve({});
                    return;
                }
                const parsedJson = await berToJson(fileData, fileSchema);
                
                resolve(parsedJson);
            })();
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
                console.log({fileSchema});
                const parsedJson = await berToJson(fileData, fileSchema);
                resolve(parsedJson[attributeName]);
                return;
            })()
        });
    }
    
    readAttributes(attributeNames){
        return new Promise((resolve, reject)=>{
            (async()=>{
                const {filePath, fileID} = this.scf.getFileInfoByAttributeName(attributeNames[0]);
               
                const dataLength = this.scf.fileSize(fileID);
               
                const fileSchema = this.scf.schema(fileID);
                console.log({filePath, dataLength});
                const fileData = await this.readFileRaw(filePath, dataLength );
                console.log({fileSchema});
                const parsedJson = await berToJson(fileData, fileSchema);
                let out ={};
                for(var i =0; i<attributeNames.length; i++){
                    out[attributeNames[i]] = parsedJson[attributeNames[i]];
                }
                resolve(out);
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
            if(file.id == fileIdentifier){
                fcp = file.fcp;
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
                resolve();
            })()
        });
        
    }

   
    writeFileJSON(filePath, data){
        return new Promise((resolve, reject)=>{
            (async()=>{
                // let schema = await this.scf.getSchemaFromFilePath(filePath);
                const fileSchema = this.scf.schema(filePath[filePath.length-1]);
                console.log({from:'WRITE_FILE_JSON',fileSchema, filePath})
                let hexData = await jsonToBer(data,fileSchema);
                await this.writeFileBinary(filePath, hexData);
                resolve();
            })()
        });
    }

    
    updateFileJSON(filePath, data){
        return new Promise((resolve, reject)=>{
            (async()=>{
                let schema = this.scf.schema(filePath[filePath.length-1]);
                let hexData = await jsonToBer(data,schema);
                await this.updateFileBinary(filePath, hexData);
                resolve();
            })()
        });
    }
    
   
    updateFileBinary(filePath, rawData){
        return new Promise((resolve,reject)=>{
            (async()=>{
                let fileIdentifier = filePath[filePath.length-1];
                for(var i=0;i<filePath.length;i++){
                    await this.selectFile(filePath[i]);
                }
                let apdu = new APDU({cla:0x00, ins:0xD6, p1:0x0, p2:0x0, data:[...rawData], le:0x05});
                console.log({apdu:apdu.val()});
                const [response,status] = await this.reader.sendAPDU(apdu.val(),5);
                console.log({response,status});
                resolve();
            })()
        });
        
    }


    _writeRecord(filePath, recordNo, data){
        return new Promise((resolve, reject )=>{
            (async()=>{
                for(var i=0;i<filePath.length;i++){
                    await this.selectFile(filePath[i]);
                }
                let apdu = new APDU({cla:0x00, ins:0xD2, p1:recordNo, p2:0x04, data:[...data],le:0x05});
                const [response,status] = await this.reader.sendAPDU(apdu.val(),5);
                console.log({response,status});
                resolve();
            })()
        })
    }
    
    async _writePassword(name, value){
        return new Promise((resolve, reject)=>{
            (async()=>{
                let {filePath, passwordId} = this.scf.getMetaDataByPasswordName(name);
                if(filePath){
                    // for(var i=0;i<filePath.length;i++){
                    //     await this.selectFile(filePath[i]);
                    // }

                    let data = [0x80|passwordId, 0xff]
                    data = data.concat(asciiToBytes(value));
                    console.log(data);
                    await this._writeRecord(filePath,passwordId, data);
                    resolve();
                }
            })()
            
        })

    }
    async _writeKey(name, value){
        return new Promise((resolve, reject)=>{
            (async()=>{
                let {filePath, keyId} = this.scf.getMetaDataByKeyName(name);
                if(filePath){
                    // for(var i=0;i<filePath.length;i++){
                    //     await this.selectFile(filePath[i]);
                    // }

                    let data = [0x80|keyId,0x80, 0x00]
                    data = data.concat(value);
                    console.log(data);
                    await this._writeRecord(filePath,keyId, data);
                    resolve();
                }
            })()
            
        })
    }

    
    registerPasswordValue(name, value){
        this.passwords[name]=value;
    }
    registerKeyValue(name, value){
        this.keys[name] =value;
    }


    async _verifyPassword(name, value){
        return new Promise((resolve, reject)=>{
            (async()=>{
               await this.selectFile(0x3f00);
               let {filePath, passwordId} = this.scf.getMetaDataByPasswordName(name);
               let pass = asciiToBytes(value)
                let apdu = new APDU({cla:0x00, ins:0x20, p1:0x00, p2:passwordId, data:pass, le:5});
                const [response,status] = await this.reader.sendAPDU(apdu.val(),5);
                console.log({response,status});
                resolve();
            })();
            
        })
    }
    //not tested
    computeCCT(data){
        return new Promise((resolve,reject)=>{
        (async()=>{
            await this.selectFile(0x3f00);
            let apdu = new APDU({cla:0x00, ins:0x2A, p1:0x8e, p2:0x80, data:data, le:0xff});
            const [response,status] = await this.reader.sendAPDU(apdu.val(),0xff);
            console.log({response,status});
            resolve();
        })()
        })
    }

    //tested
    writeAttribute(attributeName,value){

        return new Promise((resolve, reject)=>{
            (async()=>{
                let {filePath,fileId} = this.scf.getFileInfoByAttributeName(attributeName);
                // let jsonData = await this._readFileAsJSON(filePath);
                
                let jsonData = {}
                jsonData[attributeName] = value;
                await this.writeFileJSON(filePath,jsonData);
                resolve();
            })();
        })
    }
    

    updateAttribute(attributeName,value){

        return new Promise((resolve, reject)=>{
            (async()=>{
                let {filePath,fileId} = this.scf.getFileInfoByAttributeName(attributeName);
                let jsonData = await this._readFileAsJSON(filePath);
                console.log({jsonData})
                jsonData[attributeName] = value;
                await this.updateFileJSON(filePath,jsonData);
                resolve();
            })();
        })
    }
    

    writeKeyInSE(seid,key_id){
        return new Promise((resolve, reject)=>{
            (async()=>{
                let data = [0x80,0x01,seid, 0x8A, 0x01, 0x05, 0xB4, 0x08, 0x80, 0x01, 0x01, 0x83, 0x01 ,key_id, 0x85 ,0x00]
                await this._writeRecord([0x3f00, 0x3f03],seid,data)
            })();
        })
    }

    
    async createCard(passwords={}, keys={}, attributes={}){

        return new Promise((resolve, reject)=>{
            (async()=>{

                let fs = this.scf.getFiles();
                for(let i=0;i<fs.length;i++){
                    let f = fs[i];
                    console.log(f.path);
                    await this.createFile(f.path);
                }
                

                // add passwords.
                for(const [name,value] of Object.entries(this.passwords)){
                    await this._writePassword(name,value)
                }

                // add keys.
                for(const [name,value] of Object.entries(this.keys)){
                    await this._writeKey(name,value)
                }

                // add data in SE
                this.scf.securityEnvironment.forEach(se=>{
                    await this.writeKeyInSE(se.seid, se.keyReference);
                })

            })();
        })

    }





 
}

module.exports = Card;