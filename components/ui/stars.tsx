import { cn } from "@/lib/utils";

export function Stars({
  rating = 5,
  className,
  size = 14,
}: {
  rating?: number;
  className?: string;
  size?: number;
}) {
  return (
    <span
      className={cn("inline-flex items-center gap-0.5", className)}
      role="img"
      aria-label={`${rating} out of 5 stars`}
    >
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill={i < Math.round(rating) ? "currentColor" : "none"}
          stroke="currentColor"
          strokeWidth="1.2"
          className="text-gold"
          aria-hidden="true"
        >
          <path d="M12 2.5l2.9 5.9 6.5.95-4.7 4.58 1.1 6.47L12 17.4l-5.8 3.07 1.1-6.47-4.7-4.58 6.5-.95z" />
        </svg>
      ))}
    </span>
  );
}
