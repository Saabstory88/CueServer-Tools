const fs = require('fs');

let f = fs.readFileSync('cs.csd');

let file = new Uint8Array(new Buffer(f));

//76 - 604

let key = file.slice(77, 605);

for(let i = 0; i < key.length; i++){
  console.log(Buffer.from([key[i]]).toString('hex'));
}

fs.writeFile('modules/key.bin', key, function(err){
  if(err){
    console.log(err);
  }
})
