"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Users, RefreshCw, Loader2, LayoutDashboard } from "lucide-react";
import AdminSidebar from "@/components/admin/AdminSidebar";
import RegistrationTable from "@/components/admin/RegistrationTable";
import RegistrationDetails from "@/components/admin/RegistrationDetails";

interface Registration {
  registrationCode: string;
  fullName: string;
  email: string;
  phone: string;
  address: string;
  registeredAt: string;
}

export default function AdminDashboardPage() {
  const router = useRouter();
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [selectedRegistration, setSelectedRegistration] = useState<Registration | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchRegistrations = async (searchQuery = "") => {
    try {
      const url = searchQuery
        ? `/api/admin/registrations?search=${encodeURIComponent(searchQuery)}`
        : "/api/admin/registrations";

      const response = await fetch(url);

      if (response.status === 401) {
        router.push("/admin/login");
        return;
      }

      if (!response.ok) {
        throw new Error("Failed to fetch registrations");
      }

      const data = await response.json();
      setRegistrations(data.registrations);
      setTotalCount(data.totalCount);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load registrations");
    }
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await fetchRegistrations();
    setIsRefreshing(false);
  };

  const handleSearch = (query: string) => {
    fetchRegistrations(query);
  };

  const handleViewDetails = async (code: string) => {
    try {
      const response = await fetch(`/api/admin/registrations/${code}`);

      if (response.status === 401) {
        router.push("/admin/login");
        return;
      }

      if (!response.ok) {
        throw new Error("Failed to fetch registration details");
      }

      const data = await response.json();
      setSelectedRegistration(data.registration);
    } catch (err) {
      console.error("Error fetching details:", err);
    }
  };

  useEffect(() => {
    fetchRegistrations().then(() => setIsLoading(false));
  }, [router]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#070707] flex items-center justify-center">
        <div className="flex items-center gap-3 text-white">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span>Loading dashboard...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#070707] flex">
      <AdminSidebar currentPage="dashboard" />

      <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-x-hidden">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <LayoutDashboard className="h-6 w-6 text-[#ff5a1f]" />
            <h1 className="text-2xl sm:text-3xl font-bold text-white">Carnival Control</h1>
          </div>
          <p className="text-sm text-white/50">Manage carnival registrations</p>
        </div>

        {/* Stats Card */}
        <div className="mb-8">
          <div className="bg-gradient-to-br from-[#ff5a1f] to-[#ff7040] rounded-2xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
            <div className="relative">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[#ffebd0] text-xs font-semibold uppercase tracking-wider mb-2">
                    Total Registrations
                  </p>
                  <p className="text-5xl sm:text-6xl font-bold text-white">{totalCount}</p>
                </div>
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white/20 rounded-full flex items-center justify-center">
                  <Users className="h-8 w-8 sm:h-10 sm:w-10 text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
            <p className="text-sm text-red-400">{error}</p>
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-white">Registrations</h2>
          <button
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition disabled:opacity-50 text-sm"
          >
            <RefreshCw className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
            {isRefreshing ? "Refreshing..." : "Refresh"}
          </button>
        </div>

        {/* Registration Table */}
        <div className="overflow-x-auto">
          <RegistrationTable
            registrations={registrations}
            onSearch={handleSearch}
            onViewDetails={handleViewDetails}
          />
        </div>

        {/* Registration Details Modal */}
        {selectedRegistration && (
          <RegistrationDetails
            registration={selectedRegistration}
            onClose={() => setSelectedRegistration(null)}
          />
        )}
      </main>
    </div>
  );
}
