const fs = require('fs');
const hjson = require('hjson');
const { promisify } = require('util')
const readFileAsync = promisify(fs.readFile)
const { readFile } = require('fs/promises')

async function content(path) {  
    return await readFile(path, 'utf8')
  }
    
class SCF{
    constructor(filepath){
        (async()=>{
            this.scfFile = await content(filepath);
            this.scf = hjson.parse(this.scfFile);
            console.log(this.scf);
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
       filePath = fileID;
        // this.scf.fs.forEach((file)=>{
        //     if(file.id == fileID){
        //         filePath=file.path;
        //     }
        // })
        // console.log({filePath});
        fileID = filePath[filePath.length -1]
        console.log( {filePath, fileID})
        return {filePath, fileID};
    }

    fileSize(fileID){
        let size = 0;
        this.scf.fs.forEach((el)=>{
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
                schema = el.asn1Schema;
            }
        })
        return schema;
    }
}

module.exports = SCF;