/**
 * useContactFormValidation Hook
 * Provides validation logic for contact form fields
 * Follows clean code principles by separating validation logic from UI
 */

import { useState } from 'react';

interface FormData {
  name: string;
  email: string;
  message: string;
}

interface FormErrors {
  name: string;
  email: string;
  message: string;
  attachment: string;
  general: string;
}

interface TouchedFields {
  name: boolean;
  email: boolean;
  message: boolean;
}

/**
 * Validate individual form field
 * @param name - Field name
 * @param value - Field value
 * @returns Error message or empty string if valid
 */
export function validateField(name: string, value: string): string {
  switch (name) {
    case 'name':
      if (!value.trim()) {
        return 'Name is required';
      }
      if (value.trim().length < 2) {
        return 'Name must be at least 2 characters';
      }
      if (value.trim().length > 100) {
        return 'Name is too long (max 100 characters)';
      }
      if (!/^[a-zA-Z\s'-]+$/.test(value)) {
        return 'Name can only contain letters, spaces, hyphens, and apostrophes';
      }
      return '';

    case 'email':
      if (!value.trim()) {
        return 'Email is required';
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        return 'Please enter a valid email address';
      }
      return '';

    case 'message':
      if (!value.trim()) {
        return 'Message is required';
      }
      if (value.trim().length < 10) {
        return 'Message must be at least 10 characters';
      }
      if (value.trim().length > 2000) {
        return 'Message is too long (max 2000 characters)';
      }
      return '';

    default:
      return '';
  }
}

/**
 * Custom hook for contact form validation
 * Provides validation state and handlers
 */
export function useContactFormValidation() {
  const [errors, setErrors] = useState<FormErrors>({
    name: '',
    email: '',
    message: '',
    attachment: '',
    general: '',
  });

  const [touched, setTouched] = useState<TouchedFields>({
    name: false,
    email: false,
    message: false,
  });

  /**
   * Handle field change - validate if already touched
   */
  const handleFieldChange = (name: keyof FormData, value: string) => {
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: '',
      });
    }

    // Validate if field has been touched
    if (touched[name]) {
      const error = validateField(name, value);
      setErrors({
        ...errors,
        [name]: error,
      });
    }
  };

  /**
   * Handle field blur - mark as touched and validate
   */
  const handleFieldBlur = (name: keyof FormData, value: string) => {
    setTouched({
      ...touched,
      [name]: true,
    });

    const error = validateField(name, value);
    setErrors({
      ...errors,
      [name]: error,
    });
  };

  /**
   * Validate entire form
   * @returns true if form is valid
   */
  const validateForm = (formData: FormData): boolean => {
    const nameError = validateField('name', formData.name);
    const emailError = validateField('email', formData.email);
    const messageError = validateField('message', formData.message);

    setErrors({
      name: nameError,
      email: emailError,
      message: messageError,
      attachment: '',
      general: '',
    });

    setTouched({
      name: true,
      email: true,
      message: true,
    });

    return !nameError && !emailError && !messageError;
  };

  /**
   * Reset validation state
   */
  const resetValidation = () => {
    setErrors({
      name: '',
      email: '',
      message: '',
      attachment: '',
      general: '',
    });
    setTouched({
      name: false,
      email: false,
      message: false,
    });
  };

  /**
   * Set error for specific field or general error
   */
  const setFieldError = (field: keyof FormErrors, error: string) => {
    setErrors({
      ...errors,
      [field]: error,
    });
  };

  return {
    errors,
    touched,
    handleFieldChange,
    handleFieldBlur,
    validateForm,
    resetValidation,
    setFieldError,
    setErrors, // For direct error updates
  };
}
