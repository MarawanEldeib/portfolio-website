
'use client';

import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Mail, Phone, Linkedin, Send, MapPin, AlertCircle } from 'lucide-react';
import { personalInfo } from '@/lib/data';
import CopyButton from '@/components/ui/CopyButton';
import AttachmentUpload from '@/components/ui/AttachmentUpload';
import toast from 'react-hot-toast';
import { trackFormSubmit } from '@/lib/analytics';

export default function Contact() {
  const t = useTranslations('contact');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [files, setFiles] = useState<File[]>([]);
  const [url, setUrl] = useState('');
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    message: '',
    attachment: '',
    general: '',
  });
  const [touched, setTouched] = useState({
    name: false,
    email: false,
    message: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Validate individual field
  const validateField = (name: string, value: string): string => {
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
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    setFormData({
      ...formData,
      [name]: value,
    });

    // Clear error when user starts typing
    if (errors[name as keyof typeof errors]) {
      setErrors({
        ...errors,
        [name]: '',
      });
    }

    // Validate if field has been touched
    if (touched[name as keyof typeof touched]) {
      const error = validateField(name, value);
      setErrors({
        ...errors,
        [name]: error,
      });
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
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

  const validateForm = (): boolean => {
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate all fields
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setErrors({ name: '', email: '', message: '', attachment: '', general: '' });
    
    try {
      // Track analytics
      trackFormSubmit();
      
      // Create FormData for file upload
      const data = new FormData();
      data.append('name', formData.name.trim());
      data.append('email', formData.email.trim());
      data.append('message', formData.message.trim());
      
      // Add multiple files
      files.forEach(file => {
        data.append('files', file);
      });
      
      // Add URL if provided
      if (url) {
        data.append('url', url);
      }
      
      // Send to API endpoint
      const response = await fetch('/api/contact', {
        method: 'POST',
        body: data,
      });
      
      const result = await response.json();
      
      if (!response.ok) {
        // Handle specific error types
        if (result.error.includes('file') || result.error.includes('File')) {
          setErrors({ ...errors, attachment: result.error });
          toast.error(result.error, { 
            duration: 4000,
            style: {
              background: 'var(--card-background)',
              color: 'var(--text-primary)',
              border: '1px solid var(--card-border)',
            },
          });
        } else if (result.error.includes('email')) {
          setErrors({ ...errors, email: result.error });
          toast.error(result.error, { 
            duration: 4000,
            style: {
              background: 'var(--card-background)',
              color: 'var(--text-primary)',
              border: '1px solid var(--card-border)',
            },
          });
        } else if (result.error.includes('rate') || result.error.includes('many')) {
          setErrors({ ...errors, general: result.error });
          toast.error(result.error, { 
            duration: 4000,
            style: {
              background: 'var(--card-background)',
              color: 'var(--text-primary)',
              border: '1px solid var(--card-border)',
            },
          });
        } else {
          setErrors({ ...errors, general: result.error });
          toast.error(result.error, { 
            duration: 4000,
            style: {
              background: 'var(--card-background)',
              color: 'var(--text-primary)',
              border: '1px solid var(--card-border)',
            },
          });
        }
        return;
      }
      
      // Reset form
      setFormData({ name: '', email: '', message: '' });
      setFiles([]);
      setUrl('');
      setErrors({ name: '', email: '', message: '', attachment: '', general: '' });
      setTouched({ name: false, email: false, message: false });
      
      // Show success toast
      toast.success(
        "Thank you for reaching out! I've received your message and will get back to you as soon as possible. Usually within 24 hours.",
        {
          duration: 3500,
          style: {
            background: 'var(--card-background)',
            color: 'var(--text-primary)',
            border: '1px solid var(--card-border)',
          },
        }
      );
    } catch (error) {
      console.error('Form submission error:', error);
      const errorMessage = 'Network error. Please check your connection and try again.';
      setErrors({
        ...errors,
        general: errorMessage,
      });
      toast.error(errorMessage, { 
        duration: 4000,
        style: {
          background: 'var(--card-background)',
          color: 'var(--text-primary)',
          border: '1px solid var(--card-border)',
        },
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 px-4 bg-white dark:bg-zinc-950">
      <div className="container mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold mb-4 text-center text-zinc-900 dark:text-zinc-50">{t('title')}</h2>
          <p className="text-xl text-zinc-600 dark:text-zinc-400 mb-12 text-center">
            {t('subtitle')}
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-zinc-900 rounded-xl p-8 shadow-lg border border-zinc-200 dark:border-zinc-800"
            >
              <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                {/* General Error */}
                <AnimatePresence>
                  {errors.general && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="flex items-start gap-2 text-red-600 dark:text-red-400 text-sm bg-red-50 dark:bg-red-950/30 p-3 rounded-lg border border-red-200 dark:border-red-900/50"
                    >
                      <AlertCircle size={16} className="mt-0.5 flex-shrink-0" />
                      <p>{errors.general}</p>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2 text-zinc-700 dark:text-zinc-300">
                    {t('form.name')} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`w-full px-4 py-3 rounded-lg border ${
                      errors.name && touched.name
                        ? 'border-red-500 dark:border-red-500 focus:ring-red-500'
                        : 'border-zinc-300 dark:border-zinc-700 focus:ring-blue-500'
                    } bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none focus:ring-2 focus:border-transparent transition-all`}
                    placeholder="Your full name"
                    aria-invalid={errors.name && touched.name ? 'true' : 'false'}
                    aria-describedby={errors.name ? 'name-error' : undefined}
                  />
                  <AnimatePresence>
                    {errors.name && touched.name && (
                      <motion.p
                        id="name-error"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="flex items-center gap-1.5 text-red-600 dark:text-red-400 text-sm mt-1.5"
                      >
                        <AlertCircle size={14} />
                        <span>{errors.name}</span>
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2 text-zinc-700 dark:text-zinc-300">
                    {t('form.email')} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`w-full px-4 py-3 rounded-lg border ${
                      errors.email && touched.email
                        ? 'border-red-500 dark:border-red-500 focus:ring-red-500'
                        : 'border-zinc-300 dark:border-zinc-700 focus:ring-blue-500'
                    } bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none focus:ring-2 focus:border-transparent transition-all`}
                    placeholder="your.email@example.com"
                    aria-invalid={errors.email && touched.email ? 'true' : 'false'}
                    aria-describedby={errors.email ? 'email-error' : undefined}
                  />
                  <AnimatePresence>
                    {errors.email && touched.email && (
                      <motion.p
                        id="email-error"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="flex items-center gap-1.5 text-red-600 dark:text-red-400 text-sm mt-1.5"
                      >
                        <AlertCircle size={14} />
                        <span>{errors.email}</span>
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label htmlFor="message" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                      {t('form.message')} <span className="text-red-500">*</span>
                    </label>
                    <span className={`text-xs ${
                      formData.message.length > 2000 
                        ? 'text-red-600 dark:text-red-400 font-semibold' 
                        : formData.message.length > 1800
                        ? 'text-orange-600 dark:text-orange-400'
                        : 'text-zinc-500 dark:text-zinc-400'
                    }`}>
                      {formData.message.length}/2000
                    </span>
                  </div>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    rows={5}
                    className={`w-full px-4 py-3 rounded-lg border ${
                      errors.message && touched.message
                        ? 'border-red-500 dark:border-red-500 focus:ring-red-500'
                        : 'border-zinc-300 dark:border-zinc-700 focus:ring-blue-500'
                    } bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none focus:ring-2 focus:border-transparent resize-none transition-all`}
                    placeholder="Tell me about your project or inquiry..."
                    aria-invalid={errors.message && touched.message ? 'true' : 'false'}
                    aria-describedby={errors.message ? 'message-error' : undefined}
                  />
                  <AnimatePresence>
                    {errors.message && touched.message && (
                      <motion.p
                        id="message-error"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="flex items-center gap-1.5 text-red-600 dark:text-red-400 text-sm mt-1.5"
                      >
                        <AlertCircle size={14} />
                        <span>{errors.message}</span>
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>

                {/* Attachment Upload */}
                <div>
                  <label className="block text-sm font-medium mb-2 text-zinc-700 dark:text-zinc-300">
                    {t('form.attachment')} <span className="text-zinc-500 dark:text-zinc-400 text-xs font-normal">(Optional)</span>
                  </label>
                  <AttachmentUpload
                    onFilesChange={setFiles}
                    onUrlChange={setUrl}
                    error={errors.attachment}
                    onError={(error) => setErrors({ ...errors, attachment: error })}
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-500 dark:to-blue-600 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 dark:hover:from-blue-600 dark:hover:to-blue-700 active:from-blue-800 active:to-blue-900 dark:active:from-blue-700 dark:active:to-blue-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 font-medium shadow-lg hover:shadow-xl relative overflow-hidden group"
                >
                  {/* Animated background shimmer */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    initial={{ x: '-100%' }}
                    animate={{ x: isSubmitting ? '100%' : '-100%' }}
                    transition={{ duration: 1.5, repeat: isSubmitting ? Infinity : 0, ease: 'linear' }}
                  />
                  
                  <motion.div
                    animate={isSubmitting ? { rotate: 360 } : { rotate: 0 }}
                    transition={{ duration: 1, repeat: isSubmitting ? Infinity : 0, ease: 'linear' }}
                  >
                    <Send size={20} />
                  </motion.div>
                  
                  <span className="relative">
                    {isSubmitting ? 'Sending...' : t('form.send')}
                  </span>
                </motion.button>
              </form>
            </motion.div>

            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="bg-white dark:bg-zinc-900 rounded-xl p-8 shadow-lg border border-zinc-200 dark:border-zinc-800">
                <h3 className="text-xl font-semibold mb-6 text-zinc-900 dark:text-zinc-50">Contact Information</h3>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-4 p-4 rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors group">
                    <Mail className="text-blue-600 dark:text-blue-400 mt-1" size={24} />
                    <div className="flex-1">
                      <p className="text-sm text-zinc-600 dark:text-zinc-400">{t('info.email')}</p>
                      <div className="flex items-center">
                        <a 
                          href={`mailto:${personalInfo.email}`}
                          className="font-medium text-zinc-900 dark:text-zinc-100 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                        >
                          {personalInfo.email}
                        </a>
                        <CopyButton text={personalInfo.email} label="email" />
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors group">
                    <Phone className="text-blue-600 dark:text-blue-400 mt-1" size={24} />
                    <div className="flex-1">
                      <p className="text-sm text-zinc-600 dark:text-zinc-400">{t('info.phone')}</p>
                      <div className="flex items-center">
                        <a 
                          href={`tel:${personalInfo.phone}`}
                          className="font-medium text-zinc-900 dark:text-zinc-100 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                        >
                          {personalInfo.phone}
                        </a>
                        <CopyButton text={personalInfo.phone} label="phone number" />
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 rounded-lg">
                    <MapPin className="text-blue-600 dark:text-blue-400 mt-1" size={24} />
                    <div>
                      <p className="text-sm text-zinc-600 dark:text-zinc-400">{t('info.location')}</p>
                      <p className="font-medium text-zinc-900 dark:text-zinc-100">{personalInfo.location}</p>
                    </div>
                  </div>

                  <a
                    href={personalInfo.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-4 p-4 rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
                  >
                    <Linkedin className="text-blue-600 dark:text-blue-400 mt-1" size={24} />
                    <div>
                      <p className="text-sm text-zinc-600 dark:text-zinc-400">{t('info.linkedin')}</p>
                      <p className="font-medium text-zinc-900 dark:text-zinc-100">LinkedIn Profile</p>
                    </div>
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
