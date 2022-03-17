const exec = require('await-exec')
const fs = require('fs');
const logger = require('pino')();
const { promisify } = require('util')



const readFileAsync = promisify(fs.readFile)
const writeFileAsync = promisify(fs.writeFile)


function berToJson(rawBer, asn1Schema){
    return new Promise((resolve,reject)=>{
        (async ()=>{
            // try{
                
                // TODO: Generate File names randomly
                const asn1SchemaAsArray = asn1Schema.split(" ");
                const asn1Identifier = asn1SchemaAsArray[asn1SchemaAsArray.indexOf('BEGIN')+1]
                await writeFileAsync("/tmp/raw_input.hex", rawBer.toString('hex'))
                await writeFileAsync("/tmp/asn1Schema.asn", asn1Schema);
                console.log(rawBer,asn1Schema)
                const { stdout, stderr } = await exec(`python3 ~/.local/bin/asn1helper.py berToJSON /tmp/asn1Schema.asn /tmp/raw_input.hex /tmp/out.json ${asn1Identifier}`);
                if(stderr){
                    throw(stderr);
                    return;
                }
                const jsonDataString = await readFileAsync('/tmp/out.json');
                const jsonData = JSON.parse(jsonDataString);
                resolve(jsonData);
            // }catch(e){
            //     logger.error("BER to JSON conversion failed.", e);
            //     reject(e);
            //     return;
            // }
        })();
    });
}

function jsonToBer(jsonData, asn1Schema){
    return new Promise((resolve,reject)=>{
        (async()=>{

        await writeFileAsync("/tmp/json_data.json", jsonData)
        await writeFileAsync("/tmp/asn1Schema.asn", asn1Schema);

        const asn1SchemaAsArray = asn1Schema.split(" ");
        const asn1Identifier = asn1SchemaAsArray[asn1SchemaAsArray.indexOf('BEGIN')+1]

        const { stdout, stderr } = await exec(`python3 ~/.local/bin/asn1helper.py JSONToBer /tmp/asn1Schema.asn /tmp/json_data.json /tmp/out.hex ${asn1Identifier}`);
        if(stderr){
            throw(stderr);
            return;
        }
        const hexData = await readFileAsync('/tmp/out.hex');
        console.log(hexData);

    
        resolve(hexData);
    })()
    });
    
}

module.exports = {berToJson, jsonToBer};