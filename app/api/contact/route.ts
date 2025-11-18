import { NextRequest, NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { Resend } from 'resend';
import { validateEmail, validateUrl, validateFiles } from '@/lib/validation';

// Lazy initialization of Resend client to avoid build-time errors
let resendClient: Resend | null = null;
function getResendClient() {
  if (!resendClient) {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      throw new Error('RESEND_API_KEY environment variable is not set');
    }
    resendClient = new Resend(apiKey);
  }
  return resendClient;
}

// Note: Validation constants and functions moved to @/lib/validation for reusability

// Rate limiting store (in production, use Redis or similar)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

/**
 * Simple rate limiting: 5 requests per 15 minutes per IP
 * In production, use Redis or similar for distributed rate limiting
 */
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
    const files = formData.getAll('files') as File[];
    const url = formData.get('url') as string | null;

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailValidation = validateEmail(email);
    if (!emailValidation.valid) {
      return NextResponse.json(
        { error: emailValidation.error },
        { status: 400 }
      );
    }

    // Validate files if provided
    if (files.length > 0) {
      const filesValidation = await validateFiles(files);
      if (!filesValidation.valid) {
        return NextResponse.json(
          { error: filesValidation.error },
          { status: 400 }
        );
      }

      // TODO: Virus scanning for all files (VirusTotal API or ClamAV)
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
        ${files.length > 0 ? `<p><strong>Attached Files:</strong> ${files.map(f => `${f.name} (${(f.size / 1024).toFixed(2)} KB)`).join(', ')}</p>` : ''}
      `;

      interface EmailData {
        from: string;
        to: string;
        subject: string;
        html: string;
        reply_to: string;
        attachments?: Array<{ filename: string; content: Buffer }>;
      }

      const emailData: EmailData = {
        from: 'Contact Form <onboarding@resend.dev>', // Use your verified domain in production
        to: process.env.CONTACT_EMAIL || 'marawandeep13@gmail.com',
        subject: `Portfolio Contact: ${name}`,
        html: emailContent,
        reply_to: email,
      };

      // Add attachments if files are provided
      if (files.length > 0) {
        const attachments = await Promise.all(
          files.map(async (file) => ({
            filename: file.name,
            content: Buffer.from(await file.arrayBuffer()),
          }))
        );
        emailData.attachments = attachments;
      }

      const resend = getResendClient();
      await resend.emails.send(emailData);

      // Log successful submission
      console.log('Contact form submission sent:', {
        name,
        email,
        filesCount: files.length,
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
