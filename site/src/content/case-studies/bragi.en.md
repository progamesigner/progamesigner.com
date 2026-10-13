---
project: bragi
lang: en
summary: "A phone-first narrator for board games. Photograph a script, fix the text, and it reads each passage aloud, then waits for the host."
role: Design, build, operate
facts:
  - { value: "7", label: interface languages }
  - { value: "30", label: narration voices }
  - { value: "342", label: end-to-end tests }
  - { value: "0", label: images or audio stored on the server }
---

## Problem

Story-driven board games ask one player to read long passages aloud while also running the table. The host loses the flow, and everyone else waits.

## Constraints

One person, one phone, at the table. No accounts, no setup, no full game-master platform.

The server keeps no images or audio, and logs never contain content or secrets.

## How it works

Take a photo of a script or card. Gemini turns it into an editable draft, so mistakes are fixed before anyone hears them.

Bragi splits the text into passages and reads each one in a fitting tone. After every passage it stops and waits for the host to continue.

## Decisions

- Pause after every passage: the host stays in control of pacing, which matters more than hands-free playback.
- One voice for the whole story, chosen from 30, so characters do not drift between passages.
- Voice previews are generated ahead of time in every supported language, trading a little storage for instant feedback.

## Outcome

Released as v1.1.0 in October 2026 and verified on iOS Safari and Android Chrome.
