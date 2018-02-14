const ResourceDataLine = require('./rdl.js');

class CueData extends ResourceDataLine{
  constructor(cueNumber, data){
    super();

    if(typeof(data) == 'undefined'){
      this.resourceData = new Uint8ClampedArray(512).fill(0);
    } else {
      this.resourceData = data;
    }

    this.cueNumber = cueNumber;

  }

  compile(){
    this.resourceType = new Uint8ClampedArray([0x11]);
    let resourceID = new Uint16Array([(this.cueNumber * 10)])
    this.resourceID = new Uint8ClampedArray(resourceID.buffer);

    return super.compile();
  }
}

module.exports = CueData;
