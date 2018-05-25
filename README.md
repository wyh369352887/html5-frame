**适用项目**

工期约一个月内的小项目

**工作流**

监听文件更新 => 清除老版本 => 编译、转译 => 加hash版本号 => 多终端热更新

**项目结构**

    ├─ dist
    │  ├─ index.html
    │  ├─ image
    │  ├─ style
    │  ├─ rev  
    │  ├─ media
    │  ├─ script
    │  └─ lib
    │
    ├─less
    │
    ├─script
    │
    ├─style
    │
    └─index.html
<br>
1.dist/为最终输出目录<br>
2.所有html文件均放置在根目录下<br>
3.rev/存放添加hash后缀的文件对照关系表<br>
4.less/为.less文件源码目录<br>
5.script/为js文件源码目录<br>
6.style/为less编译成css后存放的目录

<br>
<br>

**注意事项**

1.所有html文件引用静态资源，均引用dist/目录下的，勿直接引用源码<br>
2.新添加文件后需要重启gulp工作流，否则无法实时热更新<br>
3.静态服务器的默认入口只能有一个（dist/下的index.html），可在gulpfile.js自行修改<br>
4.图片、音视频等静态资源直接放在dist下对应文件夹里，该工具暂无图片、音视频压缩功能
