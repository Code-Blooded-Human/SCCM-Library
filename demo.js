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

    // await card.createCard();

    // await card.writeAttribute("name","Abhishek P");
    // await card.updateAttribute("age","50");
    // let age = await card.readAttribute("age");
    // console.log(age);
    // await card.updateAttribute("name", "Kumari Rani")
    // await card._writeKey('cctKey',[0,0,0,0,0,0,0,0])

    // await card.writeKeyInSE(1,1);


    let cct = await card.computeCCT([0,0,0,0,0,0,0,0,0]);
    console.log(cct);


    

    
    // let data = await card.readAttribute(['name']);
    // console.log(data);
    
    
    // console.log(data);
    // const selFile =  await card.selectFile(0x3f00)
    // console.log(selFile);

    // card._writeRecord([0x3f00,0x3f02], 1, [0x01,0x02,0x03,0x04,0x05]);


    // await card._writePassword("Pass1","abhi");

    // await card._writeKey("Key1",[0x01,0x02,0x03,0x04,0x01,0x02,0x03,0x04,0x01,0x02,0x03,0x04,0x01,0x02,0x03,0x04])
    // await card._verifyPassword("Pass1", "abhi");

    // let j = await card._readFileAsJSON([0x3f00,0x3f04]);
    // console.log(j);

    //CREATE 3f00
    // let d=[0x62, 33, 0x82, 0x01, 0x38, 0x83, 0x02, 0x3f, 0x00, 0x8a, 0x01, 0x05, 0xab, 17, 0x80, 0x01, 0x7f, 0x97, 0x00,  0x97, 0x00, 0x90, 0x00, 0x97, 0x00, 0x90, 0x00, 0x90, 0x00, 0x97, 0x00, 0x8d, 0x02, 0x3f, 0x03]
    // let apdu = new APDU({cla:0x00, ins:0xE0, p1:0x00, p2:0x00, data:d, le:0x05});
    // const [response,status] = await card.reader.sendAPDU(apdu.val(),5);
    // console.log({response,status});

    // CREATE 3f02 KEY REPOSITORY
    // let d=[0x62, 36, 0x82, 0x05, 0x0c, 0x01, 0x00, 0x20, 0x02, 0x83, 0x02, 0x3f, 0x02, 0x88, 0x01, 0x10, 0x8a, 0x01, 0x05, 0xab, 0x17, 0x80, 0x01, 0x7f, 0x97, 0x00, 0x97, 0x00, 0x90, 0x00, 0x97, 0x00, 0x90, 0x00, 0x90, 0x00, 0x90, 0x00]
    // let apdu = new APDU({cla:0x00, ins:0xE0, p1:0x00, p2:0x00, data:d, le:0x05});
    // const [response,status] = await card.reader.sendAPDU(apdu.val(),5);
    // console.log({response,status});

    // await card.selectFile(0x3f02)
    //WRITE KEY
    // let d=[0x81, 0x80, 0x00, 1,2,3,4,5,6,7,8,1,2,3,4,5,6,7,8]
    // let apdu = new APDU({cla:0x00, ins:0xD2, p1:0x01, p2:0x04, data:d, le:0x05});
    // const [response,status] = await card.reader.sendAPDU(apdu.val(),5);
    // console.log({response,status});

    // let d=[]
    // let apdu = new APDU({cla:0x00, ins:0xB2, p1:0x01, p2:0x04, data:d, le:0xFF});
    // const [response,status] = await card.reader.sendAPDU(apdu.val(),50);
    // console.log({response,status});


    //CREATE SE FILE
    // let d=[0x62, 36, 0x82, 0x05, 0x0c, 0x01, 0x00, 0x28, 0x05, 0x83, 0x02, 0x3f, 0x03, 0x88, 0x01, 0x18, 0x8a, 0x01, 0x05, 0xab, 0x17, 0x80, 0x01, 0x7f, 0x97, 0x00, 0x97, 0x00, 0x90, 0x00, 0x97, 0x00, 0x90, 0x00, 0x90, 0x00, 0x90, 0x00]
    // let apdu = new APDU({cla:0x00, ins:0xE0, p1:0x00, p2:0x00, data:d, le:0x05});
    // const [response,status] = await card.reader.sendAPDU(apdu.val(),5);
    // console.log({response,status});

    // SET SE =1 
    // const selFile2 =  await card.selectFile(0x3f03)
    // let d=[0x83,0x01, 0x01, 0x87, 0x10, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x95, 0x01, 0xc0]
    // let apdu = new APDU({cla:0x00, ins:0x22, p1:0x41, p2:0xb4, data:d, le:0x05});
    // const [response,status] = await card.reader.sendAPDU(apdu.val(),5);
    // console.log({response,status});

    // let d2=[]
    // let apdu2 = new APDU({cla:0x00, ins:0x22, p1:0xf2, p2:0x01, data:d2, le:0x05});
    // const [response2,status2] = await card.reader.sendAPDU(apdu2.val(),5);
    // console.log({response2,status2});

    // const selFile2 =  await card.selectFile(0x3f03)
    // let d=[0x83,0x01, 0x01, 0x87, 0x10, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x95, 0x01, 0xc0]
    // let apdu = new APDU({cla:0x00, ins:0xD2, p1:0x01, p2:0x04, data:d, le:0x05});
    // const [response,status] = await card.reader.sendAPDU(apdu.val(),5);
    // console.log({response,status});

    // let apdu = new APDU({cla:0x00, ins:0xB2, p1:0x01, p2:0x04, data:[], le:0xFF});
    // const [response,status] = await card.reader.sendAPDU(apdu.val(),50);
    // console.log({response,status});

    // let apdu1 = new APDU({cla:0x00, ins:0x2A, p1:0xF3, p2:0x01, data:[], le:0xFF});
    // const [response1,status1] = await card.reader.sendAPDU(apdu1.val(),50);
    // console.log({response1,status1});

    // let apdu = new APDU({cla:0x00, ins:0x2A, p1:0x8E, p2:0x80, data:[0x01,0x02,0x03,0x04], le:0xFF});
    // const [response,status] = await card.reader.sendAPDU(apdu.val(),50);
    // console.log({response,status});




   
}
cardReader.registerSCF('./demo/updated.hjson');
cardReader.onCardConnect(onCardConnect);
