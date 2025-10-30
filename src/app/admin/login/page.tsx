'use client'

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Logo from "../../../../public/images/logo.png"

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  // Demo: use localStorage for login state
  React.useEffect(() => {
    if (typeof window !== "undefined" && localStorage.getItem("adminLoggedIn") === "true") {
      router.replace("/dashboard");
    }
  }, [router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Demo: accept any non-empty username/password
    if (username && password) {
      localStorage.setItem("adminLoggedIn", "true");
      router.replace("/");
    } else {
      setError("Please enter username and password.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FFF2F2]">
      <div className="bg-white rounded-xl w-full max-w-md p-10 flex flex-col items-center">
        <Image src={Logo} alt="Yum X Logo" width={120} height={60} className="mb-2" />
        <h2 className="text-xl font-semibold text-gray-900 mb-8">Admin login</h2>
        <form className="w-full flex flex-col gap-6" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={e => setUsername(e.target.value)}
            className="border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#C72600]"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#C72600]"
          />
          <div className="flex justify-end">
            <Link href="#" className="text-[#C72600] text-sm font-medium hover:underline">
              Forget your password?
            </Link>
          </div>
          {error && <div className="text-red-600 text-sm text-center">{error}</div>}
          <button
            type="submit"
            className="bg-[#C72600] text-white font-semibold rounded-md py-3 mt-2 hover:bg-red-700 transition-all"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
