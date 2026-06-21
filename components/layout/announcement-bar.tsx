"use client";

import { usePathname } from "next/navigation";

export function AnnouncementBar({ text }: { text: string }) {
  const pathname = usePathname();
  // Hide on the home page so the full-bleed hero starts at the very top.
  if (/^\/(en|es)\/?$/.test(pathname || "")) return null;

  return (
    <div className="relative z-40 bg-cream-deep text-center">
      <p className="eyebrow mx-auto max-w-5xl px-4 py-2.5 text-stone">{text}</p>
      <div className="rule-gold opacity-40" />
    </div>
  );
}
