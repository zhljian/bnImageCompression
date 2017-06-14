let compression = require('./bnImageCompression');
let program = require('commander');

program
    .version('0.0.1')
    .usage('[options] <file ...>')
    .option('-o, --outuput <outuput>', 'output path(default <input>)')
    .option('-i, --input <input>', 'input path')
    .option('-d, --dir', 'compression dir')
    .option('-k, --key <key>', 'tinify key')
    .parse(process.argv)

let inputPath = program.input;
let outPutPath = program.outuput;
let dir = program.dir; 
let key = program.key;
if (!inputPath) {
    console.log('input error');
} else if (!key){
    console.log('key error');
} else {
    if (dir) {
        compression.compressionDir(inputPath, outPutPath, key).then(function(){
            console.log('compression success');
        }, function(error){
            console.error(error);
        });
    } else {
        compression.compressionFile(inputPath, outPutPath, key).then(function(){
            console.log('compression success');
        }, function(error){
            console.error(error);
        });
    }
    
}



