import { NextRequest, NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ALLOWED_FILE_TYPES = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
];

// Blocked URL domains (phishing, malware, URL shorteners)
const BLOCKED_DOMAINS = [
  'bit.ly',
  'tinyurl.com',
  'goo.gl',
  't.co',
  'ow.ly',
  'buff.ly',
  'adf.ly',
  'bc.vc',
  'shorte.st',
  'sh.st',
];

// Rate limiting store (in production, use Redis or similar)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

// Simple rate limiting: 5 requests per 15 minutes per IP
function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const limit = rateLimitMap.get(ip);

  if (!limit || now > limit.resetTime) {
    rateLimitMap.set(ip, {
      count: 1,
      resetTime: now + 15 * 60 * 1000, // 15 minutes
    });
    return true;
  }

  if (limit.count >= 5) {
    return false;
  }

  limit.count++;
  return true;
}

// Validate file magic bytes (basic security check)
async function validateFileMagicBytes(file: File): Promise<boolean> {
  const buffer = await file.arrayBuffer();
  const bytes = new Uint8Array(buffer.slice(0, 4));

  // PDF: %PDF (25 50 44 46)
  if (bytes[0] === 0x25 && bytes[1] === 0x50 && bytes[2] === 0x44 && bytes[3] === 0x46) {
    return true;
  }

  // DOC/DOCX: D0 CF 11 E0 (old Word) or 50 4B 03 04 (ZIP/DOCX)
  if (
    (bytes[0] === 0xd0 && bytes[1] === 0xcf && bytes[2] === 0x11 && bytes[3] === 0xe0) ||
    (bytes[0] === 0x50 && bytes[1] === 0x4b && bytes[2] === 0x03 && bytes[3] === 0x04)
  ) {
    return true;
  }

  return false;
}

// Validate URL for security (phishing, malware, etc.)
function validateUrl(urlString: string): { valid: boolean; error?: string } {
  try {
    const url = new URL(urlString);

    // Only allow HTTPS
    if (url.protocol !== 'https:') {
      return { valid: false, error: 'Only HTTPS URLs are allowed for security' };
    }

    // Check for blocked domains
    const hostname = url.hostname.toLowerCase();
    for (const blocked of BLOCKED_DOMAINS) {
      if (hostname.includes(blocked)) {
        return { valid: false, error: 'URL shorteners and blocked domains are not allowed' };
      }
    }

    // Check for suspicious patterns
    if (hostname.includes('..') || hostname.includes('@')) {
      return { valid: false, error: 'Suspicious URL pattern detected' };
    }

    // Must have a valid TLD
    if (!hostname.includes('.')) {
      return { valid: false, error: 'Invalid URL format' };
    }

    // Check for IP addresses (often used in phishing)
    const ipRegex = /^(\d{1,3}\.){3}\d{1,3}$/;
    if (ipRegex.test(hostname)) {
      return { valid: false, error: 'IP addresses are not allowed. Please use domain names.' };
    }

    return { valid: true };
  } catch (e) {
    return { valid: false, error: 'Invalid URL format' };
  }
}

export async function POST(request: NextRequest) {
  try {
    // Get client IP for rate limiting
    const headersList = await headers();
    const forwardedFor = headersList.get('x-forwarded-for');
    const ip = forwardedFor ? forwardedFor.split(',')[0] : 'unknown';

    // Check rate limit
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }

    // Parse form data
    const formData = await request.formData();
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const message = formData.get('message') as string;
    const file = formData.get('file') as File | null;
    const url = formData.get('url') as string | null;

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Validate file if provided
    if (file) {
      // Check file size
      if (file.size > MAX_FILE_SIZE) {
        return NextResponse.json(
          { error: 'File size exceeds 10MB limit' },
          { status: 400 }
        );
      }

      // Check file type
      if (!ALLOWED_FILE_TYPES.includes(file.type)) {
        return NextResponse.json(
          { error: 'Invalid file type. Only PDF and Word documents are allowed' },
          { status: 400 }
        );
      }

      // Validate magic bytes (basic security)
      const isValidFile = await validateFileMagicBytes(file);
      if (!isValidFile) {
        return NextResponse.json(
          { error: 'Invalid file format detected' },
          { status: 400 }
        );
      }

      // TODO: Virus scanning (VirusTotal API or ClamAV)
      // This requires additional API key and implementation
      // See FILE_UPLOAD.md for implementation details
    }

    // Validate URL if provided
    if (url) {
      const urlValidation = validateUrl(url);
      if (!urlValidation.valid) {
        return NextResponse.json(
          { error: urlValidation.error || 'Invalid URL' },
          { status: 400 }
        );
      }
    }

    // Send email using Resend
    try {
      const emailContent = `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p style="white-space: pre-wrap;">${message}</p>
        ${url ? `<p><strong>Attached URL:</strong> <a href="${url}" target="_blank">${url}</a></p>` : ''}
        ${file ? `<p><strong>Attached File:</strong> ${file.name} (${(file.size / 1024).toFixed(2)} KB)</p>` : ''}
      `;

      const emailData: any = {
        from: 'Contact Form <onboarding@resend.dev>', // Use your verified domain in production
        to: process.env.CONTACT_EMAIL || 'marawandeep13@gmail.com',
        subject: `Portfolio Contact: ${name}`,
        html: emailContent,
        reply_to: email,
      };

      // Add attachment if file is provided
      if (file) {
        const fileBuffer = Buffer.from(await file.arrayBuffer());
        emailData.attachments = [
          {
            filename: file.name,
            content: fileBuffer,
          },
        ];
      }

      await resend.emails.send(emailData);

      // Log successful submission
      console.log('Contact form submission sent:', {
        name,
        email,
        hasFile: !!file,
        hasUrl: !!url,
      });

      return NextResponse.json({
        success: true,
        message: 'Message sent successfully! I will get back to you soon.',
      });
    } catch (emailError) {
      console.error('Email sending error:', emailError);
      return NextResponse.json(
        { error: 'Failed to send email. Please try again later or contact me directly.' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'An error occurred while processing your request' },
      { status: 500 }
    );
  }
}
