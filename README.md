# progamesigner.com

[![Netlify Status](https://api.netlify.com/api/v1/badges/30741c51-84bd-4e8d-a85f-8b2bf455bf62/deploy-status)](https://app.netlify.com/sites/progamesigner/deploys)

The website source code for progamesigner.com.

## Cloudflare 部署

使用 Cloudflare **Workers + static assets**，不需要 Worker script。`wrangler.jsonc` 指向 `public/`，不存在的路徑回傳 404（`404-page`）。

Worker 名稱為 `progamesigner-com`：Cloudflare 名稱只允許英數字與連字號，因此將儲存庫名稱中的 `.` 改為 `-`。本網站停用了 Hugo 404 頁面，會使用 Cloudflare 預設的 404 回應。

### 本機建置與驗證

需要 Node.js 24（根目錄 `.node-version`）；另需安裝 Hugo **extended 0.168.0**。

```sh
npm ci
npm run build
npx wrangler deploy --dry-run # 僅驗證，不部署
npm run preview             # Wrangler 本機預覽，不連遠端
```

`npm run build` 等同 `npm run deploy:prod`。原本的開發建置改為 `npm run build:dev`，Hugo 開發伺服器仍用 `npm run deploy:watch`。

`npm run deploy` 會真正發布已建置的資產；只在準備好上線且已取得 Cloudflare 授權時執行。

### Workers Builds 後台設定

在 Workers & Pages 建立名稱為 `progamesigner-com` 的 **Worker** 並連結此 GitHub 儲存庫，根目錄設為儲存庫根目錄。先以 `migrate-to-cloudflare` 分支驗證；合併後將 production branch 設為 `master`。

| 設定 | 值 |
| --- | --- |
| Build command | `npm run deploy:prod` |
| Deploy command | `npm run deploy` |
| Build variable | `NODE_VERSION=24` |
| Build variable | `HUGO_VERSION=0.168.0` |
| Custom domain | `progamesigner.com` |

版本變數請設定在 **Settings > Build > Build Variables and Secrets**。Workers Builds 的 [build image](https://developers.cloudflare.com/workers/ci-cd/builds/build-image/) 支援 `NODE_VERSION`（亦可讀取 `.node-version`）與 `HUGO_VERSION`；`netlify.toml` 的環境變數不會套用到 Workers Builds。這些是建置環境變數，不要放進 Wrangler runtime `vars`。網站不需要 runtime 變數或應用程式 secrets；Workers Builds 的部署 API token 可由後台自動產生，無須提交到 Git。

先在 `workers.dev` 網址確認首頁、語系／文件路徑、404 與靜態資產，再到 **Settings > Domains & Routes** 加入上述 custom domain。確認網域已由 Cloudflare 管理，於準備切換時處理現有 Netlify DNS 記錄衝突並驗證 HTTPS。此變更只準備設定，不會操作 Cloudflare 帳號或 DNS。

`netlify.toml` 是舊部署設定，保留供 DNS 切換前回滾；切換完成並驗證穩定前，請保留 Netlify 站台與原 DNS 記錄資料。

參考：[Workers Builds 設定](https://developers.cloudflare.com/workers/ci-cd/builds/configuration/)、[靜態站與 404](https://developers.cloudflare.com/workers/static-assets/routing/static-site-generation/)、[自訂標頭](https://developers.cloudflare.com/workers/static-assets/headers/)。

## Built With

* [Bulma](http://bulma.io/)
* [cssnano](https://cssnano.co/)
* [Hugo](http://gohugo.io/)
* [Netlify](https://www.netlify.com/)
* [PostCSS](https://postcss.org/)
* [Purgecss](https://www.purgecss.com/)
* [SASS](http://sass-lang.com/)
* [webpack](https://webpack.js.org/)
