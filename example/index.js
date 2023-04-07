const Download = require('../lib')
//【第五人格】“筠心似君子，自持岁寒姿。”——新求生者古董商角色故事视频:
const BiliDown = new Download(
 'https://www.bilibili.com/video/BV1HV4y177gH/?spm_id_from=333.337.search-card.all.click&vd_source=108710f9dc8bf2ee2e2257f9f77a89f7'
)
BiliDown.start()
.then((info) => {
    process.stdout.write(`\n${JSON.stringify(info)}`)
})
.catch((err) => {
    process.stdout.write(`\n${JSON.stringify(err)}`)
})
