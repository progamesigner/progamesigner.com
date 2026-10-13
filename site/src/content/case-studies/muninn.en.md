---
project: muninn
lang: en
summary: "An MCP server that gives AI agents durable memory in a plain-markdown vault, shared by many agents and still editable by a person."
role: Design, build, operate
draft: true
diagram:
  caption: How a memory call travels
  steps:
    - { label: Agents, detail: "Claude Code, Codex and others, each calling with its own scope" }
    - { label: MCP, detail: "HTTP or stdio, every call carries agent and user" }
    - { label: Muninn, detail: "Rust server: path policy, atomic writes, recall index" }
    - { label: Markdown vault, detail: "Plain files, namespaced per scope, open in Obsidian" }
---

## Problem

Coding agents forget everything between sessions. The usual fixes hide memory in a database or a vendor service, where a person cannot read it, correct it or move it.

## Constraints

One server has to serve many agents at once without letting one scope read another's notes. The data has to stay ordinary markdown, so a person can browse and hand-edit the same vault in any editor.

## How it works

Muninn speaks MCP over HTTP or stdio. Every tool call carries its own scope, and the server maps that scope to a namespaced folder in the vault.

Writes are atomic (temp file, fsync, rename), paths cannot escape the vault, and ignore files are honoured. A recall index answers full-text and frontmatter queries, and each scope gets its own index, so another scope's content is unreachable rather than filtered out.

## Decisions

- Files over a database: the vault is the source of truth and the search index is disposable.
- Isolation by structure: separate indexes per scope instead of a shared index with filters.
- Ship as a static binary on a `scratch` image for `amd64` and `arm64`, with per-tenant bearer tokens for shared deployments.

## Outcome

[PLACEHOLDER: outcome and numbers to be provided]
