# Project screenshots

Drop images in the folder that matches the project's `assetDir` in `data/portfolio.ts`:

- `db-stress/`
- `orderflow/`
- `log-intelligence/`

Any `.png`, `.jpg`, `.webp` or `.avif` here is picked up automatically at build
time and rendered on the homepage project card, sorted by filename. Nothing
renders while a folder is empty, so there is never a broken or placeholder
image on the live site.

Name files so the alt text reads well — the filename becomes the alt text:
`01-latency-p99-dashboard.png`, `02-connection-pool-saturation.png`.

Keep them under ~300 KB each. Export Grafana panels at 2x and compress
(`pngquant`, `squoosh`) before committing — the homepage is judged on load time.
