"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  ArrowUpRight,
  CalendarDays,
  Dumbbell,
  Flame,
  Lock,
  Menu,
  Star,
  Trophy,
  X,
  Zap,
} from "lucide-react";

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="absolute inset-x-0 top-0 z-50">
      {/* TOP CARNIVAL TICKER */}
      <div className="relative h-7 overflow-hidden bg-[#ff5a1f] text-black">
        <div className="carnival-navbar-ticker flex h-full w-max items-center">
          {[0, 1].map((item) => (
            <div
              key={item}
              className="flex items-center gap-5 whitespace-nowrap px-5 text-[8px] font-black uppercase tracking-[0.24em]"
            >
              <span>Delta State Fitness Carnival</span>
              <Zap className="h-3 w-3 fill-current" />

              <span>19 December 2026</span>
              <Star className="h-3 w-3 fill-current" />

              <span>Trainer Tim</span>
              <Dumbbell className="h-3 w-3" />

              <span>Asaba Mall</span>
              <Flame className="h-3 w-3 fill-current" />

              <span>Move • Sweat • Celebrate</span>
              <Trophy className="h-3 w-3" />

              <span>6:00 AM</span>
            </div>
          ))}
        </div>
      </div>

      {/* MAIN NAVBAR */}
      <nav className="mx-auto flex h-[84px] w-full max-w-[1500px] items-center justify-between px-5 sm:px-8 lg:px-12">
        {/* LOGO */}
        <Link
          href="/"
          onClick={() => setMenuOpen(false)}
          className="group relative z-50"
        >
          <div className="relative">
            <div className="absolute -inset-4 rounded-full bg-[#ff5a1f]/0 blur-2xl transition duration-500 group-hover:bg-[#ff5a1f]/20" />

            <Image
              src="/images/logo.jpg"
              alt="3Ripple T Fitness"
              width={170}
              height={70}
              priority
              className="relative h-auto max-h-[58px] w-[105px] object-contain sm:w-[125px]"
            />
          </div>
        </Link>

        {/* DESKTOP NAV */}
        <div className="hidden items-center md:flex">
          <div className="relative flex items-center border border-white/15 bg-black/25 p-1 backdrop-blur-xl">
            {/* LITTLE CARNIVAL LIGHTS */}
            <div className="absolute -top-2.5 left-1/2 flex -translate-x-1/2 items-center gap-1">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#ff5a1f]" />
              <span className="h-1 w-1 rounded-full bg-white/60" />
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#ff5a1f]" />
            </div>

            <NavLink
              href="/"
              icon={<Star className="h-3.5 w-3.5" />}
              active
            >
              Home
            </NavLink>

            <NavLink
              href="#carnival"
              icon={<Dumbbell className="h-3.5 w-3.5" />}
            >
              Carnival
            </NavLink>

            <NavLink
              href="#details"
              icon={<CalendarDays className="h-3.5 w-3.5" />}
            >
              Details
            </NavLink>

            <NavLink
              href="/admin"
              icon={<Lock className="h-3.5 w-3.5" />}
            >
              Admin
            </NavLink>
          </div>

          {/* REGISTER */}
          <Link
            href="/register"
            className="group relative ml-3 flex items-center gap-2 overflow-hidden bg-[#ff5a1f] px-6 py-3.5 text-[10px] font-black uppercase tracking-[0.12em] text-white transition duration-300 hover:bg-[#ff7040]"
          >
            <span className="absolute inset-0 -translate-x-full bg-white/15 transition-transform duration-500 group-hover:translate-x-0" />

            <span className="relative">Register Now</span>

            <ArrowUpRight className="relative h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
          </Link>
        </div>

        {/* MOBILE MENU BUTTON */}
        <button
          type="button"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
          className="relative z-50 border border-white/20 bg-black/35 p-3 text-white backdrop-blur-md md:hidden"
        >
          {menuOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </button>
      </nav>

      {/* MOBILE NAV */}
      <div
        className={`absolute left-4 right-4 top-[100px] overflow-hidden border border-white/10 bg-[#080808]/98 shadow-2xl backdrop-blur-2xl transition-all duration-300 md:hidden ${
          menuOpen
            ? "visible translate-y-0 opacity-100"
            : "invisible -translate-y-4 opacity-0"
        }`}
      >
        {/* MOBILE TITLE */}
        <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#ff5a1f]">
              <Dumbbell className="h-4 w-4" />
            </span>

            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.18em]">
                Carnival Menu
              </p>

              <p className="mt-0.5 text-[8px] uppercase tracking-[0.15em] text-white/35">
                Trainer Tim • 2026
              </p>
            </div>
          </div>

          <span className="text-[9px] font-bold tracking-[0.15em] text-[#ff5a1f]">
            19.12.26
          </span>
        </div>

        {/* MOBILE LINKS */}
        <div className="p-3">
          <MobileLink
            href="/"
            label="Home"
            icon={<Star className="h-4 w-4" />}
            onClick={() => setMenuOpen(false)}
          />

          <MobileLink
            href="#carnival"
            label="Carnival"
            icon={<Dumbbell className="h-4 w-4" />}
            onClick={() => setMenuOpen(false)}
          />

          <MobileLink
            href="#details"
            label="Event Details"
            icon={<CalendarDays className="h-4 w-4" />}
            onClick={() => setMenuOpen(false)}
          />

          <MobileLink
            href="/admin"
            label="Admin Dashboard"
            icon={<Lock className="h-4 w-4" />}
            onClick={() => setMenuOpen(false)}
          />

          <Link
            href="/register"
            onClick={() => setMenuOpen(false)}
            className="mt-2 flex items-center justify-center gap-2 bg-[#ff5a1f] px-4 py-4 text-[11px] font-black uppercase tracking-[0.1em]"
          >
            Join The Carnival
            <Zap className="h-4 w-4 fill-current" />
          </Link>
        </div>
      </div>

      {/* NAVBAR ANIMATION */}
      <style jsx>{`
        .carnival-navbar-ticker {
          animation: carnivalTicker 24s linear infinite;
        }

        @keyframes carnivalTicker {
          from {
            transform: translateX(0);
          }

          to {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </header>
  );
}

function NavLink({
  href,
  icon,
  children,
  active = false,
}: {
  href: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  active?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`group relative flex items-center gap-2 px-5 py-3 text-[10px] font-black uppercase tracking-[0.12em] transition ${
        active ? "text-white" : "text-white/55 hover:text-white"
      }`}
    >
      {active && (
        <span className="absolute inset-x-3 bottom-0 h-[2px] bg-[#ff5a1f]" />
      )}

      <span
        className={`transition duration-300 ${
          active
            ? "text-[#ff5a1f]"
            : "text-white/40 group-hover:text-[#ff5a1f]"
        }`}
      >
        {icon}
      </span>

      {children}
    </Link>
  );
}

function MobileLink({
  href,
  label,
  icon,
  onClick,
}: {
  href: string;
  label: string;
  icon: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="group flex items-center justify-between border-b border-white/5 px-4 py-4"
    >
      <span className="flex items-center gap-3 text-sm font-bold">
        <span className="text-[#ff5a1f] transition-transform duration-300 group-hover:scale-110">
          {icon}
        </span>

        {label}
      </span>

      <ArrowUpRight className="h-4 w-4 text-white/25 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white" />
    </Link>
  );
}