function asciiToBytes(value){
    return value.split ('').map (function (c) { return c.charCodeAt (0); });
}
module.exports = asciiToBytes;