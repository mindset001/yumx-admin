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
    // Don't protect the login page
    if (pathname === '/admin/login') {
      return;
    }

    // Check if user is not authenticated
    if (!token) {
      // Redirect to login page with return URL
      const returnUrl = encodeURIComponent(pathname);
      router.replace(`/admin/login?returnUrl=${returnUrl}`);
    }
  }, [token, router, pathname]);

  // If we're on the login page, or if we're authenticated, render the content
  if (pathname === '/admin/login' || token) {
    return <>{children}</>;
  }

  // Show nothing while checking authentication
  return null;
}