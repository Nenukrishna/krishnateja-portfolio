# Krishna Teja — Portfolio

Performance video editor portfolio. Next.js 15 (App Router), statically exported.

## Run locally

```
npm install
npm run dev      # http://localhost:3111
```

## Build

```
npm run build    # static site written to ./out
```

## Deploy

Vercel picks this up with zero config (`output: 'export'`).

```
npx vercel        # preview
npx vercel --prod # production
```

## Structure

| Path | What |
|---|---|
| `app/page.js` | All page copy — bio, experience, capabilities, skills |
| `lib/works.json` | The work grid: slug, brand, title, format, one-line note |
| `public/media/ads/` | Full ads played in the lightbox (720x1280) |
| `public/media/previews/` | Silent 6s hover loops (480x854) |
| `public/media/posters/` | Card poster stills |
| `public/media/showreel-*.mp4` | Hero showreel, 1080 and 720 renditions |

## Adding a new piece of work

1. Drop `slug.mp4` into `public/media/ads/`
2. Make a hover preview and a poster:
   ```
   ffmpeg -ss 5 -t 6 -i src.mp4 -vf scale=480:854 -an -crf 31 public/media/previews/slug.mp4
   ffmpeg -ss 5 -i src.mp4 -frames:v 1 -vf scale=640:1138 -q:v 4 public/media/posters/slug.jpg
   ```
3. Add an entry to `lib/works.json`
