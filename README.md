# Konomi

Website for Konomi, built with [Next.js](https://nextjs.org) (App Router) and [Prismic](https://prismic.io) (Slice Machine).

## Development

```sh
npm install
npm run dev     # Next.js + Slice Machine
npm run lint
npm run build
```

### Environment variables

| Variable | Purpose |
| --- | --- |
| `RAPIDMAIL_API_USERNAME`, `RAPIDMAIL_API_PASSWORD`, `RAPIDMAIL_LIST_ID` | Newsletter signups (`/api/rapidmail`) |
| `REVALIDATE_SECRET` | Optional. If set, must match the secret on the Prismic webhook that calls `/api/revalidate` |

## Design system

All design tokens live at the top of [`src/app/globals.css`](src/app/globals.css). CSS modules should only use tokens — if a value is missing, add a token there instead of hard-coding it.

- **Colour:** `--red`, `--red-lowopa`, `--beige`, `--dark-blue`, `--light-blue`, `--yellow-lowopa`
- **Type:** `--title-font` (Clash Grotesk), `--text-font` (League Spartan), sizes `--font-size-2xs` … `--font-size-4xl`, weights `--weight-light` … `--weight-bold` (used with `font-variation-settings`)
- **Spacing:** `--spacing-*`, multiples of 0.25rem (`--spacing-4` = 1rem)
- **Motion:** `--bezier` with `--duration-fast` / `--duration-base` / `--duration-slow`
- **Layers:** `--z-background`, `--z-raised`, `--z-footer`, `--z-dropdown`, `--z-header`, `--z-overlay`, `--z-overlay-controls`, `--z-splash`
- **Utilities:** `.visually-hidden`, `.unstyled-button` (a real `<button>` without the default filled look)

### Breakpoints

| Name | Range | Media query |
| --- | --- | --- |
| mobile | < 768px | *(default)* |
| tablet | 768–1279px | `@media screen and (min-width: 768px) and (max-width: 1279px)` |
| desktop | ≥ 1080px | `@media screen and (min-width: 1080px)` |
| wide | ≥ 1280px | `@media screen and (min-width: 1280px)` |

Laptops (1080–1279px) get both desktop and tablet rules; put the tablet block after the desktop block so it wins there.

JavaScript uses the same values from [`helpers/breakpoints.ts`](helpers/breakpoints.ts) (via `useMobile()`).

`rem` is fluid on mobile (14px at 375px wide), 16px on tablet/laptop and 18px from 1280px.
