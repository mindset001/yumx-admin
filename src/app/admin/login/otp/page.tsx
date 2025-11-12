"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/lib/store";
import { setCredentials } from "@/lib/features/auth/authSlice";

export default function OtpPage() {
  // Debug: Log saved login details
  if (typeof window !== 'undefined') {
    const accessToken = localStorage.getItem('accessToken');
    const user = localStorage.getItem('user');
    let parsedUser = null;
    try {
      parsedUser = user && user !== 'undefined' ? JSON.parse(user) : null;
    } catch (e) {
      parsedUser = null;
    }
    console.log('Saved accessToken:', accessToken);
    console.log('Saved user:', parsedUser);
  }
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const accessToken = useAppSelector((state) => state.auth.token) || (typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    try {
      const endpoint = `/api/auth/login/verify/${code}`;
      const headers: Record<string, string> = {
        "Content-Type": "application/json",
      };
      if (accessToken) {
        headers["Authorization"] = `Bearer ${accessToken}`;
      }
      const res = await fetch(endpoint, {
        method: "POST",
        headers,
        credentials: "include",
      });
      if (res.ok) {
        const data = await res.json();
        dispatch(setCredentials(data));
        router.replace("/");
      } else {
        setError("Invalid OTP. Please try again.");
      }
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FFF2F2]">
      <div className="bg-white rounded-xl w-full max-w-md p-10 flex flex-col items-center">
        <form className="w-full flex flex-col gap-6" onSubmit={handleSubmit}>
          <input
            type="text"
            inputMode="numeric"
            pattern="[0-9]{4}"
            maxLength={4}
            placeholder="Enter 4-digit OTP"
            value={code}
            onChange={e => setCode(e.target.value.replace(/\D/g, ""))}
            disabled={isLoading}
            className="border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#C72600] w-full disabled:bg-gray-100 text-center text-lg tracking-widest"
            aria-label="One Time Password"
            required
          />
          {error && (
            <div className="text-red-600 text-sm text-center p-2 bg-red-50 rounded-md border border-red-200" role="alert" aria-live="polite">
              {error}
            </div>
          )}
          <Button
            type="submit"
            disabled={isLoading || code.length !== 4}
            className="bg-[#C72600] text-white font-semibold rounded-md py-3 mt-2 hover:bg-red-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            aria-label={isLoading ? "Verifying" : "Verify OTP"}
          >
            {isLoading ? "Verifying..." : "Verify OTP"}
          </Button>
        </form>
        <button
          type="button"
          onClick={() => router.replace("/")}
          className="mt-6 text-sm text-gray-500 underline hover:text-[#C72600]"
        >
          Skip verification
        </button>
      </div>
    </div>
  );
}
