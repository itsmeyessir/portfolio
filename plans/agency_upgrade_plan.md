# 🚀 Ultra-Premium Agency Upgrade Plan

## 🎯 Core Objectives
1. **Momentum Physics:** Implement buttery smooth, inertia-based scrolling to match top-tier agency websites (like Nfinitepaper).
2. **Depth & Parallax:** Transition from section-level parallax to inner "window" parallax for media elements.
3. **Scrollytelling:** Add massive, scroll-linked typography that reacts to the user's scroll position.
4. **Sticky Layouts:** Introduce sticky headers and dynamic layouts to create a highly engaging visual pacing.
5. **Efficiency:** Keep the site lightning fast and fully accessible while adding these high-end effects.

---

## 📋 Execution Phases & Checkpoints

### Phase 1: The Physics Engine (Smooth Scrolling)
- [x] Install `lenis` or `@studio-freight/react-lenis`.
- [x] Create a `SmoothScrolling` provider component wrapping the Next.js layout.
- [x] Configure Lenis for the optimal balance of smoothness, inertia, and responsiveness.
- [x] Ensure the scrolling engine automatically disables itself if `prefers-reduced-motion` is active.

### Phase 2: Inner "Window" Parallax Media
- [x] Update `ProjectsSection` media containers to use strict `overflow-hidden`.
- [x] Apply `framer-motion` `useScroll` and `useTransform` to slightly scale and vertically translate the `<Image>` and `<video>` tags *inside* their containers based on scroll progress.
- [x] Replicate the exact same inner parallax effect for the `HighlightsSection` Bento Grid media headers.

### Phase 3: Scroll-Linked Typography
- [x] Design massive, subtle background typography (e.g., "SOFTWARE ENGINEER", "DATA SCIENTIST") to sit behind the main content sections.
- [x] Tie the X-axis (horizontal) translation of this typography directly to the Y-axis (vertical) scroll position.
- [x] Ensure Z-indexes are strictly layered so this background text doesn't block foreground interactivity.

### Phase 4: Sticky Pacing & Layout Refinements
- [x] Implement `position: sticky` on specific section headers (like "Projects") so they stay pinned to the top of the screen while the cards scroll past.
- [x] Adjust global spacing (`padding` and `margins`) to perfectly accommodate the new sticky visual pacing.

### Phase 5: Polish & Performance Audit
- [x] Test Lenis scrolling on simulated mobile devices to ensure touch events remain natural and aren't hijacked poorly.
- [x] Run a Lighthouse audit to guarantee the new physics engine and scroll listeners don't degrade our production performance score.
- [x] Verify that all new animations are strictly hardware-accelerated (`transform` and `opacity` only).

---
*Note: We will track and update these checkboxes as we progress through the Nfinitepaper-inspired upgrade.*