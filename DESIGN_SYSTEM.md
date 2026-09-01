# DESIGN SYSTEM SPECIFICATION
**Naufal Hakim — Creative Developer & Full-Stack Engineer**

---

## 1. Color System Tokens

The color system is mapped to CSS variables for dynamic adaptability and strict editorial restraint.

| Token | CSS Variable | Hex Value | Role & Usage |
|---|---|---|---|
| **Background** | `--background` | `#09090b` | Infinite deep obsidian canvas |
| **Foreground** | `--foreground` | `#f4f4f0` | Primary headlines, display text, high contrast copy |
| **Muted Canvas** | `--muted` | `#141417` | Subtle contrast fills, inset containers |
| **Muted Foreground** | `--muted-foreground` | `#8a8a93` | Secondary text, captions, metadata |
| **Surface** | `--surface` | `#111114` | Card & layer backgrounds |
| **Surface Hover** | `--surface-hover` | `#18181c` | Interactive surface hover states |
| **Surface Border** | `--surface-border` | `#222226` | Subtle component boundaries |
| **Border** | `--border` | `#222226` | 1px structural hairline rules |
| **Border Subtle** | `--border-subtle` | `#18181b` | Secondary subdivision lines |
| **Accent** | `--accent` | `#e2e0db` | Warm platinum focal accents & primary CTAs |
| **Accent Foreground**| `--accent-foreground`| `#09090b` | High contrast text atop accent elements |
| **Inverse** | `--inverse` | `#f4f4f0` | Inverse theme token |

---

## 2. Typography System & Hierarchy

All typography classes scale responsively across breakpoints using fluid clamping and tight letter-spacing.

| Level | Tag / Element | Font Size | Line Height | Letter Spacing | Weight |
|---|---|---|---|---|---|
| **Display** | `<h1>` / `<div>` | `clamp(3.5rem, 8vw, 7.5rem)` | `0.92` | `-0.04em` | Bold (700) |
| **H1** | `<h1>` | `clamp(2.5rem, 5.5vw, 4.5rem)` | `1.0` | `-0.035em` | SemiBold (600) |
| **H2** | `<h2>` | `clamp(1.75rem, 3.5vw, 3rem)` | `1.1` | `-0.03em` | SemiBold (600) |
| **H3** | `<h3>` | `clamp(1.25rem, 2vw, 1.75rem)` | `1.25` | `-0.02em` | Medium (500) |
| **H4** | `<h4>` | `1.125rem` (`18px`) | `1.35` | `-0.01em` | Medium (500) |
| **Body (Large)** | `<p>` | `1.125rem` (`18px`) | `1.65` | `normal` | Regular (400) |
| **Body (Default)** | `<p>` | `1.0rem` (`16px`) | `1.6` | `normal` | Regular (400) |
| **Small / Caption** | `<span>` | `0.875rem` (`14px`) | `1.5` | `normal` | Regular (400) |
| **Label / Badge** | `<span>` | `0.75rem` (`12px`) | `1.0` | `+0.12em` | Medium (500, Mono) |
| **Metadata** | `<span>` | `0.6875rem` (`11px`)| `1.2` | `+0.15em` | Regular (400, Mono) |

---

## 3. Spacing Scale

Consistent rhythmic spacing system:

```text
--space-1:   0.25rem   (4px)
--space-2:   0.5rem    (8px)
--space-3:   0.75rem   (12px)
--space-4:   1.0rem    (16px)
--space-6:   1.5rem    (24px)
--space-8:   2.0rem    (32px)
--space-12:  3.0rem    (48px)
--space-16:  4.0rem    (64px)
--space-24:  6.0rem    (96px)
--space-32:  8.0rem    (128px)
--space-48:  12.0rem   (192px)
```

Section vertical padding: `py-24 md:py-36 lg:py-48` for generous editorial breathing room.

---

## 4. Grid System

* **Desktop (≥ 1024px)**: `grid-cols-12` with `gap-6` (24px).
* **Tablet (768px - 1023px)**: `grid-cols-8` with `gap-5` (20px).
* **Mobile (< 768px)**: `grid-cols-4` with `gap-4` (16px).
* **Max Width**: `max-w-7xl` (1280px) with fluid horizontal gutters `px-6 md:px-12 lg:px-16`.

---

## 5. Foundational UI Components

1. **`Container.jsx`**: Responsive max-width wrapper with standardized gutters.
2. **`Section.jsx`**: Semantic `<section>` element with consistent vertical rhythm.
3. **`Heading.jsx`**: Polymorphic heading component (`display`, `h1`, `h2`, `h3`, `h4`) with automatic tracking.
4. **`Text.jsx`**: Semantic typography component (`body-lg`, `body`, `small`, `metadata`).
5. **`Button.jsx`**: Tactile interactive button with `primary`, `secondary`, `outline`, and `ghost` variants + magnetic physics support.
6. **`Link.jsx`**: Animated editorial text link with hover underline reveals.
7. **`Label.jsx`**: Micro-metadata badge with monospace styling.

---

## 6. Motion Tokens

```javascript
export const MOTION_TOKENS = {
  duration: {
    instant: 0.15,
    fast: 0.35,
    normal: 0.8,
    slow: 1.2,
    cinematic: 1.6,
  },
  ease: {
    editorial: 'power3.out',
    cinematic: 'expo.out',
    smooth: 'power2.out',
    spring: { type: 'spring', stiffness: 300, damping: 25 },
  },
  stagger: {
    dense: 0.02,
    normal: 0.05,
    loose: 0.1,
  },
  distance: {
    subtle: 15,
    normal: 35,
    deep: 70,
  },
};
```

---

## 7. Accessibility & Semantic Compliance

* Minimum contrast ratio ≥ `4.5:1` for normal text and `3:1` for large display text.
* Visible outline on `:focus-visible` (`outline: 2px solid var(--accent)`).
* Full `prefers-reduced-motion` graceful degradation to static states.
* Semantic HTML5 elements (`<header>`, `<main>`, `<section>`, `<nav>`, `<footer>`, `<button>`).
