"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const registrationSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  address: z.string().min(5, "Address must be at least 5 characters"),
});

type RegistrationFormData = z.infer<typeof registrationSchema>;

interface RegistrationFormProps {
  onSuccess: (data: { registrationCode: string; fullName: string }) => void;
}

export default function RegistrationForm({ onSuccess }: RegistrationFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<RegistrationFormData>({
    resolver: zodResolver(registrationSchema),
  });

  const onSubmit = async (data: RegistrationFormData) => {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const response = await fetch("/api/registrations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Registration failed");
      }

      onSuccess({
        registrationCode: result.registrationCode,
        fullName: result.registration.fullName,
      });
      reset();
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : "Registration failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div>
        <label htmlFor="fullName" className="block text-xs font-semibold text-white/70 mb-2 uppercase tracking-wider">
          Full Name
        </label>
        <input
          id="fullName"
          type="text"
          {...register("fullName")}
          className="w-full px-4 py-3 bg-black/30 border border-white/10 rounded-lg focus:ring-2 focus:ring-[#ff5a1f] focus:border-transparent text-white placeholder-white/30 transition disabled:opacity-50"
          placeholder="Enter your full name"
          disabled={isSubmitting}
        />
        {errors.fullName && (
          <p className="mt-1.5 text-xs text-red-400">{errors.fullName.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="email" className="block text-xs font-semibold text-white/70 mb-2 uppercase tracking-wider">
          Email Address
        </label>
        <input
          id="email"
          type="email"
          {...register("email")}
          className="w-full px-4 py-3 bg-black/30 border border-white/10 rounded-lg focus:ring-2 focus:ring-[#ff5a1f] focus:border-transparent text-white placeholder-white/30 transition disabled:opacity-50"
          placeholder="your.email@example.com"
          disabled={isSubmitting}
        />
        {errors.email && (
          <p className="mt-1.5 text-xs text-red-400">{errors.email.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="phone" className="block text-xs font-semibold text-white/70 mb-2 uppercase tracking-wider">
          Phone Number
        </label>
        <input
          id="phone"
          type="tel"
          {...register("phone")}
          className="w-full px-4 py-3 bg-black/30 border border-white/10 rounded-lg focus:ring-2 focus:ring-[#ff5a1f] focus:border-transparent text-white placeholder-white/30 transition disabled:opacity-50"
          placeholder="+234 XXX XXX XXXX"
          disabled={isSubmitting}
        />
        {errors.phone && (
          <p className="mt-1.5 text-xs text-red-400">{errors.phone.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="address" className="block text-xs font-semibold text-white/70 mb-2 uppercase tracking-wider">
          Address
        </label>
        <textarea
          id="address"
          {...register("address")}
          rows={3}
          className="w-full px-4 py-3 bg-black/30 border border-white/10 rounded-lg focus:ring-2 focus:ring-[#ff5a1f] focus:border-transparent text-white placeholder-white/30 transition resize-none disabled:opacity-50"
          placeholder="Enter your full address"
          disabled={isSubmitting}
        />
        {errors.address && (
          <p className="mt-1.5 text-xs text-red-400">{errors.address.message}</p>
        )}
      </div>

      {submitError && (
        <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
          <p className="text-xs text-red-400">{submitError}</p>
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="group w-full bg-[#ff5a1f] hover:bg-[#ff7040] text-white font-semibold py-4 px-6 rounded-lg transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {isSubmitting ? (
          <>
            <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            <span>Registering...</span>
          </>
        ) : (
          <>
            <span>Register for the Carnival</span>
          </>
        )}
      </button>
    </form>
  );
}
