import Link from "next/link";

export default function NotFound() {
  return (
    <section className="relative flex min-h-[70vh] flex-col items-center justify-center overflow-hidden px-5 text-center">
      <div className="halo-gold pointer-events-none absolute inset-0" />
      <p className="font-display text-[8rem] leading-none text-gold-ink/80 sm:text-[12rem]">404</p>
      <p className="mt-2 max-w-md text-stone">
        This page has drifted off. Let&rsquo;s get you back to your glow.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex items-center justify-center rounded-pill bg-gold px-7 py-3 text-xs font-medium uppercase tracking-[0.14em] text-obsidian transition-[transform,background-color] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] hover:bg-gold-bright active:scale-[0.97]"
      >
        Return home
      </Link>
    </section>
  );
}
