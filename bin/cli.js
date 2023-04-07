#!/usr/bin/env node
const Download = require('../lib')
const chalk = require('chalk')

const handleRead = (chunk) => {
    process.stdin.removeListener('data', handleRead)
    process.stdout.write('\n')
    const BiliDown = new Download(chunk.toString().replace(/[\n\r]/g, ''))
    BiliDown.start()
            .then((info) => {
                // console.log(info);
            })
            .catch((err) => {
                process.stdout.write(`${chalk.yellow('抓取失败！')}请输入正确的${chalk.red('网页端BiliBili视频链接')}或${chalk.green('更换视频爬取链接')}`)
            })
            .finally(() => {
                process.stdout.write('\n\n')
                BiliDownCli()
            }) 
}
function BiliDownCli() {
    process.stdout.write('请输入要下载的网页端BiliBili视频链接：')
    process.stdin.on('data', handleRead)
}
BiliDownCli()