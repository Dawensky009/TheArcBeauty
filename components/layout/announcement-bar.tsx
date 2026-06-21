export function AnnouncementBar({ text }: { text: string }) {
  return (
    <div className="relative z-40 bg-cream-deep text-center">
      <p className="eyebrow mx-auto max-w-5xl px-4 py-2.5 text-stone">
        {text}
      </p>
      <div className="rule-gold opacity-40" />
    </div>
  );
}
