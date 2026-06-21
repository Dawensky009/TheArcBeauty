// Shared Motion (framer) primitives — easing + variants.
// Emil Kowalski: strong custom curves, enter = ease-out, short stagger.
import type { Variants, Transition } from "motion/react";

// Strong ease-out (cubic-bezier 0.23, 1, 0.32, 1)
export const easeOutStrong = [0.23, 1, 0.32, 1] as const;
export const easeInOutStrong = [0.77, 0, 0.175, 1] as const;

export const baseTransition: Transition = {
  duration: 0.6,
  ease: easeOutStrong,
};

/** Fade + rise. Nothing appears from nothing — small offset, never scale(0). */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: baseTransition },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.7, ease: easeOutStrong } },
};

/** Container that staggers children by 60ms (Emil: 30–80ms). */
export const staggerContainer: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.06, delayChildren: 0.04 },
  },
};

/** Clip-path reveal (Emil: image reveals on scroll). */
export const clipReveal: Variants = {
  hidden: { clipPath: "inset(0 0 100% 0)" },
  show: {
    clipPath: "inset(0 0 0% 0)",
    transition: { duration: 0.9, ease: easeOutStrong },
  },
};

// Viewport config reused across scroll reveals.
export const viewportOnce = { once: true, margin: "-80px" } as const;
