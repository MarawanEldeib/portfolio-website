'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, GraduationCap, Copy, Upload, Send } from 'lucide-react';
import { personalInfo } from '@/lib/data';
import toast from 'react-hot-toast';
import { useState } from 'react';

export default function Contact() {
  const t = useTranslations('contact');
  const [message, setMessage] = useState('');
  const maxChars = 2000;

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success('Copied to clipboard!');
    } catch (err) {
      toast.error('Failed to copy');
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission here
    toast.success('Message sent successfully!');
  };

  return (
    <section id="contact" className="py-20 px-4 sm:px-6 bg-white dark:bg-zinc-950">
      <div className="container mx-auto max-w-5xl px-0 sm:px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-center text-zinc-900 dark:text-zinc-50 px-4 sm:px-0">{t('title')}</h2>
          <p className="text-lg sm:text-xl text-zinc-600 dark:text-zinc-400 mb-12 text-center px-4 sm:px-0">
            {t('subtitle')}
          </p>
        </motion.div>

        {/* Desktop: Side-by-Side Form and Contact Info */}
        <div className="hidden md:grid md:grid-cols-2 gap-6 sm:gap-8">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="bg-white dark:bg-zinc-900 rounded-xl p-4 sm:p-6 md:p-8 shadow-lg border border-zinc-200 dark:border-zinc-800">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Email Input */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                    Your Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    placeholder="your.email@example.com"
                    className="w-full px-4 py-3 bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-lg text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>

                {/* Message Textarea */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label htmlFor="message" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                      Tell me about your project or opportunity <span className="text-red-500">*</span>
                    </label>
                    <span className="text-xs text-zinc-500">{message.length}/{maxChars}</span>
                  </div>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    maxLength={maxChars}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell me about your project or inquiry... (You can include URLs here)"
                    className="w-full px-4 py-3 bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-lg text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                  />
                </div>

                {/* Attachment Upload */}
                <div>
                  <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                    Attachment <span className="text-zinc-500">(Optional)</span>
                  </label>
                  <div className="border-2 border-dashed border-zinc-300 dark:border-zinc-700 rounded-lg p-8 text-center hover:border-zinc-400 dark:hover:border-zinc-600 transition-colors cursor-pointer">
                    <Upload className="mx-auto mb-3 text-zinc-400 dark:text-zinc-500" size={32} />
                    <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-1">Click to upload or drag and drop</p>
                    <p className="text-xs text-zinc-500">PDF, DOC, DOCX up to 10MB each • Max 5 files</p>
                    <input
                      type="file"
                      name="attachments"
                      multiple
                      accept=".pdf,.doc,.docx"
                      className="hidden"
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-500 dark:to-blue-600 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 dark:hover:from-blue-600 dark:hover:to-blue-700 transition-all flex items-center justify-center gap-2 font-medium shadow-lg hover:shadow-xl"
                >
                  <Send size={20} />
                  <span>Send Message</span>
                </button>
              </form>
            </div>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="bg-white dark:bg-zinc-900 rounded-xl p-4 sm:p-6 md:p-8 shadow-lg border border-zinc-200 dark:border-zinc-800">
              <h3 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6 text-zinc-900 dark:text-zinc-50">Contact Information</h3>

              <div className="space-y-3 sm:space-y-4">
                {/* Email */}
                <div className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors">
                  <Mail className="text-blue-600 dark:text-blue-400 mt-1" size={24} />
                  <div className="flex-1">
                    <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-1">Email Me</p>
                    <div className="flex items-center justify-between w-full gap-2">
                      <a
                        href={`mailto:${personalInfo.email}`}
                        className="font-medium text-zinc-900 dark:text-zinc-100 hover:text-blue-600 dark:hover:text-blue-400 transition-colors whitespace-nowrap"
                      >
                        {personalInfo.email}
                      </a>
                      <button
                        onClick={() => copyToClipboard(personalInfo.email)}
                        className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors flex-shrink-0 p-1"
                        aria-label="Copy email"
                      >
                        <Copy size={16} />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors">
                  <Phone className="text-blue-600 dark:text-blue-400 mt-1" size={24} />
                  <div className="flex-1">
                    <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-1">Call Me</p>
                    <div className="flex items-center justify-between w-full gap-2">
                      <a
                        href={`tel:${personalInfo.phone}`}
                        className="font-medium text-zinc-900 dark:text-zinc-100 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                      >
                        {personalInfo.phone}
                      </a>
                      <button
                        onClick={() => copyToClipboard(personalInfo.phone)}
                        className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors flex-shrink-0 p-1"
                        aria-label="Copy phone"
                      >
                        <Copy size={16} />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 rounded-lg">
                  <MapPin className="text-blue-600 dark:text-blue-400 mt-1" size={24} />
                  <div>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400">Location</p>
                    <p className="font-medium text-zinc-900 dark:text-zinc-100">Germany | Kuwait</p>
                  </div>
                </div>

                {/* ORCID */}
                <a
                  href={personalInfo.orcid}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
                >
                  <GraduationCap className="text-green-600 dark:text-green-400 mt-1" size={24} />
                  <div>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400">{t('info.orcid')}</p>
                    <p className="font-medium text-zinc-900 dark:text-zinc-100">ORCID iD</p>
                  </div>
                </a>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Mobile: Simple Contact Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className="block md:hidden max-w-xl mx-auto bg-zinc-900 rounded-2xl p-8 shadow-xl"
        >
          <h3 className="text-2xl font-bold text-white mb-6">Contact Information</h3>

          <div className="space-y-6">
            {/* Email */}
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center">
                <Mail className="text-blue-400" size={24} />
              </div>
              <div className="flex-1">
                <p className="text-sm text-zinc-400 mb-1">Email Me</p>
                <div className="flex items-center gap-2">
                  <a href={`mailto:${personalInfo.email}`} className="text-white font-medium hover:text-blue-400 transition-colors whitespace-nowrap">
                    {personalInfo.email}
                  </a>
                  <button
                    onClick={() => copyToClipboard(personalInfo.email)}
                    className="text-zinc-400 hover:text-white transition-colors flex-shrink-0 p-1"
                    aria-label="Copy email"
                  >
                    <Copy size={16} />
                  </button>
                </div>
              </div>
            </div>

            {/* Phone */}
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center">
                <Phone className="text-blue-400" size={24} />
              </div>
              <div className="flex-1">
                <p className="text-sm text-zinc-400 mb-1">Call Me</p>
                <div className="flex items-center gap-2">
                  <a href={`tel:${personalInfo.phone}`} className="text-white font-medium hover:text-blue-400 transition-colors whitespace-nowrap">
                    {personalInfo.phone}
                  </a>
                  <button
                    onClick={() => copyToClipboard(personalInfo.phone)}
                    className="text-zinc-400 hover:text-white transition-colors flex-shrink-0 p-1"
                    aria-label="Copy phone"
                  >
                    <Copy size={16} />
                  </button>
                </div>
              </div>
            </div>

            {/* Location */}
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center">
                <MapPin className="text-blue-400" size={24} />
              </div>
              <div className="flex-1">
                <p className="text-sm text-zinc-400 mb-1">Location</p>
                <p className="text-white font-medium">Germany | Kuwait</p>
              </div>
            </div>

            {/* ORCID */}
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center">
                <GraduationCap className="text-green-400" size={24} />
              </div>
              <div className="flex-1">
                <p className="text-sm text-zinc-400 mb-1">{t('info.orcid')}</p>
                <a
                  href={personalInfo.orcid}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white font-medium hover:text-green-400 transition-colors"
                >
                  ORCID iD
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
