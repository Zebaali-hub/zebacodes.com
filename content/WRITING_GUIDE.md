# Writing Guide

The Writing section is a gradual engineering learning resource. Publish only material grounded in direct study, implementation, or experience; an empty category is better than generic filler.

## Article metadata

Create `posts/<category>/<slug>.mdx` with:

```yaml
---
title: "Clear, specific title"
date: "YYYY-MM-DD"
updated: "YYYY-MM-DD" # optional
category: "java"
difficulty: "beginner" # optional: beginner, intermediate, advanced
tags: ["java", "collections"]
excerpt: "One or two sentences describing what the reader will understand."
readTime: "6 min read" # optional; calculated when omitted
related: ["category/article-slug"] # optional
---
```

The existing MDX renderer supports headings, links, fenced code blocks, tables, callouts through blockquotes, and repository-hosted diagrams or images. The listing provides category filtering and text search; article metadata supplies page SEO.

## Explanation structure

Use only the sections that help the topic, in roughly this order:

1. `# Topic`
2. `## Why this feels confusing`
3. `## Intuition`
4. `## Small example`
5. `## How it actually works`
6. `## Visual / flow explanation`
7. `## Common confusion`
8. `## Backend or interview relevance`
9. `## Key takeaway`

Prefer one small, correct example over many abstract claims. Define jargon before using it, label diagrams, test code snippets, cite primary references, and distinguish observed behavior from interpretation.

## Before publishing

- Verify commands and code against the stated version.
- Check internal links, image paths, and related article slugs.
- Confirm the excerpt and title accurately describe the article.
- Add an `updated` date only for a meaningful revision.
- Run `npm test`, `npm run typecheck`, `npm run lint`, and `npm run build`.
