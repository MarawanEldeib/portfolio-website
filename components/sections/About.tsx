'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Download, Mail, FileText, CheckCircle, MapPin, Eye } from 'lucide-react';
import { personalInfo } from '@/lib/data';
import { useState, useEffect } from 'react';
import CVPreviewModal from '@/components/ui/CVPreviewModal';

export default function About() {
  const t = useTranslations('about');
  const [showCVPreview, setShowCVPreview] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);
  const [showAboutMe, setShowAboutMe] = useState(false);
  const [showStrengths, setShowStrengths] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const [showClosing, setShowClosing] = useState(false);

  const triggerAnimation = () => {
    // Reset all animations first
    setShowWelcome(false);
    setShowAboutMe(false);
    setShowStrengths(false);
    setShowContact(false);
    setShowClosing(false);

    // Trigger animations in sequence
    setTimeout(() => setShowWelcome(true), 200);
    setTimeout(() => setShowAboutMe(true), 800);
    setTimeout(() => setShowStrengths(true), 1400);
    setTimeout(() => setShowContact(true), 2000);
    setTimeout(() => setShowClosing(true), 2600);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            triggerAnimation();
          }
        });
      },
      { threshold: 0.2 } // Trigger when 20% of section is visible
    );

    const section = document.getElementById('about');
    if (section) {
      observer.observe(section);
    }

    // Listen for hash changes (menu clicks)
    const handleHashChange = () => {
      if (window.location.hash === '#about') {
        // Small delay to ensure scroll has completed
        setTimeout(triggerAnimation, 100);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    
    // Check if already on about section on mount
    if (window.location.hash === '#about') {
      setTimeout(triggerAnimation, 300);
    }

    return () => {
      if (section) {
        observer.unobserve(section);
      }
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  return (
    <section id="about" className="py-20 px-4 bg-gradient-to-b from-zinc-50 to-white dark:from-zinc-900 dark:to-zinc-950">
      <div className="container mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold mb-12 text-center">{t('title')}</h2>
          
          {/* Terminal-style container */}
          <div className="bg-[#1e1e2e] dark:bg-[#1a1b26] rounded-lg overflow-hidden shadow-2xl border border-zinc-700/50">
            {/* Terminal header */}
            <div className="bg-[#2d2d3d] dark:bg-[#24283b] px-4 py-3 flex items-center gap-2 border-b border-zinc-700/50">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
                <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
                <div className="w-3 h-3 rounded-full bg-[#27c93f]"></div>
              </div>
              <span className="ml-4 text-sm text-cyan-400 font-mono">about.sh</span>
            </div>

            {/* Terminal content */}
            <div className="p-8 font-mono text-sm md:text-base space-y-6">
              {/* Welcome message */}
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: showWelcome ? 1 : 0 }}
                transition={{ duration: 0.5 }}
                className="text-cyan-300"
              >
                Welcome! Thanks for taking the time to check out my portfolio.
              </motion.p>

              {/* About me section */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: showAboutMe ? 1 : 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-3"
              >
                <p className="text-green-400">
                  <span className="text-purple-400">$</span> {personalInfo.name.toLowerCase().replace(' ', '@')}:~$ about_me
                </p>
                <motion.div 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: showAboutMe ? 1 : 0, x: showAboutMe ? 0 : -10 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="pl-4 space-y-2 text-blue-300"
                >
                  <motion.p
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: showAboutMe ? 1 : 0, x: showAboutMe ? 0 : -10 }}
                    transition={{ duration: 0.3, delay: 0.3 }}
                  >
                    • My name is <span className="text-white font-semibold">{personalInfo.name}</span>.
                  </motion.p>
                  <motion.p
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: showAboutMe ? 1 : 0, x: showAboutMe ? 0 : -10 }}
                    transition={{ duration: 0.3, delay: 0.4 }}
                  >
                    • I'm a <span className="text-white font-semibold">Software Engineering Student</span> at <span className="text-white font-semibold">Stuttgart University</span>.
                  </motion.p>
                  <motion.p
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: showAboutMe ? 1 : 0, x: showAboutMe ? 0 : -10 }}
                    transition={{ duration: 0.3, delay: 0.5 }}
                  >
                    • I believe in combining technical expertise with innovative problem-solving to build impactful solutions.
                  </motion.p>
                  <motion.p
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: showAboutMe ? 1 : 0, x: showAboutMe ? 0 : -10 }}
                    transition={{ duration: 0.3, delay: 0.6 }}
                  >
                    • Currently working at <span className="text-white font-semibold">Fraunhofer IOSB</span> on cutting-edge AI and circular economy projects.
                  </motion.p>
                </motion.div>
              </motion.div>

              {/* Current strengths section */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: showStrengths ? 1 : 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-3"
              >
                <p className="text-green-400">
                  <span className="text-purple-400">$</span> {personalInfo.name.toLowerCase().replace(' ', '@')}:~$ current_strengths
                </p>
                <motion.div 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: showStrengths ? 1 : 0, x: showStrengths ? 0 : -10 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="pl-4 space-y-2 text-blue-300"
                >
                  <motion.p
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: showStrengths ? 1 : 0, x: showStrengths ? 0 : -10 }}
                    transition={{ duration: 0.3, delay: 0.3 }}
                  >
                    • Full-Stack Development, AI/ML, Deep Learning, Computer Vision, LLM Systems
                  </motion.p>
                  <motion.p
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: showStrengths ? 1 : 0, x: showStrengths ? 0 : -10 }}
                    transition={{ duration: 0.3, delay: 0.4 }}
                  >
                    • Python, TypeScript, React, Next.js, Flutter, PyTorch, GraphQL
                  </motion.p>
                  <motion.p
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: showStrengths ? 1 : 0, x: showStrengths ? 0 : -10 }}
                    transition={{ duration: 0.3, delay: 0.5 }}
                  >
                    • Strong research background with published work in computer vision
                  </motion.p>
                  <motion.p
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: showStrengths ? 1 : 0, x: showStrengths ? 0 : -10 }}
                    transition={{ duration: 0.3, delay: 0.6 }}
                  >
                    • A belief that I can figure out anything if I put my mind to it - <span className="text-cyan-300 hover:text-cyan-200 cursor-pointer" onClick={() => setShowCVPreview(true)}>Download my CV to get a better idea</span>
                  </motion.p>
                </motion.div>
              </motion.div>

              {/* Contact info */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: showContact ? 1 : 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-3"
              >
                <p className="text-green-400">
                  <span className="text-purple-400">$</span> {personalInfo.name.toLowerCase().replace(' ', '@')}:~$ contact_info
                </p>
                <motion.div 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: showContact ? 1 : 0, x: showContact ? 0 : -10 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="pl-4 space-y-2 text-blue-300"
                >
                  <motion.p
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: showContact ? 1 : 0, x: showContact ? 0 : -10 }}
                    transition={{ duration: 0.3, delay: 0.3 }}
                  >
                    • 📧 Email: <a href={`mailto:${personalInfo.email}`} className="text-cyan-400 hover:text-cyan-300 underline">{personalInfo.email}</a>
                  </motion.p>
                  <motion.p
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: showContact ? 1 : 0, x: showContact ? 0 : -10 }}
                    transition={{ duration: 0.3, delay: 0.4 }}
                  >
                    • 📱 Phone: <a href={`tel:${personalInfo.phone}`} className="text-cyan-400 hover:text-cyan-300">{personalInfo.phone}</a>
                  </motion.p>
                  <motion.p
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: showContact ? 1 : 0, x: showContact ? 0 : -10 }}
                    transition={{ duration: 0.3, delay: 0.5 }}
                  >
                    • 📍 Location: <span className="text-white">{personalInfo.location}</span>
                  </motion.p>
                  {personalInfo.workPermit.hasPermit && (
                    <motion.p
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: showContact ? 1 : 0, x: showContact ? 0 : -10 }}
                      transition={{ duration: 0.3, delay: 0.6 }}
                    >
                      • ✅ Work Permit: <span className="text-white">{personalInfo.workPermit.details}</span>
                    </motion.p>
                  )}
                </motion.div>
              </motion.div>

              {/* Closing message */}
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: showClosing ? 1 : 0 }}
                transition={{ duration: 0.5 }}
                className="text-cyan-300 pt-4"
              >
                Always looking to connect with fellow tech enthusiasts!
              </motion.p>

              {/* Cursor */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: showClosing ? 1 : 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="flex items-center"
              >
                <span className="text-purple-400">$</span>
                <span className="ml-2 w-2 h-5 bg-cyan-400 animate-pulse"></span>
              </motion.div>
            </div>
          </div>

          {/* Action buttons below terminal */}
          <div className="flex flex-col sm:flex-row gap-4 mt-8 justify-center">
            <button
              onClick={() => setShowCVPreview(true)}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg transition-colors shadow-lg"
              title="Preview CV"
            >
              <Eye size={20} />
              <span>Preview CV</span>
            </button>
            <a
              href="/cv/Marawan_Eldeib_Resume.pdf"
              download
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors shadow-lg"
            >
              <Download size={20} />
              {t('downloadCV')}
            </a>
            <a
              href="#contact"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors shadow-lg"
            >
              <Mail size={20} />
              {t('contactMe')}
            </a>
          </div>
        </motion.div>
      </div>

      <CVPreviewModal
        isOpen={showCVPreview}
        onClose={() => setShowCVPreview(false)}
        cvUrl="/cv/Marawan_Eldeib_Resume.pdf"
      />
    </section>
  );
}
