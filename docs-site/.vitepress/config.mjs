import { defineConfig } from "vitepress";

export default defineConfig({
  title: "GenericAgent Design",
  description: "GenericAgent 极简可自我进化 Agent 框架设计文档",

  head: [
    ["link", { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" }],
  ],

  themeConfig: {
    logo: "/logo.png",
    nav: [
      { text: "Home", link: "/" },
      { text: "Architecture", link: "/architecture" },
      { text: "Memory System", link: "/memory-system" },
      { text: "Toolset", link: "/toolset" },
      { text: "SOPs", link: "/sops" },
    ],
    sidebar: [
      {
        text: "Documentation",
        items: [
          { text: "Home", link: "/" },
          { text: "架构分析", link: "/architecture" },
          { text: "分层记忆系统", link: "/memory-system" },
          { text: "原子工具集", link: "/toolset" },
          { text: "Agent Loop", link: "/agent-loop" },
          { text: "前端接口", link: "/frontends" },
          { text: "SOP 集合", link: "/sops" },
          { text: "自我进化机制", link: "/self-evolution" },
        ],
      },
    ],
    socialLinks: [
      { icon: "github", link: "https://github.com/lsdefine/GenericAgent" }
    ],
    footer: {
      message: "基于 GenericAgent 开源项目构建",
      copyright: "Copyright © 2024-present GenericAgent Contributors"
    },
  },

  base: "/generic-agent-design/",
});
