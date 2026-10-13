---
project: muninn
lang: zh-tw
summary: "讓 AI agent 擁有長期記憶的 MCP server：資料是純 Markdown，多個 agent 共用，人也能直接編輯。"
role: 設計、開發、維運
draft: true
diagram:
  caption: 一次記憶呼叫的路徑
  steps:
    - { label: Agents, detail: "Claude Code、Codex 等，各自帶著自己的 scope 呼叫" }
    - { label: MCP, detail: "HTTP 或 stdio，每次呼叫都帶 agent 與 user" }
    - { label: Muninn, detail: "Rust 伺服器：路徑政策、原子寫入、recall 索引" }
    - { label: Markdown vault, detail: "一般檔案，依 scope 分資料夾，可用 Obsidian 開" }
---

## 問題

Coding agent 每次開新 session 就忘光。常見做法把記憶藏進資料庫或廠商服務，人看不到、改不了，也搬不走。

## 限制

一個伺服器要同時服務多個 agent，而且不同 scope 之間不能互相讀到筆記。資料必須維持一般 Markdown，人能用任何編輯器瀏覽、手動修改同一個 vault。

## 運作方式

Muninn 透過 HTTP 或 stdio 提供 MCP。每次工具呼叫都帶自己的 scope，伺服器依 scope 對應到 vault 裡分好的資料夾。

寫入是原子操作（暫存檔、fsync、rename），路徑不能跳出 vault，也會遵守 ignore 檔。Recall 索引負責全文與 frontmatter 查詢，每個 scope 各有獨立索引，其他 scope 的內容是根本查不到，而不是查到後再過濾。

## 關鍵決策

- 檔案優先於資料庫：vault 是唯一正本，搜尋索引隨時可以重建。
- 用結構隔離：每個 scope 一份索引，不共用索引再加過濾。
- 以 `scratch` 映像發布靜態 binary，支援 `amd64` 與 `arm64`，共用部署時用各租戶獨立的 bearer token。

## 成果

[PLACEHOLDER：待提供成果與數據]
