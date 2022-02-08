const cardReader = require(".");
const { berToJson, jsonToBer } = require("./asn1/asn1");
const exec = require('await-exec')
const fs = require('fs');
const logger = require('pino')();
const { promisify } = require('util')



const readFileAsync = promisify(fs.readFile)
const writeFileAsync = promisify(fs.writeFile)

async function onCardConnect(card){
    console.log("Card Connection established");
    // let sel = await card.selectFile('3f00');
    // sel = await card.selectFile('3f08');
    // let data = await card.readSelectedFileRaw(0,100);
    // console.log(card);
    // let data = await card.readFileRaw(['3f00','3f04'],100);
    // console.log("H99")
    // let data = await card.readFileRaw(['3f00','3f04'], 7000);
    let schema = `BHILAIINFO1V2 DEFINITIONS IMPLICIT TAGS ::= BEGIN Info1FreeReadV2 ::= SEQUENCE { version INTEGER, id PrintableString, validupto PrintableString, name UTF8String, dob PrintableString, uid PrintableString, emergencyphone UTF8String, bloodgroup PrintableString, issuerauthority PrintableString, gender PrintableString, dateofissue PrintableString, designation [0] UTF8String OPTIONAL, program [1] UTF8String OPTIONAL, relation [2] PrintableString OPTIONAL, nameofprimary [3] UTF8String OPTIONAL, designationofprimary [4] UTF8String OPTIONAL, programofprimary [5] UTF8String OPTIONAL, doj [6] PrintableString OPTIONAL, dojofprimary [7] PrintableString OPTIONAL, photo OCTET STRING } END`
    // const parsedJson = await berToJson(data, schema);

    // let name = await card.readAttribute('name');

    let jsonData = await readFileAsync('/tmp/out.json');

    let out = jsonToBer(jsonData,schema);
    
    return out;

    console.log(name);
}
cardReader.registerSCF('./demo/sample_scf.json');
cardReader.onCardConnect(onCardConnect);
