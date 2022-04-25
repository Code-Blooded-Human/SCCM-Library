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

    getSchemaFromFilePath(filePath){
        (async()=>{
            let schema;
            this.scf.fs.forEach((f)=>{
                console.log({1:f.path.toString() , 2: filePath.toString()});
                if(f.path.toString() == filePath.toString()){
                    schema = f.asn1Schema;
                }
            })
            console.log({schema});
            return schema;
        })();
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

    getMetaDataByPasswordName(name){
        let filePath;
        let passwordId;
        this.scf.passwords.forEach((p)=>{
            console.log(p);
            if(p.name == name){
                filePath = p.storedIn;
                passwordId = p.id;
                console.log("password found");
                
            }
        });
        // console.log("Password "+name+" not found ");
       
        return({filePath,passwordId});
    }

    getMetaDataByKeyName(name){
        let filePath;
        let keyId;
        this.scf.keys.forEach((p)=>{
            console.log(p);
            if(p.name == name){
                filePath = p.storedIn;
                keyId = p.id;
                console.log("password found");
                
            }
        });
        
        return({filePath,keyId});
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