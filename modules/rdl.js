function ArrayToHex(array){
  let num = "";
  for(let i = 0; i < array.length; i++){
    num += Buffer.from([array[i]]).toString('hex').toUpperCase();
  }
  return num;
}

class ResourceDataLine {
  constructor(){
    /*
    Resource Type
    This is an ASCII printed byte (two ASCII characters) that specify
    the Resource Type for the line. Valid values are from “00” through “1F”
    */
    this.resourceType = new Uint8ClampedArray(1).fill(0);
    /*
    Resource ID
    This is an ASCII printed 2-byte word (four ASCII characters) that specify
    the Resource ID for the line. The MSB is printed first.
    Values from “0000” through “FFFF” are valid.
    */
    this.resourceID = new Uint8ClampedArray(2).fill(0);
    /*
    Resource Time
    This is an ASCII printed 4-byte long (eight ASCII characters) that specify
    the Resource Time for the line. The MSB is printed  rst.
    This  eld may contain values “00000000” through “FFFFFFFF”.
    */
    this.resourceTime = new Uint8ClampedArray(4).fill(255);
    /*
    Resource Data
    This is the 512 bytes in the resource. They are not ASCII encoded.
    */
    this.resourceData = new Uint8ClampedArray(512).fill(0);
  }

  compile(){
    //Create the line to be written, ignoring the 0x0A line termination
    let line = "";
    line += ArrayToHex(this.resourceType);
    line += ArrayToHex(this.resourceID);
    line += ArrayToHex(this.resourceTime);
    line += '$';
    let head = new Buffer(line);
    let data = new Buffer(this.resourceData);
    let term = new Buffer('!');

    return Buffer.concat([head, data, term]);
  }
}

module.exports = ResourceDataLine;
