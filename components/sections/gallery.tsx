import { SectionHeader } from "@/components/ui/section-header";
import { Placeholder } from "@/components/visual/placeholder";
import { Reveal } from "@/components/ui/reveal";
import { GALLERY_IMAGES } from "@/lib/images";
import { cn } from "@/lib/utils";
import type { Dictionary, Locale } from "@/lib/i18n";
import type { Tone } from "@/lib/data";

const LAYOUT = ["col-span-2 row-span-2", "", "", "", "", "col-span-2", "col-span-2"];
const TONES: Tone[] = ["rose", "ocean", "amber", "sage", "plum", "sand", "espresso"];

export function Gallery({ dict }: { locale: Locale; dict: Dictionary }) {
  const g = dict.gallery;

  return (
    <section className="bg-cream-deep py-14 lg:py-28">
      <div className="mx-auto max-w-[88rem] px-5 lg:px-8">
        <SectionHeader eyebrow={g.eyebrow} title={g.title} />

        <Reveal className="mt-14">
          <div className="grid auto-rows-[11rem] grid-cols-2 gap-4 md:grid-cols-4 lg:auto-rows-[14rem]">
            {GALLERY_IMAGES.map((src, i) => (
              <Placeholder
                key={i}
                tone={TONES[i]}
                kind="scene"
                fill
                src={src}
                alt="The Arc Beauty — treatments and glow"
                sizes="(max-width: 768px) 50vw, 25vw"
                className={cn("rounded-card", LAYOUT[i])}
              />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
