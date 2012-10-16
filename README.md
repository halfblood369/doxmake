doxTemplate
===========

整合 TJ的dox和Oliver 的dox-template模板，修改其模版内容，可以扫描给定的整个目录，对目录下的所有js文件 
documentation generate，生成一个html文件。
## Installation
安装
```
npm install doxmake -g
```
## Usage
```
  doxmake -n <name> -r <release> -d <directory>
```
## Examples

```
  doxmake -n apiDocument -r 0.0.1 -d "/home/lwj/workspace/pomelo-core/lib"

```
结果会在输入目录"/home/lwj/workspace/pomelo-core/lib"生成doc文件夹，包含css,js资源和index.html文件。
index.html即为生成的api文档，文档名为"apiDocument"，版本为"0.0.1"

```
 doxmake -d "/home/lwj/workspace/pomelo-core/lib"

```
同上面，只是生成的api文档默认的名字是doxmake，版本是0.0.1



