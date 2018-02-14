/*
#define RESTYPE_CUEINFO
#define CUE_LIST_MAX_SIZE
#define MAX_CUE_NUMBER
typedef struct CueInfo {
0x10 // Resource type for CueInfo resources 2000 // Maximum number of cues in the cue list 64999 // Maximum cue number = 6499.9
// [  0] Cue number (1..64999)
// [  2] Must be 0xFFFF
// [  4] Follow time
// [  6] Follow cue
// [  8] Type: 0 = Normal, 1 = Stream
// [  9] Flags: Bit 0 = Decimal Adjusted Cue Number
// [ 10] Follow Mode for Streaming Cues
// [ 11] Reserved
// [ 22] Split fade times (MSW/LSW = Up/Down)
// [ 26] Total time of stream (ms)
// [ 30] Number of stream blocks in cue
// [ 32] Name
// [ 64] Bitmask
// [128] Command string
   unsigned int
   unsigned int
   unsigned int
   unsigned int
   unsigned char
   unsigned char
   unsigned char
   unsigned char
   unsigned long
   unsigned long
   unsigned int
   unsigned char
   unsigned char
   unsigned char
} CueInfo;
*/

const ResourceDataLine = require('./rdl.js');

class CueInfo extends ResourceDataLine {
  constructor(options){

    super();

    this.cueNumber = options.cueNumber;
    this.followTime = options.followTime;
    this.linkCue = options.linkCue;
    this.type = options.type;
    this.followMode = options.followMode;
    this.reserved2 = new Array(11).fill(0x00);
    this.fadeUp = options.fadeUp;
    this.fadeDown = options.fadeDown;
    this.streamDuration = options.streamDuration;
    this.streamBlocks = options.streamBlocks;
    this.name = options.name;
    this.command = options.command;

  }

  compile(){
    this.resourceType = new Uint8ClampedArray([0x10]);
    let resourceID = new Uint16Array([(this.cueNumber * 10)]);
    this.resourceID = new Uint8ClampedArray(resourceID.buffer);
    console.log(this.resourceID);

    let cueNumber = new Uint16Array([(this.cueNumber * 10)]);
    this.resourceData.set(new Uint8ClampedArray(cueNumber.buffer), 0);

    this.resourceData.set(new Uint8ClampedArray([255, 255]), 2);

    let followTime = new Uint16Array([this.followTime]);
    this.resourceData.set(new Uint8ClampedArray(followTime.buffer), 4);

    let followCue = new Uint16Array([(this.followCue * 10)]);
    this.resourceData.set(new Uint8ClampedArray(followCue.buffer), 6);

    this.resourceData.set([this.type], 8);

    let fadeUp = new Uint16Array([this.fadeUp]);
    this.resourceData.set(new Uint8ClampedArray(fadeUp.buffer), 22);

    let fadeDown = new Uint16Array([this.fadeDown]);
    this.resourceData.set(new Uint8ClampedArray(fadeDown.buffer), 24);

    let streamDuration = new Uint32Array([this.streamDuration]);
    this.resourceData.set(new Uint8ClampedArray(streamDuration.buffer), 26);

    let streamBlocks = new Uint16Array([this.streamBlocks]);
    this.resourceData.set(new Uint8ClampedArray(streamBlocks.buffer), 30);

    this.resourceData.set(new Buffer(this.name), 32);

    this.resourceData.set(new Uint8ClampedArray(64).fill(255), 64);

    this.resourceData.set(new Buffer(this.command), 128);

    return super.compile();
  }

  static cueInfoOptions(){
    return {
      cueNumber: 1.0,
      followTime: 0,
      linkCue: 0,
      type: 0x00,
      followMode: 0x00,
      fadeUp: 0,
      fadeDown: 0,
      streamDuration: 0,
      streamBlocks: 0,
      name: "Cue 1",
      command: ""
    }
  }
}

module.exports = CueInfo;
