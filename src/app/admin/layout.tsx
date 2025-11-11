'use client';

import { useAppSelector } from '@/lib/store';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const { token } = useAppSelector((state) => state.auth);

  useEffect(() => {
    // Allow access to login and OTP page without authentication
    if (pathname === '/admin/login' || pathname === '/admin/login/otp') {
      return;
    }

    // Check if user is not authenticated
    if (!token) {
      // Redirect to login page without return URL
      router.replace(`/admin/login`);
    }
  }, [token, router, pathname]);

  // If we're on the login page, OTP page, or if we're authenticated, render the content
  if (pathname === '/admin/login' || pathname === '/admin/login/otp' || token) {
    return <>{children}</>;
  }

  // Show nothing while checking authentication
  return null;
}