const fs = require('fs');
const { promisify } = require('util')
const readFileAsync = promisify(fs.readFile)
    
class SCF{
    constructor(filepath){
        (async()=>{
            this.scfFile = await readFileAsync(filepath);
            this.scf = JSON.parse(this.scfFile);
        })()
    }


    getFileInfoByAttributeName(attributeName){
        let filePath;
        let fileID;
        this.scf.attributes.forEach((el)=>{
            if(el.name == attributeName){
                filePath = el.filePath;
                fileID = el.fileID;
            }
        })
        return {filePath, fileID};
    }

    fileSize(fileID){
        let size = 0;
        this.scf.fs.forEach((el)=>{
            console.log("--------")
            console.log(el);
            if(el.id == fileID){
                size = el.size;
            }
        })
        return size;
    }

    schema(fileID){
        let schema = 0;
        this.scf.fs.forEach((el)=>{
            if(el.id == fileID){
                schema = el.schema;
            }
        })
        return schema;
    }
}

module.exports = SCF;