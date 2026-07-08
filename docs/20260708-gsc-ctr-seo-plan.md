# 2026-07-08 GSC 数据分析与 CTR 修复

> 依据:Google Search Console 导出(Web 搜索,2026-04-06 ~ 2026-07-05,domain property 含 note.slax.com / r.slax.com 子域)。
> 本文档是这一轮 SEO 迭代的基线,下次迭代(建议 2026-08 中旬)对照本文「预期效果」一节复盘。

## 一、数据结论

三个月合计:1,145 点击 / 45,685 曝光 / 平均 CTR 2.51%。

| 页面 | 点击 | 曝光 | CTR | 平均排名 |
|---|---|---|---|---|
| note.slax.com | 698 | 10,123 | 6.9% | 4.6 |
| **slax.com/**(本站首页) | 136 | 16,955 | **0.8%** | 6.4 |
| r.slax.com | 104 | 5,771 | 1.8% | 6.9 |
| slax.com/note/ | 43 | 1,698 | 2.5% | 6.5 |
| blog/read-later-comparison-matrix-2026 | 4 | 1,989 | 0.2% | 9.7 |
| /about/ | 0 | 1,070 | 0% | 10.3 |

核心问题(按严重度):

1. **首页 CTR 0.8%,浪费全站最大曝光池**。"slax" 单词 18,469 曝光、CTR 0.4%。原标题 `Slax — Open-Source Slax Reader + Slax Note. Made to last.` 品牌词出现 3 次、无品类关键词。
2. **品牌撞车**:已记录点击的 63%(438/697)来自 voice/audio/tts/watermark 类查询。拆分:voice/audio(313 点击,部分是 Slax Note 真用户,"slax voice" 单词 162 点击、排名 3.9)+ tts/生成器/水印(125 点击,完全找错——那是另一个同名配音 App,证据:"slax watermark" 690 曝光,语音笔记不可能带水印诉求;高 CTR 国家为俄/哈/埃及/印尼/伊拉克等配音工具典型市场)。
3. **非品牌品类词只占 5.9% 曝光**(11 点击)。alternatives 对比页意图极高(reader 桶 CTR 12.4%)但排名卡在 7-13。
4. **域名信号打架**:声明 canonical 为 www.slax.com,但 Google 实际收录 apex(曝光 26:1),robots.txt 的 sitemap 又指 apex,repo 无 www→apex 301。
5. **趋势下滑**:5 月 683 点击 → 6 月 399 → 7 月(8 天)53;排名 5.8 → 8.2。5 月初峰值(发布带来)后没有内容接住。
6. 杂项:alternatives 模板追加 " — Slax" 致标题冗余超长;About 渲染 `About Slax — Slax`;changelog meta description 是自动拼的坏句 `Slax Reader — 12 version.`;桌面端排名(8.1)明显差于移动端(5.6)。

## 二、决策(Luca 拍板)

1. 首页标题**品类关键词优先**,read-later 之外同时打 **bookmark** 关键词。
2. 新建 **voice 拦截页**,先英文版:接住 "slax voice" 真用户,一句话劝退找 TTS/配音的错流量。
3. 域名**统一到 apex slax.com**(顺着 Google 已有偏好,风险最低)。

## 三、本次改动(分支 seo/gsc-ctr-fixes)

### 1. meta 重写(33 文件)

- 首页 ×11 locale:EN 新标题 `Slax — Open-Source Read-It-Later, Bookmarks & AI Voice Notes`
- /reader/ ×11:`Slax Reader — Open-Source Read-It-Later & Bookmark Manager`
- /note/ ×11:`Slax Note — AI Voice Notes: Speech to Text, Shaped by Prompts`(保留 "You talk, I write" 品牌句于 description)
- 各 locale 按语义翻译,沿用既有措辞(稍后读/书签、あとで読む/ブックマーク等)

### 2. 模板修复

- `AlternativePage.astro`:去掉 " — Slax" 后缀(frontmatter 已含品牌词)
- `AboutPage.astro` + 11 个 i18n 字典:`About Slax — the team behind Slax Reader & Slax Note`
- `ChangelogPage.astro` + 11 个字典:新增 `meta.readerChangelogDescription` / `noteChangelogDescription` 真文案,废除自动拼接
- Blog 的 " — Slax" 后缀保留(博客标题不含品牌词,后缀有价值)

### 3. voice 拦截页

- 新页 `/note/voice-notes/`(仅英文,`availableLocales=['en']`,Nav 同步传参)
- 标题 `Slax Voice — AI Voice Notes, Speech to Text (Slax Note)`;首屏第二句即消歧(speech-to-text,非 voice generator/TTS/水印)
- "Which Slax were you looking for?" 两栏对照;How it works;事实条(95%+ 准确率/4 语言/30 分钟/本地存储);FAQ(挂 FAQPage JSON-LD,repo 首个);WebPage schema 用 `about` 挂靠 /note/ 的 SoftwareApplication 实体,不重复 offers
- OG endpoint `/og/note-voice-notes.png`;`scripts/lastmod.mjs` 加 voice-notes 分支
- 内链:/note/ hero 一行 + FAQ 新条目 "Is Slax a voice generator?";note-alternatives 英文 voicenotes/audiopen 各一处行内链

### 4. 域名统一 apex

- `astro.config.mjs` site、`src/lib/hreflang.ts` SITE、`scripts/i18n/eval-hreflang.ts`、6 个占位组件展示文本 → `https://slax.com`
- ⚠️ **www→apex 301 需 Cloudflare 控制台手动配置**(Pages `_redirects` 不支持跨主机源匹配):Single Redirect rule,`hostname eq "www.slax.com"` → `concat("https://slax.com", http.request.uri.path)`,301,保留 query string。www 的 DNS 记录保留且保持代理(橙云)。

### 验证记录(2026-07-08)

441 页构建通过;check:i18n / check:hreflang / check:locale-links / check:urls 全部 0 error;dist 中 www.slax.com 残余为 0;sitemap 430 条全 apex,voice-notes 含 lastmod、无伪造 alternate;voice 页 hreflang 仅 en + x-default,语言切换器仅 English;OG 1200×630 PNG 正常。存量问题(非本次引入):`src/lib/content.ts` 一个 biome unused-import error、fr/reader 页 3 个 CSS em 选择器警告、部分 mdx 标题/描述超长建议。

## 四、预期效果(下次复盘对照)

- 首页 CTR 0.8% → 2%+(约合每季度多 200+ 点击)
- "slax voice" 排名 3.9 → 冲第 1;真用户 CTR 上升、错意图流量在 SERP 就被 description 劝退
- www/apex 信号 2-6 周内归并到 apex(GSC www 属性 "Page with redirect" 上升是健康信号)
- alternatives 标题不再被截断
- **别在 2 周内下结论**,Google 重抓需要时间;2026-08 中旬重新导出 GSC 对比

## 五、后续待办(本次明确不做)

1. **Pocket 关停窗口内容**:系统写 "pocket alternative" / "best read it later app 2026" / "readwise reader alternative" 等非品牌词内容(数据里 "pocket 代替" 已冒头)
2. alternatives 页从"存在"做到"前 3":真实对比表 + 截图 + 更新日期 + 外链
3. voice 拦截页出 locale 版(俄语值得优先——俄区 CTR 11.8%)
4. reader/note 的 9 个 locale 页仍共用英文 OG 图(仅 vi 有本地化版)
5. 桌面端排名(8.1 vs 移动 5.6)差距原因排查
6. 部署后:GSC apex 属性重新提交 sitemap,URL 检查 2-3 条 www 链接确认 301 被识别
