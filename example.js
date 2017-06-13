let compression = require('./bnImageCompression');
let program = require('commander');

program
    .version('0.0.1')
    .option('-o, --outuput', 'Output path')
    .option('-i, --input', 'Input path')
    .parse(process.argv)

let inputPath = program.input;
//'D:/zhljian/work/tinify'
if (!inputPath) {
    console.log('input error');
} else {
    compression.compressionDir('D:/zhljian/work/tinify').then(function(){
        console.log('success');
    });
}



