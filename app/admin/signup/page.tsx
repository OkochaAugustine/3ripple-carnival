"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Lock, User, AlertCircle, Shield, UserPlus, Check } from "lucide-react";

export default function AdminSignupPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [isAdminExists, setIsAdminExists] = useState(false);

  useEffect(() => {
    // Check if admin already exists
    const checkAdminExists = async () => {
      try {
        const response = await fetch("/api/admin/check");
        const data = await response.json();
        if (data.hasAdmin) {
          setIsAdminExists(true);
          // Redirect to login if admin already exists
          router.push("/admin/login");
        }
      } catch (err) {
        console.error("Failed to check admin status:", err);
      }
    };

    checkAdminExists();
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    // Client-side validation
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setIsLoading(false);
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters long");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/admin/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Registration failed");
      }

      setSuccess(true);
      // Redirect to dashboard after successful registration
      setTimeout(() => {
        router.push("/admin/dashboard");
      }, 1500);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isAdminExists) {
    return (
      <div className="min-h-screen bg-[#070707] flex items-center justify-center p-4">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-[#ff5a1f]/10 rounded-full mb-4 border border-[#ff5a1f]/30">
            <Lock className="h-8 w-8 text-[#ff5a1f]" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">Admin Account Exists</h1>
          <p className="text-white/50 mb-6">An admin account has already been created.</p>
          <Link
            href="/admin/login"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#ff5a1f] hover:bg-[#ff7040] text-white font-semibold rounded-lg transition"
          >
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#070707] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute left-[8%] top-[30%] h-[220px] w-[220px] rounded-full bg-[#ff5a1f]/10 blur-[100px]" />
        <div className="absolute right-[10%] bottom-[20%] h-[180px] w-[180px] rounded-full bg-[#ff5a1f]/8 blur-[80px]" />
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Logo/Brand */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-[#ff5a1f]/10 rounded-full mb-4 border border-[#ff5a1f]/30">
            <Shield className="h-8 w-8 text-[#ff5a1f]" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Admin Setup</h1>
          <p className="text-sm text-white/50">Create your admin account</p>
        </div>

        {/* Signup Card */}
        <div className="border border-white/10 bg-black/45 backdrop-blur-xl rounded-2xl p-8 shadow-2xl">
          {success ? (
            <div className="text-center py-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-500/10 rounded-full mb-4 border border-green-500/30">
                <Check className="h-8 w-8 text-green-500" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">Account Created!</h2>
              <p className="text-white/50 mb-4">Redirecting to dashboard...</p>
              <div className="h-1 w-24 bg-[#ff5a1f] rounded-full mx-auto animate-pulse" />
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-xs font-semibold text-white/70 mb-2 uppercase tracking-wider">
                  Email Address
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-white/30" />
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-black/30 border border-white/10 rounded-lg focus:ring-2 focus:ring-[#ff5a1f] focus:border-transparent text-white placeholder-white/30 transition disabled:opacity-50"
                    placeholder="admin@example.com"
                    disabled={isLoading}
                    required
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <label htmlFor="password" className="block text-xs font-semibold text-white/70 mb-2 uppercase tracking-wider">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-white/30" />
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-black/30 border border-white/10 rounded-lg focus:ring-2 focus:ring-[#ff5a1f] focus:border-transparent text-white placeholder-white/30 transition disabled:opacity-50"
                    placeholder="••••••••"
                    disabled={isLoading}
                    required
                    minLength={8}
                  />
                </div>
                <p className="text-[10px] text-white/30 mt-1">Minimum 8 characters</p>
              </div>

              {/* Confirm Password Field */}
              <div>
                <label htmlFor="confirmPassword" className="block text-xs font-semibold text-white/70 mb-2 uppercase tracking-wider">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-white/30" />
                  <input
                    id="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-black/30 border border-white/10 rounded-lg focus:ring-2 focus:ring-[#ff5a1f] focus:border-transparent text-white placeholder-white/30 transition disabled:opacity-50"
                    placeholder="••••••••"
                    disabled={isLoading}
                    required
                    minLength={8}
                  />
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
                  <AlertCircle className="h-4 w-4 text-red-500 flex-shrink-0" />
                  <p className="text-xs text-red-400">{error}</p>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="group w-full bg-[#ff5a1f] hover:bg-[#ff7040] text-white font-semibold py-3 px-4 rounded-lg transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Creating account...</span>
                  </>
                ) : (
                  <>
                    <UserPlus className="h-4 w-4" />
                    <span>Create Admin Account</span>
                  </>
                )}
              </button>
            </form>
          )}

          {/* Back to Home */}
          <div className="mt-6 pt-6 border-t border-white/10 text-center">
            <Link
              href="/"
              className="text-xs text-white/50 hover:text-[#ff5a1f] transition"
            >
              ← Back to Homepage
            </Link>
          </div>
        </div>

        {/* Security Notice */}
        <div className="mt-6 text-center">
          <p className="text-[10px] text-white/30 uppercase tracking-wider">
            One-time setup • This will be the only admin account
          </p>
        </div>
      </div>
    </div>
  );
}
