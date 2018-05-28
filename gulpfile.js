var gulp = require('gulp');
var browserSync = require('browser-sync');
var reload = browserSync.reload;   //静态服务器热更新
var htmlmin = require('gulp-htmlmin');//压缩html
var less = require('gulp-less');//编译less
var concat = require('gulp-concat');//合并js
var uglify = require('gulp-uglify');//压缩Js
var babel = require("gulp-babel");
var es2015 = require("babel-preset-es2015");//编译es6
var rev = require('gulp-rev');
var revCollector = require('gulp-rev-collector');//修改版本号
var clean = require('gulp-clean');//清除文件
var rename = require('gulp-rename');//文件重命名
var minifyCss = require('gulp-minify-css');//压缩css

// ==========================================================================================================
// 
// 
//                                                  项目依赖包
// 
//                                                     end
// 
// ==========================================================================================================


gulp.task('default',function() {
    browserSync.init({
            server: {
                baseDir: "./",
                index:'dist/index.html' // 指定默认打开的文件
            }
        });

    gulp.watch(['less/*.less'],['clean-css','watch-less','replace-css']);
    gulp.watch(['script/*.js'],['clean-js','watch-js','replace-js']);
    gulp.watch(['*.html'],['watch-html']);
  });

  /**
   * 每次检测到文件更新，首先删除旧文件
   */


gulp.task('clean-css',function(){
    return gulp.src('dist/style/*.css',{read:false})
               .pipe(clean());
})
gulp.task('clean-js',function(){
    return gulp.src('dist/script/*.js',{read:false})
               .pipe(clean());
})


/**
 * 检测到js、css文件变化时，进行编译、转译、添加版本号等操作，并输出到指令目录，生成rev-manifest.json对照表，同时热更新页面
 */


gulp.task('watch-js',['clean-js'],function(){

    /**
     * 需要合并js时取消注释65、64行，并注释66行
     */

    // return gulp.src(['script/*.js','!script/global.js'])
    return gulp.src('script/*.js')
                // .pipe(concat('global.js'))//合并
                .pipe(babel({presets:[es2015]}))//编译
                // .pipe(uglify())//压缩
                // .pipe(gulp.dest('script/'))
                .pipe(rev())//添加后缀
                .pipe(gulp.dest('dist/script'))
                .pipe(rev.manifest({
                    path:'dist/rev/rev-manifest.json',
                    merge:true
                }))
                .pipe(gulp.dest('./'))
                .pipe(reload({stream:true}));
})

gulp.task('watch-less',['clean-css'],function () {

    return gulp.src('less/*.less')
                // .pipe(concat('global.less'))//合并
                .pipe(less())
                .pipe(gulp.dest('style/'))
                .pipe(rev())
                .pipe(gulp.dest('dist/style/'))
                .pipe(rev.manifest({
                    path: 'dist/rev/rev-manifest.json',
                    merge:true
                }))
                .pipe(gulp.dest('./'))
                .pipe(reload({stream:true}));
})
gulp.task('watch-html', function () {
    var options = {
        // collapseWhitespace: true, //压缩HTML
        collapseBooleanAttributes: true, //省略布尔属性的值
        removeComments: true, //清除html注释
        removeEmptyAttributes: true, //删除所有空格做属性的值
        removeScriptTypeAttributes: true, //删除<script>的type="text/javascript"
        removeStyleLinkTypeAttributes: true, //删除<style>和<link>的type="text/css"
        minifyJS: true,   //压缩页面JS
        minifyCSS: true    //压缩页面CSS
    };
    return gulp.src('*.html')
        .pipe(htmlmin(options))
        .pipe(gulp.dest('dist/'))
        .pipe(reload({stream:true}));        
});


/**
 * 修改dist目录下html文件引用路径
 */

gulp.task('replace-js',['watch-js'],function(){
    return gulp.src(['dist/rev/*.json','dist/*.html'])
               .pipe(revCollector({
                   replaceReved:true,
                   merge:true
               }))
               .pipe(gulp.dest('./'));
})
gulp.task('replace-css',['watch-less'],function(){
    return gulp.src(['dist/rev/*.json','dist/*.html'])
        .pipe( revCollector({
            replaceReved: true,
            merge:true
        }) )
        .pipe( gulp.dest('./') );
});

// ==========================================================================================================
//          开发环境配置:
//                          架设静态服务器、
//                          less=>css、
//                          多终端同步热更新、
//                          es6=>es5
//                          静态文件添加hash后缀防缓存、
//                          html压缩
// 
//                                              -----------2018.3.1  elephant.h
// ==========================================================================================================