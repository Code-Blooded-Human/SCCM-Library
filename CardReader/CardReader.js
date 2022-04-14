const fs = require('fs');
const { promisify } = require('util');
const Card = require('../Card/Card');
const SCF = require('../SCF/SCF');
const responseStatusMeaning = require('../utils/statusParser');
const readFileAsync = promisify(fs.readFile)
const logger = require('pino')();


const DUMMYREADER = true;
class CardReader{
    constructor(){
        this.pcscReader = undefined;
        this.pcscProtocol = undefined;
        this.cardConnectedEventHandler = undefined;
        this.scf = undefined;
        this.passwords = {};
        this.keys = {};
    }

    registerSCF(filePath){
        this.scf = new SCF(filePath);
    }
    onCardConnect(event){
        this.cardConnectedEventHandler = event;
    }

    cardConnected(){
        let card = new Card(this, this.scf);
        this.cardConnectedEventHandler(card);
    }

    pcscReaderConnected(pcscReader,pcscProtocol){
        this.pcscReader = pcscReader;
        this.pcscProtocol = pcscProtocol;
    }
    
    readSCF(scfPath){
        return new Promise((resolve, reject)=>{
            (async ()=>{
                let rawScf =  await readFileAsync(scfPath);
                this.scf = JSON.parse(rawScf);
                resolve(this.scf);
            })().catch((e)=>{
                reject(e);
            })
        })
    }
    async sendAPDU(apdu,responseLength){
        
        return new Promise((resolve,reject)=>{
            // logger.info("SENDING APDU ->", new Buffer(apdu));
            
            console.log({msg:'Sending apdu', apdu:Buffer.from(apdu)})
            if(DUMMYREADER){
                console.log({msg:"DUMMY MODE ON"});
                resolve([[0],[0x90,0x00]]);
                return;
            }
            console.log("HERE")
            this.pcscReader.transmit(new Buffer(apdu), responseLength, this.pcscProtocol, function(err, data) {
                if (err) {
                    logger.error(err);
                    reject(err)
                } else {
                    // logger.info("GOT BACK ->", data);
                    const buf = Buffer.from(data);
                    const d = buf.subarray(0,buf.length-2) ;
                    const status = buf.subarray(buf.length-2, buf.length);

                    responseStatusMeaning.forEach((el)=>{if(el.sw1==status[0] && el.sw2==status[1]){
                        console.log({from:'SendAPDU Function', responseMeaning:el.meaning});
                    }})
        
                    resolve([d,status]);
                }
            });
        });
    }

}

module.exports = CardReader;