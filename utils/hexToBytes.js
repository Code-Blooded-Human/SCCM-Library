function hexStringToByteArray(hex) {

    
    if(hex instanceof Number || typeof(hex) == 'number'){
    
        hex=hex.toString(16);
    }

    for (var bytes = [], c = 0; c < hex.length; c += 2)
        bytes.push(parseInt(hex.substr(c, 2), 16));
    return bytes;
}

module.exports = hexStringToByteArray;