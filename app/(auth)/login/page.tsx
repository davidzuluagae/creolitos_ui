import LoginClient from './login-client';

export default async function LoginPage({
  searchParams,
}: {
  searchParams?: Promise<{ redirectTo?: string }>;
}) {
  const resolvedSearchParams = searchParams ? await searchParams : undefined;
  const redirectTo =
    typeof resolvedSearchParams?.redirectTo === 'string' &&
    resolvedSearchParams.redirectTo.length > 0
      ? resolvedSearchParams.redirectTo
      : '/admin';

  return <LoginClient redirectTo={redirectTo} />;
}
