import LoginClient from './login-client';

export default function LoginPage({
  searchParams,
}: {
  searchParams?: { redirectTo?: string };
}) {
  const redirectTo =
    typeof searchParams?.redirectTo === 'string' && searchParams.redirectTo.length > 0
      ? searchParams.redirectTo
      : '/admin';

  return <LoginClient redirectTo={redirectTo} />;
}
