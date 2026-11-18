# Deployment

## Target

Cloudflare Pages, project **`frynime`** → `https://frynime.pages.dev`
(first-try name; fallbacks if taken: `fry-nime`, then `frynime-app`).
Direct upload of the static export — no wrangler project, no Functions,
no environment variables.

## Build

```bash
npm ci
npm run typecheck   # tsc --noEmit
npm run lint        # eslint, must be 0 errors
npm run build       # next build -> out/ (14 routes, all static)
npm run smoke       # serves out/, checks all 12 routes return 200
```

## Deploy

```bash
python3 ~/workspace/github-actions/cf_pages.py deploy frynime out
```

`cf_pages.py` uses the Cloudflare API token from the secure vault (never
pasted). Verify after deploy:

```bash
curl -s -o /dev/null -w '%{http_code}\n' https://frynime.pages.dev/
# 200, then confirm the landing markers inside a deployed JS chunk
# (the HTML is a shell; the copy lives in the chunks):
curl -s https://frynime.pages.dev/_next/static/chunks/app/page-*.js | grep -o 'Mulai Nonton'
```

## Repo About

After the first live deploy, set the repo homepage so the live URL shows on
the repo page:

```bash
# PATCH /repos/dezzorigin/frynime { "homepage": "https://frynime.pages.dev" }
```

## Old deployment

The README used to point at `https://frynime.netlify.app` (Netlify). That
deployment is not maintained by this repo anymore; the canonical live URL is
the Pages URL above. Do not treat the Netlify link as the live site.
