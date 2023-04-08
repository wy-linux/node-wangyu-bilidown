const fs = require("fs")
const Progress = require('node-wangyu-progress')
const axios = require("axios")
const EventEmitter = require('events')
const {formatStr} = require('./utils')

class BiliDown extends EventEmitter{
  constructor(url, title, folder) {
      super()
      this.url = url
      this.folder = folder || './video'
      this.bvid = ''
      this.originalTitle = ''
      this.title = title || ''
  }
  start() {
      return this.downloadByVedioPath(this.url, this.folder)
  }
  _getRefererByBvid(bvid){
      return `https://www.bilibili.com/video/${bvid}`
  } 
  async _getCidByBvid(bvid) {
      const res = await axios.get("https://api.bilibili.com/x/web-interface/view", {
        params: {
          bvid,
        },
      });
      return res.data.data.pages.map((item) => item.cid);
  };
  async downloadByVedioPath(url, folder) {
      let bvid = url.match(/video\/(.+)/)[1]
      this.bvid = bvid = bvid.split('/')[0]
      const title = await this.getTitleByBvid(this.bvid);
      if (!fs.existsSync(folder)) {
        fs.mkdirSync(folder);
      }
      if(fs.existsSync(`${folder}/${title}.mp4`)) {
        process.stdout.write(`${title}--已下载`)
        return  Promise.resolve({
            url: this.url,
            originalTitle: this.originalTitle,
            bvid,
            title,
            folder
        })
      }
      return this.downloadVideoByBvid({ bvid, title, folder });
  }
  async getTitleByBvid(bvid) {
      const res = await axios.get("https://api.bilibili.com/x/web-interface/view", {
        params: {
          bvid,
        },
      })
      this.originalTitle = res.data.data.title
      if(!this.title) {
        this.title = formatStr(res.data.data.title)
      }
      return this.title 
  }
  async downloadVideoByBvid({ bvid, title, folder}) {
      const downloadList = await this.getDownloadPathById(bvid);
      for (const downloadPath of downloadList) {
        await this.downloadResource({
          url: downloadPath,
          folder,
          title
        })
      }
      return Promise.resolve({
          url: this.url,
          originalTitle: this.originalTitle,
          bvid,
          title,
          folder
      })
  }
  async getDownloadPathById(bvid) {
      const cidList = await this._getCidByBvid(bvid);
      const result = [];
      for (const cid of cidList) {
        const params = {
          bvid,
          cid,
          qn: 112,
        }
        const res = await axios.get("https://api.bilibili.com/x/player/playurl", {
          params,
        });
        result.push(
          res.data.data.durl[0].url
        )
      }
      return result;
  }
  async downloadResource({ url, folder, title}) {
      const target = `${folder}/${title}.mp4`
      if (fs.existsSync(target)) {
        return Promise.resolve();
      }
      const res = await axios.get(url, {
        headers: {
          referer: this._getRefererByBvid(this.bvid)
        },
        responseType: "stream",
      })
      const bar = new Progress(title, {
          total: Number(res.headers['content-length'])
      })
      res.data.on('data', (chunk) => {
          fs.appendFileSync(target, chunk)
          bar.run(chunk.length)
      })
      return new Promise((resolve, reject) => {
          res.data.on("end", resolve);
          res.data.on("error", reject);
      })
  }
}
module.exports = BiliDown