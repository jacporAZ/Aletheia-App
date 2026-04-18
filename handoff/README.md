# Aletheia — website build handoff

**You're looking at the folder you'll hand to ChatGPT / Codex.**

## What's in here

| File | Purpose |
|---|---|
| `PROMPT.md` | The single prompt to paste into your first ChatGPT message. |
| `SPEC.md` | Full site architecture, page-by-page content & behavior. |
| `TOKENS.md` | Every color, font, spacing, radius, shadow, glass, and motion value. |
| `hero_banner.html` | The actual visual reference — Variant 1 is the target. |
| `colors_and_type.css` | Source CSS for the design tokens. |
| `assets/` | Logos (navy, white, transparent). |
| `fonts/` | Carmilla brand font file. |

## How to use it

1. Open ChatGPT (GPT-5 / any model with vision + long context).
2. Paste the **entire contents of `PROMPT.md`** into your first message.
3. **Attach every other file** in this folder — including `hero_banner.html`, the PNG logos, and the OTF font. (ChatGPT's file upload accepts all of these.)
4. Hit send.

GPT will respond with (a) a summary, (b) clarifying questions, (c) the file list it plans to produce. Answer the questions, tell it to proceed, and it'll stream the full Next.js codebase.

## What you'll get back

A complete Next.js 14 + Tailwind project:

- 5 routes (`/`, `/how-it-works`, `/trust`, `/press`, `/waitlist`)
- Pixel-faithful Variant 1 hero with scroll reveals + cursor parallax
- Waitlist form + stub API route
- Responsive desktop + mobile
- `README.md` with `npm install && npm run dev` and Vercel deploy steps

## After deploy

- Swap the gradient phone screens for real product screenshots when you have them (components live in `components/PhoneScreens/`).
- Wire the waitlist API to a real backend (Resend, Loops, ConvertKit, etc. — replace the stub in `app/api/waitlist/route.ts`).
- Drop your real copy into the `/how-it-works`, `/trust`, and `/press` pages (SPEC.md has placeholder body text you can keep or rewrite).

## Alternative: Claude Code

If you'd rather use Claude Code (CLI), same package works — just drop this folder into your project and run:

```bash
claude "Read PROMPT.md and build the site per SPEC.md"
```

The prompt is tool-agnostic.
