---
project: sleipnir
lang: zh-tw
summary: "一個容器映像裝下整組 coding agent：在 Kubernetes 裡受監管，用手機指揮。"
role: 設計、開發、維運
draft: true
diagram:
  caption: 從手機到 agent 的 pane
  steps:
    - { label: 手機, detail: "Moshi 與各 agent 自己的 app" }
    - { label: Tailscale, detail: "連進叢集的私有網路" }
    - { label: Sleipnir pod, detail: "s6 監管 Herdr、agent CLI 與排程器" }
    - { label: 工作區, detail: "持久化 volume 加上 rootless Docker sidecar" }
---

## 問題

同時跑好幾個 coding agent，就得在會休眠的筆電上顧一堆終端機、憑證和長時間 session。我希望 agent 在伺服器上持續工作，同時能用手機隨時找到它們。

## 限制

所有東西要放進一個映像，讓 Kubernetes 隨時能重啟。Agent 需要真正的工具（包含 Docker），但容器本身不能跑特權 daemon；放在共用 volume 上的金鑰也必須維持嚴格權限。

## 運作方式

s6-overlay 以非特權使用者監管每個服務。Herdr 管理終端機 pane，Moshi 回報到手機，Tailscale 負責連線，agent CLI 則用和 dev container 相同的安裝器裝進映像。

Docker build 透過 Unix socket 交給每個 pod 專屬的 rootless sidecar；Supercronic 排程器執行使用者寫的 crontab，可以透過 ConfigMap 更新。

## 關鍵決策

- 用 s6 取代 systemd：一棵監管樹，各服務的重啟與 log 策略就寫在服務旁邊。
- 用 rootless Docker sidecar 取代映像內的 daemon，可拋棄的映像資料不放在網路檔案系統上。
- 每次啟動都重新收緊 `~/.gnupg` 與 `~/.ssh` 權限，因為網路 volume 掛進來時群組可寫。

## 成果

[PLACEHOLDER：待提供成果與數據]
