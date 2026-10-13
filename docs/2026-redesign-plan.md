# progamesigner.com 2026 改版與作品集計畫

> 狀態：方向已定（2026-10-13），進行視覺風格選擇，尚未動工。本文件不改動網站內容或部署設定。
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
| 贊助資訊或頁面 | 無 | 需決定平台與呈現方式 |
| 作品頁（含 VS Code 色彩主題） | 無；SpaceGuy 主題仍在構想階段 | 作品頁全新；主題作品等完成再放 |
| 整合 self-hosted 服務連結（CyberChef、hat.sh、PrivateBin、wifi-card、YOURLS，持續增加） | 無 | 需要「工具」頁與資料來源 |
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
3. Bragi 手機實機錄影或截圖（拍照、校對、朗讀三個畫面）。網頁工具的截圖可由 agent 用 Playwright 自動擷取。
4. Muninn、Sleipnir、Homelab 個案的成果數據或想強調的重點（例如服務數量、agent 數、重建時間）。
5. GPG 公鑰指紋與公鑰檔（只放公鑰）。
6. 贊助管道的公開付款連結（不放帳號號碼）。
7. 若決定自架 self-hosted 工具，提供子網域規劃。

## 4. 決策

### 已決定（2026-10-13）

| 決策 | 結論 |
| --- | --- |
| 技術方向 | B：Astro |
| 語言 | 中英雙語，網址維持 `/`、`/zh-tw/` |
| 私有專案 | 只放已有公開網址的作品 |
| 照片 | 不放個人照片 |
| 分析 | 採用代管服務，不自建（見下） |

### 分析方案

| 方案 | 費用 | Cookie／同意框 | 自訂事件 | 備註 |
| --- | --- | --- | --- | --- |
| Umami Cloud Hobby | 免費：1 個網站、每月 100K events、資料保留 6 個月 | 不用 cookie，可拿掉同意框 | 有 | 可追蹤作品卡片的 Try／Source 外連點擊 |
| Cloudflare Web Analytics | 免費 | 不用 cookie | 無 | 不必把 DNS 轉到 Cloudflare，貼 JS beacon 即可；附 Core Web Vitals |
| Plausible | 付費 | 不用 cookie | 有 | 功能完整但個人站不划算 |
| GA4 | 免費 | 需要同意框 | 有 | 與移除同意框的目標衝突 |

採用 **Umami Cloud Hobby**：作品集最想知道的是哪些專案被點開，需要外連事件；流量遠低於 100K events。6 個月保留期對個人站足夠；若不夠，可改 Cloudflare Web Analytics 或升級。

### 待決

| 決策 | 選項 | 建議 |
| --- | --- | --- |
| 視覺風格 | Terminal／Swiss Index／Bento／Split Column／Start Page（設計稿見下） | 使用者選定後再細化 |
| 贊助 | 不做／GitHub Sponsors 等國際平台／台灣支付 | 先放一種國際平台，台灣支付等「贊助付款連結」筆記定案 |
| self-hosted 工具 | 見下 | 待使用者決定是否自架 |

### Self-hosted 工具說明

筆記列的五個都是開源專案，目前都**沒有**部署：

| 工具 | 用途 | 部署需求 |
| --- | --- | --- |
| CyberChef（GCHQ） | 瀏覽器內的資料轉換工具：Base64、hex、編碼、雜湊、加解密、壓縮等，可串成流程 | 純靜態網頁，資料不離開瀏覽器 |
| hat.sh | 瀏覽器內的檔案加解密（libsodium），可用密碼或公鑰 | 純靜態網頁 |
| PrivateBin | 零知識加密 pastebin：伺服器只存密文，可設定閱後即焚與期限 | PHP 伺服器與儲存空間；與自製的 Secret Send 用途重疊 |
| wifi-card（bndw） | 列印 Wi-Fi QR 卡 | 已有自製的 Wi-Fi Card（wificard.0x148.com），不需要再架 |
| YOURLS | 自架短網址服務，有點擊統計 | PHP + MySQL |

### 設計稿

五種風格放在同一張 Artifact 畫布（私人連結，見內部筆記），內容皆為實際作品資料：

1. **Terminal**：延續 GitHub profile README 的 `$ whoami` 風格，深色、等寬字。
2. **Swiss Index**：白底黑字、超大標題、編號作品索引表，接近 sindresorhus.com。
3. **Bento**：大小不一的圓角卡片拼貼，精選作品附截圖位。
4. **Split Column**：左欄姓名與導覽、右欄捲動內容，接近 Brittany Chiang 的配置。
5. **Start Page**：起始頁／啟動器，搜尋框可即時篩選工具圖示，接近 Bonjourr。

## 5. Milestone 與任務

### M0 決策與素材

- [x] 技術方向、語言、私有專案、照片、分析方案。
- [ ] 選定視覺風格（或混搭），確認後產出中文版與手機版設計稿。
- [ ] 決定贊助與 self-hosted 工具。
- [ ] 收齊第 3 節的素材，缺的標記為「上線後補」。

完成條件：視覺風格、贊助、self-hosted 工具有結論；精選 4 個專案的素材齊全或有替代方案。

### M1 新站骨架（新 branch，不動正式站）

- [ ] 建立 Astro 專案，Tailwind CSS 4，TypeScript strict，Biome。
- [ ] i18n 路由 `/`、`/zh-tw/`，與現網址一致。
- [ ] 移植 favicon、`static/` 圖檔；OG 圖改 1200×630。
- [ ] GitHub Actions：build、型別檢查、連結檢查、Lighthouse CI。
- [ ] 只用 Netlify deploy preview 驗證，不改 production 設定。

完成條件：deploy preview 可開，CI 綠燈。

### M2 首頁、關於與聯絡

- [ ] 首頁：自我介紹、近況（Now）、精選作品、聯絡入口。
- [ ] 技能改為依作品歸納，不再列長清單。
- [ ] 聯絡頁：Email、GPG 指紋與公鑰下載、GitHub、X、LinkedIn、部落格。
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

### M4 工具入口與贊助

- [ ] 工具頁：self-hosted 服務與自製工具，資料檔驅動，標示狀態。
- [ ] 贊助頁或聯絡頁中的贊助區塊。
- [ ] 動畫：只在首頁精選區與作品卡片使用 Motion，遵守 `prefers-reduced-motion`。

完成條件：工具與贊助連結全部可用；無 JS 時頁面仍可閱讀。

### M5 上線

- [ ] 接上 Umami Cloud（含外連點擊事件），移除 AMP、GA UA 與 cookie 同意框。
- [ ] 比對舊站網址，必要時在 `netlify.toml` 加 redirect。
- [ ] 更新 README。
- [ ] 使用者確認 deploy preview 後，由使用者合併並切換 production。

完成條件：正式站切換完成，舊網址不 404。

### M6 上線後

- [ ] 評估方向 C：部落格是否併入。
- [ ] SpaceGuy 色彩主題完成後加入作品集。
- [ ] GitHub profile README 與官網作品資料同步（可考慮由同一份資料產生）。
