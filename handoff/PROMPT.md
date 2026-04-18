# PROMPT — Paste this into ChatGPT / Codex

> Copy everything below this line into your first ChatGPT message. Attach every file from this folder (`PROMPT.md`, `SPEC.md`, `TOKENS.md`, `hero_banner.html`, `colors_and_type.css`, `/assets/*.png`, `/fonts/*.otf`) so the model has the full design reference.

---

# Aletheia — marketing site build

You are a senior frontend engineer. Build me a **production-ready marketing website** for a dating app called **Aletheia** (ἀλήθεια — Greek for "truth"). The visual design is already finalized — your job is to implement it faithfully, not invent new directions.

## The brief

- **Stack:** Next.js 14 App Router + TypeScript + Tailwind CSS. Deploy target: Vercel.
- **Pages:** Home (`/`), How it works (`/how-it-works`), Trust & safety (`/trust`), Press (`/press`), Waitlist (`/waitlist`).
- **Responsive:** Desktop + mobile must both look polished. No "mobile later."
- **Motion:** Rich — scroll-triggered reveals, subtle cursor parallax on the hero's fanned phones, floating glass chips that drift on mouse move. Use Framer Motion.
- **Waitlist form:** collect email only, POST to `/api/waitlist` (stub the endpoint — log to console, return 200). Show a "You're on the list" confirmation.
- **Phone screens in the mockup are placeholders.** I will swap in real screenshots later. For now, render the three mock React components (Discover / Match moment / Video call) verbatim from my reference HTML — same gradient placeholder photos, same glass styling.

## Source of truth — read these carefully

1. **`hero_banner.html`** — my hand-built mockup. Variant 1 is the target. Copy the layout, phone tilts, chip positions, headline copy, and overall hero composition **exactly**. Use it as the pixel reference for the home page hero.
2. **`SPEC.md`** — full site architecture, section-by-section content, and interaction behavior for every page.
3. **`TOKENS.md`** — color, type, spacing, radius, shadow, and glass-blur values. These are non-negotiable. Port them to Tailwind's `theme.extend` and a small `globals.css`.
4. **`colors_and_type.css`** — CSS custom-properties source (matches TOKENS.md).
5. **`/assets/*.png`** — official logos (navy, white, transparent variants).
6. **`/fonts/Carmilla_Personal_Use.otf`** — the brand display face, used **only** for the `ALETHEIA` wordmark. Load via `next/font/local`.

## Type stack

- **Brand display (wordmark only):** Carmilla — load locally.
- **Display (headlines):** Geist — `next/font/google` or the `geist` package, weight 600, letter-spacing -0.02em on large sizes.
- **UI (body, buttons, labels):** Inter — `next/font/google`, weights 400/500/600.
- **Mono (captions, metadata):** JetBrains Mono — `next/font/google`, 400.

## Non-negotiables

- Pixel-faithful implementation of Variant 1 hero. If you deviate, surface it clearly and ask before shipping.
- Use the brand palette only. No new colors. Accent green `#5DCAA5` is **reserved for the verified badge** — do not use it as a generic "success" color.
- Glass/frosted panels use `backdrop-filter: blur(28px) saturate(140%)` over translucent white — match the mockup exactly.
- All shadows are blue-tinted (`rgba(12, 68, 124, X)`), never neutral gray. See TOKENS.md.
- Accessible: keyboard-nav works, focus rings visible, contrast AA, `prefers-reduced-motion` disables the parallax and scroll animations.
- SEO: proper `<title>`, `<meta description>`, OG image, sitemap.xml, robots.txt.
- Lighthouse target: ≥ 95 on Performance and Accessibility.

## Deliverables

Reply with **the complete Next.js project as a single codebase**, file by file, in this order:

1. `package.json` (list exact deps)
2. `tailwind.config.ts`
3. `app/globals.css`
4. `app/layout.tsx` (with `next/font` setup for Carmilla + Geist + Inter + JetBrains Mono)
5. `app/page.tsx` (home)
6. `app/how-it-works/page.tsx`
7. `app/trust/page.tsx`
8. `app/press/page.tsx`
9. `app/waitlist/page.tsx`
10. `app/api/waitlist/route.ts`
11. `components/` — `Nav.tsx`, `Footer.tsx`, `Hero.tsx`, `Phone.tsx`, `PhoneScreens/Discover.tsx`, `PhoneScreens/MatchMoment.tsx`, `PhoneScreens/VideoCall.tsx`, `FloatingChip.tsx`, `WaitlistForm.tsx`, `Wordmark.tsx`, `VerifiedBadge.tsx`, `Section.tsx`, `StatCard.tsx`, `FadeInWhenVisible.tsx`
12. `lib/cn.ts` (tailwind-merge helper)
13. `public/` — drop the logos here
14. `next.config.js`
15. `README.md` — how to run locally and deploy

At the end, output a short **"Fidelity checklist"** — a bulleted list of every decision you made that could be wrong, so I can verify before deploy.

## How to work

- If anything in SPEC.md is ambiguous, **ask me** before guessing. One round of questions is fine.
- Show me the hero first, get approval, then proceed to the rest.
- Don't add sections I didn't ask for. Don't add testimonials, AI-generated imagery, gradients not in the palette, or emoji.

Start by reading all the attached files, then reply with (a) a 3-line summary of what you understood, (b) any clarifying questions, and (c) the file list you plan to produce. Wait for my go-ahead before writing code.
