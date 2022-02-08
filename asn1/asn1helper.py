#!/usr/bin/env python

import asn1tools
import sys
import binascii
import json

fn = sys.argv[1]
print(fn)

if fn == "berToJSON":
    asn1_file = sys.argv[2]
    hex_file = sys.argv[3]
    out_file = sys.argv[4]
    attribute_name = sys.argv[5]

    asn1Schema = asn1tools.compile_files(asn1_file)

    with open(hex_file, 'r') as f:
        data = f.read()

    hex_data = bytearray.fromhex(data)

    decoded_data = asn1Schema.decode(attribute_name, hex_data)

    for key in decoded_data:
        if isinstance(decoded_data[key], (bytes, bytearray)):
            decoded_data[key] = list(decoded_data[key])

    with open(out_file, "w") as json_out:
        json.dump(decoded_data, json_out)

if fn == "JSONToBer":
    print('JSONTOBER Running')
    asn1_file = sys.argv[2]
    jsonFile = sys.argv[3]
    out_file = sys.argv[4]
    attribute_name = sys.argv[5]

    with open(jsonFile,"r") as json_file:
        data = json.load(json_file)
    
    for key in data:
        if isinstance(data[key], (list)):
            data[key] = bytearray(data[key])

    asn1Schema = asn1tools.compile_files(asn1_file)
    encoded = asn1Schema.encode(attribute_name, data)
    
    with open(out_file, "wb") as hex_out:
        hex_out.write(encoded)


