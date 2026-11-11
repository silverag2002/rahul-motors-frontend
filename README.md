# Rahul Motors website (rahulmotors.in)

Next.js 16 site for the shop's public parts catalogue. No prices or stock are shown; every part has a WhatsApp "ask" button.

## How it works
- `lib/catalog.ts` reads the whole public list from the shop's server (`/api/public/products`, 200 per page) and keeps it for 5 minutes. Every page is built from that one list.
- `lib/names.ts` tidies what is typed at the counter: maker spellings (RENULT → Renault, V.W → Volkswagen), misspelt part types (IGNIATION COIL → Ignition coil) and test entries like "&&&". The database itself is never changed.
- `lib/search.ts` matches every typed word against part type, car model, maker and part number, with common shop spellings folded ("break" → brake, "I-10" = i10).
- `/api/catalog` sends a packed copy of the list to the browser for instant search (`lib/compact.ts`).
- `/api/public/*` passes the "Can't find your part?" form through to the shop's server, which emails the shop.

## Pages
`/` home · `/products` search with filters (kept in the address) · `/parts` and `/parts/<type>` · `/cars` and `/cars/<maker>` · `/part/<id>-<name>` single part with all photos · sitemap and robots.

## Look
Graphite and brass from the gold RM badge. Bricolage Grotesque for headings, Instrument Sans for text. Light by default; dark with the toggle in the header (remembered per visitor). Photos in `public/img` (hero, ordering steps, 12 part tiles) were made with ChatGPT; prompts and attempts are in `.claude/image-gen-log.md`. Favicon, app icon and share card (`public/og.jpg`) are made from `public/logo.png`.

## Run
```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start
```
`RAHUL_MOTORS_API_URL` (or `NEXT_PUBLIC_API_URL`) points at another API; it defaults to the live public one.
