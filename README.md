### Node手写的B站视频爬虫工具BiliDown
1. lib目录为BiliDown的核心库
2. bin目录为BiliDown的命令行工具
3. example目录为BiliDown的爬取示例
> windows下BiliDown爬虫工具的可执行文件.exe下载链接：
https://www.wangyu.cloud/node-wangyu-win-BiliDown.exe


Using npm:
```javascript
npm install node-wangyu-bilidown -g
```
Once the package is installed, you can Use the spider tool by the command BiliDown:
```shell
BiliDown
请输入要下载的网页端BiliBili视频链接：url
......
```
###### Example:
```javascript
const Download = require('node-wangyu-bilidown')
//【第五人格】“筠心似君子，自持岁寒姿。”——新求生者古董商角色故事视频:
const BiliDown = new Download(
 'https://www.bilibili.com/video/BV1HV4y177gH/?spm_id_from=333.337.search-card.all.click&vd_source=108710f9dc8bf2ee2e2257f9f77a89f7'
)
BiliDown.once('downloaded', () => {
    process.stdout.write('\n视频已下载')
}) 
```
###### Script
```shell
npm run cli 启动爬虫工具BiliDown
npm run pkg-win 打包BiliDown，生成window下.exe可执行文件
......
```