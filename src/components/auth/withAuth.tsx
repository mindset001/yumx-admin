'use client';

import { useAppSelector } from '@/lib/store';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export function withAuth<P extends object>(
  WrappedComponent: React.ComponentType<P>
) {
  return function ProtectedRoute(props: P) {
    const router = useRouter();
    const { token, user } = useAppSelector((state) => state.auth);

    useEffect(() => {
      // Check if user is not authenticated
      if (!token || !user) {
        // Redirect to login page with return URL
        const returnUrl = encodeURIComponent(window.location.pathname);
        router.replace(`/auth/login?returnUrl=${returnUrl}`);
      }
    }, [token, user, router]);

    // Show nothing while checking authentication
    if (!token || !user) {
      return null;
    }

    // If authenticated, render the protected component
    return <WrappedComponent {...props} />;
  };
}