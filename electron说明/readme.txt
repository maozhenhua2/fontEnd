安装electron-prebuilt
win7一定要安装python-2.7.10

1.下载electron
https://npm.taobao.org/mirrors/electron
下载最新的electron，例如electron-v0.37.6-win32-x64.zip

2.解压缩文件到任意目录

3.新建文件夹，将项目源文件和下载的electron文件都放在根目录的不同文件夹内
例如
root
├── app
├── electron-v0.37.6-win32-x64

4.新建package.json，安装依赖项目

5.运行 npm start 进行调试

6.运行 npm run-script package打包文件

7.npm安装依赖项asar用于打包文件
npm install asar -g
运行asar p app app.asar

