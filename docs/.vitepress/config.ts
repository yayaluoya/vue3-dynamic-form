import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "vue3-dynamic-form-docs",
  description: "vue3可编辑表单",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [{ text: "主页", link: "/" }],

    sidebar: [
      {
        text: "文档",
        items: [
          { text: "安装使用", link: "/install" },
          { text: "控件列表", link: "/cons" },
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
});
