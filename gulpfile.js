/**
 * Created by m.max on 2017/4/5.
 */
let gulp = require('gulp'),
  // sourcemap
  sourcemaps = require('gulp-sourcemaps'),
  // 合并
  concat = require('gulp-concat'),
  // 文件修改浏览器同步
  browserSync = require('browser-sync'),
  // 让 browserSync 支持 include
  ssi = require('browsersync-ssi'),
  // 替换html里的css和js文件
  usemin = require('gulp-usemin'),
  // 同步执行gulp task
  runSequence = require('run-sequence'),
  // js 压缩
  uglify = require('gulp-uglify'),
  // 清除
  clean = require('gulp-clean'),
  // nodejs 修改自动重启
  nodemon = require('gulp-nodemon'),
  // es6 编译器
  babel = require('gulp-babel'),
  // 重命名
  rename = require('gulp-rename'),
  // gulp 错误处理
  plumber = require('gulp-plumber'),
  // 图片压缩
  imagemin = require('gulp-imagemin'),
  // css 压缩
  cleanCSS = require('gulp-clean-css'),
  // css js 添加版本号
  rev = require('gulp-rev'),
  revCollector = require('gulp-rev-collector'),
  // 删除原始文件
  revdel = require('gulp-rev-delete-original'),
  // typescript
  ts = require('gulp-typescript'),
  // bower 依赖注入
  //wiredep = require('wiredep').stream,
  //notify = require("gulp-notify"),
  //through = require('through2'),
  // 引入拦截api的文件
  //mock = require('./performan/route'),

  bs,
  port = 3003,
  reload = browserSync.reload,


  app = 'performan',
  dist = app + '_dist',

  appCss = app + '/css/**/*.css',
  appJs = app + '/js/**/*.js',
  appHtml = app + '/**/*.html',
  appEs = app + '/es/**/*.es6',
  appTs = app + '/ts/**/*.ts',
  appImg = app + '/img/**/*.*',
  appCssDir = app + '/css',
  appJsDir = app + '/js',
  appEsDir = app + '/es',
  appTsDir = app + '/ts',
  appVendor = app + '/vendor/**/*.*',
  expressEnter = app + '/bin/WWW',
  expressHtml = app + '/views/**/*.html',
  expressJs = app + '/public/**/*.js',
  expressCss = app + '/public/**/*.css',
  distHtmlDir = dist + '/html',
  distCssDir = dist + '/css',
  distJsDir = dist + '/js',
  distImg = dist + '/img',
  distVendor = dist + '/vendor',
  distCss = dist + '/css/**/*.css',
  distJs = dist + '/js/**/*.js';

// 文件实时监控浏，览器自动刷新
gulp.task('serve', function () {

  browserSync({
    server: {
      baseDir: app,
      middleware: [
        ssi({
          baseDir: app,
          ext: ".html"
        }),
        // 拦截ajax
        //function (req, res, next) {
        //  mock(req, res, next);
        //  next();
        //}
        /*,
         ssi({
         baseDir: app,
         ext: ".shtml"
         })*/
      ],
      // 将bower的路径改为相对于项目的路径
      routes: {
        "/bower_components": "bower_components"
      }
    }
  });
  //gulp.watch(app + '/ts/!**!/!*.ts', ['typescript']).on('change', changes);
  //gulp.watch(app + '/source/!**!/!*.ts', ['typescript']);
  //gulp.watch(appEs, ['babel']);
  gulp.watch(appCss).on('change', changes);
  gulp.watch(appJs).on('change', changes);
  gulp.watch(appHtml).on('change', changes);
});
// es6编译
gulp.task('es6', function () {
  return gulp.src(appEs)
    .pipe(plumber({}, true, function (err) {
      console.log(err);
    }))
    .pipe(sourcemaps.init())
    .pipe(babel())
    // .pipe(concat('.'))
    //.pipe(plumber({
    //  inherit: true,
    //  errorHandler: notify.onError("Error: <%= error.message %>")
    //}))
    //.pipe(through(function () {
    //  this.emit("error", new Error("Something happend: Error message!"))
    //}))
    .pipe(sourcemaps.write('sourcemap', {
      // includeContent: false,
      sourceRoot: appEsDir
    }))
    .pipe(gulp.dest(appJsDir));
});
// 监控es6文件变动并编译
gulp.task('watchEs6', function () {
  gulp.watch(appEs, ['es6']);
});
// typescript 编译
gulp.task('typescript', function () {
  return gulp.src(appTs)
    .pipe(sourcemaps.init())
    .pipe(ts({
      "listFiles": false,
      "watch": false,
      "target": "es5",
      "module": "system",
      "moduleResolution": "node",
      "sourceMap": true,
      "pretty": true,
      "emitDecoratorMetadata": true,
      "experimentalDecorators": true,
      "removeComments": false,
      "noImplicitAny": false
    }))
    .pipe(sourcemaps.write('sourcemap', {
      // includeContent: false,
      sourceRoot: appTsDir
    }))
    .pipe(gulp.dest(appJsDir));
});
// 清理
gulp.task('clean', function () {
  return gulp.src(dist, {
    read: false
  })
    .pipe(clean());
});
// 根据html所引用的文件进行复制和压缩
/*gulp.task('html', function () {
 //var assets = useref.assets();
 gulp.src(appHtmlL1)
 //.pipe(assets)
 //.pipe(gulpif('*.js', uglify()))
 //.pipe(gulpif('*.css', minifycss()))
 //.pipe(assets.restore())
 .pipe(useref())
 .pipe(gulp.dest(dist));

 //assets = useref.assets();

 gulp.src(appHtmlL1All)
 //.pipe(assets)
 //.pipe(gulpif('*.js', uglify()))
 //.pipe(gulpif('*.css', minifycss()))
 //.pipe(assets.restore())
 .pipe(useref())
 .pipe(gulp.dest(distHtmlDir));

 });*/

gulp.task('usemin', function () {
  return gulp.src(appHtml)
    .pipe(usemin())
    .pipe(gulp.dest(dist))
});

// js 压缩
gulp.task('jsmin', function () {
  return gulp.src(distJs)
  //.pipe(rename({suffix: '.min'}))
  //.pipe(gulp.dest(distJsDir))
    .pipe(sourcemaps.init())
    .pipe(uglify({
      /*output: {
       indent_start: 0,
       indent_level: 2,
       beautify: true,
       comments: false
       }*/
    }))
    .pipe(sourcemaps.write('sourcemap', {
      sourceRoot: distJsDir
    }))
    .pipe(gulp.dest(distJsDir))
  //.pipe(rev())
  //.pipe(gulp.dest(distJsDir))
  //.pipe(rev.manifest())
  //.pipe(gulp.dest(distJsDir));
});
// css 压缩
gulp.task('cssmin', function () {
  gulp.src(distCss)
  //.pipe(rename({suffix: '.min'}))
  //.pipe(gulp.dest(distCssDir))
    .pipe(sourcemaps.init())
    .pipe(cleanCSS({
      compatibility: 'ie8'
    }))
    .pipe(sourcemaps.write('sourcemap', {
      sourceRoot: distCssDir
    }))
    .pipe(gulp.dest(distCssDir))
  //.pipe(rev())
  //.pipe(gulp.dest(distCssDir))
  //.pipe(rev.manifest())
  //.pipe(gulp.dest(distCssDir));
});
// 图片压缩
gulp.task('imagemin', function () {
  gulp.src(appImg)
    .pipe(imagemin())
    .pipe(gulp.dest(distImg));
});
// copy
gulp.task('copy', function () {
  //gulp.src(app + '/template/**/*.*')
  //  .pipe(gulp.dest(dist + '/template'));

  //gulp.src([
  //  app + '/vendor/**/*.*',
  //  '!' + app + '/vendor/echart/chart/*.*'
  //])
  //  .pipe(gulp.dest(dist + '/vendor'));

  //gulp.src([
  //  app + '/vendor/echart/chart/bar.js',
  //  app + '/vendor/echart/chart/radar.js'
  //])
  //  .pipe(gulp.dest(dist + '/vendor/echart/chart/'));

  //gulp.src(app + '/images/**/*.*')
  //  .pipe(gulp.dest(dist + '/images'));

  //gulp.src(app + '/data/**/*.*')
  //  .pipe(gulp.dest(dist + '/data'));

  gulp.src(appVendor)
    .pipe(gulp.dest(distVendor));

  gulp.src(appImg)
    .pipe(gulp.dest(distImg));
});
//CSS生成文件hash编码并生成 rev-manifest.json文件名对照映射
gulp.task('revCss', function () {
  return gulp.src(distCss)
    .pipe(rev())
    .pipe(revdel())
    .pipe(gulp.dest(distCssDir))
    .pipe(rev.manifest())
    .pipe(gulp.dest(distCssDir));
});
//js生成文件hash编码并生成 rev-manifest.json文件名对照映射
gulp.task('revJs', function () {
  return gulp.src(distJs)
    .pipe(rev())
    .pipe(revdel())
    .pipe(gulp.dest(distJsDir))
    .pipe(rev.manifest())
    .pipe(gulp.dest(distJsDir));
});
//Html替换css、js文件版本
gulp.task('revHtml', function () {
  return gulp.src([dist + '/**/*.json', dist + '/**/*.html'])
    .pipe(revCollector())
    .pipe(gulp.dest(dist));
});
// nodejs
gulp.task('nodererun', function () {
  //console.log(nodemon.toLocaleString())
  nodemon({
    script: expressEnter,
    ext: 'html js css',
    ignore: ['ignored.js', '.idea'],
    env: {
      PORT: port
    }
  })
    .on('start', function () {
      console.log('start');
      if (!bs) {
        console.log('create bs');
        bs = browserSync.create();
        bs.init({
          proxy: {
            target: 'localhost:' + port
          }
          //port: 3000,
          //server: {
          //	baseDir: app
          //},
          //open: 'localhost'
        });
        bs.watch([
          // app + '/views/**/*.ejs',
          expressHtml,
          expressJs,
          expressCss
        ]).on('change', changes);
      } else {
        bs.reload();
      }

    });
  // .on('restart', function(){
  //   console.log('restart');
  //   bs.reload();
  // });
});

gulp.task('build', function (callback) {
  runSequence('clean',
    'usemin',
    ['cssmin', 'jsmin'],
    ['revCss', 'revJs'],
    'revHtml',
    'copy',
    callback);
});

// 生成压缩版本
//gulp.task('dest', ['clean'], function () {
//  gulp.start('cssmin', 'jsmin', 'html', 'copy');
//});
// 生成版本号
//gulp.task('revdest', ['clean'], function () {
//  gulp.start('revCss', 'revJs', 'cssmin', 'jsmin', 'html', 'copy', 'revHtml');
//});
// 刷新，并显示改变的文件
function changes(event) {
  reload();
  console.log('file ' + event.path + ' was ' + event.type + ', running tasks...');
}