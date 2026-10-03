interface PageIntroProps {
  eyebrow: string;
  title: string;
  description?: string;
  accent?: boolean;
}

export function PageIntro({
  eyebrow,
  title,
  description,
  accent = true,
}: PageIntroProps) {
  return (
    <div className="mb-8 max-w-[720px] sm:mb-12">
      <div className="mb-3 flex items-center gap-3">
        <span className="h-[2px] w-8 bg-[#ff5a1f] sm:w-12" />
        <span className="text-[8px] font-bold uppercase tracking-[0.28em] text-white/65 sm:text-[10px]">
          {eyebrow}
        </span>
      </div>

      <h1 className="max-w-[800px] text-[clamp(2.45rem,6vw,6rem)] font-bold leading-[0.9] tracking-[-0.05em] text-white">
        {title}
      </h1>

      {description && (
        <p className="mt-4 max-w-[600px] text-sm leading-6 text-white/55 sm:text-base sm:leading-7">
          {description}
        </p>
      )}
    </div>
  );
}
