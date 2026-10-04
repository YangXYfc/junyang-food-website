# 菌养食材网站

依据三份 Word 文档制作的静态前端 UI 原型。采用白色底色、森林绿配色与微软雅黑字体，提供左侧可折叠导航、滚动栏目高亮、进入动画、长首页及手机抽屉导航。

原版站点：[菌养食材 · 侧栏版](https://junyang-food-explore.royal-chime-5173.chatgpt.site)。

新版站点：[菌养食材 · 横向导航版](https://junyang-food-horizontal.royal-chime-5173.chatgpt.site)，独立部署，初始为所有者私有访问。顶部横向导航及二级菜单，24 个独立 HTML 地址；白底、森林绿与微软雅黑。原版保持不变。

## 横向导航新版本地运行

```sh
cd site-horizontal
npm run build
npm run dev
```

打开 http://127.0.0.1:4174。`npm test` 检查路由与页面。新版详情见 `site-horizontal/docs/verification.md`。

## 栏目与页面

- 首页：品牌介绍、食材、投入品、基地、科普与安全事件概览。
- 菌养食材：分类与基地筛选、搜索、食材详情、生产和检测资料状态。
- 肥料与饲料：类型切换与投入品详情。
- 基地溯源：生产过程、管理、监测资料、关联食材。
- 科普知识：主题筛选与文章页。
- 食材安全事件：风险与年份筛选、事件详情版式。

当前产品、基地和事件条目为 UI 演示；真实名称、价格、检测报告及业务接口待补充。

## 本地运行

需要 Node.js；无需安装前端依赖。

```sh
cd site
npm run dev
```

打开 http://127.0.0.1:4173。

```sh
npm test
npm run prepare-static
```

`prepare-static` 更新静态首屏 HTML。可将 `site/dist` 部署到静态托管服务；当前 Sites 配置位于 `site/.openai/hosting.json`。

## 目录

| 路径 | 内容 |
| --- | --- |
| `site-horizontal/` | 独立横向导航新版、静态页面及验证记录 |
| `site/` | 原版网站源码、可部署文件、静态服务器及逻辑测试 |
| `site/dist/assets/` | 网站使用的摄影素材 |
| `design-options/` | A/B/C 初步方案及选定的 A2 设计参考 |
| `docs/superpowers/` | 设计规格、实施计划与审查记录 |
| 根目录的三份 `.docx` | 栏目设置、基础信息与栏目内容整合依据 |

## 修改与验证

`site/dist/data.js` 维护演示数据；`views.js` 生成页面结构；`app.js` 管理交互；`styles.css` 管理配色、布局和动效。

交付时完成 6 项逻辑测试和 23 项浏览器检查，均通过。详细范围见 `docs/superpowers/2026-10-04-junyang-review.md`。

本仓库保存项目文件。上传 GitHub 不会自动部署或修改现有 Sites 站点。