const ResourceDataLine = require('./rdl.js');

class CueStream extends ResourceDataLine{
  constructor(cueNumber, time, data){
    super();

    if(typeof(data) == 'undefined'){
      this.resourceData = new Uint8ClampedArray(512).fill(0);
    } else {
      this.resourceData = data;
    }

    this.cueNumber = cueNumber;

    this.time = time;
  }

  compile(){
    this.resourceType = new Uint8ClampedArray([0x07]);
    let resourceID = new Uint16Array([(this.cueNumber * 10)])
    this.resourceID = new Uint8ClampedArray(resourceID.buffer);

    let resourceTime = new Uint32Array([this.time]);
    this.resourceTime = new Uint8ClampedArray(resourceTime.buffer);

    return super.compile();
  }
}

module.exports = CueStream;
