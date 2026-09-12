import { motion } from "framer-motion";
import { Flame } from "lucide-react";

type Props = {
  items: string[];
  variant?: "primary" | "accent";
  compact?: boolean;
};

export function MarqueeRibbon({ items, variant = "primary", compact = false }: Props) {
  const loop = [...items, ...items, ...items];
  const bg = variant === "primary" ? "bg-primary" : "bg-accent";
  const fg = variant === "primary" ? "text-primary-foreground" : "text-accent-foreground";
  const paddingY = compact ? "py-2 md:py-2.5" : "py-4";
  const iconSize = compact ? "h-5 w-5" : "h-6 w-6";
  const flameSize = compact ? "h-2.5 w-2.5" : "h-3 w-3";
  const textSize = compact ? "text-[0.68rem]" : "label-eyebrow";

  return (
    <div className={`${bg} ${fg} overflow-hidden border-y border-primary/40`}>
      <motion.div
        className={`flex items-center gap-8 whitespace-nowrap ${paddingY}`}
        animate={{ x: ["0%", "-33.333%"] }}
        transition={{ duration: 35, ease: "linear", repeat: Infinity }}
      >
        {loop.map((it, i) => (
          <span
            key={i}
            className="inline-flex shrink-0 items-center gap-3.5 text-current"
          >
            <span className={`inline-flex ${iconSize} shrink-0 items-center justify-center rounded-full border border-current/40 bg-current/10`}>
              <Flame className={flameSize} />
            </span>
            <span className={`${textSize} uppercase font-semibold tracking-wider text-current opacity-95`}>{it}</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}

