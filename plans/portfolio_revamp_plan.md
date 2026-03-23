# 🚀 Portfolio Revamp Plan: Monochromatic Neo-Analog

## 🎯 Core Objectives
1. **Aesthetic:** Monochromatic, neo-analog vibe (high contrast, film grain, digital/physical blend).
2. **Interactivity:** Smooth parallax scrolling using `framer-motion`.
3. **UI Libraries:** Integrate **Aceternity UI** (for complex interactive moments) and **DaisyUI** (for solid, accessible base components).
4. **Media Utilization:** Effectively display existing `.mov`, `.mpg`, and image assets using creative filters (e.g., grayscale default, color on hover).
5. **Responsiveness:** Fluid scaling across all device sizes.
6. **Performance:** Super optimized (lazy loading, optimized media, hardware-accelerated animations).

---

## 📋 Execution Phases & Checkpoints

### Phase 1: Foundation & Theme Setup
- [x] Install `daisyui` and add it to `tailwind.config` / `postcss.config` / `eslint.config` ecosystem if needed.
- [x] Configure a strict monochromatic custom theme in DaisyUI (`#000000`, `#ffffff`, varying grays).
- [x] Strip out existing complex backgrounds (`InteractiveGradientBackground`, `OceanBackground`, `BigBangBackground`).
- [x] Remove forced timeouts and slow intro animations from `HomeClient.tsx`.
- [x] Create a global CSS noise/film grain overlay for the "neo-analog" texture.

### Phase 2: Layout Architecture & Parallax
- [x] Restructure `HomeClient.tsx` to support a continuous scroll layout without bouncy layout shifts.
- [x] Implement Framer Motion `useScroll` and `useTransform` hooks for global parallax context.
- [x] Wrap main sections (`About`, `Highlights`, `Projects`, `Contact`) in parallax containers.
- [x] Replace hardcoded breakpoint max-widths with fluid, standard Tailwind grid/flex layouts.

### Phase 3: Component Integration (Aceternity + DaisyUI)
- [x] Integrate DaisyUI base components (buttons, cards, inputs) and strip default colors to match the monochrome theme.
- [x] Select and implement 1-2 Aceternity components for the Hero or Highlights section.
- [x] Adapt Aceternity components to strictly follow the high-contrast, non-neon styling.
- [x] Update Typography: Implement a stark Sans-serif for headings and Monospace for technical details.

### Phase 4: Media Integration & Optimization
- [x] Audit all files in `/public` (`.mov`, `.mpg`, images).
- [x] Create a reusable `<MediaViewer />` component for videos/images.
- [x] Implement CSS filters (`grayscale`, `contrast`) on media with hover states revealing original colors.
- [x] Ensure all `<video>` tags use `preload="none"` or efficient autoplay mechanics without blocking the main thread.
- [x] Wrap all static images in Next.js `<Image>` components for automatic WebP conversion and sizing.

### Phase 5: Polish, Accessibility & Testing
- [x] Perform a full responsive audit (Mobile, Tablet, Desktop).
- [x] Ensure all heavy animations respect `prefers-reduced-motion` for accessibility.
- [x] Rewrite the "About" copy to sound more authoritative (e.g., remove "aspiring").
- [x] Run Lighthouse performance audit and optimize any remaining bottlenecks.

---
*Note: We will update these checkboxes as we progress through the revamp.*