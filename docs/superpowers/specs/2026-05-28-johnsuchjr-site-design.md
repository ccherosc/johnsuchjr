# JohnSuchJr.com — Site Design Spec
**Date:** 2026-05-28  
**Status:** Approved by user  

---

## Overview

A single-page personal brand site for John Such Jr. — channel marketing leader, AI practitioner, futurist, builder, and dad. Inspired by aliabdaal.com. Bold dark hero cover, clean white sub-sections below. Mobile-first. Single `index.html` with all styles via Tailwind CDN.

**Goal:** Not a polished shrine. A digital campfire. Connects John's professional career, personal projects, family, and voice in one approachable home base.

---

## Visual Design System

### Colors (custom — no default Tailwind palette)
| Token | Hex | Usage |
|---|---|---|
| Navy Dark | `#0d2d52` | Hero bg, footer bg, nav on scroll |
| Brand Blue | `#1a6fb5` | Primary CTA, accents, links, underlines |
| Blue Hover | `#1558a0` | Button hover state |
| White | `#ffffff` | Primary section backgrounds |
| Off-White | `#f4f8fc` | Alternating section backgrounds |
| Text Dark | `#1a2940` | Body headings |
| Text Mid | `#4a6a82` | Body copy |
| Text Light | `#6b8fa8` | Captions, meta |

### Typography
- **Display / Headings:** Playfair Display (Google Fonts, serif) — tight tracking (`-0.03em`), used for section titles and hero statement
- **Body / UI:** Inter (Google Fonts, sans-serif) — `line-height: 1.7` for body, clean for nav and labels
- **Scale:** Hero headline ~56–64px, section titles ~36–40px, body ~16–17px

### Shadows
- Cards: `box-shadow: 0 4px 24px rgba(13,45,82,0.08), 0 1px 4px rgba(13,45,82,0.04)`
- Nav (scrolled): `box-shadow: 0 2px 16px rgba(13,45,82,0.12)`

### Images
- Logo: `images/JohnSuchJrLogo1.png` — apply `filter: brightness(0) invert(1)` on dark sections (hero, footer nav), use as-is on light sections
- Headshot: `images/john-such.jpg` — used in hero with gradient overlay treatment
- Project screenshots: `images/projects/` — taken via Puppeteer at build time
- Family photos: `images/family/` — placeholder slots; user populates manually

---

## Page Architecture

Single scrolling page (`index.html`). All sections reachable via sticky nav anchor links. Served locally via `node serve.mjs`.

### Section Order
1. Sticky Navigation
2. Hero Cover *(dark navy)*
3. About Me *(white)*
4. Connect & Social *(off-white)*
5. Family & Life *(white)*
6. Resume & Career *(off-white)*
7. Projects *(white)*
8. Interview FAQ *(off-white)*
9. Footer *(dark navy)*

---

## Section Specs

### 1. Sticky Navigation
- **Background:** transparent → `#0d2d52` with `backdrop-filter: blur(12px)` on scroll
- **Left:** JohnSuchJr logo (color version, ~120px wide)
- **Right:** anchor links (About, Connect, Family, Resume, Projects, FAQ) + prominent "Download Resume" button (always visible, brand blue)
- **Mobile:** hamburger menu, full-width dropdown with all links
- **Behavior:** sticks at top, transitions on scroll, active section link highlighted

### 2. Hero Cover
- **Background:** `#0d2d52` with layered radial gradients + subtle SVG grain texture
- **Layout:** Two-column — left: text; right: headshot
- **Left content:**
  - Small label: "Welcome to johnsuchjr.com" in brand blue
  - Headline: "Futurist. Marketer. Builder." (Playfair Display, large, white)
  - Subtitle: "25+ years at the intersection of technology, marketing, and what's next."
  - Two CTA buttons: "About Me" (filled blue) + "View Resume" (outline white)
  - Social icon row: LinkedIn, Facebook, Instagram
- **Right content:** Headshot in a slightly tilted frame with `mix-blend-multiply` color overlay + gradient bottom fade
- **Mobile:** stacks vertically, photo above text

### 3. About Me
- **Background:** white
- **Content:**
  - Section title: "About Me"
  - Opening paragraphs drawn from `About John Such Jr.pdf` — written in John's direct, campfire voice
  - Interests grid (2×4 or 4×2): AI & Technology · Marketing & Strategy · History & Culture · Gaming · 3D Printing · Renaissance Faire · Storytelling · Building Things
  - Each interest is a small card with an icon and one-line label

### 4. Connect & Social
- **Background:** `#f4f8fc`
- **Content:**
  - Section title: "Let's Connect"
  - Short intro: "Find me where I spend time online."
  - Three platform cards (LinkedIn, Facebook, Instagram) — each with platform icon, handle, brief descriptor, and a "Visit Profile" button
    - LinkedIn: `linkedin.com/in/johnsuchjr` — "Professional work, channel marketing, AI thinking"
    - Facebook: `facebook.com/john.such` — "Personal updates and family life"
    - Instagram: `instagram.com/ccherosc` — "Photos and moments"
- **Sticky social sidebar (desktop):** Thin vertical strip on left edge — LinkedIn, Facebook, Instagram icon buttons, always visible, fixed position
- **Mobile social bar:** Fixed bottom strip with same three icons

### 5. Family & Life
- **Background:** white
- **Content:**
  - Section title: "Family & Life"
  - Intro paragraph: About Yve (wife), JT and Bryson (sons) — warm, personal, written in John's voice
  - Photo grid: 2×3 grid of image slots (labeled "Family Photo 1–6") using `images/family/placeholder.jpg` fallback
  - Caption below grid: "Based in Simpsonville, SC. Blessed with good people."
- **Note:** User to manually populate `images/family/` with downloaded photos from Facebook/LinkedIn

### 6. Resume & Career
- **Background:** `#f4f8fc`
- **Content:**
  - Section title: "Resume & Career"
  - Large "Download Resume" button (PDF link to `assets/John Such 2026 Resume.pdf`)
  - Embedded PDF viewer: `<iframe>` pointing to the resume PDF, ~700px tall, with `<a>` fallback for mobile
  - Career highlights strip (6 stat cards):
    1. 25+ Years Experience
    2. $2M+ First-Year Digital Revenue
    3. $6M Digital Growth by 2020
    4. 38,575 Hours of Projected AI Efficiency
    5. $1.3M in Projected AI Savings
    6. $350K RENEWSolv Growth (from $15K)

### 7. Projects
- **Background:** white
- **Content:**
  - Section title: "Projects"
  - Intro: adapted from `myprojects.pdf` opening ("Some people collect stamps. I collect ideas…")
  - Project card grid (2-col desktop, 1-col mobile):
    - Each card: screenshot thumbnail (Puppeteer-captured, ~400×250px) + status dot (top-right corner of image) + project name + short description + live link
  - **Status dot colors:**
    - 🟢 Green: PandaDumpsters, Art's Dominos, Buzzard Roost Daily Cast
    - 🟡 Yellow: ShowMeResultsOnly, MarketMattersOnline, GoldenStripUnite, Angln
  - **Projects list:**
    1. Show Me Results Only — showmeresultsonly.com — Yellow
    2. Panda Dumpsters — pandadumpsters.com — Green
    3. Market Matters Online — marketmattersonline.com — Yellow
    4. Golden Strip Unite — goldenstripunite.com — Yellow
    5. Art's Dominos — ccherosc.github.io/ArtsDominos-v2/ — Green
    6. Angln — angln.com — Yellow
    7. Buzzard Roost Daily Cast — buzzard-roost-daily-cast-v2.pages.dev — Green

### 8. Interview FAQ
- **Background:** `#f4f8fc`
- **Content:**
  - Section title: "Frequently Asked"
  - Subtitle: "Questions I get asked a lot. Answered like a human."
  - Accordion component: click to expand each Q&A
  - 20 questions written in John's direct, casual voice (per `writing-profile.md`)
  - Questions are general career/life/values questions — **not** specific interview prep content
  - Sample topics (derived from background, not the interview notes document):
    1. Tell me about yourself
    2. What do you actually do for work?
    3. How do you explain AI to people who are scared of it?
    4. What's the best career advice you've ever gotten?
    5. How did you get into marketing?
    6. What does a typical workday look like for you?
    7. What's one thing you wish you'd done earlier in your career?
    8. How do you stay current with AI and tech?
    9. What's your leadership style?
    10. What kind of problems do you like to solve?
    11. How do you balance work and family?
    12. What projects are you most proud of?
    13. What tools do you use every day?
    14. How do you think about building a personal brand?
    15. What does success look like to you?
    16. What's your approach to learning new skills?
    17. How do you handle a project that isn't working?
    18. What do you look for in a great team?
    19. Where do you see AI going in the next five years?
    20. What's something most people don't know about you?

### 9. Footer
- **Background:** `#0d2d52`
- **Content:**
  - Logo (`images/JohnSuchJrLogo1.png` with `filter: brightness(0) invert(1)` for dark bg)
  - Nav links: About · Connect · Family · Resume · Projects · FAQ
  - Social icons: LinkedIn, Facebook, Instagram
  - Copyright: © 2026 JohnSuchJr.com

---

## Technical Approach

| Concern | Approach |
|---|---|
| Styles | Tailwind CSS via CDN + custom CSS variables for brand tokens |
| Fonts | Google Fonts (Playfair Display + Inter) |
| Smooth scroll | CSS `scroll-behavior: smooth` on `<html>` |
| Sticky nav | `position: sticky; top: 0; z-index: 50` with JS scroll class toggle |
| PDF embed | `<iframe src="assets/John Such 2026 Resume.pdf">` with `<a>` fallback |
| Project screenshots | `screenshot-projects.mjs` script — Puppeteer captures each live URL at 1280×800, saves to `images/projects/<slug>.png` |
| Floating social | Fixed `<div>` on left edge (desktop), fixed bottom strip (mobile), hidden via responsive classes |
| Images | `images/john-such.jpg` (hero), `images/JohnSuchJrLogo1.png` (nav/footer), `images/family/` (placeholders), `images/projects/` (screenshots) |
| Animations | `transform` + `opacity` transitions only. Spring-style easing. No `transition-all`. |
| Dev server | `node serve.mjs` at `http://localhost:3000` |

---

## File Structure

```
c:/Project_johnsuchjr/
├── index.html
├── serve.mjs
├── screenshot.mjs
├── images/
│   ├── john-such.jpg
│   ├── JohnSuchJrLogo1.png
│   ├── family/          ← user populates manually
│   └── projects/        ← Puppeteer-generated at build time
├── assets/
│   ├── John Such 2026 Resume.pdf
│   ├── About John Such Jr.pdf
│   └── myprojects.pdf
└── docs/
    └── superpowers/specs/
        └── 2026-05-28-johnsuchjr-site-design.md
```

---

## Content Notes

- **Voice:** All written content follows `writing-profile.md` — direct, casual, short sentences, no jargon, no fluff
- **About text:** Adapted from `About John Such Jr.pdf` — keep the campfire metaphor and "Part futurist. Part marketer." framing
- **Career numbers:** Pulled from `John Such 2026 Resume.pdf` — always lead with business value
- **Projects text:** Adapted from `myprojects.pdf`
- **FAQ answers:** Written fresh from background knowledge — explicitly not recycled from the interview prep document (`JOHN SUCH INFO.pdf`)
- **Family section:** Written warmly; Yve (wife), JT and Bryson (sons), Simpsonville SC

---

## Out of Scope

- CMS or blog functionality
- Contact form (social links handle this)
- Authentication
- Analytics (can be added later via script tag)
