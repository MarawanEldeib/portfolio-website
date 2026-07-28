'use client';

import { useTranslations, useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import { Mail, Eye, ChevronDown, MapPin, Linkedin, Github, Phone } from 'lucide-react';
import { personalInfo } from '@/lib/data';
import { getPersonalInfo } from '@/lib/data-localized';
import type { Locale } from '@/lib/types';
import { EXTERNAL_LINKS } from '@/lib/constants';
import Image from 'next/image';
import { useState, useEffect, useMemo } from 'react';
import dynamic from 'next/dynamic';
import DownloadButton from '@/components/ui/DownloadButton';

const PDFPreviewModal = dynamic(() => import('@/components/ui/PDFPreviewModal'), {
  ssr: false,
});

export default function Hero() {
  const t = useTranslations('hero');
  const locale = useLocale() as Locale;
  const localizedPersonalInfo = getPersonalInfo(locale);

  const roles = useMemo(() => [
    "Privacy & Security Engineer",
    "Software Engineer",
    "Security Researcher",
    "Computer Engineer",
  ], []);

  const [currentRole, setCurrentRole] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [showCVPreview, setShowCVPreview] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);

  // Hide scroll indicator when user scrolls
  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const typingSpeed = isDeleting ? 30 : 80;
    const currentFullText = roles[currentRole];
    let rafId: number;
    let lastUpdate = Date.now();

    const animate = () => {
      const now = Date.now();
      if (now - lastUpdate >= typingSpeed) {
        if (!isDeleting) {
          if (displayText.length < currentFullText.length) {
            setDisplayText(currentFullText.slice(0, displayText.length + 1));
          } else {
            setTimeout(() => setIsDeleting(true), 1500);
            return;
          }
        } else {
          if (displayText.length > 0) {
            setDisplayText(displayText.slice(0, -1));
          } else {
            setIsDeleting(false);
            setCurrentRole((prev) => (prev + 1) % roles.length);
            return;
          }
        }
        lastUpdate = now;
      }
      rafId = requestAnimationFrame(animate);
    };

    rafId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId);
  }, [displayText, isDeleting, currentRole, roles]);

  // min-h-svh, not min-h-screen: 100vh is the *largest* mobile viewport height, so it
  // overflows behind the URL bar and shifts as the bar retracts. svh is the stable one.
  return (
    <section id="about" className="relative min-h-svh flex items-center justify-center px-4 sm:px-6 pt-32 pb-10 overflow-hidden bg-zinc-950">
      {/* Background — liquid wave blobs + grid */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Liquid wave blob 1 */}
        <div
          className="absolute -bottom-[300px] -right-[200px] w-[700px] h-[700px] opacity-[0.18] animate-liquid-spin"
          style={{ background: 'linear-gradient(744deg, #2563eb, #1e40af 60%, #0ea5e9)', borderRadius: '42%' }}
        />
        {/* Liquid wave blob 2 */}
        <div
          className="absolute -top-[350px] -left-[200px] w-[650px] h-[650px] opacity-[0.12] animate-liquid-spin-reverse"
          style={{ background: 'linear-gradient(744deg, #0ea5e9, #2563eb 60%, #1d4ed8)', borderRadius: '38%' }}
        />
        {/* Liquid wave blob 3 — subtle accent */}
        <div
          className="absolute top-[40%] left-[50%] -translate-x-1/2 w-[500px] h-[500px] opacity-[0.07] animate-liquid-spin-slow"
          style={{ background: 'linear-gradient(744deg, #1e40af, #0ea5e9 60%, #2563eb)', borderRadius: '45%' }}
        />
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.02]" />
      </div>

      <div className="container relative mx-auto max-w-5xl z-10">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-14">

          {/* ===== ID CARD WITH LANYARD ===== */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative flex-shrink-0 pt-24"
          >
            {/* ── Lanyard Assembly ── */}
            <div className="absolute left-1/2 -translate-x-1/2 top-0 z-30 flex flex-col items-center pointer-events-none">
              {/* Nylon strap — corporate flat weave */}
              <div
                className="relative w-8 h-14 overflow-hidden"
                style={{
                  background: 'linear-gradient(180deg, #1e3a5f 0%, #1e40af 50%, #2563eb 100%)',
                  boxShadow: 'inset -2px 0 3px rgba(0,0,0,0.3), inset 2px 0 3px rgba(0,0,0,0.3), 0 2px 6px rgba(0,0,0,0.4)',
                }}
              >
                {/* Satin weave texture */}
                <div
                  className="absolute inset-0 opacity-[0.06]"
                  style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent 0px, transparent 1px, rgba(255,255,255,1) 1px, rgba(255,255,255,1) 2px)' }}
                />
                {/* Center fold highlight */}
                <div className="absolute left-1/2 -translate-x-1/2 inset-y-0 w-3 bg-gradient-to-r from-transparent via-white/[0.07] to-transparent" />
              </div>

              {/* Metal snap hook clasp — SVG for realism */}
              <svg width="28" height="36" viewBox="0 0 28 36" fill="none" className="drop-shadow-lg" style={{ marginTop: '-1px' }}>
                <defs>
                  <linearGradient id="claspBody" x1="2" y1="4" x2="26" y2="34" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#e4e4e7" />
                    <stop offset="25%" stopColor="#d4d4d8" />
                    <stop offset="55%" stopColor="#a1a1aa" />
                    <stop offset="85%" stopColor="#71717a" />
                    <stop offset="100%" stopColor="#52525b" />
                  </linearGradient>
                  <linearGradient id="claspBar" x1="0" y1="0" x2="0" y2="6" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#f4f4f5" />
                    <stop offset="40%" stopColor="#d4d4d8" />
                    <stop offset="100%" stopColor="#9ca3af" />
                  </linearGradient>
                  <linearGradient id="claspGate" x1="0" y1="0" x2="3" y2="0" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#d4d4d8" />
                    <stop offset="50%" stopColor="#b4b4b8" />
                    <stop offset="100%" stopColor="#9ca3af" />
                  </linearGradient>
                  <linearGradient id="claspSheen" x1="8" y1="8" x2="8" y2="26" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="white" stopOpacity="0.35" />
                    <stop offset="100%" stopColor="white" stopOpacity="0" />
                  </linearGradient>
                </defs>
                {/* Crimp / fold-over end-cap */}
                <rect x="3" y="0" width="22" height="5.5" rx="1.5" fill="url(#claspBar)" stroke="#71717a" strokeWidth="0.6" />
                <circle cx="14" cy="2.75" r="1.3" fill="#52525b" />
                {/* Swivel pivot */}
                <rect x="10.5" y="5.5" width="7" height="3" rx="1" fill="#9ca3af" stroke="#6b7280" strokeWidth="0.5" />
                {/* D-ring body */}
                <rect x="2.5" y="8.5" width="23" height="26" rx="5" fill="url(#claspBody)" stroke="#52525b" strokeWidth="1" />
                {/* Inner cutout */}
                <rect x="7" y="13" width="14" height="17" rx="3.5" fill="#0c1222" />
                {/* Spring gate bar */}
                <rect x="18" y="10.5" width="3" height="15" rx="1.5" fill="url(#claspGate)" stroke="#71717a" strokeWidth="0.4" />
                {/* Gate spring dot */}
                <circle cx="19.5" cy="25" r="1" fill="#9ca3af" />
                {/* Specular highlight */}
                <ellipse cx="9" cy="16" rx="2.5" ry="6" fill="url(#claspSheen)" />
                {/* Rim highlight */}
                <path d="M6 10 Q3.5 14 3.5 20" stroke="white" strokeOpacity="0.15" strokeWidth="1" fill="none" strokeLinecap="round" />
              </svg>
            </div>

            {/* Blue accent card behind */}
            <div
              className="absolute rounded-2xl bg-gradient-to-br from-blue-600 to-blue-700 shadow-2xl"
              style={{ rotate: '-6deg', left: '-12px', right: '-12px', top: 'calc(6rem - 12px)', bottom: '-12px' }}
            />

            {/* ── 3D Flip Card ── */}
            <motion.div
              className="relative w-[280px] sm:w-[320px] cursor-pointer"
              style={{ perspective: 1200 }}
              onHoverStart={() => setIsFlipped(true)}
              onHoverEnd={() => setIsFlipped(false)}
              onClick={() => setIsFlipped(prev => !prev)}
            >
              <motion.div
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={{ duration: 0.5, ease: [0.65, 0, 0.35, 1] }}
                style={{ transformStyle: 'preserve-3d' }}
                className="relative"
              >
                {/* ━━━ FRONT FACE ━━━ */}
                <div
                  className="relative bg-white rounded-2xl shadow-2xl"
                  style={{ backfaceVisibility: 'hidden' }}
                >
                  {/* Clip hole */}
                  <div className="flex justify-center pt-3 pb-1">
                    <div className="w-8 h-3 bg-zinc-200 rounded-full ring-1 ring-zinc-300" />
                  </div>

                  {/* Photo area */}
                  <div className="px-5 pt-2 pb-4">
                    <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden bg-zinc-100">
                      <Image
                        src="/images/Marawan.jpeg"
                        alt={personalInfo.name}
                        fill
                        priority
                        /* Card is w-[280px] sm:w-[320px] with px-5, so the photo box is
                           240px / 280px wide. Without this, `fill` defaults to 100vw and
                           the LCP preload pulls the 1920px variant for a 280px slot. */
                        sizes="(max-width: 639px) 240px, 280px"
                        quality={90}
                        placeholder="blur"
                        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwA/AA8A/9k="
                        className="object-cover object-top"
                      />
                    </div>
                  </div>

                  {/* Name & Title */}
                  <div className="px-5 pb-3">
                    <h2 className="text-xl sm:text-2xl font-black text-zinc-900 leading-tight">
                      {personalInfo.name.split(' ')[0]}
                      <br />
                      {personalInfo.name.split(' ').slice(1).join(' ')}
                    </h2>
                    <p className="text-xs sm:text-sm text-zinc-500 mt-1 font-medium">
                      {localizedPersonalInfo.title}
                    </p>
                  </div>

                  {/* Divider */}
                  <div className="mx-5 border-t border-zinc-200" />

                  {/* Contact details footer */}
                  <div className="px-5 py-3 flex items-center justify-between">
                    <div className="flex items-center gap-1 text-zinc-400">
                      <MapPin size={12} />
                      <span className="text-[10px] sm:text-xs font-medium uppercase tracking-wider">Germany</span>
                    </div>
                    {/* Real links, not aria-labelled spans: aria-label is ignored on a
                        generic span, and an agent or screen reader had no way to reach
                        these profiles. stopPropagation keeps the card from flipping when
                        the link itself is clicked. */}
                    <div className="flex items-center gap-2">
                      <a
                        href={personalInfo.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="text-blue-600 hover:text-blue-700 transition-colors"
                        aria-label={`${personalInfo.name} on LinkedIn`}
                      >
                        <Linkedin size={14} aria-hidden="true" />
                      </a>
                      <a
                        href={personalInfo.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="text-zinc-700 hover:text-zinc-900 transition-colors"
                        aria-label={`${personalInfo.name} on GitHub`}
                      >
                        <Github size={14} aria-hidden="true" />
                      </a>
                    </div>
                  </div>

                  {/* Work Permit strip */}
                  <div className="bg-green-50 border-t border-green-200 px-5 py-2 flex items-center justify-between relative">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" className="w-2 h-2">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </div>
                      <span className="text-[10px] sm:text-xs font-semibold text-green-700 uppercase tracking-wide">
                        {t('workPermit')}
                      </span>
                    </div>
                    {/* Flip hint on front */}
                    <span className="text-[10px] font-bold text-green-700 uppercase tracking-wide">
                      Tap to flip ↻
                    </span>
                  </div>
                </div>

                {/* ━━━ BACK FACE ━━━ */}
                <div
                  className="absolute inset-0 rounded-2xl shadow-2xl overflow-hidden"
                  style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
                >
                  {/* Dark gradient background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 via-zinc-800 to-blue-950" />
                  {/* Subtle grid pattern */}
                  <div className="absolute inset-0 bg-grid-pattern opacity-[0.04]" />

                  <div className="relative h-full flex flex-col items-center justify-center px-6 py-8">
                    {/* Clip hole (visual consistency) */}
                    <div className="absolute top-3 left-1/2 -translate-x-1/2">
                      <div className="w-8 h-3 bg-zinc-700 rounded-full ring-1 ring-zinc-600" />
                    </div>

                    {/* Monogram */}
                    <div className="text-5xl sm:text-6xl font-black tracking-tighter bg-gradient-to-br from-blue-400 to-sky-500 bg-clip-text text-transparent mb-3 select-none">
                      ME
                    </div>

                    {/* Title */}
                    <p className="text-xs sm:text-sm text-zinc-400 font-medium text-center mb-5">
                      {localizedPersonalInfo.title}
                    </p>

                    {/* Blue accent divider */}
                    <div className="w-16 h-0.5 bg-gradient-to-r from-blue-500 to-sky-500 rounded-full mb-5" />


                    {/* Info badges */}
                    <div className="flex flex-col gap-2.5 w-full max-w-[200px]">
                      <div className="flex items-center gap-2.5 text-zinc-300">
                        <Mail size={14} className="text-blue-400 flex-shrink-0" />
                        <span className="text-xs font-medium truncate">{personalInfo.email}</span>
                      </div>
                      <div className="flex items-center gap-2.5 text-zinc-300">
                        <Phone size={14} className="text-blue-400 flex-shrink-0" />
                        <span className="text-xs font-medium truncate">+491782374198</span>
                      </div>
                    </div>

                    {/* Work permit badge */}
                    <div className="mt-5 inline-flex items-center gap-1.5 px-3 py-1.5 bg-green-900/40 border border-green-700/50 rounded-full">
                      <div className="w-2 h-2 bg-green-500 rounded-full" />
                      <span className="text-[10px] font-semibold text-green-400 uppercase tracking-wide">
                        {t('workPermit')}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* ===== RIGHT SIDE: Text Content ===== */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
            className="flex-1 text-center lg:text-left max-w-xl"
          >
            {/* Greeting + Name */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-white leading-tight">
              {t('greeting')}{' '}
              <span
                className="bg-gradient-to-r from-blue-400 via-sky-400 to-blue-500 animate-shimmer"
                style={{
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  color: 'transparent',
                  WebkitTextFillColor: 'transparent',
                  backgroundSize: '200% auto',
                }}
              >
                {personalInfo.name.split(' ')[0]}
              </span>
            </h1>

            {/* Typing role */}
            <div className="h-16 sm:h-20 flex items-center justify-center lg:justify-start">
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-zinc-400 font-semibold break-words max-w-full">
                {displayText}
                <span className="inline-block w-0.5 h-4 sm:h-5 md:h-6 lg:h-7 bg-blue-500 ml-1 animate-pulse" />
              </p>
            </div>

            {/* Tagline */}
            <p className="text-sm sm:text-base text-zinc-500 mb-8 max-w-lg mx-auto lg:mx-0">
              {t('tagline')}
            </p>

            {/* CTA Buttons */}
            <div className="flex gap-2 sm:gap-3 justify-center lg:justify-start">
              <motion.button
                onClick={() => setShowCVPreview(true)}
                className="inline-flex items-center justify-center px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg hover:bg-zinc-800 transition-colors min-w-[44px] min-h-[44px] border border-zinc-700 flex-shrink-0"
                title={t('cta.viewCV')}
                aria-label={t('cta.viewCV')}
                whileHover={{ scale: 1.05, borderColor: '#2563eb' }}
                whileTap={{ scale: 0.95 }}
              >
                <Eye size={18} className="sm:w-5 sm:h-5 text-zinc-300" />
              </motion.button>
              <DownloadButton
                href={EXTERNAL_LINKS.CV_PATH}
                className="flex-shrink-0"
              >
                {t('cta.downloadCV')}
              </DownloadButton>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator — hides when user scrolls */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: hasScrolled ? 0 : 1 }}
          transition={{ duration: 0.4 }}
          className={`mt-2 sm:mt-4 ${hasScrolled ? 'pointer-events-none' : ''}`}
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center gap-2 text-zinc-600"
          >
            <span className="text-xs uppercase tracking-widest">Scroll</span>
            <ChevronDown size={20} />
          </motion.div>
        </motion.div>
      </div>

      {showCVPreview && (
        <PDFPreviewModal
          isOpen={showCVPreview}
          onClose={() => setShowCVPreview(false)}
          pdfUrl={EXTERNAL_LINKS.CV_PATH}
          title={`${t('cta.viewCV')} - ${personalInfo.name}`}
        />
      )}
    </section>
  );
}
