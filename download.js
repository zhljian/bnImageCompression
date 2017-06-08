'use strict';

let co = require('co');
let tinify = require('tinify');
tinify.key = 'mWOnZaTbJTNARWKPy8mdgf1Ju3cROIjU';

let source = tinify.fromFile('D:/zhljian/work/tinify/zhljian.png');
let result = source.toFile('D:/zhljian/work/tinify/test.png');

result.then(function(res){
	console.log("success")
}, function(error){
	console.log(JSON.stringify(error, null, 2));
});