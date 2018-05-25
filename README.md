###适用项目###

工期约一个月内的小项目

###工作流###

监听文件更新 => 清除老版本 => 编译、转译 => 加hash版本号 => 多终端热更新

###项目结构###

html5-frame   
│
├─index.html 
│
│
├─dist      
│  │
│  ├─index.html 
│  ├─image
│  ├─lib
│  ├─media
│  ├─rev     
│  ├─script
│  └─style
│
├─less       
│
├─script   
│
└─style      

###注意事项###

1.所有html文件引用静态资源，均引用dist/目录下的，勿直接引用源码<br>
2.新添加文件后需要重启gulp工作流，否则无法实时热更新<br>
3.静态服务器的默认入口只能有一个，可在gulpfile.js自行修改<br>
4.图片、音视频等静态资源直接放在dist下对应文件夹里，该工具暂无图片、音视频压缩功能
