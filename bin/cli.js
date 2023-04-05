#!/usr/bin/env node
const Download = require('../lib')

const handleRead = (chunk) => {
    process.stdin.removeListener('data', handleRead)
    process.stdout.write('\n')
    const BiliDown = new Download(chunk.toString())
    BiliDown.once('downloaded', () => {
        process.stdout.write('\n\n')
        BiliDownCli()
    })   
}
function BiliDownCli() {
    process.stdout.write('请输入要下载的网页端BiliBili视频链接：')
    process.stdin.on('data', handleRead)
}
BiliDownCli()