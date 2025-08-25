import { jwtDecode } from 'jwt-decode'

// Define custom JWT payload type that includes the role field
interface CustomJwtPayload {
  role?: string;
  [key: string]: any;
}

// User role information returned by getUserRoleFromJWT
export interface UserRoleInfo {
  role: string;
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
 * @returns Object containing role information
 */
export async function getUserRoleFromJWT(
  supabaseClient: AnySupabaseClient
): Promise<UserRoleInfo> {
  // Default return value if no role is found
  const defaultResponse: UserRoleInfo = {
    role: 'none'
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
    
    // Extract the role
    const userRole = jwt.role || 'no-role';
    
    // Log the role found for debugging
    console.log(`JWT contains role: ${userRole}`);
    
    return {
      role: userRole
    };
  } catch (error) {
    console.error('Error getting user role from JWT:', error);
    return defaultResponse;
  }
}