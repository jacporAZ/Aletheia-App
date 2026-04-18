# TOKENS.md — Aletheia design tokens

Port these to `tailwind.config.ts` under `theme.extend` and mirror as CSS custom properties in `app/globals.css`.

## Colors

```ts
colors: {
  // Primary brand
  ocean:    '#1A6BB5',  // primary CTA, selected state
  sky:      '#378ADD',  // secondary CTA, links
  mist:     '#85B7EB',  // inactive icons, placeholder, muted labels
  haze:     '#B5D4F4',  // hairlines, dividers
  ice:      '#EAF4FD',  // tinted card surface (inset)
  frost:    '#F2F8FE',  // page background
  navy:     '#0C447C',  // headings, strongest emphasis
  deep:     '#185FA5',  // body copy on white

  // Reserved — verified badge ONLY. Do not reuse.
  verified: '#5DCAA5',
}
```

Text-on-background contrast pairs (AA-passing):
- `navy` on `frost` / `white` / `ice` ✓
- `deep` on `frost` / `white` ✓
- `ocean` on `frost` / `white` ✓ (for links / buttons)
- `white` on `ocean` / `navy` ✓
- `mist` is for large/heavy text or decorative only — **not** body copy.

## Typography

```ts
fontFamily: {
  brand: ['Carmilla', 'serif'],              // wordmark only
  display: ['Geist', 'Inter', 'sans-serif'], // headlines, section titles
  sans: ['Inter', 'system-ui', 'sans-serif'],// body, UI
  mono: ['"JetBrains Mono"', 'monospace'],   // captions, metadata
}
```

### Scale

| Token | Size / LH | Weight | Use |
|---|---|---|---|
| `text-xs` | 12 / 16 | 500 | Captions, metadata |
| `text-sm` | 13 / 18 | 400–500 | Small UI labels |
| `text-base` | 15 / 22 | 400 | Body copy |
| `text-md` | 16 / 24 | 400 | Body copy, comfortable |
| `text-lg` | 18 / 26 | 500 | Emphasized body |
| `text-xl` | 20 / 28 | 500 | Lead paragraphs, sub-headlines |
| `text-2xl` | 24 / 32 | 600 | Small section heads, stat numbers |
| `text-3xl` | 28 / 36 | 600 | Card titles |
| `text-4xl` | 32 / 40 | 600 | Subsection H2 |
| `text-5xl` | 42 / 50 | 600 | Section H1 |
| `text-6xl` | 64 / 68 | 600 | Page H1 |
| `text-hero` | 96 / 98 | 600 | Hero headline (desktop) |

Hero headline letter-spacing: `-0.02em`. Section H1 / H2: `-0.01em`. Body: `0`.

Wordmark specifics: Carmilla 400, **uppercase**, letter-spacing `0.32em` (nav) or `0.5em` (hero watermark), color ocean (or white on dark surfaces).

## Spacing (4pt grid)

`0, 1 (4), 2 (8), 3 (12), 4 (16), 5 (20), 6 (24), 8 (32), 10 (40), 12 (48), 16 (64), 20 (80), 24 (96)`.

Tailwind's default scale already matches this. Add `px-20` (80px) for page gutters on desktop.

## Border radius

```ts
borderRadius: {
  xs: '6px',
  sm: '10px',
  md: '12px',    // inputs, buttons
  lg: '16px',
  xl: '24px',    // cards
  '2xl': '32px', // large panels
  '3xl': '56px', // phone bezels
  pill: '9999px',
}
```

## Shadows (all blue-tinted — never neutral gray)

```ts
boxShadow: {
  'sm':  '0 2px 8px rgba(12,68,124,0.06)',
  'md':  '0 8px 24px rgba(12,68,124,0.08)',
  'lg':  '0 18px 40px rgba(12,68,124,0.12)',
  'xl':  '0 28px 60px rgba(12,68,124,0.18)',

  'bezel': `
    inset 0 1px 0 rgba(255,255,255,1),
    inset 0 -1px 0 rgba(12,68,124,0.04),
    0 2px 4px rgba(12,68,124,0.06),
    0 12px 28px rgba(12,68,124,0.12),
    0 24px 48px rgba(12,68,124,0.08)
  `,

  'inset-ice': `
    inset 0 2px 4px rgba(12,68,124,0.10),
    inset 0 1px 0 rgba(12,68,124,0.06),
    inset 0 -1px 0 rgba(255,255,255,0.6)
  `,

  'glass': `
    0 12px 40px rgba(12,68,124,0.18),
    inset 0 1px 0 rgba(255,255,255,0.9)
  `,

  'phone': `
    0 0 0 2px rgba(255,255,255,0.1),
    0 40px 80px rgba(12,68,124,0.25),
    0 80px 160px rgba(12,68,124,0.18),
    0 10px 30px rgba(12,68,124,0.15)
  `,
}
```

## Glass / liquid panel

Used for: name bar over photo, reaction buttons, floating chips, nav bar, video-call HUD, match-moment card.

```css
.glass {
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(28px) saturate(140%);
  -webkit-backdrop-filter: blur(28px) saturate(140%);
  border: 0.5px solid rgba(255, 255, 255, 0.85);
  box-shadow:
    0 12px 40px rgba(12, 68, 124, 0.18),
    inset 0 1px 0 rgba(255, 255, 255, 0.9);
}

.glass-navy {
  /* for in-call HUD over dark video */
  background: rgba(12, 68, 124, 0.55);
  backdrop-filter: blur(28px) saturate(140%);
  border: 0.5px solid rgba(255, 255, 255, 0.25);
}
```

Tint variations:
- Over photos with legible text nearby → opacity 0.7
- Over plain backgrounds (chip in open space) → opacity 0.75
- Over dark video (HUD) → use `glass-navy`

## Motion

```ts
transitionTimingFunction: {
  'standard': 'cubic-bezier(0.2, 0.7, 0.2, 1)',
  'celebratory': 'cubic-bezier(0.16, 1, 0.3, 1)',
}
transitionDuration: {
  tap: '120ms',
  standard: '220ms',
  ample: '420ms',
  celebratory: '520ms',
}
```

- Tap scale: `scale(0.94)` on press-down.
- Hover scale (buttons): `scale(1.015)`.
- Section reveal: opacity 0 → 1, translateY 20px → 0, 420ms standard.
- Hero entry stagger: 0.08s between elements.
