'use client';

import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useAppDispatch } from '@/lib/store';
import { setCredentials } from '@/lib/features/auth/authSlice';

const PUBLIC_ROUTES = ['/admin/login', '/admin/login/otp'];

export default function AuthInitializer({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      // Skip auth check for public routes
      if (PUBLIC_ROUTES.includes(pathname)) {
        setIsChecking(false);
        return;
      }

      // Check for accessToken in localStorage
      if (typeof window !== 'undefined') {
        const accessToken = localStorage.getItem('accessToken');
        
        if (!accessToken) {
          // No token found, redirect to login
          router.replace('/admin/login');
          return;
        }

        // Token exists, update Redux state
        const user = localStorage.getItem('user');
        let parsedUser = null;
        try {
          parsedUser = user && user !== 'undefined' ? JSON.parse(user) : null;
        } catch (e) {
          parsedUser = null;
        }

        dispatch(setCredentials({ token: accessToken, user: parsedUser }));
      }
      
      setIsChecking(false);
    };

    checkAuth();
  }, [pathname, router, dispatch]);

  // Show loading state while checking auth
  if (isChecking && !PUBLIC_ROUTES.includes(pathname)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FFF2F2]">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-[#C72600] border-r-transparent"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}