/**
 * Validation utility functions
 * Centralized validation logic for forms, files, and URLs
 * Following security best practices and input sanitization
 */

// File validation constants
export const FILE_VALIDATION = {
  MAX_FILE_SIZE: 10 * 1024 * 1024, // 10MB
  MAX_FILES_COUNT: 5,
  ALLOWED_MIME_TYPES: [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  ],
} as const;

// Blocked URL domains (phishing, malware, URL shorteners)
export const BLOCKED_URL_DOMAINS = [
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
] as const;

// Email validation regex (RFC 5322 simplified)
export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Validation result type
 */
export interface ValidationResult {
  valid: boolean;
  error?: string;
}

/**
 * Validate email format
 */
export function validateEmail(email: string): ValidationResult {
  if (!email || !email.trim()) {
    return { valid: false, error: 'Email is required' };
  }

  if (!EMAIL_REGEX.test(email)) {
    return { valid: false, error: 'Invalid email format' };
  }

  return { valid: true };
}

/**
 * Validate file magic bytes (basic security check)
 * Prevents file type spoofing by checking actual file content
 */
export async function validateFileMagicBytes(file: File): Promise<boolean> {
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

/**
 * Validate URL for security (prevents phishing, malware, etc.)
 * @param urlString - URL to validate
 * @returns Validation result with error message if invalid
 */
export function validateUrl(urlString: string): ValidationResult {
  try {
    const url = new URL(urlString);

    // Only allow HTTPS for security
    if (url.protocol !== 'https:') {
      return { valid: false, error: 'Only HTTPS URLs are allowed for security' };
    }

    // Check for blocked domains (URL shorteners, known malicious sites)
    const hostname = url.hostname.toLowerCase();
    for (const blocked of BLOCKED_URL_DOMAINS) {
      if (hostname.includes(blocked)) {
        return { valid: false, error: 'URL shorteners and blocked domains are not allowed' };
      }
    }

    // Check for suspicious patterns (path traversal, embedded auth)
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

/**
 * Validate file size
 */
export function validateFileSize(file: File): ValidationResult {
  if (file.size > FILE_VALIDATION.MAX_FILE_SIZE) {
    return {
      valid: false,
      error: `File "${file.name}" exceeds ${FILE_VALIDATION.MAX_FILE_SIZE / 1024 / 1024}MB limit`,
    };
  }
  return { valid: true };
}

/**
 * Validate file MIME type
 */
export function validateFileMimeType(file: File): ValidationResult {
  const allowedTypes = FILE_VALIDATION.ALLOWED_MIME_TYPES as readonly string[];
  if (!allowedTypes.includes(file.type)) {
    return {
      valid: false,
      error: `Invalid file type for "${file.name}". Only PDF and Word documents are allowed`,
    };
  }
  return { valid: true };
}

/**
 * Validate multiple files (count, size, type, magic bytes)
 */
export async function validateFiles(files: File[]): Promise<ValidationResult> {
  // Check file count
  if (files.length > FILE_VALIDATION.MAX_FILES_COUNT) {
    return { valid: false, error: `Maximum ${FILE_VALIDATION.MAX_FILES_COUNT} files allowed` };
  }

  // Validate each file
  for (const file of files) {
    // Check file size
    const sizeValidation = validateFileSize(file);
    if (!sizeValidation.valid) {
      return sizeValidation;
    }

    // Check file type
    const typeValidation = validateFileMimeType(file);
    if (!typeValidation.valid) {
      return typeValidation;
    }

    // Validate magic bytes (basic security)
    const isValidFile = await validateFileMagicBytes(file);
    if (!isValidFile) {
      return { valid: false, error: `Invalid file format detected for "${file.name}"` };
    }
  }

  return { valid: true };
}
