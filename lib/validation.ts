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
