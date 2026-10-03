"use client";

import { X, User, Mail, Phone, MapPin, Calendar, Clock, Ticket } from "lucide-react";

interface Registration {
  registrationCode: string;
  fullName: string;
  email: string;
  phone: string;
  address: string;
  registeredAt: string;
}

interface RegistrationDetailsProps {
  registration: Registration | null;
  onClose: () => void;
}

export default function RegistrationDetails({
  registration,
  onClose,
}: RegistrationDetailsProps) {
  if (!registration) return null;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-NG", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString("en-NG", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="border border-white/10 bg-[#080808] rounded-2xl max-w-lg w-full shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <h3 className="text-xl font-bold text-white">Registration Details</h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-lg transition text-white/50 hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5">
          {/* Registration Code */}
          <div className="bg-black/40 rounded-xl p-4 border border-[#ff5a1f]/30">
            <div className="flex items-center gap-2 mb-2">
              <Ticket className="h-4 w-4 text-[#ff5a1f]" />
              <span className="text-[10px] text-white/50 uppercase tracking-wider">
                Registration Code
              </span>
            </div>
            <p className="text-2xl font-bold text-[#ff5a1f] font-mono">
              {registration.registrationCode}
            </p>
          </div>

          {/* Name */}
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center border border-blue-500/20">
              <User className="h-5 w-5 text-blue-400" />
            </div>
            <div className="flex-1">
              <p className="text-[10px] text-white/50 uppercase tracking-wider mb-1">
                Full Name
              </p>
              <p className="text-white font-medium">{registration.fullName}</p>
            </div>
          </div>

          {/* Email */}
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-10 h-10 bg-green-500/10 rounded-lg flex items-center justify-center border border-green-500/20">
              <Mail className="h-5 w-5 text-green-400" />
            </div>
            <div className="flex-1">
              <p className="text-[10px] text-white/50 uppercase tracking-wider mb-1">
                Email Address
              </p>
              <p className="text-white font-medium">{registration.email}</p>
            </div>
          </div>

          {/* Phone */}
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-10 h-10 bg-purple-500/10 rounded-lg flex items-center justify-center border border-purple-500/20">
              <Phone className="h-5 w-5 text-purple-400" />
            </div>
            <div className="flex-1">
              <p className="text-[10px] text-white/50 uppercase tracking-wider mb-1">
                Phone Number
              </p>
              <p className="text-white font-medium">{registration.phone}</p>
            </div>
          </div>

          {/* Address */}
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-10 h-10 bg-orange-500/10 rounded-lg flex items-center justify-center border border-orange-500/20">
              <MapPin className="h-5 w-5 text-orange-400" />
            </div>
            <div className="flex-1">
              <p className="text-[10px] text-white/50 uppercase tracking-wider mb-1">
                Address
              </p>
              <p className="text-white font-medium">{registration.address}</p>
            </div>
          </div>

          {/* Registration Date & Time */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-8 h-8 bg-cyan-500/10 rounded-lg flex items-center justify-center border border-cyan-500/20">
                <Calendar className="h-4 w-4 text-cyan-400" />
              </div>
              <div>
                <p className="text-[10px] text-white/50 uppercase tracking-wider mb-1">
                  Date
                </p>
                <p className="text-white font-medium text-sm">
                  {formatDate(registration.registeredAt)}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-8 h-8 bg-pink-500/10 rounded-lg flex items-center justify-center border border-pink-500/20">
                <Clock className="h-4 w-4 text-pink-400" />
              </div>
              <div>
                <p className="text-[10px] text-white/50 uppercase tracking-wider mb-1">
                  Time
                </p>
                <p className="text-white font-medium text-sm">
                  {formatTime(registration.registeredAt)}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-white/10">
          <button
            onClick={onClose}
            className="w-full bg-white/10 hover:bg-white/20 text-white font-semibold py-3 px-4 rounded-lg transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
