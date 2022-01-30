const exec = require('await-exec')
const fs = require('fs');
const logger = require('pino')();
const { promisify } = require('util')
const hexStringToByteArray = require('../utils/hexToBytes');


const readFileAsync = promisify(fs.readFile)
const writeFileAsync = promisify(fs.writeFile)


function berToJson(rawBer, asn1Schema, asn1Identifier){
    return new Promise((resolve,reject)=>{
        (async ()=>{
            try{
                let berArray = hexStringToByteArray(rawBer);
                // TODO: Generate File names randomly
                await writeFileAsync("/tmp/raw_input.hex", berArray.toString('hex'))
                await writeFileAsync("/tmp/asn1Schema.asn", asn1Schema);
                const { stdout, stderr } = await exec(`python3 ./decode.py /tmp/asn1Schema.asn /tmp/raw_input.hex /tmp/out.json ${asn1Identifier}`);
                if(stderr){
                    throw(stderr);
                    return;
                }
                const jsonDataString = await readFileAsync('/tmp/out.json');
                const jsonData = JSON.parse(jsonDataString);
                resolve(jsonData);
            }catch(e){
                logger.error("BER to JSON conversion failed.", e);
                reject(e);
                return;
            }
        })();
    });
}

function jsonToBer(jsonData, asn1Schema){
    return new Promise((resolve,reject)=>{
        resolve('data');
    });
}

module.exports = {berToJson, jsonToBer};