'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { Mail, Phone, Linkedin, Send, MapPin } from 'lucide-react';
import { personalInfo } from '@/lib/data';
import CopyButton from '@/components/ui/CopyButton';
import AttachmentUpload from '@/components/ui/AttachmentUpload';
import { trackFormSubmit } from '@/lib/analytics';

export default function Contact() {
  const t = useTranslations('contact');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [attachment, setAttachment] = useState<File | string | null>(null);
  const [attachmentError, setAttachmentError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setAttachmentError('');
    
    try {
      // Track analytics
      trackFormSubmit();
      
      // Create FormData for file upload
      const data = new FormData();
      data.append('name', formData.name);
      data.append('email', formData.email);
      data.append('message', formData.message);
      
      if (attachment) {
        if (typeof attachment === 'string') {
          data.append('url', attachment);
        } else {
          data.append('file', attachment);
        }
      }
      
      // Send to API endpoint
      const response = await fetch('/api/contact', {
        method: 'POST',
        body: data,
      });
      
      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.error || 'Failed to send message');
      }
      
      // Reset form
      setFormData({ name: '', email: '', message: '' });
      setAttachment(null);
      alert(result.message || 'Message sent successfully!');
    } catch (error) {
      console.error('Form submission error:', error);
      alert(error instanceof Error ? error.message : 'Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
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
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2 text-zinc-700 dark:text-zinc-300">
                    {t('form.name')}
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="Your full name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2 text-zinc-700 dark:text-zinc-300">
                    {t('form.email')}
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="your.email@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2 text-zinc-700 dark:text-zinc-300">
                    {t('form.message')}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-all"
                    placeholder="Tell me about your project or inquiry..."
                  />
                </div>

                {/* Attachment Upload */}
                <div>
                  <label className="block text-sm font-medium mb-2 text-zinc-700 dark:text-zinc-300">
                    {t('form.attachment')} <span className="text-zinc-500 dark:text-zinc-400 text-xs font-normal">(Optional)</span>
                  </label>
                  <AttachmentUpload
                    onAttachmentChange={setAttachment}
                    error={attachmentError}
                    onError={setAttachmentError}
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-6 py-3 bg-blue-600 dark:bg-blue-500 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 active:bg-blue-800 dark:active:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 font-medium shadow-md hover:shadow-lg"
                >
                  <Send size={20} />
                  {isSubmitting ? 'Sending...' : t('form.send')}
                </button>
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

              <div className="bg-gradient-to-br from-blue-600 to-blue-700 dark:from-blue-500 dark:to-blue-600 rounded-xl p-8 text-white shadow-lg">
                <h3 className="text-xl font-semibold mb-3">Ready to collaborate?</h3>
                <p className="mb-6 opacity-95">
                  I'm always open to discussing new projects, creative ideas, or opportunities to be part of your visions.
                </p>
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="inline-block px-6 py-3 bg-white text-blue-600 dark:text-blue-700 rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-100 transition-colors font-medium shadow-md hover:shadow-lg"
                >
                  Get in Touch
                </a>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
