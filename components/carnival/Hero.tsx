"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  ArrowUpRight,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  MapPin,
} from "lucide-react";

type HeroProps = {
  images: string[];
};

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

const FALLBACK_IMAGE = "/images/canival.png";

const EVENT_DATE = new Date("2026-12-19T06:00:00+01:00").getTime();

function getTimeLeft(): TimeLeft {
  const difference = Math.max(0, EVENT_DATE - Date.now());

  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / (1000 * 60)) % 60),
    seconds: Math.floor((difference / 1000) % 60),
  };
}

function CountdownNumber({
  value,
  label,
  mobile = false,
}: {
  value: number;
  label: string;
  mobile?: boolean;
}) {
  return (
    <div
      className={`flex min-w-0 flex-1 flex-col ${
        mobile ? "items-center" : ""
      }`}
    >
      <div
        className={`font-semibold leading-none tracking-[-0.07em] text-white ${
          mobile
            ? "text-[1.75rem] min-[360px]:text-[1.95rem] sm:text-[3.5rem]"
            : "text-[2.35rem] sm:text-[3.5rem]"
        }`}
      >
        {String(value).padStart(2, "0")}
      </div>

      <span
        className={`mt-1 font-bold uppercase tracking-[0.18em] text-[#ff6a2b] ${
          mobile ? "text-[7px] min-[360px]:text-[8px]" : "text-[9px]"
        }`}
      >
        {label}
      </span>
    </div>
  );
}

function StoryImage({
  src,
  alt,
  eyebrow,
  title,
  description,
  reverse = false,
}: {
  src: string;
  alt: string;
  eyebrow: string;
  title: string;
  description: string;
  reverse?: boolean;
}) {
  return (
    <article
      className={`grid overflow-hidden border border-white/10 bg-[#0d0d0d] lg:grid-cols-2 ${
        reverse ? "lg:flex-row-reverse" : ""
      }`}
    >
      <div className={`relative aspect-[4/3] min-h-[320px] lg:min-h-[500px] ${reverse ? "lg:order-2" : ""}`}>
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />

        <div className="absolute bottom-5 left-5 border border-white/20 bg-black/45 px-3 py-2 backdrop-blur-md">
          <p className="text-[8px] font-bold uppercase tracking-[0.2em] text-white/60">
            Real carnival moment
          </p>
        </div>
      </div>

      <div
        className={`flex flex-col justify-center p-7 sm:p-10 lg:p-14 ${
          reverse ? "lg:order-1" : ""
        }`}
      >
        <p className="mb-4 text-[9px] font-black uppercase tracking-[0.28em] text-[#ff5a1f]">
          {eyebrow}
        </p>

        <h2 className="max-w-[500px] text-3xl font-semibold leading-[0.95] tracking-[-0.045em] text-white sm:text-5xl">
          {title}
        </h2>

        <p className="mt-5 max-w-[520px] text-sm leading-7 text-white/55 sm:text-base">
          {description}
        </p>
      </div>
    </article>
  );
}

export function Hero({ images }: HeroProps) {
  const slides = useMemo(
    () => (images.length > 0 ? images : [FALLBACK_IMAGE]),
    [images],
  );

  const governorPhoto = useMemo(
    () =>
      slides.find(
        (image) => image.toLowerCase().endsWith("/carnival3.jpg"),
      ),
    [slides],
  );

  const trainerPhoto = useMemo(
    () =>
      slides.find(
        (image) => image.toLowerCase().endsWith("/carnival7.jpg"),
      ),
    [slides],
  );

  const [currentSlide, setCurrentSlide] = useState(0);
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(getTimeLeft());

  useEffect(() => {
    const timer = window.setInterval(() => {
      setTimeLeft(getTimeLeft());
    }, 1000);

    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    if (slides.length <= 1) return;

    const timer = window.setInterval(() => {
      setCurrentSlide((current) => (current + 1) % slides.length);
    }, 6500);

    return () => window.clearInterval(timer);
  }, [slides.length]);

  const previousSlide = () => {
    setCurrentSlide((current) =>
      current === 0 ? slides.length - 1 : current - 1,
    );
  };

  const nextSlide = () => {
    setCurrentSlide((current) => (current + 1) % slides.length);
  };

  return (
    <main className="min-h-screen overflow-hidden bg-[#070707] text-white">
      <section
        id="carnival"
        className="relative flex min-h-[100svh] w-full flex-col overflow-hidden"
      >
        <div className="absolute inset-0">
          {slides.map((image, index) => (
            <div
              key={image}
              className={`absolute inset-0 transition-opacity duration-[1400ms] ease-in-out ${
                index === currentSlide ? "opacity-100" : "opacity-0"
              }`}
            >
              <Image
                src={image}
                alt="Delta State Fitness Carnival"
                fill
                priority={index === 0}
                sizes="100vw"
                className={`object-cover object-center transition-transform duration-[7000ms] ease-out ${
                  index === currentSlide ? "scale-[1.04]" : "scale-100"
                }`}
              />
            </div>
          ))}

          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/55 to-black/15" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-black/35" />

          <div className="absolute left-[8%] top-[30%] h-[220px] w-[220px] rounded-full bg-[#ff5a1f]/10 blur-[100px]" />
        </div>

        <div className="relative z-10 flex flex-1">
          <div className="mx-auto flex w-full max-w-[1500px] flex-1 flex-col px-5 pb-5 pt-[120px] sm:px-8 sm:pb-8 sm:pt-32 lg:justify-end lg:px-12 lg:pb-10 lg:pt-32">
            <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end lg:gap-12">
              <div className="max-w-[850px]">
                <div className="mb-3 flex items-center gap-3 sm:mb-5">
                  <span className="h-[2px] w-8 bg-[#ff5a1f] sm:w-12" />

                  <span className="text-[8px] font-bold uppercase tracking-[0.28em] text-white/65 sm:text-[10px]">
                    Delta State • Nigeria
                  </span>
                </div>

                <h1 className="max-w-[800px]">
                  <span className="block text-[clamp(2.45rem,6vw,6rem)] font-bold leading-[0.9] tracking-[-0.05em] text-white">
                    Delta State
                  </span>

                  <span className="mt-1 block text-[clamp(3.15rem,8vw,7.5rem)] font-normal leading-[0.78] tracking-[-0.055em] text-[#ff5a1f] [font-family:cursive]">
                    Fitness
                  </span>

                  <span className="mt-1 block text-[clamp(3rem,7.5vw,7rem)] font-normal leading-[0.82] tracking-[-0.05em] text-white [font-family:cursive]">
                    Carnival
                  </span>
                </h1>

                {/* MOBILE-FIRST COUNTDOWN */}
                <div className="mt-5 w-full max-w-[500px] lg:hidden">
                  <div className="border-y border-white/20 bg-black/30 px-3 py-3 backdrop-blur-sm sm:px-5 sm:py-4">
                    <div className="mb-3 flex items-center justify-between">
                      <div>
                        <p className="text-[9px] font-black uppercase tracking-[0.25em] text-[#ff5a1f]">
                          Countdown to Carnival
                        </p>

                        <p className="mt-1 text-[8px] uppercase tracking-[0.16em] text-white/45">
                          19 December 2026 • 6:00 AM
                        </p>
                      </div>

                      <span className="hidden text-[8px] font-bold uppercase tracking-[0.18em] text-white/45 min-[360px]:block">
                        Asaba Mall
                      </span>
                    </div>

                    <div className="flex items-center divide-x divide-white/15">
                      <CountdownNumber
                        value={timeLeft.days}
                        label="Days"
                        mobile
                      />

                      <div className="flex flex-1 pl-2 min-[360px]:pl-3">
                        <CountdownNumber
                          value={timeLeft.hours}
                          label="Hours"
                          mobile
                        />
                      </div>

                      <div className="flex flex-1 pl-2 min-[360px]:pl-3">
                        <CountdownNumber
                          value={timeLeft.minutes}
                          label="Minutes"
                          mobile
                        />
                      </div>

                      <div className="flex flex-1 pl-2 min-[360px]:pl-3">
                        <CountdownNumber
                          value={timeLeft.seconds}
                          label="Seconds"
                          mobile
                        />
                      </div>
                    </div>

                    <div className="mt-3 h-[2px] w-full overflow-hidden bg-white/10">
                      <div className="h-full w-full origin-left animate-[pulse_2s_ease-in-out_infinite] bg-[#ff5a1f]" />
                    </div>
                  </div>
                </div>

                <div className="mt-4 max-w-[690px] sm:mt-6">
                  <p className="max-w-[450px] text-[12px] leading-5 text-white/65 sm:text-[15px] sm:leading-7">
                    With Trainer Tim — one morning of movement, community,
                    fitness and unforgettable carnival energy.
                  </p>

                  <div className="mt-4 flex flex-col gap-3 sm:mt-5 sm:flex-row sm:items-center">
                    <Link
                      href="/register"
                      className="group flex w-full items-center justify-center gap-3 bg-[#ff5a1f] px-6 py-3.5 text-[10px] font-black uppercase tracking-[0.08em] text-white transition duration-300 hover:bg-[#ff7040] sm:w-fit"
                    >
                      Register for the Carnival
                      <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                    </Link>

                    <span className="text-[9px] font-bold uppercase tracking-[0.16em] text-white/50">
                      Registration is open • Secure your place now
                    </span>
                  </div>
                </div>
              </div>

              {/* DESKTOP EVENT DETAILS + COUNTDOWN */}
              <div
                id="details"
                className="hidden w-full lg:block lg:w-[430px]"
              >
                <div className="border-t border-white/20 pt-5">
                  <div className="mb-5 flex flex-wrap items-center gap-x-5 gap-y-2">
                    <div className="flex items-center gap-2">
                      <CalendarDays className="h-4 w-4 text-[#ff5a1f]" />

                      <span className="text-xs font-semibold text-white/80">
                        19 December 2026
                      </span>
                    </div>

                    <span className="h-1 w-1 rounded-full bg-white/30" />

                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-[#ff5a1f]" />

                      <span className="text-xs font-semibold text-white/80">
                        Asaba Mall
                      </span>
                    </div>
                  </div>

                  <div>
                    <div className="mb-3 flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#ff5a1f] [font-family:cursive] sm:text-xs">
                        Countdown to Carnival
                      </span>

                      <span className="text-[9px] uppercase tracking-[0.2em] text-white/35">
                        06:00 AM
                      </span>
                    </div>

                    <div className="flex items-end divide-x divide-white/10">
                      <CountdownNumber
                        value={timeLeft.days}
                        label="Days"
                      />

                      <div className="pl-5">
                        <CountdownNumber
                          value={timeLeft.hours}
                          label="Hours"
                        />
                      </div>

                      <div className="pl-5">
                        <CountdownNumber
                          value={timeLeft.minutes}
                          label="Minutes"
                        />
                      </div>

                      <div className="pl-5">
                        <CountdownNumber
                          value={timeLeft.seconds}
                          label="Seconds"
                        />
                      </div>
                    </div>

                    <div className="mt-4 h-[2px] w-full overflow-hidden bg-white/10">
                      <div className="h-full w-full origin-left animate-[pulse_2s_ease-in-out_infinite] bg-[#ff5a1f]" />
                    </div>

                    <Link
                      href="/register"
                      className="mt-5 flex w-fit items-center gap-3 border border-[#ff5a1f] px-5 py-3 text-[9px] font-black uppercase tracking-[0.14em] text-white transition hover:bg-[#ff5a1f]"
                    >
                      Registration is open — Join us
                      <ArrowUpRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* SLIDER CONTROLS */}
            <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-3 sm:mt-8 sm:pt-5">
              <div className="flex items-center gap-2.5">
                <button
                  type="button"
                  aria-label="Previous photo"
                  onClick={previousSlide}
                  className="flex h-8 w-8 items-center justify-center border border-white/15 bg-black/20 text-white/60 transition hover:border-white/30 hover:text-white"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>

                <button
                  type="button"
                  aria-label="Next photo"
                  onClick={nextSlide}
                  className="flex h-8 w-8 items-center justify-center border border-white/15 bg-black/20 text-white/60 transition hover:border-white/30 hover:text-white"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>

                <div className="ml-2 flex items-center gap-1.5">
                  {slides.map((image, index) => (
                    <button
                      key={image}
                      type="button"
                      aria-label={`Show photo ${index + 1}`}
                      onClick={() => setCurrentSlide(index)}
                      className={`h-[3px] rounded-full transition-all duration-500 ${
                        index === currentSlide
                          ? "w-9 bg-[#ff5a1f]"
                          : "w-2.5 bg-white/30"
                      }`}
                    />
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="hidden text-[9px] font-bold uppercase tracking-[0.24em] text-white/35 sm:block [font-family:cursive]">
                  Carnival moments
                </span>

                <span className="text-xs font-bold text-white/70">
                  {String(currentSlide + 1).padStart(2, "0")}
                </span>

                <span className="text-white/20">/</span>

                <span className="text-xs text-white/35">
                  {String(slides.length).padStart(2, "0")}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* IMPORTANT CARNIVAL STORIES */}
      <section className="relative bg-[#080808] py-14 sm:py-20">
        <div className="mx-auto w-full max-w-[1500px] px-5 sm:px-8 lg:px-12">
          <div className="mb-8 max-w-[720px] sm:mb-12">
            <p className="mb-3 text-[9px] font-black uppercase tracking-[0.3em] text-[#ff5a1f]">
              More than a workout
            </p>

            <h2 className="text-3xl font-semibold leading-[0.95] tracking-[-0.045em] text-white sm:text-5xl">
              This carnival has
              <span className="ml-2 font-normal [font-family:cursive] text-[#ff5a1f]">
                a story.
              </span>
            </h2>

            <p className="mt-4 max-w-[600px] text-sm leading-6 text-white/45 sm:text-base sm:leading-7">
              Real people. Real moments. Real community. Take a look at the
              people and moments that have helped make the Delta State Fitness
              Carnival what it is.
            </p>
          </div>

          <div className="space-y-5">
            {governorPhoto && (
              <StoryImage
                src={governorPhoto}
                alt="Former Delta State Governor attending the previous Delta State Fitness Carnival"
                eyebrow="A look back"
                title="The carnival has already made history."
                description="The former Delta State Governor was present at the previous Delta State Fitness Carnival — a powerful reminder that this event brings fitness, community and public leadership together."
              />
            )}

            {trainerPhoto && (
              <StoryImage
                src={trainerPhoto}
                alt="Trainer Tim at the Delta State Fitness Carnival"
                eyebrow="Meet the host"
                title="Trainer Tim is bringing the carnival back."
                description="Trainer Tim is the organizer and host behind the Delta State Fitness Carnival. On December 19, 2026, he is bringing everyone together again at Asaba Mall for another morning of movement, energy and community."
                reverse
              />
            )}
          </div>
        </div>
      </section>

      {/* REGISTRATION CTA */}
      <section className="relative overflow-hidden border-y border-white/10 bg-[#ff5a1f]">
        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" />

        <div className="relative mx-auto flex w-full max-w-[1500px] flex-col gap-6 px-5 py-12 sm:px-8 sm:py-16 lg:flex-row lg:items-center lg:justify-between lg:px-12">
          <div>
            <p className="text-[9px] font-black uppercase tracking-[0.3em] text-black/60">
              December 19, 2026 • Asaba Mall
            </p>

            <h2 className="mt-2 max-w-[700px] text-3xl font-black leading-none tracking-[-0.045em] text-white sm:text-5xl">
              Don't just watch the carnival.
              <span className="block font-normal [font-family:cursive]">
                Be there.
              </span>
            </h2>

            <p className="mt-4 max-w-[560px] text-sm leading-6 text-white/80">
              Registration is open. Secure your place now and be part of the
              next Delta State Fitness Carnival with Trainer Tim.
            </p>
          </div>

          <Link
            href="/register"
            className="group flex w-full items-center justify-center gap-3 bg-black px-6 py-4 text-[10px] font-black uppercase tracking-[0.14em] text-white transition hover:bg-[#111] sm:w-fit"
          >
            Register Now
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
          </Link>
        </div>
      </section>

      {/* CARNIVAL PHOTO ARCHIVE */}
      <section className="relative bg-[#080808] py-12 sm:py-16">
        <div className="mx-auto w-full max-w-[1500px] px-5 sm:px-8 lg:px-12">
          <div className="mb-7 flex items-end justify-between">
            <div>
              <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.28em] text-[#ff5a1f]">
                From the carnival
              </p>

              <h2 className="text-3xl font-semibold tracking-[-0.04em] text-white sm:text-4xl">
                Real moments.
                <span className="ml-2 font-normal [font-family:cursive] text-[#ff5a1f]">
                  Real energy.
                </span>
              </h2>
            </div>

            <span className="hidden text-xs text-white/35 sm:block">
              Carnival archive
            </span>
          </div>

          {slides.length > 0 ? (
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
              {slides.slice(0, 8).map((image, index) => (
                <button
                  key={`gallery-${image}`}
                  type="button"
                  onClick={() => {
                    setCurrentSlide(index);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className={`group relative aspect-[4/3] overflow-hidden bg-[#111] ${
                    index === 0 ? "col-span-2 row-span-2" : ""
                  }`}
                >
                  <Image
                    src={image}
                    alt={`Delta State Fitness Carnival moment ${index + 1}`}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    className="object-cover transition duration-700 group-hover:scale-105"
                  />

                  <div className="absolute inset-0 bg-black/10 transition group-hover:bg-black/0" />

                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#ff5a1f] opacity-0 transition group-hover:opacity-100" />

                  <span className="absolute bottom-3 left-3 text-[9px] font-bold uppercase tracking-[0.2em] text-white opacity-0 transition duration-300 group-hover:opacity-100">
                    View moment
                  </span>
                </button>
              ))}
            </div>
          ) : (
            <div className="flex min-h-[240px] items-center justify-center border border-dashed border-white/10 text-sm text-white/30">
              Carnival photos will appear here.
            </div>
          )}
        </div>
      </section>
    </main>
  );
}