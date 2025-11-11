'use client';

import { auth } from '@/lib/auth';
import { useEffect } from 'react';

export default function AuthInitializer({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    auth.initAuth();
  }, []);

  return <>{children}</>;
}