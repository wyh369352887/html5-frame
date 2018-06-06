### :heart:    介绍

H5快速自动化开发模板、脚手架

### :hourglass:    适用项目

工期约一个月内的小项目

### :muscle:    工作流

监听文件更新 => 清除老版本 => 编译、转译 => 加hash版本号 => 多终端热更新

### :deciduous_tree:    项目结构

```
├─ dist    //打包目录
│  │
│  ├─ index.html
│  │
│  ├─ image
│  │
│  ├─ style
│  │
│  ├─ rev  //存放添加hash后缀的文件对照关系表
│  │
│  ├─ media
│  │
│  ├─ script
│  │
│  └─ lib
│
├─less    //less文件源码目录
│
├─script    //js文件源码目录
│
├─style    //less编译成css后存放的目录
│
└─index.html    //所有html文件均放置在根目录下
```

<br>
<br>

### :hand:    使用方法

*clone到本地后，命令行进入该目录，运行:*<br>
<br>

`$ npm install `

安装完所需依赖后

`$ gulp`

架设静态服务器，开始愉快的敲键盘吧~

---

### :zap:   注意事项

1.所有html文件引用静态资源，均引用dist/目录下的，勿直接引用源码<br>
2.新添加文件后需要重启gulp工作流，否则无法实时热更新<br>
3.静态服务器的默认入口只能有一个（dist/下的index.html），可在gulpfile.js自行修改<br>
4.图片、音视频等静态资源直接放在dist下对应文件夹里，该工具不提供图片、音视频压缩功能



### :star:   Update

2018.6.6:less模板中新增了一些个人常用mixin方法


