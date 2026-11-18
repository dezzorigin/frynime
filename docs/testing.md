# Testing

## What runs in CI

`.github/workflows/ci.yml` (Node 20): `npm ci` → `npm run typecheck` →
`npm run lint` → `npm run build` → `npm run smoke`. All four must pass.

## Smoke test (`scripts/smoke.mjs`)

Serves `out/` on localhost and checks all 18 routes return HTTP 200 with the
app shell. Because every page is client-rendered, the visible copy lives in
the JS chunks, not the static HTML — so markers are asserted against the
built chunks (same technique as the live check in `docs/deployment.md`).

```
PASS / -> 200 (shell ok, marker "Mulai Nonton" in bundle found, ...)
... (18/18)
SMOKE OK: all routes 200, all markers found, flight payloads present
```

## Play-test (headless Chromium)

`~/workspace/absensirapat-audit/diag/play-frynime.mjs` drives the built site
in headless Chromium (via the local forwarder proxy) and asserts, with
screenshots:

1. Landing renders (hero, GitHub link, "Mulai Nonton").
2. Clicking "Mulai Nonton" shows the catalog: hero banner + 11 sections with
   real cards.
3. Search for "frieren" returns results; opening one shows the detail page
   (score, genres, episode list).
4. Favorite toggle adds the anime; `/favorites` lists it; reload keeps it
   (localStorage).
5. `/schedule` renders all 7 days; `/genre?g=1` renders Action; `/top`,
   `/popular`, `/upcoming`, `/movies` all render (the four routes that used
   to 404).
6. Episode page renders the player iframe + prev/next + episode list.
7. Mobile viewport (390px): landing + catalog render without horizontal
   overflow.

### Fixture data — read this before trusting the screenshots

The sandbox VM's egress **cannot reach `api.jikan.moe`**: the CONNECT
tunnel establishes, then the GET hangs with 0 bytes (verified multiple
times, 2026-11-18). The API itself is up globally (independent checks show
it live; `jikan.moe` and `cdn.myanimelist.net` are reachable from the VM —
only the API host stalls, most likely the shared egress IP being throttled
or blocked by Jikan).

So the play-test intercepts `https://api.jikan.moe/v4/*` in the browser and
answers with **fixture JSON** (`diag/frynime-fixtures.json`) shaped exactly
like real Jikan v4 responses (real anime, real MAL ids, real poster URLs
from `cdn.myanimelist.net`, which load for real). That verifies all the app
logic — routing, rendering, favorites, navigation — but **not** the live
Jikan round-trip from this VM.

**The live round-trip must be verified in a real browser** (not the VM):
open the deployed site, enter the catalog, and confirm cards load with real
data. Until that check is done, the honest claim is: "app logic verified
end-to-end with fixtures; live Jikan data pending a real-browser check."

The video demo (`docs/demo.mp4`) is recorded the same way — silent
(headless recording captures no audio), fixture data, stated in the README.

## Manual checklist (real browser)

- [ ] Landing → catalog loads with real cards (Jikan reachable).
- [ ] Search "frieren" → results → detail → episode 1 → player iframe loads.
- [ ] Favorite persists across reload.
- [ ] Schedule shows 7 days.
- [ ] Mobile 390px: no horizontal overflow on landing or catalog.
