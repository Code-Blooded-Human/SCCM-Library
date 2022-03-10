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


    getFiles(){
        return this.scf.fs;
    }
    getFileInfoByAttributeName(attributeName){
        let filePath;
        let fileID;
        this.scf.attributes.forEach((el)=>{
            console.log({el});
            if(el.name == attributeName){
                fileID = el.storedIn;
            }
        })
        this.scf.fs.forEach((file)=>{
            if(file.fileId == fileID){
                filePath=file.path;
            }
        })
        console.log({filePath});
        return {filePath, fileID};
    }

    fileSize(fileID){
        let size = 0;
        this.scf.fs.forEach((el)=>{
            if(el.fileId == fileID){
                size = el.EFFileInfo.fileMaxSize;
            }
        })
        return size;
    }

    schema(fileID){
        let schema = 0;
        this.scf.fs.forEach((el)=>{
            if(el.fileId == fileID){
                schema = el.schema;
            }
        })
        return schema;
    }
}

module.exports = SCF;