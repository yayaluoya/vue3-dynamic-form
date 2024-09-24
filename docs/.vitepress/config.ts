import { defineConfig } from "vitepress";
import path from "path";
import fs from "fs";
import vitePluginAliOss from "vite-plugin-ali-oss";
let aliYunOssOpPath = path.join(__dirname, "../../.local/oss.config.json");

const aliYunOptions = {
  url: "",
  region: "",
  accessKeyId: "",
  accessKeySecret: "",
  bucket: "",
  overwrite: true,
};

if (
  fs
    .statSync(aliYunOssOpPath, {
      throwIfNoEntry: false,
    })
    ?.isFile()
) {
  let _ = JSON.parse(fs.readFileSync(aliYunOssOpPath).toString());
  aliYunOptions.url = _.url;
  aliYunOptions.region = _.region;
  aliYunOptions.accessKeyId = _.accessKeyId;
  aliYunOptions.accessKeySecret = _.accessKeySecret;
  aliYunOptions.bucket = _.bucket;
} else {
  console.log("找不到阿里云配置文件", aliYunOssOpPath);
}

const prod = process.env.NODE_ENV === "production";
let base = prod ? aliYunOptions.url + "/vue3-dynamic-form-docs" : "/";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base,
  title: "vue3-dynamic-form-docs",
  description: "vue3可编辑表单",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "Home", link: "/" },
      { text: "Examples", link: "/markdown-examples" },
    ],

    sidebar: [
      {
        text: "Examples",
        items: [
          { text: "Markdown Examples", link: "/markdown-examples" },
          { text: "Runtime API Examples", link: "/api-examples" },
        ],
      },
    ],

    socialLinks: [
      {
        icon: "github",
        link: "https://github.com/yayaluoya/vue3-dynamic-form",
      },
    ],
  },
  buildEnd(siteConfig) {
    let AliOssPlugin = vitePluginAliOss(aliYunOptions) as any;
    AliOssPlugin.configResolved({
      base: siteConfig.site.base,
      build: {
        outDir: siteConfig.outDir,
      },
    });
    AliOssPlugin.closeBundle?.handler();
  },
});
