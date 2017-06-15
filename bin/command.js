let compression = require('../lib/bnImageCompression');
let program = require('commander');

program
    .version('0.0.1')
    .usage('[options] <file ...>')
    .option('-o, --outuput <outuput>', 'output path(default <input>)')
    .option('-i, --input <input>', 'input path')
    .option('-k, --key <key>', 'tinify key')
    .parse(process.argv)

let inputPath = program.input;
let outPutPath = program.outuput;
let key = program.key;
if (!inputPath) {
    console.log('input error');
} else if (!key){
    console.log('key error');
} else {
    compression.compress(inputPath, outPutPath, key).then(function(){
        console.log('compress success');
    }, function(error){
        console.error(error);
    });
}



