"use client";

export function CarnivalEffects() {
  return (
    <>
      {/* Subtle carnival lights */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <span className="absolute left-[8%] top-[18%] h-2 w-2 animate-pulse rounded-full bg-[#ff5a1f]" />
        <span className="absolute right-[12%] top-[25%] h-1.5 w-1.5 animate-pulse rounded-full bg-white/70" />
        <span className="absolute bottom-[20%] left-[15%] h-1.5 w-1.5 animate-pulse rounded-full bg-[#ff5a1f]" />
        <span className="absolute bottom-[15%] right-[18%] h-2 w-2 animate-pulse rounded-full bg-white/50" />

        {/* Animated light streaks */}
        <div className="absolute left-[-10%] top-[35%] h-px w-[40%] rotate-[-18deg] bg-gradient-to-r from-transparent via-[#ff5a1f]/40 to-transparent" />
        <div className="absolute right-[-10%] bottom-[35%] h-px w-[40%] rotate-[-18deg] bg-gradient-to-r from-transparent via-[#ff5a1f]/30 to-transparent" />
      </div>
    </>
  );
}
