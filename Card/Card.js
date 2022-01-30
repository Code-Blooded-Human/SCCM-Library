class Card{
    
    constructor(reader, scf){
        this.reader = reader;
        this.cardInUse = false; // Lock APDU Transmissions
        this.scf = scf;
    }

    readFile(filePath);
    writeFile(filePath, data);
    updateFile(filePath, data);


    registerPassword();
    registerKey();

    readAttribute();
    writeAttribute();
    updateAttribute();

    initCard(); // Generate File Structure and store keys and passwords on card. 
}