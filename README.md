doxTemplate
===========

整合 TJ的dox和Oliver 的dox-template模板 ，做了点改动，可以扫描给定的整个目录，对目录下的所有js文件 
documentation generate ，生成一个html文件。目前改动较小，会不断更新维护。

使用见test，会在传入的目录下生成doc文件夹，包含有index.html文件及相应的css和js文件。index.html即是需要的api文档。
## Installation
安装
```
npm install doxmake -g
```
## Usage

doxmake --help

`` Options:

    -h, --help                   output usage information
    -V, --version                output the version number
    -n, --name <name>            the name of apiDocument
    -r, --release <release>      the release of apiDocument
    -d, --directory <directory>  the directory of apiDocument

 Examples:

  $ doxmake -n <name> -r <release> -d <directory>

```



