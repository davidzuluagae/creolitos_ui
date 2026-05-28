import { type NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export async function proxy(request: NextRequest) {
  const username = process.env.ADMIN_BASIC_AUTH_USER
  const password = process.env.ADMIN_BASIC_AUTH_PASSWORD

  if (!username || !password) {
    return new NextResponse('Admin access is disabled.', { status: 404 })
  }

  const authHeader = request.headers.get('authorization')
  if (!authHeader?.startsWith('Basic ')) {
    return unauthorized()
  }

  const encodedCredentials = authHeader.slice(6)
  let decodedCredentials = ''

  try {
    decodedCredentials = atob(encodedCredentials)
  } catch {
    return unauthorized()
  }

  const [providedUser, ...passwordParts] = decodedCredentials.split(':')
  const providedPassword = passwordParts.join(':')

  if (providedUser !== username || providedPassword !== password) {
    return unauthorized()
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/dashboard/:path*',
  ],
}

function unauthorized() {
  return new NextResponse('Authentication required.', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Creolitos Admin", charset="UTF-8"',
    },
  })
}
