# Publishing a New Post

1. Create a `.mdx` file: `/posts/[category]/your-slug.mdx`
2. Add frontmatter:

```yaml
---
title: ""
date: "YYYY-MM-DD"
category: "dsa | java | db | spring-boot | lld | hld | career | women-in-tech"
tags: []
excerpt: ""
readTime: ""
---
```

3. Write MDX below the frontmatter
4. `git add . && git commit -m "post: title" && git push`
5. Vercel deploys. Post is live.

## Categories

| Slug | Label | Colour |
|---|---|---|
| `dsa` | DSA | Indigo |
| `java` | Java | Orange |
| `db` | DB | Blue |
| `spring-boot` | Spring Boot | Green |
| `lld` | LLD | Purple |
| `hld` | HLD | Teal |
| `career` | Career | Amber |
| `women-in-tech` | Women in Tech | Rose |

## Code blocks

Use fenced blocks with language tag:

```java
// Java example
```

```sql
-- SQL example
```

```bash
# Bash example
```

```yaml
# YAML example
```

```typescript
// TypeScript example
```

## Notes

- `readTime` is auto-calculated from word count if omitted from frontmatter
- Dates must be in `YYYY-MM-DD` format
- Posts are sorted newest-first on the blog page
- The `excerpt` shows on the blog listing — keep it to 1–2 sentences
