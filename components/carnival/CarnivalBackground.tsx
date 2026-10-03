"use client";

import Image from "next/image";

interface CarnivalBackgroundProps {
  image?: string;
  children: React.ReactNode;
  overlay?: boolean;
}

export function CarnivalBackground({
  image = "/images/canival.png",
  children,
  overlay = true,
}: CarnivalBackgroundProps) {
  return (
    <div className="relative min-h-screen bg-[#070707] overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={image}
          alt="Delta State Fitness Carnival"
          fill
          sizes="100vw"
          className="object-cover object-center"
          priority
        />

        {/* Cinematic overlays */}
        {overlay && (
          <>
            <div className="absolute inset-0 bg-black/50" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/30" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/50" />
          </>
        )}

        {/* Orange glow effect */}
        <div className="absolute left-[8%] top-[30%] h-[220px] w-[220px] rounded-full bg-[#ff5a1f]/10 blur-[100px]" />
        <div className="absolute right-[10%] bottom-[20%] h-[180px] w-[180px] rounded-full bg-[#ff5a1f]/8 blur-[80px]" />
      </div>

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
