const CSD = require('./modules/csd.js');
const CueInfo = require('./modules/cueinfo.js');
const CueData = require('./modules/cuedata.js');
const CueStream = require('./modules/cuestream.js');

const fs = require('fs');

let entries = [];

let cueOpts = CueInfo.cueInfoOptions();

entries.push(new CueInfo(cueOpts));
entries.push(new CueData(1, new Uint8ClampedArray(512).fill(255)));

let file = new CSD(entries);

fs.writeFile('test.csd', file.build(), function(err){});
