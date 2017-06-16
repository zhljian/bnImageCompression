/**
 * 控制台输出类
 * author : zhljian
 * date   : 2017/6/9
 * description :
 * 根据需要来确定控制台输出
 */
'use strict';

let myconsole = {};
let SILENCE = 0;
let TEST = 0;

myconsole.setOutMode = function(test, silence){
    if (test != null) {
        TEST = test;
    }
    if (silence != null) {
        SILENCE = silence;
    }
};

/**
 * log输出
 * @param {String} str
 * @param {[]}     args
 */
myconsole.log = function (str, ...args){
    // 静默模式
    if (SILENCE) {
        return -1;
    }
    console.log(str, ...args);
};

/**
 * 压缩总数输出
 * @param {[]}     args
 */
myconsole.totalFiles = function(...args){
    this.log('compress %s files.', ...args);
};

/**
 * 压缩进度输出
 * @param {[]}     args
 */
myconsole.progress = function(...args){
    // 测试时输出了详细的文件信息，没必要输出进度
    if (TEST) {
        return ;
    }
    this.log('progress:(%s/%s)', ...args);
};

/**
 * 测试时输出详细的文件信息
 * @param {[]}     args
 */
myconsole.testFileInfo = function(...args){
    if (TEST) {
        this.log('sourceFile:%s\ntargetFile:%s\n', ...args);
    }
};

module.exports = myconsole;