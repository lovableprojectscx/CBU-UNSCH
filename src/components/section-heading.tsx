import type { ReactNode } from "react";

type Props = {
  number: string;
  eyebrow: string;
  children: ReactNode;
};

export function SectionHeading({ number, eyebrow, children }: Props) {
  return (
    <div className="grid gap-6 md:grid-cols-12 md:gap-12">
      <div className="md:col-span-4">
        <div className="flex items-center gap-3">
          <span className="flex h-8 w-8 items-center justify-center rounded-full border border-accent/40 bg-accent/10 font-serif text-sm italic font-medium text-accent">
            {number}
          </span>
          <span className="label-eyebrow tracking-widest">{eyebrow}</span>
        </div>
      </div>
      <div className="md:col-span-8">
        <h2 className="font-serif text-3xl font-medium leading-[1.1] tracking-tight text-foreground md:text-5xl lg:text-6xl">
          {children}
        </h2>
      </div>
    </div>
  );
}
