---
project: sleipnir
lang: en
summary: "One container image that hosts a whole fleet of coding agents, supervised in Kubernetes and steered from a phone."
role: Design, build, operate
draft: true
diagram:
  caption: From phone to agent pane
  steps:
    - { label: Phone, detail: "Moshi and the agents' own apps" }
    - { label: Tailscale, detail: "Private network into the cluster" }
    - { label: Sleipnir pod, detail: "s6 supervises Herdr, agent CLIs and a scheduler" }
    - { label: Workspace, detail: "Persistent volumes plus a rootless Docker sidecar" }
---

## Problem

Running several coding agents at once means juggling terminals, credentials and long sessions on a laptop that sleeps. I wanted the agents to keep working on a server and still be reachable from my phone.

## Constraints

Everything had to fit in one image that Kubernetes can restart at any time. Agents need real tools, including Docker, without the container running a privileged daemon itself, and secrets on shared volumes must keep strict permissions.

## How it works

s6-overlay supervises every service as an unprivileged user. Herdr manages the terminal panes, Moshi reports to the phone, Tailscale carries the traffic, and the agent CLIs are installed from the same feature installers as my dev containers.

Docker builds go to a per-pod rootless sidecar over a Unix socket, and a Supercronic scheduler runs a user-authored crontab that can be updated through a ConfigMap.

## Decisions

- s6 instead of systemd: one supervision tree, with each service's restart and logging policy written next to it.
- A rootless Docker sidecar instead of a daemon in the image, with disposable graph storage kept off the network filesystem.
- Re-tighten `~/.gnupg` and `~/.ssh` on every start, because network volumes arrive group-writable.

## Outcome

[PLACEHOLDER: outcome and numbers to be provided]
