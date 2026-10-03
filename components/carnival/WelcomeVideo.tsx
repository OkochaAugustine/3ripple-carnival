"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, X, Volume2, VolumeX } from "lucide-react";

export function WelcomeVideo() {
  const [open, setOpen] = useState(true);
  const [muted, setMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open || !videoRef.current) return;

    const video = videoRef.current;

    video.muted = true;

    const playVideo = async () => {
      try {
        await video.play();
      } catch {
        // Browser may require the visitor to press play.
      }
    };

    playVideo();
  }, [open]);

  const closeVideo = () => {
    setOpen(false);

    if (videoRef.current) {
      videoRef.current.pause();
    }
  };

  const toggleSound = async () => {
    if (!videoRef.current) return;

    const nextMuted = !muted;

    videoRef.current.muted = nextMuted;
    setMuted(nextMuted);

    if (!nextMuted) {
      try {
        await videoRef.current.play();
      } catch {
        // Ignore browser autoplay restrictions.
      }
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 px-3 py-4 sm:px-6 sm:py-8">
      {/* Cinematic orange glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[70vw] w-[70vw] max-h-[700px] max-w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#ff5a1f]/10 blur-[100px]" />

      {/* Subtle carnival lights */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <span className="absolute left-[8%] top-[18%] h-2 w-2 animate-pulse rounded-full bg-[#ff5a1f]" />
        <span className="absolute right-[12%] top-[25%] h-1.5 w-1.5 animate-pulse rounded-full bg-white/70" />
        <span className="absolute bottom-[20%] left-[15%] h-1.5 w-1.5 animate-pulse rounded-full bg-[#ff5a1f]" />
        <span className="absolute bottom-[15%] right-[18%] h-2 w-2 animate-pulse rounded-full bg-white/50" />

        <div className="absolute left-[-10%] top-[35%] h-px w-[40%] rotate-[-18deg] bg-gradient-to-r from-transparent via-[#ff5a1f]/40 to-transparent" />
        <div className="absolute right-[-10%] bottom-[35%] h-px w-[40%] rotate-[-18deg] bg-gradient-to-r from-transparent via-[#ff5a1f]/30 to-transparent" />
      </div>

      {/* Close */}
      <button
        type="button"
        onClick={closeVideo}
        aria-label="Close welcome video"
        className="absolute right-4 top-4 z-30 flex items-center gap-2 border border-white/20 bg-black/60 px-3 py-2.5 text-white backdrop-blur-xl transition hover:border-[#ff5a1f] hover:bg-[#ff5a1f] sm:right-7 sm:top-7"
      >
        <span className="hidden text-[9px] font-black uppercase tracking-[0.18em] sm:block">
          Skip video
        </span>
        <X className="h-5 w-5" />
      </button>

      {/* Main content */}
      <div className="relative z-10 flex max-h-full w-full max-w-5xl flex-col items-center overflow-y-auto py-3 sm:py-5">
        {/* Heading */}
        <div className="mb-4 text-center sm:mb-5">
          <div className="mb-2 flex items-center justify-center gap-2">
            <span className="h-px w-8 bg-[#ff5a1f]" />
            <span className="text-[8px] font-black uppercase tracking-[0.3em] text-[#ff5a1f] sm:text-[9px]">
              Welcome to the Carnival
            </span>
            <span className="h-px w-8 bg-[#ff5a1f]" />
          </div>

          <h2 className="text-2xl font-black uppercase tracking-[-0.03em] text-white sm:text-4xl md:text-5xl">
            Feel the{" "}
            <span className="font-serif italic text-[#ff5a1f]">
              Energy.
            </span>
          </h2>

          <p className="mt-1.5 text-[9px] uppercase tracking-[0.16em] text-white/45 sm:text-[10px]">
            Delta State Fitness Carnival with Trainer Tim
          </p>
        </div>

        {/* Video */}
        <div className="relative w-full overflow-hidden border border-white/15 bg-[#050505] shadow-[0_30px_100px_rgba(0,0,0,0.7)]">
          {/* Orange frame */}
          <div className="pointer-events-none absolute inset-0 z-10 border border-[#ff5a1f]/30" />

          <video
            ref={videoRef}
            src="/videos/tim.mp4"
            className="block max-h-[65vh] w-full object-contain"
            autoPlay
            muted={muted}
            playsInline
            controls={false}
            preload="auto"
            onEnded={closeVideo}
          />

          {/* Video corner details */}
          <div className="pointer-events-none absolute left-3 top-3 z-20 flex items-center gap-2 bg-black/55 px-2.5 py-1.5 backdrop-blur-md">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#ff5a1f]" />
            <span className="text-[7px] font-black uppercase tracking-[0.2em] text-white/80">
              Trainer Tim
            </span>
          </div>

          {/* Sound */}
          <button
            type="button"
            onClick={toggleSound}
            aria-label={muted ? "Turn sound on" : "Mute video"}
            className="absolute bottom-3 right-3 z-20 flex h-9 w-9 items-center justify-center border border-white/20 bg-black/65 text-white backdrop-blur-md transition hover:bg-[#ff5a1f]"
          >
            {muted ? (
              <VolumeX className="h-4 w-4" />
            ) : (
              <Volume2 className="h-4 w-4" />
            )}
          </button>
        </div>

        {/* Event information */}
        <div className="mt-4 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-center sm:mt-5 sm:gap-x-6">
          <span className="text-[8px] font-bold uppercase tracking-[0.15em] text-white/55 sm:text-[9px]">
            December 19, 2026
          </span>

          <span className="hidden h-1 w-1 rounded-full bg-[#ff5a1f] sm:block" />

          <span className="text-[8px] font-bold uppercase tracking-[0.15em] text-white/55 sm:text-[9px]">
            6:00 AM
          </span>

          <span className="hidden h-1 w-1 rounded-full bg-[#ff5a1f] sm:block" />

          <span className="text-[8px] font-bold uppercase tracking-[0.15em] text-white/55 sm:text-[9px]">
            Asaba Mall
          </span>
        </div>

        {/* CTA */}
        <div className="mt-4 flex w-full max-w-md flex-col gap-2 sm:mt-5 sm:flex-row">
          <Link
            href="/register"
            onClick={closeVideo}
            className="group flex flex-1 items-center justify-center gap-2 bg-[#ff5a1f] px-5 py-3.5 text-[9px] font-black uppercase tracking-[0.16em] text-white transition hover:bg-[#ff7040]"
          >
            Register for the Carnival
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>

          <button
            type="button"
            onClick={closeVideo}
            className="border border-white/15 bg-white/[0.04] px-5 py-3.5 text-[9px] font-black uppercase tracking-[0.16em] text-white/70 transition hover:bg-white/10 hover:text-white"
          >
            Enter Website
          </button>
        </div>

        <div className="mt-3 flex items-center gap-2 text-center">
          <span className="h-1 w-1 rounded-full bg-[#ff5a1f]" />
          <span className="text-[7px] font-bold uppercase tracking-[0.22em] text-white/30">
            Registration is open • Secure your place
          </span>
          <span className="h-1 w-1 rounded-full bg-[#ff5a1f]" />
        </div>
      </div>
    </div>
  );
}