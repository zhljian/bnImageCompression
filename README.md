# bncompression
压缩图片或文件夹下的所有图片。
## 安装
用npm安装

`npm install bncompress -g`

## bncompress.compress (inputPath, outputPath, key, callback)
参数说明

参数 | 类型 | 描述
---|---|---
inputPath | String | 输入文件或文件夹的路径
outputPath | String | 输出文件或文件夹的路径,如果为空则输出文件会覆盖输入文件
key | String | 可以是一个key的字符串也可以是一个文件的路径
callback | Function | 压缩完成后的回调,这个回调接受的第一个参数是error
> 特别说明：tinify压缩需要用邮箱在tinify官网注册一下，然后会得到这个key，一个key每个月可以压缩500张图片。所以如果要压缩的文件夹下的图片超过500，那么可以用多个key，写在一个文件中，一个key占一行。这么做会有一个缺陷就是，文件中靠前的key失效了，那么接下来压缩的时间就会比较长，应为一个文件压缩时，会从第一个key开始尝试。

### example
```javascript
let compression = require('bncompress');

compression.compress("/d/xxx/texture", null, '../key.txt', function(error){
    if (error) {
        console.error(error);
        return ;
    }
    console.log('compress success');
});
```

## 命令行
打开命令行，输入`bn-compress --help`可以看到帮助界面
```
$ node.exe ./bin/command --help

  Usage: command [options] <file ...>

  Options:

    -h, --help               output usage information
    -V, --version            output the version number
    -o, --outuput <outuput>  output path(default <input>)
    -i, --input <input>      input path
    -k, --key <key>          tinify keyFile
    -t, --test               test mode, output filename, not compress
    -s, --silence            silence mode, not output
```

参数说明

参数 | 描述
---|---
-h | 帮助
-V | 版本
-o | 输出文件或文件夹,缺省值为输入文件或输入文件夹
-i | 输入文件或输入文件夹,不能缺少
-k | tinify压缩的key,可以是一个文件或一个key字符串,不能为空
-t | 测试模式,会输出所有会压缩的文件,不会压缩这些文件
-s | 静默模式,不会有任何输出

例如
`bn-compress -i /D/xxx/texture -k mWOnZaTbJTNARWKPy8mdgf1Ju3cROIjU -t`
执行上述命令后会输出`/D/xxx/texture`目录下所有的可压缩文件，如果去掉-t参数则会进行压缩。