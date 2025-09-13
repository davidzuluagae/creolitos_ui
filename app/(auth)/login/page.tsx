'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { createClient } from '@/utils/supabase/supabaseClient';
import Link from 'next/link';
import Image from 'next/image';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import { Tab } from '@headlessui/react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [mode, setMode] = useState<'login' | 'register' | 'forgot'>('login');

  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get('redirectTo') || '/admin';
  const supabase = createClient();

  // Check if user is already logged in
  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        router.push(redirectTo);
      }
    };

    checkSession();
  }, [supabase, router, redirectTo]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setMessage(null);

    try {
      if (mode === 'login') {
        // Sign in with email and password
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) {
          throw error;
        }

        // Use window.location for a more reliable redirect after authentication
        // This ensures a full page reload with the new authentication state
        window.location.href = redirectTo;
        return; // Important: prevent the code below from executing
      } else if (mode === 'register') {
        // Sign up with email and password
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/auth/callback`,
          },
        });

        if (error) {
          throw error;
        }

        setMessage('Registration successful! Check your email for verification instructions.');
        setMode('login');
      } else if (mode === 'forgot') {
        // Password reset request
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: `${window.location.origin}/auth/callback?next=/reset-password`,
        });

        if (error) {
          throw error;
        }

        setMessage('Password reset instructions sent to your email.');
        setMode('login');
      }
    } catch (error: any) {
      setError(error?.message || 'An error occurred during authentication');
      console.error('Authentication error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="absolute top-0 left-0 m-8">
        <Link href="/" className="flex items-center space-x-2">
          <Image
            src="/creolitos_sm.png"
            alt="Creolitos"
            width={50}
            height={50}
            className="rounded-md"
          />
          <span className="text-xl font-bold text-amber-800">Creolitos</span>
        </Link>
      </div>

      <div className="max-w-md w-full space-y-6 bg-white p-8 rounded-xl shadow-md">
        {/* HeadlessUI Tab Group for Login/Register/Forgot Password */}
        <Tab.Group
          selectedIndex={mode === 'login' ? 0 : mode === 'register' ? 1 : 2}
          onChange={(index) => {
            setMode(index === 0 ? 'login' : index === 1 ? 'register' : 'forgot');
            setError(null);
            setMessage(null);
          }}
        >
          <Tab.List className="flex rounded-lg bg-amber-50 p-1">
            <Tab
              className={({ selected }) =>
                `w-full rounded-md py-2.5 text-sm font-medium leading-5 transition-colors
                 ${selected
                  ? 'bg-white shadow text-amber-700'
                  : 'text-amber-500 hover:bg-white/[0.5] hover:text-amber-600'
                }`
              }
            >
              Sign In
            </Tab>
            <Tab
              className={({ selected }) =>
                `w-full rounded-md py-2.5 text-sm font-medium leading-5 transition-colors
                 ${selected
                  ? 'bg-white shadow text-amber-700'
                  : 'text-amber-500 hover:bg-white/[0.5] hover:text-amber-600'
                }`
              }
            >
              Register
            </Tab>
            <Tab
              className={({ selected }) =>
                `w-full rounded-md py-2.5 text-sm font-medium leading-5 transition-colors
                 ${selected
                  ? 'bg-white shadow text-amber-700'
                  : 'text-amber-500 hover:bg-white/[0.5] hover:text-amber-600'
                }`
              }
            >
              Reset
            </Tab>
          </Tab.List>

          <Tab.Panels className="mt-4">
            <Tab.Panel>
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Sign in to your account</h2>
                <p className="mt-2 text-sm text-gray-600">
                  Enter your credentials to access your account
                </p>
              </div>

              {error && mode === 'login' && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm mb-4">
                  {error}
                </div>
              )}

              {message && mode === 'login' && (
                <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-md text-sm mb-4">
                  {message}
                </div>
              )}

              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="email-login" className="block text-sm font-medium text-gray-700 mb-1">
                      Email address
                    </label>
                    <input
                      id="email-login"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-amber-500 focus:border-amber-500 focus:z-10 sm:text-sm"
                      placeholder="name@example.com"
                    />
                  </div>

                  <div className="relative">
                    <label htmlFor="password-login" className="block text-sm font-medium text-gray-700 mb-1">
                      Password
                    </label>
                    <input
                      id="password-login"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      autoComplete="current-password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-amber-500 focus:border-amber-500 focus:z-10 sm:text-sm pr-10"
                      placeholder="••••••••"
                      minLength={6}
                    />
                    <button
                      type="button"
                      className="absolute right-3 bottom-2.5 text-gray-500 hover:text-gray-700"
                      onClick={() => setShowPassword(!showPassword)}
                      tabIndex={-1}
                    >
                      {showPassword ? (
                        <EyeSlashIcon className="h-5 w-5" />
                      ) : (
                        <EyeIcon className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-amber-600 hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 disabled:bg-amber-300 disabled:cursor-not-allowed"
                >
                  {isLoading && mode === 'login' ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </span>
                  ) : 'Sign in'}
                </button>
              </form>
            </Tab.Panel>

            <Tab.Panel>
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Create a new account</h2>
                <p className="mt-2 text-sm text-gray-600">
                  Fill out the form below to create your account
                </p>
              </div>

              {error && mode === 'register' && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm mb-4">
                  {error}
                </div>
              )}

              {message && mode === 'register' && (
                <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-md text-sm mb-4">
                  {message}
                </div>
              )}

              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="email-register" className="block text-sm font-medium text-gray-700 mb-1">
                      Email address
                    </label>
                    <input
                      id="email-register"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-amber-500 focus:border-amber-500 focus:z-10 sm:text-sm"
                      placeholder="name@example.com"
                    />
                  </div>

                  <div className="relative">
                    <label htmlFor="password-register" className="block text-sm font-medium text-gray-700 mb-1">
                      Password
                    </label>
                    <input
                      id="password-register"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      autoComplete="new-password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-amber-500 focus:border-amber-500 focus:z-10 sm:text-sm pr-10"
                      placeholder="Create a password"
                      minLength={6}
                    />
                    <button
                      type="button"
                      className="absolute right-3 bottom-2.5 text-gray-500 hover:text-gray-700"
                      onClick={() => setShowPassword(!showPassword)}
                      tabIndex={-1}
                    >
                      {showPassword ? (
                        <EyeSlashIcon className="h-5 w-5" />
                      ) : (
                        <EyeIcon className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-amber-600 hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 disabled:bg-amber-300 disabled:cursor-not-allowed"
                >
                  {isLoading && mode === 'register' ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </span>
                  ) : 'Sign up'}
                </button>
              </form>
            </Tab.Panel>

            <Tab.Panel>
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Reset your password</h2>
                <p className="mt-2 text-sm text-gray-600">
                  Enter your email to receive reset instructions
                </p>
              </div>

              {error && mode === 'forgot' && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm mb-4">
                  {error}
                </div>
              )}

              {message && mode === 'forgot' && (
                <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-md text-sm mb-4">
                  {message}
                </div>
              )}

              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="email-forgot" className="block text-sm font-medium text-gray-700 mb-1">
                      Email address
                    </label>
                    <input
                      id="email-forgot"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-amber-500 focus:border-amber-500 focus:z-10 sm:text-sm"
                      placeholder="name@example.com"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-amber-600 hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 disabled:bg-amber-300 disabled:cursor-not-allowed"
                >
                  {isLoading && mode === 'forgot' ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </span>
                  ) : 'Send reset instructions'}
                </button>
              </form>
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
    </div>
  );
}