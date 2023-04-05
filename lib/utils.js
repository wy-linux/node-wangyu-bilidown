/**
    去除文件名中的 空格 / 等字符，防止创建文件时报错
 */
function formatStr(name) {
    return name.replace(/[\\/\s]/g, '')
}
module.exports = {
    formatStr
}