# 菌养食材横向导航新站 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 构建并部署独立的横向导航新版，保留原站，并同步新目录到已有 GitHub 仓库。

**Architecture:** 新 `site-horizontal/` 静态项目，复用已验证的内容数据与独立摄影。生成真实路径的 HTML 页面；共用顶部导航、栏目横幅、面包屑、横向分栏与页脚，客户端只负责筛选、基地标签页及导航开合。

**Tech Stack:** HTML、CSS、ES modules、Node 内置测试/静态服务、bundled Playwright、Sites。

**Spec:** ../specs/2026-10-04-junyang-horizontal-design.md

## Global Constraints

- 原站目录 `site/`、project_id `appgprj_6ac243afa5608191b543f1447518a838` 及发布版本 2 不修改。
- 新目录 `site-horizontal/` 使用独立 Sites 身份及 Git 元数据；新站默认私人发布。
- 真白 #FFFFFF、森林绿 #234D37、微软雅黑；1200px 主内容区，手机 24px 边距。
- 六主栏目及三份 Word 内容范围保留；肥料、饲料分设独立列表页面。
- 示意条目、待补充价格/资料明确；没有虚构认证、检测合格结论或企业信息。
- 原生可点击 UI，不把设计图用作网页；正常页面支持直接访问、刷新、前进后退。

## Review Focus

- 深层路径的资源、关联链接与刷新不能回到首页或丢失资料。
- 直接访问带查询参数的列表时正确预选筛选，重置应清空原始 URL 条件。
- 失效地址、未知 ID、畸形编码、无脚本状态有可恢复的可读内容。
- 顶部导航在窄桌面/手机无溢出，触屏和键盘都能打开并关闭二级菜单。
- 页面内动态标签页及后退恢复时，URL、选中状态和可见内容一致。

## Task 1: 独立路径与页面契约

**Files:** `site-horizontal/package.json`, `dist/data.js`, `dist/icons.js`, `dist/routes.js`, `tests/routes.test.mjs`, `.openai/hosting.json`。

**Interfaces:** `routeUrl(hash)` 将旧内容内链转换成真实路径；`readRoute(pathname, search)` 返回 `{page,id,section,query}`；`filterFoods(items, query)` 提供真实过滤；`pagePaths` 列出需要生成的基础及详情 HTML 地址。

- [ ] 写分类查询、独立肥料/饲料地址、产品/基地/文章链接、畸形地址、未知页面和组合筛选测试；先观察失败。
- [ ] 实现路由契约，沿用已验证的数据及图标，执行 `node --test --test-isolation=none tests/routes.test.mjs`，预期全部通过。
- [ ] 注册一次新 Sites 并立即写入新 manifest；旧身份不复制；记录源目录隔离。

## Task 2: 顶部导航、首页与独立内页

**Files:** `site-horizontal/dist/components.js`, `dist/content.js`, `dist/styles.css`, `dist/app.js`, `scripts/build.mjs`, `server.mjs`, `tests/pages.test.mjs`, `README.md`。

**Interfaces:** `renderDocument(route)` 生成完整且无脚本也能阅读的 HTML；`renderContent(route)` 返回页面正文；公共组件负责导航、横幅与页脚；生成脚本按 `pagePaths` 输出 HTML。原生页面内链接经 `routeUrl` 转换，资源地址从站点根目录解析。

- [ ] 写页面契约测试：六主栏目、真实内链、默认筛选内容、未知地址、无旧 project_id、无左侧导航、无缺失资源；观察失败。
- [ ] 完成 H1/H2 及协调下半页：首页七区、食材列表与详情、肥料/饲料列表及产品详情、基地列表和资料、科普列表和文章、安全事件、介绍及 404。
- [ ] 实现菜单、搜索、筛选/重置、基地标签键盘与历史恢复、锚点跳转、减少动态效果；保留静态数据阅读降级。
- [ ] 执行 `node scripts/build.mjs` 与 `node --test --test-isolation=none tests/*.test.mjs`，预期构建成功、全部通过。

## Task 3: 浏览器、视觉审查与交付

**Files:** 站点代码、设计参考、审查记录；临时 QA 放 Codex visualization 目录。

- [ ] 启动新站 `http://127.0.0.1:4174`；尝试 Browser/IAB，失效时说明并使用已有 Playwright；测试首页、六栏目、筛选、深链/刷新/返回、菜单/键盘、错误地址、无脚本、减少动态效果。
- [ ] 核对 1470px、1024px、390px；用 view_image 比较协调概念与实际截图，记至少五点对照和有意偏差，修复可修的问题。
- [ ] 依 requesting-code-review 发起独立整站审查；修复重要问题并复现相应失败到通过。
- [ ] 新站源码通过 Sites helper 保存/推送/打包；保存并部署该提交的版本，等到 succeeded。
- [ ] 同步新目录、方案与审查记录到 GitHub `YangXYfc/junyang-food-website`；核对远端提交。
- [ ] 验证旧站仍为版本 2 与原地址；交付新旧两个链接并停止自有预览服务。

## 执行授权与方法

用户已确认效果图与规格，并在“按此方案直接构建、审查并部署新站，后续无需逐步确认”的提问后回复“可以”。按该授权连续推进，原生实现加一次新上下文独立审查；不再插入设计、计划或部署确认。独立素材设计任务仅补齐已批准设计系统。
