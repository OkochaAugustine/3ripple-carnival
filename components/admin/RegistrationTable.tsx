"use client";

import { useState } from "react";
import { Search, Eye, Calendar, Clock } from "lucide-react";

interface Registration {
  registrationCode: string;
  fullName: string;
  email: string;
  phone: string;
  address: string;
  registeredAt: string;
}

interface RegistrationTableProps {
  registrations: Registration[];
  onSearch: (query: string) => void;
  onViewDetails: (code: string) => void;
}

export default function RegistrationTable({
  registrations,
  onSearch,
  onViewDetails,
}: RegistrationTableProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch(query);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-NG", {
      year: "numeric",
      month: "short",
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
    <div className="border border-white/10 bg-black/30 rounded-xl overflow-hidden">
      {/* Search Bar */}
      <div className="p-4 border-b border-white/10">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-white/30" />
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search by name, email, phone, or registration code..."
            className="w-full pl-10 pr-4 py-2.5 bg-black/30 border border-white/10 rounded-lg focus:ring-2 focus:ring-[#ff5a1f] focus:border-transparent text-white placeholder-white/30 transition"
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-black/40 border-b border-white/10">
              <th className="px-4 py-3 text-left text-[10px] font-semibold text-white/50 uppercase tracking-wider">
                Code
              </th>
              <th className="px-4 py-3 text-left text-[10px] font-semibold text-white/50 uppercase tracking-wider">
                Name
              </th>
              <th className="px-4 py-3 text-left text-[10px] font-semibold text-white/50 uppercase tracking-wider">
                Email
              </th>
              <th className="px-4 py-3 text-left text-[10px] font-semibold text-white/50 uppercase tracking-wider">
                Phone
              </th>
              <th className="px-4 py-3 text-left text-[10px] font-semibold text-white/50 uppercase tracking-wider">
                Address
              </th>
              <th className="px-4 py-3 text-left text-[10px] font-semibold text-white/50 uppercase tracking-wider">
                <div className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  Date
                </div>
              </th>
              <th className="px-4 py-3 text-left text-[10px] font-semibold text-white/50 uppercase tracking-wider">
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  Time
                </div>
              </th>
              <th className="px-4 py-3 text-left text-[10px] font-semibold text-white/50 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {registrations.length === 0 ? (
              <tr>
                <td colSpan={8} className="px-4 py-12 text-center text-white/40 text-sm">
                  No registrations found
                </td>
              </tr>
            ) : (
              registrations.map((registration) => (
                <tr
                  key={registration.registrationCode}
                  className="hover:bg-white/5 transition"
                >
                  <td className="px-4 py-4">
                    <span className="font-mono text-sm text-[#ff5a1f] font-semibold">
                      {registration.registrationCode}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <span className="text-sm text-white font-medium">
                      {registration.fullName}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <span className="text-sm text-white/60">{registration.email}</span>
                  </td>
                  <td className="px-4 py-4">
                    <span className="text-sm text-white/60">{registration.phone}</span>
                  </td>
                  <td className="px-4 py-4">
                    <span className="text-sm text-white/60 max-w-[200px] truncate block">
                      {registration.address}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <span className="text-sm text-white/60">
                      {formatDate(registration.registeredAt)}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <span className="text-sm text-white/60">
                      {formatTime(registration.registeredAt)}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <button
                      onClick={() => onViewDetails(registration.registrationCode)}
                      className="flex items-center gap-2 text-[#ff5a1f] hover:text-[#ff7040] transition text-sm font-medium"
                    >
                      <Eye className="h-4 w-4" />
                      View
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
