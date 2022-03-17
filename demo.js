const cardReader = require(".");
const { berToJson, jsonToBer } = require("./asn1/asn1");
const exec = require('await-exec')
const fs = require('fs');
const logger = require('pino')();
const { promisify } = require('util');
const APDU = require("./CardReader/Apdu");



const readFileAsync = promisify(fs.readFile)
const writeFileAsync = promisify(fs.writeFile)

async function onCardConnect(card){
    console.log("Card Connection established");
    
    let data = await card.readAttributes(['name','uid']);
    console.log(data);

   
}
cardReader.registerSCF('./demo/rani_scf.json');
cardReader.onCardConnect(onCardConnect);
