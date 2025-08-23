import { type NextRequest } from 'next/server'
import { updateSession } from '@/utils/supabase/middleware'

export async function middleware(request: NextRequest) {
  return await updateSession(request)
}

export const config = {
  matcher: [
    // Protected routes that require authentication
    '/admin/:path*',
    '/dashboard/:path*',
    
    // Public routes that still need session handling but don't require auth
    '/(main|login|auth)/:path*',
    
    // Match root path
    '/',
    
    // Exclude static files and images
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}