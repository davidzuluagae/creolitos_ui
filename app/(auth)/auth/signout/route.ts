import { createClient } from '@/utils/supabase/supabaseServer';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const supabase = await createClient();
  
  // Sign out the user
  await supabase.auth.signOut();
  
  // Check if this is an API request (fetch) or direct navigation
  // by looking at the Accept header
  const acceptHeader = request.headers.get('Accept') || '';
  const isApiRequest = acceptHeader.includes('application/json');
  
  if (isApiRequest) {
    // For API/fetch requests, return a JSON response
    return NextResponse.json({
      success: true,
      message: 'Successfully signed out'
    });
  } else {
    // For direct navigation (browser form submission, etc.), redirect
    return NextResponse.redirect(new URL('/', request.url), {
      status: 302,
    });
  }
}