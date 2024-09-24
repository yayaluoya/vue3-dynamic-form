const path = require("path");
const fs = require("fs");

/** @type {()=>import('server-file-sync/dist/config/TConfig').TConfig} */
module.exports = async function () {
  const keyUrl = path.join(__dirname, "./.local/key");
  if (
    !fs
      .statSync(keyUrl, {
        throwIfNoEntry: false,
      })
      ?.isFile()
  ) {
    console.log("请配置服务器连接私钥以便上传包到服务器");
    return;
  }
  // 远程项目地址
  const remoteRootPath = "/home/vue3-dynamic-form";
  /**
   * 返回配置信息
   */
  return {
    host: "47.94.233.236",
    port: 22,
    username: "root",
    privateKey: fs.readFileSync(keyUrl),
    syncList: [
      {
        key: "web",
        title: "前端代码",
        paths: [
          {
            local: path.join(__dirname, "./dist/index.html"),
            remote: remoteRootPath + "/index.html",
          },
        ],
      },
      {
        key: "docs",
        title: "文档代码",
        paths: [
          {
            local: path.join(__dirname, "./docs/.vitepress/dist/index.html"),
            remote: remoteRootPath + "-docs/index.html",
          },
        ],
      },
    ],
    connectConfig: {},
    watch: false,
  };
};

/**
 * name: server-file-sync
 * version: 1.7.2
 * description: 把本地文件同步到服务器指定目录，方便前端更新代码到服务器
 * author: [object Object]
 * homepage: https://github.com/yayaluoya/server-file-sync#readme
 * issues: https://github.com/yayaluoya/server-file-sync/issues
 */
