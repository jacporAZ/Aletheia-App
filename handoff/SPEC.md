# SPEC.md — Aletheia marketing site

## About Aletheia

Aletheia is a verification-first dating app. The thesis: online dating is broken because profiles aren't people. Aletheia fixes that with three rules —

1. **Every user is ID-verified.** No bots, no catfish.
2. **You video call before you chat.** Messaging is locked until you've been on a real call.
3. **Ten matches a day, max.** Slow, considered, human.

Brand feel: calm, premium, serious about trust. Not horny, not playful, not "fun." Think: *The New York Times* meets Linear meets a pair of reading glasses.

## Information architecture

```
/                  Home (hero + thesis + how-it-works teaser + trust teaser + waitlist CTA)
/how-it-works      Three-rule breakdown with step illustrations
/trust             ID verification, vouching, safety reporting
/press             Press kit, media mentions, contact
/waitlist          Standalone email signup (for the "Get on TestFlight" CTA)
```

---

## Page: Home (`/`)

### Hero section
**This is Variant 1 in the mockup.** Reproduce it exactly.

- **Left column (640px wide on desktop):**
  - "Now on iOS · TestFlight" pill (green dot + text).
  - H1 headline (Geist 600, 96px desktop / 44px mobile): `Connect with\n[italic] a person,\nnot a profile.`
  - Sub (20px, color `deep #185FA5`): `Every match is ID-verified. You talk on a video call before you message. No bots, no catfishing, no guessing.`
  - Two buttons: primary **"Download on iOS"** (Apple icon + text, ocean `#1A6BB5`), ghost **"Watch the film →"** (haze border).
  - Stat row: `100% ID verified · 10/day Thoughtful matches · 1 call Before any chat`.
- **Right column:** three phones, fanned. Back = Video call (−12°), middle = Match moment (+2°, raised), front = Discover (+12°, foreground).
- Four floating glass chips: "ID verified" (shield-check), "Video call required" (video), "4 mutual friends" (users), "It's a match" (heart). Positions per the mockup.
- **Motion:** on mount, stagger-fade the phones and chips (0.08s apart, 0.6s duration, ease-out). On mousemove, translate each phone by `mouse.x * 0.01` and each chip by `mouse.x * 0.02` in opposite directions. Disable under `prefers-reduced-motion`.

### "The thesis" section
Full-bleed frost background. Centered.
- Eyebrow: `WHY WE EXIST` (mist, uppercase, tracking 0.1em).
- Large statement (Geist 600, 64px): `Dating apps forgot to put the people in.`
- Body (20px, 680px max-width): two paragraphs. Ghost-written: *"We keep meeting avatars. Filtered photos, rehearsed prompts, conversations that collapse the moment they leave the app. Aletheia is built on the boring, unsexy idea that dating works better when you know the other person exists — and that they want to meet you."*

### "How it works" teaser
Three-column grid (desktop) / stacked (mobile).
1. **Verify who you are.** Upload ID. Takes 60 seconds. One-time.
2. **Meet ten people.** Hand-picked, never more. No infinite swiping.
3. **Call, then chat.** Messaging opens after your first video call.
- Each column: small number (Geist 600, 14px, mist), icon (Lucide), title (Geist 600, 22px), body (15px, deep).
- CTA link below: `See the full walkthrough →` to `/how-it-works`.

### "Trust" teaser
Two-column card (white, radius 24, bezel shadow).
- Left: headline `Built for trust, end to end.` + three bullet points with verified-green check icons.
- Right: illustrated "Trust layer" diagram — three stacked glass cards (ID Verification / Friend Vouches / Real-time call). Draw in SVG or React.
- Link: `Read our safety principles →` to `/trust`.

### Waitlist CTA (final section before footer)
Full-bleed ocean gradient (`#0C447C → #1A6BB5`). White text.
- Centered email form. Label: "Be first in line." Input + submit button inline. Success state: "You're in. We'll be in touch."
- Subtext below: `No spam. No "newsletters." One email when TestFlight opens in your city.`

### Footer
Three columns:
- **Product:** How it works, Trust & safety, Press
- **Company:** Manifesto, Contact, Careers
- **Legal:** Privacy, Terms, Cookies
- Bottom row: `ALETHEIA · ΑΛΉΘΕΙΑ · TRUTH · EST. 2026 · BROOKLYN` in JetBrains Mono 11px mist.

---

## Page: How it works (`/how-it-works`)

Hero: `Three rules. That's it.` (Geist 600, 72px).

Then three big numbered sections, stacked vertically, alternating text-left/text-right:

### 01. Verify who you are
- Visual: phone screen showing the ID upload flow (placeholder — React component, mimic the Discover style).
- Body: explain verification, what providers (Persona / Stripe Identity — pick one), what data is kept, what isn't.
- Trust chip row below: "Government ID", "Selfie match", "Stored encrypted".

### 02. Meet ten people a day
- Visual: stack of 10 cards fanned out (Discover-style).
- Body: the matching algorithm in one paragraph. Weights given to mutual friends, shared interests, geography. Honest about what we don't do (no "AI" bullshit).

### 03. Call, then chat
- Visual: the Match moment → Video call flow (two phones side by side, arrow between).
- Body: why forced calls. Cite studies on video vs. text compatibility.

End with waitlist CTA.

---

## Page: Trust & safety (`/trust`)

Dense, serious page. Editorial feel. Think: a long-form manifesto.

- Hero: `The quiet infrastructure of trust.` 72px Geist. Centered.
- Three core sections:
  1. **Identity:** how verification works, partners, what we store.
  2. **Vouching:** friends-of-friends graph. You can ask a friend to vouch for someone. We surface "4 mutual friends" on profiles.
  3. **Reporting:** one-tap report. Human review within 4 hours. Transparency report link.
- Each section: 800px max-width, 18px body, Geist 500 subheads.
- Sidebar (desktop only): sticky table of contents.
- Bottom: signed note from founders. 15px, italic Geist.

---

## Page: Press (`/press`)

- Hero: `Press & media.` 64px.
- Two-column:
  - Left: contact details, press kit download (stub link), brand guidelines PDF (stub).
  - Right: list of recent coverage (3–5 stubbed entries — logos + dates + headlines, all grayed out / "coming soon").
- Downloadable assets grid: logo variations, app screenshots, founder photos. 4-column grid of image tiles.

---

## Page: Waitlist (`/waitlist`)

Single-screen, centered.
- Large Aletheia mark (SVG, navy).
- Headline: `Be first when we open your city.` (Geist 600, 56px).
- Form: email input + submit button, inline.
- Secondary: optional city field ("Where should we launch next?").
- Trust line below: "No spam. One email at most."
- Already have access? Link to App Store (stub).

---

## Global: Nav

Sticky top. Glass background (`rgba(255,255,255,0.85)` + blur).
- Left: ALETHEIA wordmark (Carmilla 20px, letter-spacing 0.32em, ocean).
- Center: How it works · Trust & safety · Press.
- Right: "Request invite" button (filled navy).
- Mobile: hamburger → full-screen overlay menu.

## Global: Floating cursor halo (optional, desktop only)

A soft 300px blurred circle that tracks the cursor across the page, tinted `rgba(26, 107, 181, 0.08)`. Disabled under `prefers-reduced-motion`. Opt-in — only if it doesn't feel gimmicky once built.

---

## Interaction & motion details

- **Page transitions:** fade between routes, 200ms. No slide.
- **Section reveals:** each section fades + translates up 20px when it enters the viewport (IntersectionObserver, once per element). Stagger child elements by 0.06s.
- **Hero phones parallax:** see Hero spec above.
- **Chip drift:** each floating chip has a unique 3–5s sine-wave idle float (translate ±4px).
- **Button hover:** scale 1.015, shadow intensifies. 180ms.
- **Link hover:** underline slides in left-to-right. 220ms.
- **Form submit:** button text swaps to a spinner, then to "You're in" with a check. 400ms.

## Accessibility

- All images have alt text.
- Glass panels have sufficient contrast for text on top (WCAG AA).
- Focus rings visible on every interactive element (2px ocean outline, 2px offset).
- Motion respects `prefers-reduced-motion`.
- Keyboard nav works end-to-end.

## SEO

- `<title>`: `Aletheia — Date the person, not the profile`
- `<meta description>`: one line, 155 chars.
- Open Graph image: 1200×630, the hero composition.
- `sitemap.xml` + `robots.txt`.
- Canonical URLs.

## Analytics

Stub Plausible (not Google Analytics). Placeholder script tag in `<head>`. Don't load until user accepts cookies — implement a small cookie consent banner at the bottom.
