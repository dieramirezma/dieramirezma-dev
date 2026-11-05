---
name: Diego Ramírez — Portfolio
description: A ruled, editorial engineering notebook in warm ink and paper, with one vermilion signal.
colors:
  ink: '#0e0e0c'
  ink-raised: '#161613'
  bone: '#ecebe5'
  bone-muted: '#9a988f'
  bone-subtle: '#85837b'
  rule-dark: '#2a2925'
  rule-strong-dark: '#4a4842'
  vermilion: '#ff5a2e'
  paper: '#f3f1ea'
  paper-raised: '#e9e6dc'
  graphite: '#151513'
  graphite-muted: '#5c5a53'
  graphite-subtle: '#65625a'
  rule-light: '#d6d2c6'
  rule-strong-light: '#a9a59a'
  vermilion-light: '#c23a12'
  moss: '#5fbf7a'
  moss-light: '#2f8a4a'
  ember: '#f0705f'
  ember-light: '#b42318'
typography:
  display:
    fontFamily: 'Sofia Sans Condensed, ui-sans-serif, system-ui, sans-serif'
    fontSize: 'clamp(2.5rem, 5.5vw, 4.75rem)'
    fontWeight: 300
    lineHeight: 1.02
    letterSpacing: '-0.01em'
  headline:
    fontFamily: 'Sofia Sans Condensed, ui-sans-serif, system-ui, sans-serif'
    fontSize: 'clamp(2rem, 3.5vw, 3rem)'
    fontWeight: 300
    lineHeight: 1.05
    letterSpacing: '-0.005em'
  title:
    fontFamily: 'Sofia Sans Condensed, ui-sans-serif, system-ui, sans-serif'
    fontSize: 'clamp(1.75rem, 2.5vw, 2.25rem)'
    fontWeight: 400
    lineHeight: 1.1
    letterSpacing: '-0.005em'
  lead:
    fontFamily: 'Geist, ui-sans-serif, system-ui, sans-serif'
    fontSize: 'clamp(1.125rem, 1.6vw, 1.3125rem)'
    fontWeight: 400
    lineHeight: 1.55
  body:
    fontFamily: 'Geist, ui-sans-serif, system-ui, sans-serif'
    fontSize: '1.0625rem'
    fontWeight: 400
    lineHeight: 1.6
  button:
    fontFamily: 'Geist, ui-sans-serif, system-ui, sans-serif'
    fontSize: '0.9375rem'
    fontWeight: 500
  label:
    fontFamily: 'Geist Mono, ui-monospace, monospace'
    fontSize: '0.75rem'
    fontWeight: 400
    lineHeight: 1.4
    letterSpacing: '0.08em'
rounded:
  sm: '2px'
spacing:
  page-gutter-sm: '20px'
  page-gutter-md: '40px'
  page-gutter-xl: '64px'
  grid-gap-x: '24px'
  grid-gap-y: '32px'
components:
  button-primary:
    backgroundColor: '{colors.bone}'
    textColor: '{colors.ink}'
    rounded: '{rounded.sm}'
    padding: '12px 20px'
  button-primary-hover:
    backgroundColor: '{colors.vermilion}'
  button-secondary:
    backgroundColor: 'transparent'
    textColor: '{colors.bone}'
    rounded: '{rounded.sm}'
    padding: '12px 20px'
  chip:
    backgroundColor: 'transparent'
    textColor: '{colors.bone-muted}'
    typography: '{typography.label}'
    rounded: '{rounded.sm}'
    padding: '2px 8px'
---

# Design System: Diego Ramírez — Portfolio

## Overview

**Creative North Star: "The Engineer's Notebook"**

The site reads like a ruled technical notebook typeset by someone who cares about type: warm near-black ink (or warm paper in light mode), hairline rules instead of boxes, a plain mono label in the margin column, and one tall, narrow, light sans voice for headlines. Information is annotated rather than decorated: mono metadata labels, numbered index rows, and a single vermilion mark that shows where attention should go.

The mood is quiet, exact and product-engineering. Density is generous at the section level (large vertical rhythm) and tight within entries. Nothing glows, floats or gradients; hierarchy comes from the contrast between a light condensed display and small mono labels, and from rules that divide the page.

This system is the incumbent implementation in `src/app/globals.css`. The blue "Kinetic Technical" palette in CLAUDE.md is not what ships and is not part of this system.

**Key Characteristics:**

- Warm monochrome ink/paper with a single vermilion accent.
- Light condensed display (Sofia Sans Condensed) over a neutral sans body (Geist) and mono labels (Geist Mono).
- 12-column editorial grid: a 3-column margin for labels, a 9-column main column.
- Hairline rules and flat surfaces; no shadows, no gradients, no cards-as-boxes.
- Dark is the primary theme; light is a true paper variant, not an inversion.

## Colors

A warm monochrome pair of themes with one hot signal color. Values below are dark first; light counterparts carry the `-light` suffix or the paper/graphite names.

### Primary

- **Vermilion Signal** (`#ff5a2e` dark / `#c23a12` light): The only accent. Used for the emphasized word in the hero headline, link and hover states, focus rings, selection, small bullet dashes in lists, and arrow icons on hover.

### Neutral

- **Ink** (`#0e0e0c`): Page background in dark mode.
- **Ink Raised** (`#161613`): Slightly lifted surface when one is needed.
- **Bone** (`#ecebe5`): Primary text in dark mode; fill of the primary button.
- **Bone Muted** (`#9a988f`): Secondary text, descriptions, chip text.
- **Bone Subtle** (`#85837b`): Tertiary text, metadata labels.
- **Rule** (`#2a2925` dark / `#d6d2c6` light): Hairline dividers, section borders, chip borders.
- **Rule Strong** (`#4a4842` dark / `#a9a59a` light): Secondary-button border and emphasized dividers.
- **Paper** (`#f3f1ea`): Page background in light mode. **Paper Raised** (`#e9e6dc`) is its lifted surface.
- **Graphite** (`#151513`), **Graphite Muted** (`#5c5a53`), **Graphite Subtle** (`#65625a`): Light-mode text tiers.

### Semantic

- **Moss** (`#5fbf7a` dark / `#2f8a4a` light): Success and live/online indicators. **Ember** (`#f0705f` dark / `#b42318` light): Errors.

### Named Rules

**The One Voice Rule.** Vermilion appears on a small fraction of any screen. Its rarity is the point; if two things on a screen are vermilion at rest, one of them is wrong.

**The Warm Neutral Rule.** Neutrals are warm-tinted, never pure black or pure white or cool gray.

## Typography

**Display Font:** Sofia Sans Condensed 300/400 (fallback ui-sans-serif, system-ui)
**Body Font:** Geist (fallback ui-sans-serif, system-ui)
**Label/Mono Font:** Geist Mono (fallback ui-monospace)

**Character:** A tall, narrow, light sans with rounded curves carries headlines, company and project names; a plain sans handles reading; mono handles anything that is metadata, a stack list or a timestamp. The signature is vertical elegance at moderate sizes, not scale: no headline needs to shout.

### Hierarchy

- **Display** (300, `clamp(2.5rem, 5.5vw, 4.75rem)`, 1.02, balanced): The single hero headline, two lines on desktop. No italic, no accent-colored word.
- **Headline** (300, `clamp(2rem, 3.5vw, 3rem)`, 1.05, balanced): The featured project title and the Contact title (`.h2`). The Work section heading is a smaller display line (1.5–1.875rem, 300) so the featured project outranks it. Other sections use the mono label as their heading.
- **Title** (400, 2.25rem to 3rem, about 1.1): Company names, project names in the index.
- **Lead** (400, `clamp(1.125rem, 1.6vw, 1.3125rem)`, 1.55, muted): Section intros, max about 46 to 52ch.
- **Body** (400, 1.0625rem, 1.6): Running text; bullets cap near 60 to 68ch.
- **Button** (500, 0.9375rem / 15px, normal tracking): Button text only.
- **Label** (400, 0.75rem / 12px, +0.08em, uppercase, mono, subtle): Section labels in the margin column, dates, stack lines, and the small captions inside live widgets. 12px is the floor for any text; nothing smaller ships.

### Named Rules

**The Quiet Headline Rule.** Only the hero, the Work intro line, the featured project and Contact get a display or headline-size title; every other section is announced by its mono label alone. Light weight (300) only at 2rem and above; titles below that use 400.

## Layout

A 12-column editorial grid (`.editorial-grid`) with a 24px column gap and 32px row gap. At 1024px and up, the left 3 columns hold a margin label (section marker, dates) and the right 9 hold content. Below that it stacks to a single column. The page container is capped at 1320px with gutters of 20px (mobile), 40px (768px+) and 64px (1280px+).

Sections are separated by a full-width 1px rule and generous vertical padding (`clamp(4rem, 8vw, 7rem)`). Within a section, entries are separated by hairlines and 40 to 56px of padding. Hero top padding clears the fixed 64px header. Smooth scroll with 5rem scroll padding for anchor navigation.

## Elevation & Depth

Flat by design. Depth is conveyed only by hairline rules, one raised tone (`Ink Raised` / `Paper Raised`), and the fixed header's 90% background with backdrop blur over a bottom rule. There are no box shadows anywhere.

### Named Rules

**The Flat-By-Default Rule.** No shadows or gradients. State changes are shown by color and border shifts, a link underline growing in, or a 2px–8px nudge.

## Shapes

Almost square. Buttons and chips use a 2px radius; containers are bordered rectangles or have no container at all, only rules. Circles appear only for status dots. Borders are always 1px.

## Components

Flat, ruled and exact.

### Buttons

- **Shape:** 2px radius, 1px border, 12px by 20px padding, 15px medium-weight text, optional 16px Lucide icon with 8px gap.
- **Primary:** Fill Bone (Graphite in light), text Ink; hover fills and borders Vermilion.
- **Secondary:** Transparent with a Rule Strong border; hover brightens the border to full foreground.
- **Transition:** 200ms on background, color and border; never transforms or shadows.

### Chips

- **Style:** Transparent, 1px Rule border, 2px radius, Geist Mono 12px in Bone Muted, padding 2px by 8px. Non-interactive tags only.

### Projects (Work)

- **Style:** Two tiers. A featured project spans the grid: text in 4 columns and its architecture diagram in 8 from 1280px; stacked from 768px with the diagram always visible; behind the toggle only below 768px. Secondary projects sit in a 3-column ruled grid (stacked on mobile) with context, title, summary, mono stack, Case study and external links, and a `+ View architecture` toggle. On large screens a secondary diagram opens full-width below the grid; below `lg` it opens inline in a horizontally scrollable panel. An optional screenshot renders above a project only when a real image exists.

### Navigation

- **Style:** Fixed 64px header, 90% background with blur and a bottom rule; display wordmark "Diego Ramírez" at left, muted 14px sans links with a growing 1px underline, mono uppercase résumé / language / theme controls at right. It hides on scroll down and reappears on scroll up. Mobile uses a full-height overlay with light display 36px links separated by rules.

### Activity cards

- **Style:** A compact strip near the footer under its own mono `h2`: three ruled columns, side padding on the column wrappers, each with a mono title, a 14px Lucide icon and a profile arrow that turns vermilion on hover. Content is one or two lines per service: Spotify's last or current track (equalizer bars only while playing, static under reduced motion) and chess ratings as a mono `label value` list. No deltas, win-rate bars, follower counts or hours played. Live states use moss, never the error color.

## Do's and Don'ts

### Do:

- **Do** open sections with a mono label in the 3-column margin and, only where the section needs one, a light display headline in the main column. No section numbers.
- **Do** use the vermilion accent sparingly, on emphasis, focus and hover only.
- **Do** separate content with 1px rules rather than boxes or shadows.
- **Do** show every focus state: a 2px vermilion outline with a 3px offset.
- **Do** honor `prefers-reduced-motion` (animations and transitions collapse to near-zero).
- **Do** crossfade theme changes: a 450ms view transition on the root, with a 400ms color/border transition as the fallback, and an instant switch under reduced motion.
- **Do** keep stack lines and metadata in Geist Mono.
- **Do** keep diagram text at 12px or more at its rendered scale (SVG labels 12–13 user units, diagrams never narrower than their viewBox below 768px).

### Don't:

- **Don't** use the CLAUDE.md "Kinetic Technical" blue (`#3b82f6`) or pure black (`#000`) anywhere; they are not part of the shipped system.
- **Don't** add shadows, gradients, glows or rounded cards.
- **Don't** fill a section with decorative statistics, `Fig.` labels or filler labels; headline stat strips are not part of this system.
- **Don't** use more than one accent color.
- **Don't** use the display face below 1.25rem, set it in italic, or color a headline word with the accent.
- **Don't** reintroduce a serif; the system has no serif role.
