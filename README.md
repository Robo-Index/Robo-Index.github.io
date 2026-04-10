# RoboIndex

> Structured robotics research paper data — open-source, bilingual, continuously updated.

[![Version](https://img.shields.io/badge/version-v0.0.2-orange)](https://github.com/Robo-Index/Robo-Index.github.io)
[![Papers](https://img.shields.io/badge/papers-627-blue)](https://robo-index.github.io/papers)
[![License](https://img.shields.io/badge/license-MIT-green)](LICENSE)

**Live site:** https://robo-index.github.io/

---

## What is RoboIndex?

RoboIndex is a structured database of robotics research papers, focused on IEEE RA-L. Every paper is tagged, linked to its open-source code (where available), and searchable. The goal: make robotics research more discoverable and reproducible.

## Features

| Page | Description |
|------|-------------|
| [Papers](https://robo-index.github.io/papers) | Browse & filter 627 RA-L papers by year, tag, keyword |
| [Guides](https://robo-index.github.io/guides) | Full IEEE RA-L submission guide (Ce Hao) |
| [Dashboard](https://robo-index.github.io/dashboard) | Research trends, tag distribution, review timeline |
| [Showcase](https://robo-index.github.io/showcase) | 126 open-source papers with GitHub stats |
| [ral.skill](https://robo-index.github.io/ral-skill) | AI submission assistant for Claude Code |
| [Contribute](https://robo-index.github.io/contribute) | How to add papers or improve the guide |

## Data

**627 papers** · **126 open-source repos** · IEEE RA-L 2020–2025

All paper data lives in `src/content/papers/*.yaml`:

```yaml
title: "Paper Title"
venue: RA-L
year: 2025
authors: [...]
abstract: "..."
tags: [manipulation, reinforcement-learning]
repo: https://github.com/...
arxiv: https://arxiv.org/abs/...
date_added: "2025-01-01"
```

Papers are auto-discovered via GitHub API (`scripts/fetch-papers.ts`) and updated daily by GitHub Actions.

## Stack

- **Framework:** Next.js 16 App Router, static export
- **Styling:** Tailwind CSS, dark mode, fully responsive
- **Hosting:** GitHub Pages (free, zero server cost)
- **Analytics:** GoatCounter (privacy-friendly, no cookies)
- **Automation:** GitHub Actions — daily paper sync, hourly visitor count, push-to-deploy

## Contributing

- **Add a paper:** create `src/content/papers/<slug>.yaml` and open a PR to `dev`
- **Improve the guide:** edit files in `src/content/guides/` and open a PR
- **Report issues:** [open an issue](https://github.com/Robo-Index/Robo-Index.github.io/issues)

## Authors

- **Ce Hao (郝策)** — RA-L submission guide, community knowledge
- **Yinglei Zhu** — platform development, data pipeline, ral.skill

## License

[MIT](LICENSE)
