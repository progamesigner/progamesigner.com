---
project: homelab
lang: zh-tw
summary: "整個 home lab 都能從程式碼重建：Ansible 準備機器，Kustomize 描述叢集與上面的每個服務。"
role: 設計、開發、維運
draft: true
diagram:
  caption: 從 commit 到服務上線
  steps:
    - { label: Git, detail: "Ansible playbooks 與 Kustomize manifests" }
    - { label: 驗證, detail: "變更前先做伺服器端 dry run" }
    - { label: 套用, detail: "kustomize build 接 kubectl apply" }
    - { label: 叢集, detail: "Ceph 儲存、MetalLB、ingress、cert-manager、應用程式" }
---

## 問題

靠手動長大的 home lab，最後會變成沒人能重建的機器。我希望每台主機、每個網路設定和每個服務都寫成程式碼，壞一顆硬碟只損失時間，不損失知識。

## 限制

它跑在家裡的幾台機器上，沒有雲端的代管服務。儲存、負載平衡、憑證和 DNS 都得在叢集裡自己提供。

## 運作方式

Ansible playbooks 準備主機，接著用 Kustomize 把叢集分三層描述：平台元件（Ceph、MetalLB、kube-router、CoreDNS、ingress、cert-manager）、共用服務（PostgreSQL、MariaDB、MongoDB、Redis、Elasticsearch），以及最上層的應用程式。

Makefile 包好流程：`validate` 執行伺服器端 dry run，`deploy` 套用整棵樹。

## 關鍵決策

- 整個叢集一個 repo、一次 `kustomize build`，狀態可以用 diff 審查。
- 平台、資料、應用分層，改應用不會動到儲存或網路。
- Dev container、code-server 映像與除錯工具箱各自獨立成 repo，再由叢集重用。

## 成果

[PLACEHOLDER：待提供成果與數據]
