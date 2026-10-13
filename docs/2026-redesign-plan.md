# progamesigner.com 2026 改版與作品集計畫

> 狀態：規劃定案（2026-10-13）。視覺方向為 Swiss v2，設計稿待使用者審閱；審閱完成即可進入 M1。本文件不改動網站內容或部署設定。
> 盤點日期：2026-10-13。版本號為當日 npm／repo 查證值，動工時再確認。

## 1. 現況盤點

### 技術棧與部署

| 項目 | 現況 |
| --- | --- |
| 產生器 | Hugo 0.167.0（`netlify.toml` 的 `HUGO_VERSION`），沒有使用主題，`layouts/` 自寫 |
| 樣式 | Bulma 0.9 + 自訂 `assets/style.scss`（232 行），經 Hugo Pipes `css.Sass` → PostCSS（PurgeCSS、cssnano），inline 在 `<style amp-custom>` |
| 頁面架構 | 整站是 AMP 頁面：載入 AMP runtime、`amp-analytics`、`amp-user-notification`（cookie 同意） |
| 內容 | 只有首頁，英文 `content/_index.html` 與中文 `content/_index.zh-tw.html`，各 86 行手寫 HTML |
| 區塊 | 自我介紹、技能清單（Languages／Tools）、聯絡按鈕（Email、Blog、GitHub） |
| 停用功能 | `disableKinds` 關掉 404、robots.txt、RSS、sitemap、section、taxonomy |
| 分析 | Google Analytics `UA-109064425-1`（Universal Analytics 已於 2023 年停止處理資料，目前等於沒有分析） |
| 部署 | Netlify，`npm run deploy:prod` → `hugo --environment production --enableGitInfo --minify`，發布 `public/` |
| 維護 | 依賴更新 PR 持續合併；`package.json` 只剩 Bulma、PostCSS 工具與用不到的 ESLint |

相關站台：

- **0x148.com**（部落格）：Hugo，透過 Hugo Modules 引用 `hugo-theme-0x148` v1.3.6，Disqus、`UA-109064425-2`，部署在 Netlify。
- **hugo-theme-0x148**：webpack 建置的 Hugo 主題，支援 AMP、i18n、taxonomy 搜尋。
- **工具子網域**：wificard、boardgames、open-search-maker、send、bragi 都在 `*.0x148.com`，2026-10-13 檢查皆回應 200。
- **GitHub profile README**：已有完整的 `~/shipped`、`~/homelab`、`~/misc` 分類，內容比官網新。

### 既有問題

1. 官網沒有作品區；GitHub profile README 反而是實際的作品集。
2. 技能清單停在多年前（Chef、Jaeger、Mithril），缺少近年的 Rust、MCP、agent、homelab 工作。
3. AMP 已無 SEO 優勢，卻限制 JS、互動與 CSS 寫法。
4. GA UA 已失效，cookie 同意框仍在顯示。
5. JSON-LD 把首頁標成 `Article`，`datePublished` 每次 build 都是當下時間；OG 圖用 512×512 favicon，分享卡片會被裁切。
6. 沒有 sitemap、robots.txt、404 頁。
7. Twitter 連結應改 X；README 仍描述已移除的 webpack 流程。
8. 內容是手寫 HTML，中英兩份要同步維護。

### 與筆記目標的落差

外部筆記「個人網站設計更新」列出目標技術 Astro、React、Framer Motion、Tailwind CSS、Netlify，功能目標與現況對照：

| 目標 | 現況 | 落差 |
| --- | --- | --- |
| GPG 資訊；聯絡資訊獨立成頁 | 只有 mailto 按鈕 | 需要聯絡頁與公鑰／指紋 |
| 贊助資訊或頁面 | 無 | 決定不做 |
| 作品頁（含 VS Code 色彩主題） | 無；SpaceGuy 主題仍在構想階段 | 作品頁全新；主題作品等完成再放 |
| 整合 self-hosted 服務連結（CyberChef、hat.sh、PrivateBin、wifi-card、YOURLS，持續增加） | 無 | 決定不做 |
| 技術：Astro／React／Framer Motion／Tailwind | Hugo／Bulma／AMP | 整站重寫 |

「2026 更新個人網站與作品集」筆記的目標段落尚空白，參考站為 Bonjourr、Web-Browser-Homepage、sindresorhus.com，方向偏向「工具入口＋作品清單」，而不只是履歷頁。

## 2. 技術方向

### A. 沿用 Hugo，翻新版面

去掉 AMP 與 Bulma，改用 Hugo 原生 i18n、`data/projects.yaml` 驅動作品卡片，樣式換成 Tailwind CSS（Hugo 0.128+ 已支援 `css.TailwindCSS`）。

- 優點：工具鏈與 0x148.com 一致；不需要 Node 執行期框架；改動量最小；Netlify 設定幾乎不變。
- 缺點：互動與動畫只能靠原生 JS／CSS，無法直接用 Motion；Go template 寫元件比較笨重；與筆記選定的技術不同。

### B. 改用 Astro（建議）

Astro 7（2026-10-13 npm 為 7.3.8）靜態輸出，Tailwind CSS 4，作品用 content collections（Zod schema），只在需要動畫或互動的區塊用 React island + Motion（原 Framer Motion，現為 `motion` 套件）。部署維持 Netlify 靜態站，不需要 adapter。

- 優點：符合筆記選定的技術；content collection 讓作品資料有型別檢查；內建 i18n 路由可沿用 `/` 與 `/zh-tw/`；預設零 JS，只有 island 載入 React；作品頁、工具頁、聯絡頁都是一般頁面，擴充成本低。
- 缺點：整站重寫；Node 依賴數量變多，Dependabot PR 會比現在頻繁；與部落格分屬兩套工具鏈。

### C. Astro 並合併部落格

在 B 的基礎上，把 0x148.com 文章搬進同一個 Astro 站（`/blog`），0x148.com 轉址或保留為工具子網域根。

- 優點：一個站、一套樣式、一份維護成本；文章可以直接連到作品。
- 缺點：要遷移文章、Disqus 留言、舊網址轉址；hugo-theme-0x148 失去主要用途；範圍大，容易拖住作品集上線。

### 建議

採 **B**。理由：筆記已選定 Astro 系技術；作品集的核心是結構化資料，content collections 正好適合；現站只有一頁，重寫成本低。C 先不做，列為上線後再評估的事項，避免部落格遷移拖慢作品集。

## 3. 作品集規劃

### 選擇原則

- 只放公開或已上線、能點進去看的作品。
- 公司與客戶專案（SWAG、Oursky 等）不放。
- 私有 repo 只在已有公開網址時放入（2026-10-13 決定）。
- 與 GitHub profile README 的分類對齊，避免兩邊說法不一致。

### 精選（Featured，個案頁）

| 專案 | 理由 |
| --- | --- |
| **Muninn** | 目前主力；Rust 寫的 MCP 記憶服務，多租戶 scope 設計，最能代表近期技術方向 |
| **Sleipnir** | 從手機指揮整組 agent，與 Muninn 互相襯托「讓 agent 有記憶、有地方住」的主題 |
| **Bragi** | 已上線產品（bragi.0x148.com）：手機優先、拍照 OCR → 語氣化 TTS、多語系、完整 E2E，最接近一般使用者能直接體驗的作品 |
| **Homelab**（manifests、playbooks、devcontainers、devtools、vscode-server） | 合成一個個案：整套環境可由程式碼重建，展示基礎設施能力 |

### 工具（Shipped，卡片）

| 專案 | 理由 |
| --- | --- |
| Wi-Fi Card | 已上線、實用；SvelteKit + Tailwind |
| Board Game Gallery | 已上線；SolidStart |
| Open Search Maker | 已上線；Next.js |
| Secret Send | 已上線；原始碼私有，卡片只放 Try 連結 |
| Wikipedia MCP | 早期 MCP server，有外部 star |

### 社群與遊戲（卡片）

| 專案 | 理由 |
| --- | --- |
| RFGames（web、backend、manifests） | 長期維運的 Guild Wars 2 公會網站，含前後端與基礎設施 |
| gw2-dps-report | 2018 年起維護，star 最多的 repo；Rust + Discord 自動化 |

### 其他（精簡列表）

phoenix（Firefox 主題）、hugo-theme-0x148、ingress-default-backend、dotfiles。SpaceGuy 色彩主題完成發布後再加入，屆時可升級為卡片並附配色預覽。

### 呈現格式

作品資料放在 content collection，每筆欄位：

```yaml
id: bragi
tier: featured          # featured | shipped | community | misc
name: Bragi
tagline:                # 一句話，中英各一
  en: ...
  zh-tw: ...
status: live            # live | maintained | archived | concept
year: 2026
role: Solo developer
stack: [SolidStart, Gemini, TTS]
links:
  try: https://bragi.0x148.com
  source: https://github.com/progamesigner/bragi
cover: ./bragi/cover.png  # 16:9，1600×900
og: ./bragi/og.png        # 1200×630
```

- **精選個案頁**（每篇 400–800 字）：要解決的問題、限制條件、架構圖、2–3 個關鍵決策、成果（數字或截圖）、下一步。首頁顯示大卡片並連到個案頁。
- **工具／社群卡片**：封面、一句話、技術標籤、Try／Source 按鈕、狀態徽章。
- **其他**：純文字列表，一行一個連結。
- 每個專案有獨立 OG 圖；個案頁中英雙語，卡片 tagline 雙語。

### 需要使用者補的素材

1. ~~個人照片~~：不放照片（2026-10-13 決定），首頁以文字與作品為主。
2. 自我介紹：中英各一段；GitHub profile README 的 `about` 可當底稿。
3. Bragi 登入後的校對與朗讀畫面（需要使用者登入後擷取）。其餘上線工具的桌機／手機、淺色／深色截圖已於 2026-10-13 用 Playwright 擷取。
4. Muninn、Sleipnir、Homelab 個案的成果數據或想強調的重點（例如服務數量、agent 數、重建時間）。
5. ~~GPG~~：已從 GitHub 取得。唯一有效的金鑰為 RSA 4096，指紋 `11BE C92C 7365 6BE7 C4D1  EC61 546B 7387 8102 7B88`，uid 是 progamesigner@gmail.com。網站信箱維持 outlook，金鑰照實標示 gmail uid（見第 4 節）。網站只放這把金鑰，不連到含過期工作金鑰的 `github.com/progamesigner.gpg`。

## 4. 決策

### 已決定（2026-10-13）

| 決策 | 結論 |
| --- | --- |
| 技術方向 | B：Astro |
| 語言 | 中英雙語，網址維持 `/`、`/zh-tw/` |
| 私有專案 | 只放已有公開網址的作品 |
| 照片 | 不放個人照片 |
| 分析 | GA4 標準版（見下） |
| 聯絡信箱與 GPG | 網站信箱維持 progamesigner@outlook.com；公開金鑰維持 gmail uid 那把，網站照實標示。之後是否在金鑰加 outlook uid 由使用者自行處理，不影響上線 |
| 贊助 | 不做 |
| self-hosted 工具 | 不做；外部筆記「個人網站設計更新」已於 2026-10-13 標為完成 |
| 視覺風格 | Swiss Index 深化版（Swiss v2）：柔和配色、深淺色模式（見第 4 節設計稿） |

### 分析方案

| 方案 | 費用 | Cookie／同意框 | 自訂事件 | 備註 |
| --- | --- | --- | --- | --- |
| Umami Cloud Hobby | 免費：1 個網站、每月 100K events、資料保留 6 個月 | 不用 cookie，可拿掉同意框 | 有 | 可追蹤作品卡片的 Try／Source 外連點擊 |
| Cloudflare Web Analytics | 免費 | 不用 cookie | 無 | 不必把 DNS 轉到 Cloudflare，貼 JS beacon 即可；附 Core Web Vitals |
| Plausible | 付費 | 不用 cookie | 有 | 功能完整但個人站不划算 |
| GA4 | 標準版免費（360 才收費）；資料保留最多 14 個月 | 寫入 `_ga` cookie；歐盟等地訪客需同意框，台灣法規未強制 | 有 | 可串 Search Console；script 較重，較常被擋 |

採用 **GA4 標準版**（2026-10-13 使用者決定）。實作方式：

- 使用者在 GA 建立新的 GA4 property，取得 `G-` 開頭的 Measurement ID（公開值，可放進設定檔）；舊的 `UA-109064425-1` 一併移除。
- 開啟 Enhanced Measurement，外連點擊（作品的 Try／Source）會自動記錄，不必自訂事件。
- 用 `@astrojs/partytown` 把 gtag 移到 Web Worker，避免拖慢主執行緒；只在 production build 載入。
- 同意框：台灣法規未強制，預設不放；頁尾註明使用 GA。若日後要支援歐盟訪客，再加 Consent Mode v2。

### 待決

| 項目 | 狀態 |
| --- | --- |
| Swiss v2 設計稿 | 使用者尚未審閱；可直接在畫布留言或指出要改的地方 |

### 設計稿

第一輪五種風格放在同一張 Artifact 畫布（私人連結，見內部筆記），內容皆為實際作品資料：

1. **Terminal**：延續 GitHub profile README 的 `$ whoami` 風格，深色、等寬字。
2. **Swiss Index**：白底黑字、超大標題、編號作品索引表，接近 sindresorhus.com。
3. **Bento**：大小不一的圓角卡片拼貼，精選作品附截圖位。
4. **Split Column**：左欄姓名與導覽、右欄捲動內容，接近 Brittany Chiang 的配置。
5. **Start Page**：起始頁／啟動器，搜尋框可即時篩選工具圖示，接近 Bonjourr。

選定 Swiss Index 後的第二輪（Swiss v2），同一張畫布第二列：首頁淺色、首頁深色、Bragi 個案頁、手機版（中文、深色）。

#### Swiss v2 設計規格

色彩：

| Token | 淺色 | 深色 |
| --- | --- | --- |
| `bg` | `#F3F1EC` 暖紙白 | `#161615` |
| `surface` | `#FBFAF7` | `#1F1E1C` |
| `ink` | `#22211F` | `#ECE8E1` |
| `muted` | `#5F5B54` | `#A39E95` |
| `rule` | `#D9D5CC` | `#34322F` |
| `accent` | `#D4563A` 柔和朱紅（只用在大字與標記） | `#F08A6E` |
| `live` | `#3F8F5A` | `#6CCB8A` |

accent 備選：鼠尾草綠 `#5E7F6B`、灰藍 `#4F6D8F`、赭黃 `#B8862E`，各有對應的深色版本。

字型：Archivo（可變字型，寬度 62–125、粗細 300–900）做標題與內文；Noto Sans TC 處理中文；IBM Plex Mono 做編號與後設資訊。

#### 現代技術與互動

| 項目 | 做法 |
| --- | --- |
| 深淺色 | CSS `color-scheme` + `light-dark()`，預設跟隨系統，切換鈕寫入 `localStorage`；token 以 OKLCH 定義 |
| 頁面轉場 | Astro `<ClientRouter />`（View Transitions API）：索引列的專案名稱轉場成個案頁大標 |
| 可變字型 | 索引列 hover／focus 時 `font-stretch` 由 80% 展開到 112% |
| 索引預覽 | 桌機版 hover 或鍵盤 focus 某列時，右側預覽切換成該作品截圖；沒有 UI 的作品顯示字體卡 |
| 捲動動畫 | CSS scroll-driven animations 做區塊淡入與技術跑馬燈；`prefers-reduced-motion` 時全部關閉 |
| 指令選單 | ⌘K 開啟，搜尋作品、頁面與語言切換；React island + Motion，靜態資料由 build 產生 |
| 版面 | Container queries 讓索引列在窄欄自動換行；全站零 JS 也能閱讀 |
| 狀態 | 「近況」與「上線中」標記由作品資料的 `status` 欄位產生 |

## 5. Milestone 與任務

### M0 決策與素材

- [x] 技術方向、語言、私有專案、照片、分析方案。
- [x] 選定視覺風格：Swiss v2；已產出淺色、深色、個案頁與中文手機版設計稿。
- [x] 贊助與 self-hosted 工具：都不做。
- [x] 上線工具截圖、GPG 指紋。
- [x] 分析方案（GA4）、聯絡信箱與 GPG。
- [ ] 使用者審閱 Swiss v2 設計稿。
- [ ] 使用者建立 GA4 property，提供 Measurement ID。
- [ ] 收齊第 3 節的素材，缺的標記為「上線後補」。

完成條件：設計稿確認、取得 GA4 Measurement ID；精選 4 個專案的素材齊全或有替代方案。

### M1 新站骨架（新 branch，不動正式站）

新站放在 `site/` 子目錄（Astro 7、Tailwind CSS 4、TypeScript strict、Biome 2）。根目錄的 Hugo 專案與 `netlify.toml` 維持原狀，正式站不受影響；上線時（M5）再把 `site/` 移到根目錄或改 Netlify base。

- [x] 建立 Astro 專案，Tailwind CSS 4，TypeScript strict，Biome。
- [x] i18n 路由 `/`、`/zh-tw/`，與現網址一致；語言切換保留目前路徑。
- [x] 移植 favicon；OG 圖改 1200×630（`site/public/og.png`，Swiss v2 樣式）。
- [x] 首頁、作品索引（hover／focus 換預覽）、聯絡區、個案頁（Bragi 為正式內容，其餘三篇為 `draft: true` 的預留稿）、404、robots.txt、sitemap（排除草稿）。
- [x] 深淺色（`light-dark()` + OKLCH token、跟隨系統、可手動切換）、View Transitions、可變字型 hover、scroll-driven 淡入，皆遵守 `prefers-reduced-motion`。
- [x] GA4：只在 production 且設定 `PUBLIC_GA_ID` 時經 Partytown 載入；換頁時手動送 `page_view`。
- [x] 公鑰 `site/public/pgp.asc` 只含有效金鑰。
- [x] GitHub Actions（`.github/workflows/site.yml`）：`astro check`、Biome、build、上傳 `dist`。
- [ ] 連結檢查、Lighthouse CI。
- [ ] Netlify deploy preview：需使用者決定是否為此 branch 開啟（見下）。

2026-10-13 本機驗證：`astro check` 0 錯誤、Biome 通過、11 頁 build 成功；Playwright 確認 hover 預覽切換、深淺色切換、client router 換頁正常，無 console 錯誤。

完成條件：deploy preview 可開，CI 綠燈。

### M2 首頁、關於與聯絡

- [ ] 首頁：自我介紹、近況（Now）、精選作品、聯絡入口。
- [ ] 技能改為依作品歸納，不再列長清單。
- [ ] 聯絡頁：Email、GPG 指紋（標示 uid 為 gmail）與公鑰下載（只匯出有效金鑰）、GitHub、X、LinkedIn、部落格。
- [ ] JSON-LD 改 `Person` + `WebSite`；加 sitemap、robots.txt、404。

完成條件：中英兩版內容一致；Lighthouse 四項 ≥ 95。

### M3 作品集

- [ ] content collection schema 與上方欄位一致，缺欄位 build 失敗。
- [ ] 作品總覽頁：依 tier 分區，可用技術標籤篩選。
- [ ] 4 篇精選個案頁與架構圖。
- [ ] 工具、社群卡片與其他列表。
- [ ] 自動擷取工具站截圖；Bragi 用使用者提供的素材。
- [ ] 每個專案產生 OG 圖。

完成條件：所有卡片連結有效；個案頁中英各 4 篇。

### M4 互動與動畫

- [ ] 深淺色切換與 `light-dark()` token。
- [ ] View Transitions：索引列到個案頁的標題轉場。
- [ ] 索引預覽、可變字型 hover、scroll-driven 動畫。
- [ ] ⌘K 指令選單（React island + Motion）。
- [ ] 全部遵守 `prefers-reduced-motion`。

完成條件：無 JS 時頁面仍可閱讀；Lighthouse 四項維持 ≥ 95。

### M5 上線

- [ ] 以 Partytown 接上 GA4（Enhanced Measurement 記錄外連點擊），移除 AMP、GA UA 與舊的 cookie 同意框。
- [ ] 比對舊站網址，必要時在 `netlify.toml` 加 redirect。
- [ ] 更新 README。
- [ ] 使用者確認 deploy preview 後，由使用者合併並切換 production。

完成條件：正式站切換完成，舊網址不 404。

### M6 上線後

- [ ] 評估方向 C：部落格是否併入。
- [ ] SpaceGuy 色彩主題完成後加入作品集。
- [ ] GitHub profile README 與官網作品資料同步（可考慮由同一份資料產生）。
