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
  const response = intlMiddleware(request);

  // Secure the NEXT_LOCALE cookie
  const cookies = response.headers.get('set-cookie');
  if (cookies) {
    // Split multiple Set-Cookie headers if they exist
    const cookieArray = cookies.split(',').map(cookie => {
      // If it's the NEXT_LOCALE cookie, add security flags
      if (cookie.includes('NEXT_LOCALE=')) {
        // Remove any existing Secure flag to avoid duplicates
        let secureCookie = cookie.replace(/;\s*Secure/gi, '');
        // Add Secure flag for HTTPS
        if (!secureCookie.includes('Secure')) {
          secureCookie += '; Secure';
        }
        return secureCookie;
      }
      return cookie;
    });

    // Set the modified cookies
    response.headers.delete('set-cookie');
    cookieArray.forEach(cookie => {
      response.headers.append('set-cookie', cookie.trim());
    });
  }

  return response;
}

export const config = {
  // Match only internationalized pathnames
  matcher: ['/', '/(de|en)/:path*']
};
