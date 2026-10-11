"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

export default function AdminEntryPage() {
  const router = useRouter();

  useEffect(() => {
    const checkAdminAndRedirect = async () => {
      try {
        // Check if user is already authenticated
        const authCheck = await fetch("/api/admin/registrations", {
          method: "GET",
        });

        if (authCheck.ok) {
          // User is authenticated, go to dashboard
          router.push("/admin/dashboard");
          return;
        }

        // Not authenticated, check if admin exists
        const response = await fetch("/api/admin/check");
        const data = await response.json();

        if (data.hasAdmin) {
          // Admin exists, redirect to login
          router.push("/admin/login");
        } else {
          // No admin exists, redirect to signup
          router.push("/admin/signup");
        }
      } catch (error) {
        console.error("Error checking admin status:", error);
        // On error, default to login page
        router.push("/admin/login");
      }
    };

    checkAdminAndRedirect();
  }, [router]);

  return (
    <div className="min-h-screen bg-[#070707] flex items-center justify-center">
      <div className="flex items-center gap-3 text-white">
        <Loader2 className="h-6 w-6 animate-spin" />
        <span>Loading...</span>
      </div>
    </div>
  );
}
