# Glossary — Slax i18n 翻译保留词与术语对照

本文件供 `scripts/i18n/translate.ts`（LLM 翻译脚本）和 `scripts/i18n/eval-translation.ts`（校验脚本）共同读取。

## 保留词（任何语言都不翻译，原样保留）

品牌：

- Slax
- Slax Reader
- Slax Note
- Slax Lab

平台与操作系统：

- iOS、macOS、iPadOS、tvOS、watchOS
- Android
- Windows
- Linux

第三方品牌：

- GitHub、Google、Apple、Microsoft、Cloudflare
- Pocket、Readwise Reader、Instapaper、Cubox、Omnivore、Matter、GoodLinks
- AudioPen、Voicenotes、Mem AI、Braintoss

技术词：

- RSS、API、CLI、SDK、URL、HTTP、HTTPS、JSON、Markdown、MDX
- AI、LLM
- OG、SEO

域名 / 邮箱 / 链接：

- slax.com、wlj.me、sgai.md、tealseed.com、zsxq.com
- 邮箱地址、http(s)://... 链接整体不翻译

## 术语对照表（同一英文术语在不同语言要一致）

| English        | zh-Hans  | zh-Hant  | ja            | ko           |
| -------------- | -------- | -------- | ------------- | ------------ |
| read later     | 稍后读   | 稍後讀   | あとで読む    | 나중에 읽기  |
| reader         | 阅读器   | 閱讀器   | リーダー      | 리더         |
| notebook       | 笔记本   | 筆記本   | ノート        | 노트         |
| highlight      | 高亮     | 高亮     | ハイライト    | 하이라이트   |
| annotation     | 标注     | 標註     | 注釈          | 주석         |
| changelog      | 更新日志 | 更新日誌 | 更新履歴      | 업데이트 내역 |
| alternatives   | 对比     | 對比     | 比較          | 비교         |
| blog           | 博客     | 部落格   | ブログ        | 블로그       |
| about          | 关于     | 關於    | About         | 소개         |
| privacy policy | 隐私政策 | 私隱政策 | プライバシーポリシー | 개인정보 처리방침 |
| terms          | 服务条款 | 服務條款 | 利用規約      | 이용약관     |
| download       | 下载     | 下載     | ダウンロード  | 다운로드     |
| sign up        | 注册     | 註冊     | 登録          | 가입         |
| sign in        | 登录     | 登入     | ログイン      | 로그인       |

## 翻译风格指南

- **不**使用首字母放大（drop cap）
- 品牌名混合大小写，**不**全大写：Slax Reader（不是 SLAX READER）
- 苹果平台前缀小写：iOS / macOS / iPadOS（不是 IOS / MacOS）
- 标题不要照搬英文句式，要自然语序
- 中文不用半角逗号"，"和句号"。"（用中文标点）
- 日文 / 韩文 / 繁体不要混入简体字
