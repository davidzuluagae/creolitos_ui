import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'
import { getUserRoleFromJWT } from './roleUtils'

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  // Get user data and role information
  const {
    data: { user },
  } = await supabase.auth.getUser()

  // Get user role information from JWT token using the enhanced utility
  const { role: userRole, isAdmin } = await getUserRoleFromJWT(supabase);
  
  // Check if this is the auth callback route with a 'next' parameter pointing to admin
  const isAuthCallback = request.nextUrl.pathname.startsWith('/auth/callback');
  const requestedAdminAfterLogin = isAuthCallback && request.nextUrl.searchParams.get('next')?.startsWith('/admin');
  
  // Redirect non-admin users after login to public home page
  if (user && requestedAdminAfterLogin && !isAdmin) {
    console.error(`Access denied: User ${user.id} with role '${userRole}' attempted to access admin after login`);
    const url = request.nextUrl.clone()
    url.pathname = '/' // Redirect to home page
    url.searchParams.delete('next') // Remove next parameter
    return NextResponse.redirect(url)
  }
  
  // Check if this is a protected route that requires authentication
  const isProtectedRoute = request.nextUrl.pathname.startsWith('/admin') || 
                          request.nextUrl.pathname.startsWith('/dashboard');
  
  // Check if this is a public auth route that allows anonymous access
  const isPublicAuthRoute = request.nextUrl.pathname.startsWith('/login') || 
                           request.nextUrl.pathname.startsWith('/auth') ||
                           request.nextUrl.pathname.startsWith('/error');
  
  // Redirect to login if not logged in and trying to access protected route
  if (!user && isProtectedRoute) {
    console.error(`Access denied: Unauthenticated user attempted to access ${request.nextUrl.pathname}`);
    const url = request.nextUrl.clone()
    url.pathname = '/login'
    url.searchParams.set('redirectTo', request.nextUrl.pathname)
    return NextResponse.redirect(url)
  }

  // Check for admin role if accessing admin routes
  if (user && request.nextUrl.pathname.startsWith('/admin') && !isAdmin) {
    // Log unauthorized access attempt with detailed information
    console.error(`Access denied: User ${user.id} with role '${userRole}' attempted to access admin route ${request.nextUrl.pathname}`);
    
    // Redirect non-admin users to home page instead of error page
    const url = request.nextUrl.clone()
    url.pathname = '/' // Redirect to home page
    return NextResponse.redirect(url)
  }

  // Allow users to access public routes whether logged in or not
  
  // IMPORTANT: You *must* return the supabaseResponse object as it is.
  // If you're creating a new response object with NextResponse.next() make sure to:
  // 1. Pass the request in it, like so:
  //    const myNewResponse = NextResponse.next({ request })
  // 2. Copy over the cookies, like so:
  //    myNewResponse.cookies.setAll(supabaseResponse.cookies.getAll())
  // 3. Change the myNewResponse object to fit your needs, but avoid changing
  //    the cookies!
  // 4. Finally:
  //    return myNewResponse
  // If this is not done, you may be causing the browser and server to go out
  // of sync and terminate the user's session prematurely!

  return supabaseResponse
}