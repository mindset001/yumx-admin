'use client'

import React, { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import Image from "next/image";
import Logo from "../../../../public/images/logo.png"
import { useAppDispatch, useAppSelector } from "@/lib/store";
import { setCredentials } from "@/lib/features/auth/authSlice";

// API endpoints configuration
const API_ENDPOINTS = {
  login: `${process.env.NEXT_PUBLIC_API_URL || 'https://yumx.metronio.com'}/auth/login`
};

function AdminLoginInner() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);
  
  const router = useRouter();
  const dispatch = useAppDispatch();
  // No need for returnUrl in login page; OTP page will handle post-OTP redirect


  // Input sanitization
  const sanitizeInput = (input: string) => {
    return input.trim().replace(/[<>]/g, '');
  };

  // Form validation
  const validateForm = () => {
    if (!email) {
      setError("Please enter email address");
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email address");
      return false;
    }
    if (!password) {
      setError("Please enter password");
      return false;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isLocked) {
      setError("Too many failed attempts. Please try again in 5 minutes.");
      return;
    }

    if (!validateForm()) return;

    try {
      setIsLoading(true);
      setError("");
      
      const response = await fetch(API_ENDPOINTS.login, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ 
          email: sanitizeInput(email), 
          password: sanitizeInput(password) 
        }),
      });

      if (!response.ok) {
        const newAttempts = attempts + 1;
        setAttempts(newAttempts);
        
        if (newAttempts >= 5) {
          setIsLocked(true);
          setTimeout(() => {
            setIsLocked(false);
            setAttempts(0);
          }, 300000); // 5 minutes lockout
          setError("Too many failed attempts. Account temporarily locked for 5 minutes.");
          return;
        }
        throw new Error("Invalid credentials");
      }

      // Save login details (accessToken and user) to Redux and localStorage
      const data = await response.json();
      console.log('LOGIN RESPONSE DATA:', data);
      if (data && data.data && data.data.accessToken) {
        dispatch(setCredentials({ token: data.data.accessToken, user: null }));
        if (typeof window !== 'undefined') {
          localStorage.setItem('accessToken', data.data.accessToken);
        }
        // Optionally, fetch user profile here using the accessToken
      }

      // Reset attempts on successful login
      setAttempts(0);
      setLoginSuccess(true);
      setTimeout(() => {
        if (typeof window !== 'undefined' && data && data.data && data.data.accessToken) {
          localStorage.setItem('accessToken', data.data.accessToken);
        }
        router.replace('/admin/login/otp');
      }, 1200);
    } catch (err) {
      setError("Invalid email or password");
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(sanitizeInput(e.target.value));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(sanitizeInput(e.target.value));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FFF2F2]">
      <div className="bg-white rounded-xl w-full max-w-md p-10 flex flex-col items-center">
        <Image 
          src={Logo} 
          alt="Yum X Logo" 
          width={120} 
          height={60} 
          className="mb-2" 
          priority
        />
        <h2 className="text-xl font-semibold text-gray-900 mb-8">Admin login</h2>
        {loginSuccess && (
          <div className="w-full p-3 mb-4 bg-green-100 border border-green-400 text-green-700 rounded-md text-sm text-center" role="alert" aria-live="polite">
            Login successful! Redirecting to OTP...
          </div>
        )}
        {isLocked && (
          <div 
            className="w-full p-3 mb-4 bg-yellow-100 border border-yellow-400 text-yellow-700 rounded-md text-sm"
            role="alert"
            aria-live="assertive"
          >
            Account temporarily locked due to too many failed attempts. Please try again in 5 minutes.
          </div>
        )}
        <form className="w-full flex flex-col gap-6" onSubmit={handleSubmit}>
          <div>
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={handleEmailChange}
              disabled={isLoading || isLocked}
              aria-describedby={error ? "login-error" : undefined}
              aria-required="true"
              className="border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#C72600] w-full disabled:bg-gray-100"
            />
          </div>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={handlePasswordChange}
              disabled={isLoading || isLocked}
              aria-describedby={error ? "login-error" : undefined}
              aria-required="true"
              className="border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#C72600] w-full disabled:bg-gray-100 pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              disabled={isLoading || isLocked}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 disabled:opacity-50"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? "👁️" : "👁️‍🗨️"}
            </button>
          </div>
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-600">
              Attempts: {attempts}/5
            </div>
            <Link 
              href="#" 
              className="text-[#C72600] text-sm font-medium hover:underline"
              onClick={(e) => {
                if (isLocked) e.preventDefault();
              }}
            >
              Forgot your password?
            </Link>
          </div>
          {error && (
            <div 
              id="login-error" 
              className="text-red-600 text-sm text-center p-2 bg-red-50 rounded-md border border-red-200"
              role="alert"
              aria-live="polite"
            >
              {error}
            </div>
          )}
          <button
            type="submit"
            disabled={isLoading || isLocked}
            aria-label={isLoading ? "Signing in" : "Login"}
            className="bg-[#C72600] text-white font-semibold rounded-md py-3 mt-2 hover:bg-red-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Signing in...
              </>
            ) : isLocked ? "Account Locked" : "Login"}
          </button>
        </form>
        <div className="mt-6 text-center text-sm text-gray-500">
          <p>Secure admin access</p>
        </div>
      </div>
    </div>
  );
}

export default function AdminLogin() {
  return (
    <Suspense>
      <AdminLoginInner />
    </Suspense>
  );
}