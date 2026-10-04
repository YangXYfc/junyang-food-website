# 菌养食材站点 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [x]`) syntax for tracking.

**Goal:** 完成按 Word 内容结构与 A2 视觉制作的站点，验证交互与响应式，审查后通过 Sites 私人发布。

**Architecture:** 采用静态 HTML/CSS/ES modules，六栏目长首页与 hash 路由列表/详情共用侧栏。数据与筛选、路由逻辑分离；不连接真实业务接口。生成独立摄影素材，不把 UI 截图作为网页。

**Tech Stack:** HTML、CSS、原生 JavaScript、Node.js 内置测试与静态服务器；可用的 bundled Playwright 用于浏览器验证。

**Spec:** ../specs/2026-10-04-junyang-ui-design.md

## Global Constraints

- 按文档定位“菌养食材”，六主栏目保留；不改为禽类或食用菌专卖。
- 米白 `#F6F4EA`、森林绿 `#234D37`；左侧 240px 展开 / 76px 收起；960px 以下抽屉。
- 无购物、支付、账户、后台；演示条目明确标注，不虚构价格、基地、检测合格结论或证书。
- 保留原 Word 与设计稿；站点源代码位于 `site/` 子目录。
- 默认私人 Sites 发布；凭据不落盘、不输出。

## Review Focus

- 手机横向溢出、抽屉焦点与 Escape、遮罩关闭行为。
- 详情页刷新、未知路由、前进后退、筛选无结果与重置。
- 首页点击导航与手动滚动时高亮、收起侧栏后的当前位置。
- 减少动态效果及 JavaScript/观察器缺失时内容仍然可读。
- 演示内容与真实资料的界限，报告入口不能下载虚构文件。

## Task 1: 数据、路由与内容契约

**Files:** `site/dist/data.js`, `site/dist/logic.js`, `site/tests/logic.test.mjs`, `site/package.json`。

**Interfaces:** parseRoute(hash) 返回页面、ID、section 与查询参数；filterFoods(items, filters) 返回匹配条目；activeSectionAtLine(boxes, height, bottom) 返回六栏目之一。页面模块消费数据导出与上述函数。

- [x] 先写路由、分类组合筛选、无结果、未知地址与滚动高亮边界的测试，运行确认缺失实现导致失败。
- [x] 实现数据、纯逻辑并运行 Node 内置测试，确认通过。

## Task 2: 视觉与页面交互

**Files:** `site/dist/index.html`, `site/dist/styles.css`, `site/dist/icons.js`, `site/dist/views.js`, `site/dist/app.js`, `site/server.mjs`, `site/README.md`。

**Interfaces:** views 返回代码原生页面；app 负责 hash、导航、筛选、侧栏、焦点、滚动与 reveal；静态服务提供 dist。

- [x] 实现六栏目长首页及食材/投入品/基地/科普/事件列表与详情、关于介绍。
- [x] 实现滑动选中状态、收起展开、手机抽屉、滚动显现、减少动态效果、返回与重置。
- [x] 接入独立摄影素材，启动服务器并检查 HTTP；在 Codex 打开本地预览。
- [x] 浏览器测试桌面与手机、路由刷新/后退、过滤无结果、资料状态、滚动高亮与关闭抽屉。

## Task 3: 审查、修复与私人发布

**Files:** hosting manifest、站点源文件、审查记录；临时截图与 QA 脚本置于允许的 visualization 目录。

- [x] 对照 A2 三个截图与实际渲染检查排版、配色、侧栏、图片、空间及文案；修复问题。
- [x] 请求独立代码审查，修复重要发现，验证相应路径和完整测试。
- [x] 使用 Sites source helper 推送源代码并打包，通过私人部署工具发布、等待终态。
- [x] 打开已发布 URL，交付站点链接与验证结果，仅有完成证据时结束 goal。

## 执行记录

本目录起始没有 Git 仓库；使用新的 site 子目录作为站点 checkout，由 Sites helper 管理其源仓库。图像任务独立并行；实现由主代理执行，末尾使用独立审查。用户已明确要求构建和审查，不再重复询问批准。


