import createMiddleware from 'next-intl/middleware';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const intlMiddleware = createMiddleware({
  // A list of all locales that are supported
  locales: ['en', 'de'],

  // Used when no locale matches
  defaultLocale: 'en'
});

export default function middleware(request: NextRequest) {
  // Security: Block suspicious user agents
  const userAgent = request.headers.get('user-agent') || '';
  const suspiciousPatterns = [
    'sqlmap',
    'nikto',
    'nmap',
    'masscan',
    'python-requests',
    'curl', // Be careful with this in production
  ];
  
  const isSuspicious = suspiciousPatterns.some(pattern => 
    userAgent.toLowerCase().includes(pattern)
  );
  
  if (isSuspicious) {
    return new NextResponse('Forbidden', { status: 403 });
  }

  // Security: Prevent directory traversal attempts
  const url = request.nextUrl.pathname;
  if (url.includes('..') || url.includes('//')) {
    return new NextResponse('Bad Request', { status: 400 });
  }

  // Continue with internationalization
  return intlMiddleware(request);
}

export const config = {
  // Match only internationalized pathnames
  matcher: ['/', '/(de|en)/:path*']
};
