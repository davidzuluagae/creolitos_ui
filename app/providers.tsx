'use client';

import { AuthProvider } from '@/app/lib/auth-context';

export default function Providers({ children }: { children: React.ReactNode }) {
  return <AuthProvider>{children}</AuthProvider>;
}
