# Creolitos UI

Built with Next.js, TypeScript, and Supabase.

## Project Structure

```
creolitos_ui/
├── app/                    # Next.js application directory
│   ├── (admin)/            # Admin routes (protected)
│   │   └── admin/          # Admin dashboard and management
│   ├── (auth)/             # Authentication related routes
│   │   ├── auth/           # Auth callbacks and handlers
│   │   └── login/          # Login page
│   ├── (public)/           # Public facing routes
│   │   ├── blog/           # Blog section
│   │   ├── color-analyzer/ # Color analyzer tool
│   │   ├── contact/        # Contact page
│   │   ├── events/         # Events listing
│   │   └── gallery/        # Image gallery
│   ├── api/                # API routes
│   ├── lib/                # Shared libraries and utilities
│   │   ├── auth-context.tsx # Authentication context provider
│   │   ├── mock-data.ts    # Mock data for development
│   │   └── utils.ts        # General utilities
│   └── ui/                 # UI components
│       ├── creolitos-logo.tsx
│       ├── dividers.tsx
│       ├── fonts.ts
│       ├── global.css
│       ├── home.module.css
│       └── rotatingMsg.tsx
├── content/                # MDX content
│   └── home.mdx
├── public/                 # Static files
│   ├── gallery/            # Gallery images
│   └── ...                 # Various static assets
├── scripts/                # Utility scripts
│   └── favicon-generator/  # Favicon generation utilities
├── types/                  # TypeScript type definitions
│   └── supabase.ts         # Supabase type definitions
└── utils/                  # Utility functions
    └── supabase/           # Supabase client utilities
```

## Authentication and Authorization

The application uses Supabase for authentication and role-based access control. Several client utilities are available for different use cases.

### Authentication Flow

### Sign Out Process

The application implements a thorough sign out process that combines both server-side and client-side approaches:

#### How Sign Out Works

1. **Server-Side Session Termination**: 
   - The `/auth/signout` endpoint is called to terminate the session server-side
   - This endpoint cleans up HTTP-only cookies and server-side sessions
   - It handles both API requests and direct navigation differently

2. **Client-Side Cleanup**:
   - The `supabase.auth.signOut()` method is called to clean up client-side state
   - Local storage and memory state related to authentication is cleared

3. **Redirection**:
   - After signing out, users are redirected to the home page
   - The application state is completely refreshed

#### Request Headers for Server-Side Logout

When calling the server-side logout endpoint, specific request headers are important:

1. **`credentials: 'include'`**: 
   - Ensures that cookies are sent with the request
   - Required for proper session termination as auth cookies must be included

2. **`redirect: 'manual'`**:
   - Prevents automatic following of redirects by the fetch API
   - Necessary because server-side redirects in API calls won't automatically navigate the page
   - Allows client-side code to handle navigation after the server session is terminated

3. **`Accept: 'application/json'`** (optional):
   - Signals to the server that this is an API request rather than direct navigation
   - Server can respond with JSON instead of attempting a redirect response

The server-side logout endpoint (`/auth/signout`) checks the Accept header to determine how to respond:
- For API requests: Returns a JSON success response
- For direct navigation: Returns a redirect response to the home page

#### Implementation Example

```typescript
const handleSignOut = async () => {
  try {
    // Call server-side signout endpoint
    await fetch('/auth/signout', {
      method: 'POST',
      credentials: 'include',
      redirect: 'manual',
      headers: {
        'Accept': 'application/json'
      }
    });

    // Perform client-side cleanup
    const supabase = createClient();
    await supabase.auth.signOut();
    
    // Navigate to home page
    window.location.href = '/';
  } catch (error) {
    console.error('Error signing out:', error);
    window.location.href = '/';
  }
};
```

### Supabase Server Clients

#### 1. Basic Client: `createClient()`

**Purpose:** General-purpose Supabase client for server components and actions.

**When to use it:**
- For basic database operations that don't require role verification
- When you need a base client to build upon
- For public data that doesn't need authorization

**Example:**

```typescript
import { createClient } from '@/utils/supabase/supabaseServer';

export async function fetchPublicData() {
  const supabase = await createClient();
  
  const { data, error } = await supabase
    .from('public_table')
    .select('*');
    
  // Process results...
}
```

#### 2. Authenticated Client: `createAuthenticatedClient()`

**Purpose:** Provides a client with additional role information extracted from JWT.

**When to use it:**
- When you need to know the user's role
- For conditionally showing content based on roles
- When you need both the client and role information in the same function

**Example:**

```typescript
import { createAuthenticatedClient } from '@/utils/supabase/supabaseServer';

export async function fetchConditionalContent() {
  const { client: supabase, role, isAdmin } = await createAuthenticatedClient();
  
  // Use role information to determine what to fetch
  let query = supabase.from('content').select('*');
  
  if (isAdmin) {
    // Admins can see draft content too
    query = query.order('created_at', { ascending: false });
  } else {
    // Regular users only see published content
    query = query.eq('is_published', true)
                .order('created_at', { ascending: false });
  }
  
  const { data, error } = await query;
  
  return {
    data,
    error,
    isAdmin // Return admin status to the UI
  };
}
```

#### 3. Admin Client: `getAdminClient()`

**Purpose:** Ensures that only admin users can perform certain operations.

**When to use it:**
- For admin-only operations
- When you want automatic role verification
- To protect sensitive operations with less code

**Example:**

```typescript
import { getAdminClient } from '@/utils/supabase/supabaseServer';
import { revalidatePath } from 'next/cache';

export async function updateSiteSettings(settings) {
  try {
    // This will throw an error if the user is not an admin
    const supabase = await getAdminClient();
    
    const { data, error } = await supabase
      .from('site_settings')
      .upsert(settings)
      .select();
      
    if (error) throw error;
    
    // Revalidate relevant paths
    revalidatePath('/admin/settings');
    revalidatePath('/');
    
    return { success: true, data };
  } catch (error) {
    if (error.message === 'Unauthorized: Admin role required') {
      return {
        success: false,
        error: 'You must be an admin to update site settings'
      };
    }
    
    return {
      success: false,
      error: `Failed to update settings: ${error.message}`
    };
  }
}
```

### Supabase Browser Clients

The application provides specialized Supabase clients for client-side (browser) use in client components.

#### 1. Basic Client: `createClient()`

**Purpose:** Standard Supabase client for browser client components.

**When to use it:**
- In client components that need to interact with Supabase
- For user authentication in the browser context
- For real-time subscriptions and client-side data fetching

**Example:**

```typescript
'use client';

import { createClient } from '@/utils/supabase/supabaseClient';

export default function ClientComponent() {
  const handleSignIn = async () => {
    const supabase = createClient();
    
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`
      }
    });
    
    if (error) {
      console.error('Error signing in:', error);
    }
  };
  
  return (
    <button onClick={handleSignIn}>Sign in with Google</button>
  );
}
```

#### 2. Authenticated Client: `createAuthenticatedClient()`

**Purpose:** Provides a client with role information extracted from JWT for client components.

**When to use it:**
- In client components that need to know the user's role
- For conditionally rendering UI elements based on permissions
- When you need both the client and role information in the same component

**Example:**

```typescript
'use client';

import { useState, useEffect } from 'react';
import { createAuthenticatedClient } from '@/utils/supabase/supabaseClient';

export default function AdminActions() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    async function checkAdminStatus() {
      const { isAdmin } = await createAuthenticatedClient();
      setIsAdmin(isAdmin);
      setIsLoading(false);
    }
    
    checkAdminStatus();
  }, []);
  
  if (isLoading) return <div>Loading...</div>;
  
  return (
    <div>
      {isAdmin ? (
        <div>
          <h2>Admin Actions</h2>
          {/* Admin-only UI elements */}
        </div>
      ) : (
        <p>You don't have permission to access admin features.</p>
      )}
    </div>
  );
}
```

### Best Practices for Client-Side Usage

1. **Security considerations:**
   - Never perform admin-only operations directly from client components
   - Use server actions with `getAdminClient()` for sensitive operations
   - Remember that client-side code can be inspected by users

2. **Performance optimization:**
   - Leverage client-side authentication for improved UX
   - Use real-time subscriptions for live updates
   - Cache results when appropriate

3. **Role-based UI:**
   - Use the `isAdmin` flag from `createAuthenticatedClient()` for conditional rendering
   - Always provide fallback UI for unauthenticated or unauthorized users
   - Consider using the auth context provider for app-wide role information

4. **Consistent authentication state:**
   - The auth context provider should be the source of truth for authentication state
   - Components should react to auth state changes rather than managing auth independently

## Role-Based Access Control

The application uses a JWT claim called `user_role` to determine user permissions. This claim is checked by the middleware and various utility functions to provide appropriate access control.

## Development

### Prerequisites

- Node.js 18+ and pnpm
- Supabase account with project setup

### Setup

1. Clone the repository
2. Install dependencies with `pnpm install`
3. Copy `.env.example` to `.env.local` and fill in the required values
4. Start the development server with `pnpm dev`

## Tech Stack

- **Framework**: Next.js with App Router
- **Language**: TypeScript
- **Database & Auth**: Supabase
- **Styling**: Tailwind CSS
- **Content**: MDX for rich content

## Key Features

- Role-based access control (admin vs regular users)
- Event management system
- Blog with MDX support
- Image gallery
- Contact form
- Color analyzer tool

## License

[Add license information here]

## Color guidelines
**REF:** [tailwind.config.ts](/tailwind.config.ts)

### 1. Hierarchy of Use

#### Primary (`creoPri`)
Calls to action (buttons, links, highlights). This is your “signature” color family.

#### Secondary (`creoSec`)
Surfaces (card backgrounds, section fills, subtle borders). Creates warmth + depth.

#### Limited (`creoLim`)
Typography & small accents. Keeps everything grounded.

#### Contrast (`creoCont`)
Playful splashes. Should never overpower primary, but add energy and friendliness.

### 2. Balancing Warm + Bright

- Stick to 1 Primary + 1 Contrast per screen/section.
- Use Secondary neutrals as the “canvas” for your Primary + Contrast colors.
- Keep Limited tones mainly in text + footer so they don’t drag down the playful feel.

### 3. Accessibility & Readability

- On light Contrast backgrounds (mint, yellow, purple100): use creoLim.400 for text.
- On dark Limited backgrounds: use creoCont.neutral1 or white for text.
- Buttons should use creoPri.100 or creoPri.200 with hover states shifting slightly darker/lighter.