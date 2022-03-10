const responseStatusMeaning = [

{sw1:0x90, sw2:0x00,meaning:'Success'},

{sw1:0x69, sw2:0x00,meaning:' No information given'},
{sw1:0x69, sw2:0x81,meaning:' Command incompatible with file structure'},
{sw1:0x69, sw2:0x82,meaning:' Security status not satisfied'},
{sw1:0x69, sw2:0x83,meaning:' Authentication method blocked'},
{sw1:0x69, sw2:0x84,meaning:' Reference data not usable'},
{sw1:0x69, sw2:0x85,meaning:' Conditions of use not satisfied'},
{sw1:0x69, sw2:0x86,meaning:' Command not allowed (no current EF)'},
{sw1:0x69, sw2:0x87,meaning:' Expected secure messaging DOs missing'},
{sw1:0x69, sw2:0x88,meaning:' Incorrect secure messaging DOs'},

{sw1:0x6A,sw2:0x00, meaning:' No information given'},
{sw1:0x6A,sw2:0x80, meaning:' Incorrect parameters in the command data field'},
{sw1:0x6A,sw2:0x81, meaning:' Function not supported'},
{sw1:0x6A,sw2:0x82, meaning:' File or application not found'},
{sw1:0x6A,sw2:0x83, meaning:' Record not found'},
{sw1:0x6A,sw2:0x84, meaning:' Not enough memory space in the file'},
{sw1:0x6A,sw2:0x85, meaning:' Nc inconsistent with TLV structure'},
{sw1:0x6A,sw2:0x86, meaning:' Incorrect parameters P1-P2'},
{sw1:0x6A,sw2:0x87, meaning:' Nc inconsistent with parameters P1-P2'},
{sw1:0x6A,sw2:0x88, meaning:' Referenced data or reference data not found (exact meaning depending on the command)'},
{sw1:0x6A,sw2:0x89, meaning:' File already exists'},
{sw1:0x6A,sw2:0x8A, meaning:' DF name already exists'}
]

module.exports = responseStatusMeaning;