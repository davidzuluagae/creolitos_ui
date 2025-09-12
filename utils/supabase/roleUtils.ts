import { jwtDecode } from 'jwt-decode'

// Define custom JWT payload type that includes only user_role field
interface CustomJwtPayload {
  user_role?: string;
  [key: string]: any;
}

// User role information returned by getUserRoleFromJWT
export interface UserRoleInfo {
  role: string;
  isAdmin: boolean;
}

// Generic type for Supabase client that works with both browser and server clients
type AnySupabaseClient = {
  auth: {
    getSession: () => Promise<{ data: { session: { access_token: string } | null } }>;
  };
}

/**
 * Extracts the user role from JWT token in the session
 * Works with both browser and server clients
 * 
 * @param supabaseClient Required Supabase client (browser or server)
 * @returns Object containing role information and admin status
 */
export async function getUserRoleFromJWT(
  supabaseClient: AnySupabaseClient
): Promise<UserRoleInfo> {
  // Default return value if no role is found
  const defaultResponse: UserRoleInfo = {
    role: 'none',
    isAdmin: false
  };
  
  try {
    // Get session to access the JWT token
    const { data: sessionData } = await supabaseClient.auth.getSession();
    
    if (!sessionData.session?.access_token) {
      console.log('No valid JWT token found in session');
      return defaultResponse;
    }
    
    // Decode the JWT token
    const jwt = jwtDecode<CustomJwtPayload>(sessionData.session.access_token);
    
    // Extract the role - only using user_role now
    const userRole = jwt.user_role || 'no-role';
    const isAdmin = userRole === 'admin';
    
    if (process.env.NODE_ENV !== 'production') {
      console.log(`JWT contains user_role: ${userRole}`);
    }
    
    return {
      role: userRole,
      isAdmin
    };
  } catch (error) {
    console.error('Error getting user role from JWT:', error);
    return defaultResponse;
  }
}