const fs = require('fs');

class CSD {
  constructor(entries){
    this.entries = entries;
    this.key = fs.readFileSync('./modules/key.bin')
  }

  build(){
    let buffers = [];
    buffers.push(Buffer.from("# CueServer Data File (v5.2.8)\n", 'ascii'));
    buffers.push(Buffer.from("# http://www.interactive-online.com/cueserver\n", 'ascii'));
    buffers.push(this.key);

    let arrays = [];

    for(let i = 0; i < this.entries.length; i++){
      buffers.push(this.entries[i].compile());
    }

    return Buffer.concat(buffers);
  }
}

module.exports = CSD;
