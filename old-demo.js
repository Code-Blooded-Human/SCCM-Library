   // let sel = await card.selectFile('3f00');
    // sel = await card.selectFile('3f08');
    // let data = await card.readSelectedFileRaw(0,100);
    // console.log(card);
    // let data = await card.readFileRaw(['3f00','3f04'],100);
    // console.log("H99")
    // let data = await card.readFileRaw(['3f00','3f04'], 7000);
    // let schema = `BHILAIINFO1V2 DEFINITIONS IMPLICIT TAGS ::= BEGIN Info1FreeReadV2 ::= SEQUENCE { version INTEGER, id PrintableString, validupto PrintableString, name UTF8String, dob PrintableString, uid PrintableString, emergencyphone UTF8String, bloodgroup PrintableString, issuerauthority PrintableString, gender PrintableString, dateofissue PrintableString, designation [0] UTF8String OPTIONAL, program [1] UTF8String OPTIONAL, relation [2] PrintableString OPTIONAL, nameofprimary [3] UTF8String OPTIONAL, designationofprimary [4] UTF8String OPTIONAL, programofprimary [5] UTF8String OPTIONAL, doj [6] PrintableString OPTIONAL, dojofprimary [7] PrintableString OPTIONAL, photo OCTET STRING } END`
    // // const parsedJson = await berToJson(data, schema);

    // // let name = await card.readAttribute('name');

    // let jsonData = await readFileAsync('/tmp/out.json');

    // let out = jsonToBer(jsonData,schema);
    
    // return out;

    // console.log(name);

    // await card.createFile([0x3f00]);
    // await card.createFile([0x3f00,0x3f04]);
    // let jsonData = {name:'Abhishek', branch:'CSE'}
    // let rawData = await jsonToBer(JSON.stringify(jsonData), 'AttributesInfo DEFINITIONS IMPLICIT TAGS ::= BEGIN Info ::= SEQUENCE {name UTF8String, branch UTF8String} END')

    // await card.writeFileBinary([0x3f00,0x3f04],rawData);


    // console.log(rawData);
    // let name = card.readAttribute('Name');
    // console.log('name');


    // await card.selectFile(0x3f00);
    // // let apdu = new APDU({cla:0x00, ins:0xE0, p1:0x00, p2:0x00, data:[0x62, 28, 0x80, 0x02, 0x09, 0x04, 0x82, 0x02, 0x01, 0x01, 0x83, 0x02, 0x3f, 0x05, 0x88, 0x01, 0x20,0x81, 0x01, 0x01, 0x8c, 0x08, 0x7f, 0xff, 0xff, 0x00, 0x0ff, 0x00, 0x00, 0x00], le:0x05});
    // // const [response,status] = await card.reader.sendAPDU(apdu.val(),5);
    // // console.log({apdu:apdu.val(),status});

    // await card.selectFile(0x3f05);
    // let hex=0x3f05

    // console.log(hex.toString(16))

    // // await card.createFile()
    // // await card.selectFile(0x3f04);
    // let d=[...rawData];
    // console.log({d});
    // let apdu = new APDU({cla:0x00, ins:0xD0, p1:0x00,p2:0x00, data:d, le:0x05});
    // const [response,status] = await card.reader.sendAPDU(apdu.val(),5);
    // console.log({response,status});

    // let data = await card.readAttribute('name');
    // console.log(data);


    //await card.createFile([0x3f00]);
    // await card.selectFile(0x3f00);
    

    // var passwordFileFCP = [98,36,130,5,12,1,0,18,3,131,2,63,1,136,1,8,138,1,1,171,17,128,1,127,151,0,151,0,144,0,151,0,144,0,151,0,151,0]
    // let createPasswordFileAPDU = new APDU({cla:0x00, ins:0xE0, p1:0x00, p2:0x00, data:passwordFileFCP, le:0x05});
    // const [response,status] = await card.reader.sendAPDU(createPasswordFileAPDU.val(),5);
    // console.log({response,status});

    // await card.selectFile(0x3f01);

    // let addPasswordAPDU = new APDU({cla:0x00, ins:0xD2, p1:0x01, p2:0x04, data:[0x81, 0xFF, 0x01,0x02,0x03,0x04], le:0x05})
    // const [response,status] = await card.reader.sendAPDU(addPasswordAPDU.val(),5);
    // console.log({response,status});

    // let passwordVerificationAPDU =  new APDU({cla:0x00, ins:0x20, p1:0x00, p2:0x01, data:[0x01,0x02,0x05,0x04], le:0x05});
    // const [response,status] = await card.reader.sendAPDU(passwordVerificationAPDU.val(),5);
    // console.log({response,status});

    // let create3f04ReadNever = new APDU({clas:0x00, ins:0xE0, p1:0x00, p2:0x00, data:[0x62,37,0x80, 0x02, 0x00, 0x40, 0x82, 0x02, 0x01,0x01, 0x83, 0x02, 0x3f, 0x04, 0x88, 0x01, 0x20, 0x8a, 0x01, 0x01, 0xAB, 17, 0x80, 0x01, 0x7F, 0x90, 0x00, 0x90, 0x00, 0x90, 0x00,0x90, 0x00,0x90, 0x00,0x90, 0x00,0x97,0x00]}) 
    // const [response,status] = await card.reader.sendAPDU(create3f04ReadNever.val(),5);
    // console.log({response,status});

    // await card.selectFile(0x3f04);
    // let write3f04APDU = new APDU({cla:0x00, ins:0xD0, p1:0x00, p2:0x00, data:[0x01,0x02,0x03], le:0x05});
    // const [response,status] = await card.reader.sendAPDU(write3f04APDU.val(),5);
    // console.log({response,status});



    // let create3f05 = new APDU({clas:0x00, ins:0xE0, p1:0x00, p2:0x00, data:[0x62,18,0x80, 0x02, 0x00, 0x40, 0x82, 0x02, 0x01,0x01, 0x83, 0x02, 0x3f, 0x05, 0x88, 0x01, 0x28, 0x8a, 0x01, 0x01]}) 
    // const [response,status] = await card.reader.sendAPDU(create3f05.val(),5);
    // console.log({response,status});


    // await card.selectFile(0x3f05);
    // let write3f04APDU = new APDU({cla:0x00, ins:0xD0, p1:0x00, p2:0x00, data:[0x01,0x02,0x03], le:0x05});
    // const [response,status] = await card.reader.sendAPDU(write3f04APDU.val(),5);
    // console.log({response,status});

    // let create3f06Always = new APDU({clas:0x00, ins:0xE0, p1:0x00, p2:0x00, data:[0x62,37,0x80, 0x02, 0x00, 0x40, 0x82, 0x02, 0x01,0x01, 0x83, 0x02, 0x3f, 0x06, 0x88, 0x01, 0x30, 0x8a, 0x01, 0x01, 0xAB, 17, 0x80, 0x01, 0x7F, 0x90, 0x00, 0x90, 0x00, 0x90, 0x00,0x90, 0x00,0x90, 0x00,0x90, 0x00,0x90,0x00]}) 
    // const [response,status] = await card.reader.sendAPDU(create3f06Always.val(),5);
    // console.log({response,status});


    // await card.selectFile(0x3f06);
    // let write3f04APDU = new APDU({cla:0x00, ins:0xD0, p1:0x00, p2:0x00, data:[0x01,0x02,0x03], le:0x05});
    // const [response,status] = await card.reader.sendAPDU(write3f04APDU.val(),5);
    // console.log({response,status});
    // await card.selectFile(0x3f06);

    // let activateFile = new APDU({cla:0x00, ins:0x44, p1:0,p2:0,data:[], le:0x05});
    // const [response,status] = await card.reader.sendAPDU([ 0, 68, 0, 0 ],5);
    // console.log({response,status});

    // await card.selectFile(0x3f08);
    
    // let write3f04APDU = new APDU({cla:0x00, ins:0xD0, p1:0x00, p2:0x00, data:[0x01,0x02,0x03], le:0x05});
    // const [response2,status2] = await card.reader.sendAPDU(write3f04APDU.val(),5);
    // console.log({response2,status2});


    // let passwordVerificationAPDU =  new APDU({cla:0x00, ins:0x20, p1:0x00, p2:0x01, data:[0x01,0x02,0x04,0x04], le:0x05});
    // const [response3,status3] = await card.reader.sendAPDU(passwordVerificationAPDU.val(),5);
    // console.log({response3,status3});


    // const [response4,status4] = await card.reader.sendAPDU([0x00, 0xD6, 0x00, 0x00, 0x04, 0x01,0x02,0x03,0x04, 0x05],5);
    // console.log({response4,status4});


    // let data = await card.readSelectedFileRaw(0,10);
    // console.log(data);


    // let create3f08ReadWithPassword = new APDU({clas:0x00, ins:0xE0, p1:0x00, p2:0x00, data:[0x62,43,0x80, 0x02, 0x00, 0x40, 0x82, 0x02, 0x01,0x01, 0x83, 0x02, 0x3f, 0x08, 0x88, 0x01, 0x40, 0x8a, 0x01, 0x01, 0xAB, 23, 0x80, 0x01, 0x7F, 0x90, 0x00, 0x90, 0x00, 0x90, 0x00,0x90, 0x00,0x90, 0x00,0x90, 0x00,0xA4,0x06,0x95,0x01,0x88,0x83,0x01,0x01]}) 
    // const [response,status] = await card.reader.sendAPDU(create3f08ReadWithPassword.val(),5);
    // console.log({response,status});




    // CREATE 3f00 with CRT

    // let apdu = new APDU({cla:0x00, ins:0xE0, p1:0x00,p2:0x00, data:[0x62,37,0x82, 0x01, 0x38, 0x83, 0x02, 0x3f, 0x00, 0x8a, 0x01, 0x01, 0xAB, 17, 0x80, 0x01, 0x7f, 0x97, 0x00, 0x97, 0x00, 0x90, 0x00, 0x97, 0x00, 0x90, 0x00, 0x90, 0x00, 0x97, 0x00, 0xAC, 6, 0x80, 0x01, 0x01, 0x06, 0x01, 0x00 ], le:0x05});
    // const [response,status] = await card.reader.sendAPDU(apdu.val(),5);
    // console.log({response,status});

    // await card.selectFile(0x3f00);

    // var passwordFileFCP = [98,36,130,5,12,1,0,18,3,131,2,63,1,136,1,8,138,1,1,171,17,128,1,127,151,0,151,0,144,0,151,0,144,0,151,0,151,0]
    // let createPasswordFileAPDU = new APDU({cla:0x00, ins:0xE0, p1:0x00, p2:0x00, data:passwordFileFCP, le:0x05});
    // const [response,status] = await card.reader.sendAPDU(createPasswordFileAPDU.val(),5);
    // console.log({response,status});

    // await card.selectFile(0x3f01);

    // let addPasswordAPDU = new APDU({cla:0x00, ins:0xD2, p1:0x01, p2:0x04, data:[0x81, 0xFF, 0x01,0x02,0x03,0x04], le:0x05})
    // const [response2,status2] = await card.reader.sendAPDU(addPasswordAPDU.val(),5);
    // console.log({response2,status2});

    // let passwordVerificationAPDU =  new APDU({cla:0x00, ins:0x20, p1:0x00, p2:0x01, data:[0x01,0x02,0x03,0x04], le:0x05});
    // const [response3,status3] = await card.reader.sendAPDU(passwordVerificationAPDU.val(),5);
    // console.log({response3,status3});

    // let create3f04withReadPassword = new APDU({clas:0x00, ins:0xE0, p1:0x00, p2:0x00, data:[0x62,46,0x80, 0x02, 0x00, 0x40, 0x82, 0x02, 0x01,0x01, 0x83, 0x02, 0x3f, 0x04, 0x88, 0x01, 0x20, 0x8a, 0x01, 0x01, 0xAB, 26, 0x80, 0x01, 0x7F, 0x90, 0x00, 0x90, 0x00, 0x90, 0x00,0x90, 0x00,0x90, 0x00,0x90, 0x00,0xA4,0x09, 0x80,0x01, 0x01, 0x95, 0x01, 0x88, 0x83, 0x01, 0x01]}) 
    // const [response,status] = await card.reader.sendAPDU(create3f04withReadPassword.val(),5);
    // console.log({response,status});


    // await card.selectFile(0x3f04);
    // let write3f04APDU = new APDU({cla:0x00, ins:0xD0, p1:0x00, p2:0x00, data:[0x01,0x02,0x03], le:0x05});
    // const [response2,status2] = await card.reader.sendAPDU(write3f04APDU.val(),5);
    // console.log({response2,status2});

    // let data = await card.readSelectedFileRaw(0,10);
    // console.log(data);



    // await card.selectFile(0x3f06);

    // let create3f05withReadPassword = new APDU({clas:0x00, ins:0xE0, p1:0x00, p2:0x00, data:[0x62,43,0x80, 0x02, 0x00, 0x40, 0x82, 0x02, 0x01,0x01, 0x83, 0x02, 0x3f, 0x05, 0x88, 0x01, 0x28, 0x8a, 0x01, 0x01, 0xAB, 23, 0x80, 0x01, 0x7F, 0x90, 0x00, 0x90, 0x00, 0x90, 0x00,0x90, 0x00,0x90, 0x00,0x90, 0x00,0xA4,6, 0x95, 0x01, 0x08, 0x83, 0x01, 0x01]}) 
    // const [response,status] = await card.reader.sendAPDU(create3f05withReadPassword.val(),5);
    // console.log({response,status});

    // let write3f04APDU = new APDU({cla:0x00, ins:0xD0, p1:0x00, p2:0x00, data:[0x01,0x02,0x03], le:0x05});
    // const [response2,status2] = await card.reader.sendAPDU(write3f04APDU.val(),5);
    // console.log({response2,status2});


    // let data = await card.readSelectedFileRaw(0,10);
    // console.log(data);

    // let create3f06= new APDU({clas:0x00, ins:0xE0, p1:0x00, p2:0x00, data:[0x62,37,0x80, 0x02, 0x00, 0x40, 0x82, 0x02, 0x01,0x01, 0x83, 0x02, 0x3f, 0x06, 0x88, 0x01, 0x30, 0x8a, 0x01, 0x01, 0xAB, 17, 0x80, 0x01, 0x7F, 0x90, 0x00, 0x90, 0x00, 0x90, 0x00,0x90, 0x00,0x90, 0x00,0x90, 0x00,0x97,0x00]}) 
    // const [response,status] = await card.reader.sendAPDU(create3f06.val(),5);
    // console.log({response,status});

    // await card.selectFile(0x3f06);
    // let data = await card.readSelectedFileRaw(0,10);
    // console.log(data);


    // let create3f07ReadNever = new APDU({clas:0x00, ins:0xE0, p1:0x00, p2:0x00, data:[0x62,37,0x80, 0x02, 0x00, 0x40, 0x82, 0x02, 0x01,0x01, 0x83, 0x02, 0x3f, 0x07, 0x88, 0x01, 0x38, 0x8a, 0x01, 0x01, 0xAB, 17, 0x80, 0x01, 0x7F, 0x90, 0x00, 0x90, 0x00, 0x90, 0x00,0x90, 0x00,0x90, 0x00,0x90, 0x00,0x97,0x00]}) 
    // const [response,status] = await card.reader.sendAPDU(create3f07ReadNever.val(),5);
    // console.log({response,status});

    // await card.selectFile(0x3f07);
    // // let write3f04APDU = new APDU({cla:0x00, ins:0xD0, p1:0x00, p2:0x00, data:[0x01,0x02,0x03], le:0x05});
    // // const [response2,status2] = await card.reader.sendAPDU(write3f04APDU.val(),5);
    // // console.log({response2,status2});
    // let data = await card.readSelectedFileRaw(0,10);
    // console.log(data);




    // --------------------- CARD 8 FRESH START-----------------------


    /*
        Master file creation
    */

    // var create3f00apduraw = [0x62, 29, 0x82, 0x01, 0x38, 0x83, 0x02, 0x3f, 0x00, 0x8a, 0x01, 0x05, 0xAB, 17, 0x80, 0x01, 0x7f, 0x97, 0x00, 0x97, 0x00, 0x90, 0x00, 0x97, 0x00, 0x90, 0x00, 0x90, 0x00, 0x97, 0x00 ]
    // let create3f00apdu = new APDU({cla:0x00, ins:0xE0, p1:0x00, p2:0x00, data:create3f00apduraw, le:0x05});
    // const [response,status] = await card.reader.sendAPDU(create3f00apdu.val(),5);
    // console.log({response,status});

    await card.selectFile(0x3f00);
    await card.selectFile(0x3f08);

    /*
        PIN file creation
    */

    // var passwordFileFCP = [98,36,130,5,12,1,0,18,3,131,2,63,1,136,1,8,138,1,1,171,17,128,1,127,151,0,151,0,144,0,151,0,144,0,151,0,0x90,0]
    // let createPasswordFileAPDU = new APDU({cla:0x00, ins:0xE0, p1:0x00, p2:0x00, data:passwordFileFCP, le:0x05});
    // const [response,status] = await card.reader.sendAPDU(createPasswordFileAPDU.val(),5);
    // console.log({response,status});

    /*
        Adding password
    */
    // await card.selectFile(0x3f01);
    // let addPasswordAPDU = new APDU({cla:0x00, ins:0xD2, p1:0x01, p2:0x04, data:[0x81, 0xFF, 0x01,0x02,0x03,0x04], le:0x05})
    // const [response,status] = await card.reader.sendAPDU(addPasswordAPDU.val(),5);
    // console.log({response,status});

    // let addPasswordAPDU = new APDU({cla:0x00, ins:0xD2, p1:0x02, p2:0x04, data:[0x82, 0xFF, 0x04,0x03,0x02,0x01], le:0x05})
    // const [response,status] = await card.reader.sendAPDU(addPasswordAPDU.val(),5);
    // console.log({response,status});

    /*
        Verify password
    */

    // let passwordVerificationAPDU =  new APDU({cla:0x00, ins:0x20, p1:0x00, p2:0x01, data:[0x01,0x02,0x03,0x04], le:0x05});
    // const [response3,status3] = await card.reader.sendAPDU(passwordVerificationAPDU.val(),5);
    // console.log({response3,status3});

    // let passwordVerificationAPDU2 =  new APDU({cla:0x00, ins:0x20, p1:0x00, p2:0x02, data:[0x04,0x01,0x02,0x01], le:0x05});
    // const [response2,status2] = await card.reader.sendAPDU(passwordVerificationAPDU2.val(),5);
    // console.log({response2,status2});

    /*
        3f04 Read Never
    */

    // let create3f04ReadNever = new APDU({clas:0x00, ins:0xE0, p1:0x00, p2:0x00, data:[0x62,37,0x80, 0x02, 0x00, 0x40, 0x82, 0x02, 0x01,0x01, 0x83, 0x02, 0x3f, 0x04, 0x88, 0x01, 0x20, 0x8a, 0x01, 0x05, 0xAB, 17, 0x80, 0x01, 0x7F, 0x90, 0x00, 0x90, 0x00, 0x90, 0x00,0x90, 0x00,0x90, 0x00,0x90, 0x00,0x97,0x00]}) 
    // const [response,status] = await card.reader.sendAPDU(create3f04ReadNever.val(),5);
    // console.log({response,status});

    /*
        3f05 Write Never
    */

    // let create3f05WriteNever = new APDU({clas:0x00, ins:0xE0, p1:0x00, p2:0x00, data:[0x62,37,0x80, 0x02, 0x00, 0x40, 0x82, 0x02, 0x01,0x01, 0x83, 0x02, 0x3f, 0x05, 0x88, 0x01, 0x28, 0x8a, 0x01, 0x05, 0xAB, 17, 0x80, 0x01, 0x7F, 0x90, 0x00, 0x90, 0x00, 0x90, 0x00,0x90, 0x00,0x97, 0x00,0x90, 0x00,0x90,0x00]}) 
    // const [response,status] = await card.reader.sendAPDU(create3f05WriteNever.val(),5);
    // console.log({response,status});

    /*
        3f06 Read Password based
    */

    // let create3f06ReadPassword = new APDU({clas:0x00, ins:0xE0, p1:0x00, p2:0x00, data:[0x62,43,0x80, 0x02, 0x00, 0x40, 0x82, 0x02, 0x01,0x01, 0x83, 0x02, 0x3f, 0x06, 0x88, 0x01, 0x30, 0x8a, 0x01, 0x05, 0xAB, 23, 0x80, 0x01, 0x7F, 0x90, 0x00, 0x90, 0x00, 0x90, 0x00,0x90, 0x00,0x90, 0x00,0x90, 0x00,0xA4,0x06, 0x95, 0x01, 0x08, 0x83, 0x01, 0x01]}) 
    // const [response,status] = await card.reader.sendAPDU(create3f06ReadPassword.val(),5);
    // console.log({response,status});

    /*
        3f07 OR Template - Read Password based(Password1 OR Password 2)
    */

    // let create3f07ReadPassword = new APDU({clas:0x00, ins:0xE0, p1:0x00, p2:0x00, data:[0x62,53,0x80, 0x02, 0x00, 0x40, 0x82, 0x02, 0x01,0x01, 0x83, 0x02, 0x3f, 0x07, 0x88, 0x01, 0x38, 0x8a, 0x01, 0x05, 0xAB, 33, 0x80, 0x01, 0x7F, 0x90, 0x00, 0x90, 0x00, 0x90, 0x00,0x90, 0x00,0x90, 0x00,0x90, 0x00,0xA0, 16, 0xA4, 6, 0x95, 0x01, 0x08, 0x83, 0x01, 0x01,0xA4, 6, 0x95, 0x01, 0x08, 0x83, 0x01, 0x02]}) 
    // const [response,status] = await card.reader.sendAPDU(create3f07ReadPassword.val(),5);
    // console.log({response,status});

    /*
        3f08 AND Template - Read Password based(Password1 AND Password 2)
    */

    // let create3f08ReadPassword = new APDU({clas:0x00, ins:0xE0, p1:0x00, p2:0x00, data:[0x62,53,0x80, 0x02, 0x00, 0x40, 0x82, 0x02, 0x01,0x01, 0x83, 0x02, 0x3f, 0x08, 0x88, 0x01, 0x40, 0x8a, 0x01, 0x05, 0xAB, 33, 0x80, 0x01, 0x7F, 0x90, 0x00, 0x90, 0x00, 0x90, 0x00,0x90, 0x00,0x90, 0x00,0x90, 0x00,0xAf, 16, 0xA4, 6, 0x95, 0x01, 0x08, 0x83, 0x01, 0x01,0xA4, 6, 0x95, 0x01, 0x08, 0x83, 0x01, 0x02]}) 
    // const [response,status] = await card.reader.sendAPDU(create3f08ReadPassword.val(),5);
    // console.log({response,status});

    /*
        Read selected file
    */

    let data = await card.readSelectedFileRaw(0,10);
    console.log(data);

    /*
        Activate Selected file
    */

    // let activateFile = new APDU({cla:0x00, ins:0x44, p1:0,p2:0,data:[], le:0x05});
    // const [response,status] = await card.reader.sendAPDU([ 0, 68, 0, 0 ],5);
    // console.log({response,status});

    /*
        Write selected file
    */

    // let writeSelectedFileAPDU= new APDU({cla:0x00, ins:0xD0, p1:0x00, p2:0x00, data:[0x01,0x02,0x03], le:0x05});
    // const [response2,status2] = await card.reader.sendAPDU(writeSelectedFileAPDU.val(),5);
    // console.log({response2,status2});