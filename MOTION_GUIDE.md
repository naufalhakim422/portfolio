# MOTION & INTERACTION LANGUAGE SPECIFICATION
**Naufal Hakim — Creative Developer & Full-Stack Engineer**

---

## 1. Core Animation Philosophy: "Purposeful Elegance"

Every animation within this portfolio serves a specific communicative or tactile purpose. We follow the principle of **Slow where cinematic, Fast where interactive**:
* **Cinematic Storytelling (Scroll & Entrance)**: Fluid, weighted reveals that guide reading flow (`duration: 0.8s – 1.4s`, `ease: power3.out` / `expo.out`).
* **Micro-interactions (Hover, Tap, Toggle)**: Instantaneous, tactile feedback using spring physics (`stiffness: 300`, `damping: 25`) with zero perceptual latency.

---

## 2. Technology Role Matrix

| Technology | Scope & Responsibility | Implementation Pattern |
|---|---|---|
| **GSAP Core** | Complex timelines, text unmasking, image clip-path reveals, page transitions | `gsap.timeline()`, `useGSAP({ scope })` |
| **GSAP ScrollTrigger** | Viewport entry tracking, scrubbed parallax, pinned narratives | `scrollTrigger: { trigger, start, scrub }` |
| **Lenis** | Momentum smooth scrolling, unified frame synchronization | `gsap.ticker.add((time) => lenis.raf(time * 1000))` |
| **Motion (`motion/react`)** | Interactive UI state toggles, springs, button taps, micro-hover scales | `<motion.button whileHover={{ scale }} />` |
| **CSS Transforms** | Lightweight state transitions, link underlines, standard hover borders | `transition-all duration-300 ease-editorial` |

---

## 3. Standard Motion Tokens & Presets

```javascript
export const MOTION_TOKENS = {
  duration: {
    instant: 0.15,   // Micro-taps, active click states
    fast: 0.35,      // Hover states, magnetic spring release, tooltips
    normal: 0.8,     // Standard viewport element entrances
    slow: 1.2,       // Editorial text & image unmasking
    cinematic: 1.6,  // Monumental hero entrances & route wipes
  },
  ease: {
    editorial: 'power3.out',                   // Clean deceleration
    editorialSlow: 'power4.out',               // Weighty deceleration
    cinematic: 'expo.out',                     // Dramatic deceleration
    smooth: 'power2.out',                      // Gentle curve
    spring: { type: 'spring', stiffness: 300, damping: 25 },
  },
  stagger: {
    dense: 0.02,     // Character typography reveals
    normal: 0.04,    // Word typography reveals
    loose: 0.08,     // Card and project list items
  },
  distance: {
    subtle: 15,      // Micro-offsets
    normal: 35,      // Standard upward viewport entrance
    deep: 70,        // Hero & section transition offsets
  },
};
```

---

## 4. Reusable Motion Primitives Reference

### A. `<Reveal />`
* **Purpose**: Viewport entrance for layout containers and cards.
* **Props**: `direction` (`up` | `down` | `left` | `right` | `none`), `distance`, `duration`, `delay`, `scale`, `stagger`, `start`, `once`.

### B. `<TextReveal />`
* **Purpose**: Split typography unmasking by `word`, `character`, or `line`.
* **Technique**: Spans are wrapped in `inline-block overflow-hidden` masks to prevent reflows and layout shifting.

### C. `<ImageReveal />`
* **Purpose**: Cinematic image unmasking on scroll.
* **Technique**: Synchronizes an outer `clip-path` unmasking (`clip-up`, `clip-right`, `curtain`) with an inner counter-scaling image transform (`scale: 1.25 -> 1.0`).

### D. `<Parallax />`
* **Purpose**: Smooth depth layer scrolling.
* **Technique**: GSAP ScrollTrigger scrub bound directly to element's `yPercent` or `xPercent`.

### E. `<Magnetic />`
* **Purpose**: Subtle tactile attraction on desktop pointer hover.
* **Technique**: High-performance GSAP `quickTo` setters on `x` and `y` displacement. Automatically disabled on touch screens.

---

## 5. Custom Cursor System & States

The cursor tracks the pointer at 60 FPS using `gsap.quickTo()` interpolation with a center focal dot and an adaptive follower ring.

| Cursor State | Visual Presentation | Typical Trigger Target |
|---|---|---|
| `DEFAULT` | 8px translucent ring | Standard canvas background |
| `LINK` | 14px subtle expanded ring | Text links, navigation items, icons |
| `VIEW` | 80px pill badge with uppercase text ("EXPLORE" / "INSPECT") | Project cards, image galleries |
| `PROJECT` | 96px high-contrast accent badge ("VIEW CASE") | Featured project hero showcases |
| `DRAG` | 64px muted grab indicator | Horizontal carousels, slider interfaces |

---

## 6. Page Transition Infrastructure

* **Lifecycle**:
  1. Trigger event intercepted by `<TransitionLink>` or `usePageTransition()`.
  2. Exit curtain wipes upward (`scaleY: 0 -> 1`, `transformOrigin: bottom`, `duration: 0.6s`).
  3. Next.js router navigates to destination route.
  4. Enter curtain reveals new page (`scaleY: 1 -> 0`, `transformOrigin: top`, `duration: 0.6s`).
* **Reduced Motion**: Automatically skips curtain animation and navigates instantly.

---

## 7. Reduced Motion (`prefers-reduced-motion: reduce`) Compliance

Accessibility is mandatory. When the user enables reduced motion in their OS or browser:
1. **Lenis Momentum Scroll**: Instantly bypassed, defaulting to native browser instant scrolling.
2. **GSAP & Motion Animations**: Transforms are zeroed, durations clamped to 0.01ms, and opacity set directly to 1.
3. **Parallax & Magnetic Physics**: Completely disabled to prevent vestibular disorientation.
4. **Custom Cursor**: Hidden, letting the native OS pointer operate uninterrupted.
5. **Content Visibility**: 100% of text and imagery remains immediately visible.
