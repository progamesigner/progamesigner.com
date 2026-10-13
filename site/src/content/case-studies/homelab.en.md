---
project: homelab
lang: en
summary: "My entire home lab, rebuildable from code: Ansible prepares the machines, Kustomize describes the cluster and every service on it."
role: Design, build, operate
draft: true
diagram:
  caption: From commit to running service
  steps:
    - { label: Git, detail: "Ansible playbooks and Kustomize manifests" }
    - { label: Validate, detail: "Server-side dry run before anything changes" }
    - { label: Apply, detail: "kustomize build piped into kubectl apply" }
    - { label: Cluster, detail: "Ceph storage, MetalLB, ingress, cert-manager, apps" }
---

## Problem

A home lab that grows by hand turns into a machine nobody can rebuild. I wanted every host, network setting and service written down, so losing a disk costs time, not knowledge.

## Constraints

It runs on a few machines at home, without a cloud provider's managed services. Storage, load balancing, certificates and DNS all have to be provided inside the cluster.

## How it works

Ansible playbooks prepare the hosts. A Kustomize tree then describes the cluster in three layers: platform pieces such as Ceph, MetalLB, kube-router, CoreDNS, ingress and cert-manager; shared services such as PostgreSQL, MariaDB, MongoDB, Redis and Elasticsearch; and the applications on top.

A Makefile wraps the workflow: `validate` runs a server-side dry run, and `deploy` applies the whole tree.

## Decisions

- One repository and one `kustomize build` for the whole cluster, so its state can be reviewed as a diff.
- Platform, data and applications kept in separate layers, so an app change never touches storage or networking.
- Dev containers, a code-server image and a debug toolbox live in their own repositories and are reused by the cluster.

## Outcome

[PLACEHOLDER: outcome and numbers to be provided]
