const fs = require('fs');
const { promisify } = require('util')
const readFileAsync = promisify(fs.readFile)
const logger = require('pino')();
class CardReader{
    constructor(){
        this.pcscReader = undefinded;
        this.pcscProtocol = undefined;
        this.cardConnectedEventHandler = undefined;
        this.scf = undefined;
        this.passwords = {};
        this.keys = {};
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
    sendAPDU(apdu,responseLength){
        return new Promise((resolve,reject)=>{
            logger.info("SENDING APDU ->", new Buffer(apdu));
            this.pcscReader.transmit(new Buffer(apdu), responseLength, this.pcscProtocol, function(err, data) {
                if (err) {
                    logger.error(err);
                    reject(err)
                } else {
                    logger.info("GOT BACK ->", data);
                    resolve(data);
                }
            });
        });
    }
}

module.exports = CardReader;