"use client";

import { useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/carnival/Navbar";
import { CarnivalBackground } from "@/components/carnival/CarnivalBackground";
import { CarnivalEffects } from "@/components/carnival/CarnivalEffects";
import { PageIntro } from "@/components/carnival/PageIntro";
import RegistrationForm from "@/components/registration/RegistrationForm";
import { ArrowUpRight, CalendarDays, MapPin, CheckCircle, Sparkles, MessageCircle } from "lucide-react";

export default function RegisterPage() {
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [registrationData, setRegistrationData] = useState<{
    registrationCode: string;
    fullName: string;
  } | null>(null);

  const handleRegistrationSuccess = (data: {
    registrationCode: string;
    fullName: string;
  }) => {
    setRegistrationData(data);
    setRegistrationSuccess(true);
  };

  const handleRegisterAnother = () => {
    setRegistrationSuccess(false);
    setRegistrationData(null);
  };

  return (
    <CarnivalBackground image="/images/canival.png">
      <Navbar />
      <CarnivalEffects />

      <main className="min-h-screen flex flex-col px-5 pb-12 pt-[140px] sm:px-8 sm:pb-16 sm:pt-40 lg:px-12 lg:pt-44">
        <div className="mx-auto w-full max-w-[1500px] flex-1">
          {!registrationSuccess ? (
            <>
              {/* Registration Hero */}
              <div className="mb-12 max-w-[850px] sm:mb-16">
                <PageIntro
                  eyebrow="Your Place Starts Here"
                  title="Enter the Carnival"
                  description="Join Trainer Tim on December 19, 2026 at Asaba Mall for one morning of movement, community and unforgettable carnival energy."
                />

                {/* Event Details */}
                <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-white/10 pt-6 sm:mt-10 sm:pt-8">
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
                      Asaba Mall, Delta State
                    </span>
                  </div>

                  <span className="h-1 w-1 rounded-full bg-white/30" />

                  <span className="text-xs font-semibold text-white/80">
                    6:00 AM
                  </span>
                </div>
              </div>

              {/* Registration Form */}
              <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-start">
                <div className="max-w-[600px]">
                  <div className="border border-white/10 bg-black/45 backdrop-blur-xl p-6 sm:p-8 shadow-2xl">
                    <div className="mb-6">
                      <h2 className="text-2xl font-semibold text-white mb-2 sm:text-3xl">
                        Register for the Carnival
                      </h2>
                      <p className="text-sm text-white/55">
                        Fill in your details to secure your place.
                      </p>
                    </div>

                    <RegistrationForm onSuccess={handleRegistrationSuccess} />
                  </div>
                </div>

                {/* Side Image/Info */}
                <div className="hidden lg:block lg:w-[400px]">
                  <div className="border border-white/10 bg-black/30 backdrop-blur-sm p-6">
                    <div className="mb-4">
                      <p className="text-[9px] font-black uppercase tracking-[0.28em] text-[#ff5a1f]">
                        About the Event
                      </p>
                    </div>

                    <p className="text-sm leading-6 text-white/60 mb-6">
                      The Delta State Fitness Carnival brings together fitness
                      enthusiasts, community members and health advocates for
                      one powerful morning of movement and celebration.
                    </p>

                    <div className="space-y-4">
                      <div className="border-l-2 border-[#ff5a1f] pl-4">
                        <p className="text-xs font-semibold text-white mb-1">
                          Trainer Tim
                        </p>
                        <p className="text-xs text-white/50">
                          Event Organizer & Host
                        </p>
                      </div>

                      <div className="border-l-2 border-[#ff5a1f] pl-4">
                        <p className="text-xs font-semibold text-white mb-1">
                          Asaba Mall
                        </p>
                        <p className="text-xs text-white/50">
                          Premium Venue in Delta State
                        </p>
                      </div>

                      <div className="border-l-2 border-[#ff5a1f] pl-4">
                        <p className="text-xs font-semibold text-white mb-1">
                          Free Registration
                        </p>
                        <p className="text-xs text-white/50">
                          Open to all fitness enthusiasts
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            /* Success State */
            <div className="max-w-[600px]">
              <div className="border border-white/10 bg-black/45 backdrop-blur-xl p-8 sm:p-12 shadow-2xl">
                {/* Success Icon */}
                <div className="mb-8 flex justify-center">
                  <div className="relative">
                    <div className="absolute inset-0 bg-[#ff5a1f]/20 blur-2xl rounded-full" />
                    <div className="relative flex h-20 w-20 items-center justify-center bg-[#ff5a1f]/10 rounded-full border border-[#ff5a1f]/30">
                      <CheckCircle className="h-10 w-10 text-[#ff5a1f]" />
                    </div>
                  </div>
                </div>

                {/* Success Message */}
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-white mb-3 sm:text-4xl">
                    Registration Confirmed
                  </h2>
                  <p className="text-sm text-white/60">
                    You're officially on the list for the Delta State Fitness
                    Carnival.
                  </p>
                </div>

                {/* Registration Code */}
                <div className="mb-8 relative overflow-hidden rounded-xl border border-[#ff5a1f]/30 bg-black/50 p-6">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#ff5a1f]/5 via-transparent to-[#ff5a1f]/5" />
                  <div className="relative">
                    <div className="mb-3 flex items-center justify-center gap-2">
                      <Sparkles className="h-4 w-4 text-[#ff5a1f]" />
                      <p className="text-[9px] font-black uppercase tracking-[0.28em] text-[#ff5a1f]">
                        Your Carnival Registration Code
                      </p>
                      <Sparkles className="h-4 w-4 text-[#ff5a1f]" />
                    </div>

                    <p className="text-center text-4xl font-bold text-[#ff5a1f] tracking-wider font-mono sm:text-5xl">
                      {registrationData?.registrationCode}
                    </p>

                    <p className="mt-3 text-center text-xs text-white/40">
                      Keep this code safe. You may need it as proof of
                      registration.
                    </p>
                  </div>
                </div>

                {/* Registration Details */}
                <div className="mb-8 space-y-3 rounded-lg bg-black/30 p-5">
                  <h3 className="text-sm font-semibold text-white mb-4">
                    Registration Details
                  </h3>

                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between border-b border-white/5 pb-3">
                      <span className="text-white/50">Name</span>
                      <span className="text-white font-medium">
                        {registrationData?.fullName}
                      </span>
                    </div>

                    <div className="flex justify-between border-b border-white/5 pb-3">
                      <span className="text-white/50">Event</span>
                      <span className="text-white">Delta State Fitness Carnival</span>
                    </div>

                    <div className="flex justify-between border-b border-white/5 pb-3">
                      <span className="text-white/50">Date</span>
                      <span className="text-white">December 19, 2026</span>
                    </div>

                    <div className="flex justify-between border-b border-white/5 pb-3">
                      <span className="text-white/50">Time</span>
                      <span className="text-white">6:00 AM</span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-white/50">Venue</span>
                      <span className="text-white">Asaba Mall, Delta State</span>
                    </div>
                  </div>
                </div>

                {/* WhatsApp Group Invitation */}
                <div className="mb-6">
                  <a
                    href="https://chat.whatsapp.com/KbWDqXf3qFSCIVUxQPq6KQ?s=cl&p=a&mlu=0"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex w-full items-center justify-center gap-3 bg-[#25D366] hover:bg-[#128C7E] px-6 py-4 text-[10px] font-black uppercase tracking-[0.08em] text-white transition shadow-lg"
                  >
                    <MessageCircle className="h-5 w-5" />
                    <span>Join the WhatsApp Group</span>
                    <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </a>
                  <p className="mt-2 text-center text-xs text-white/40">
                    Stay connected with the carnival community
                  </p>
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-3 sm:flex-row">
                  <Link
                    href="/"
                    className="group flex flex-1 items-center justify-center gap-2 bg-[#ff5a1f] px-6 py-3.5 text-[10px] font-black uppercase tracking-[0.08em] text-white transition hover:bg-[#ff7040]"
                  >
                    Return to Homepage
                    <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </Link>

                  <button
                    onClick={handleRegisterAnother}
                    className="border border-white/20 bg-white/[0.04] px-6 py-3.5 text-[10px] font-black uppercase tracking-[0.08em] text-white/70 transition hover:bg-white/10 hover:text-white"
                  >
                    Register Another Person
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </CarnivalBackground>
  );
}
