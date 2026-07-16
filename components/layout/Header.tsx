'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useState, useEffect, useMemo, useRef } from 'react';
import { Menu, X } from 'lucide-react';
import { personalInfo } from '@/lib/data';
import ThemeToggle from '@/components/ui/ThemeToggle';
import { motion, AnimatePresence } from 'framer-motion';
import { LAYOUT_CONSTANTS } from '@/lib/constants';

export default function Header() {
  const t = useTranslations('nav');
  const pathname = usePathname();
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isMounted, setIsMounted] = useState(false);
  const labelRefs = useRef<Record<string, HTMLLabelElement | null>>({});

  // Ensure client-side mounting for portal
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const locale = pathname.split('/')[1];

  const handleLanguageChange = (newLocale: string) => {
    if (newLocale === locale) return;
    setIsMenuOpen(false);
    // Small delay to show the loader before navigation
    setTimeout(() => {
      router.push(`/${newLocale}`);
    }, 100);
  };


  const navItems = useMemo(() => [
    { href: `/${locale}#about`, label: t('about'), id: 'about' },
    { href: `/${locale}#experience`, label: t('experience'), id: 'experience' },
    { href: `/${locale}#projects`, label: t('projects'), id: 'projects' },
    { href: `/${locale}#skills`, label: t('skills'), id: 'skills' },
    { href: `/${locale}#education`, label: t('education'), id: 'education' },
    { href: `/${locale}#publications`, label: t('publications'), id: 'publications' },
    { href: `/${locale}#volunteering`, label: t('volunteering'), id: 'volunteering' },
    { href: `/${locale}#recommendations`, label: t('recommendations'), id: 'recommendations' },
    { href: `/${locale}#contact`, label: t('contact'), id: 'contact' },
  ], [locale, t]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    if (typeof document === 'undefined' || typeof window === 'undefined') return;

    const element = document.getElementById(id);
    if (element) {
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - LAYOUT_CONSTANTS.HEADER_HEIGHT;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
    setIsMenuOpen(false);
  };

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (typeof document === 'undefined') return;

    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      if (typeof document !== 'undefined') {
        document.body.style.overflow = 'unset';
      }
    };
  }, [isMenuOpen]);

  useEffect(() => {
    if (typeof window === 'undefined' || typeof document === 'undefined') return;

    let ticking = false;
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Only update if scroll changed significantly (reduce calculations)
      if (Math.abs(currentScrollY - lastScrollY) < 50 && !ticking) return;

      if (!ticking) {
        window.requestAnimationFrame(() => {
          const sections = navItems.map(item => item.id);
          const scrollPosition = currentScrollY + LAYOUT_CONSTANTS.SCROLL_OFFSET;

          // Iterate backwards to find the current active section
          for (let i = sections.length - 1; i >= 0; i--) {
            const section = document.getElementById(sections[i]);
            if (section) {
              const sectionTop = section.offsetTop;
              // Simple threshold check: if our scroll trigger point is past the section top,
              // this is the active section (since we're checking bottom-up)
              if (scrollPosition >= sectionTop - 10) { // Small buffer for precision
                setActiveSection(sections[i]);
                break;
              }
            }
          }

          // Special case: If scrolled to potential bottom (contact might be short), force last item
          if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 50) {
            setActiveSection(sections[sections.length - 1]);
          }

          lastScrollY = currentScrollY;
          ticking = false;
        });

        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Call once on mount

    return () => window.removeEventListener('scroll', handleScroll);
  }, [navItems]);

  // Update sliding bar position based on active section
  useEffect(() => {
    if (typeof document === 'undefined') return;

    const activeLabel = labelRefs.current[activeSection];
    const navWrap = document.querySelector('.nav-wrap');

    if (activeLabel && navWrap) {
      const labelRect = activeLabel.getBoundingClientRect();
      const navWrapRect = navWrap.getBoundingClientRect();

      const left = labelRect.left - navWrapRect.left;
      const width = labelRect.width;

      navWrap.setAttribute('style', `--active-left: ${left}px; --active-width: ${width}px;`);
    }
  }, [activeSection]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800">
      {/* Centred, capped container — matches the centred content columns below it.
          Never `max-w-none`: that cancels the cap and lets the header drift on wide screens. */}
      <nav className="mx-auto w-full max-w-[96rem] px-4 sm:px-6 py-4">
        {/* Below nav-desktop: brand + burger. At/above it: three columns, where the equal
            1fr side tracks centre the nav by construction, whatever the side widths are. */}
        <div className="flex items-center justify-between gap-4 nav-desktop:grid nav-desktop:grid-cols-[1fr_minmax(0,auto)_1fr]">
          <Link href={`/${locale}`} className="nav-desktop:col-start-1 nav-desktop:justify-self-start text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-500 to-sky-400 dark:from-blue-400 dark:to-sky-400 bg-clip-text text-transparent flex-shrink-0 whitespace-nowrap">
            {personalInfo.name}
          </Link>

          {/* Desktop Navigation — min-w-0 lets it shrink and scroll internally rather
              than pushing the language switcher off-screen. */}
          <div className="hidden nav-desktop:flex nav-desktop:col-start-2 nav-desktop:justify-self-center min-w-0 items-center">
            <div className="nav-wrap">
              {navItems.map((item) => (
                <React.Fragment key={item.id}>
                  <input
                    hidden
                    className={`nav-rd-${item.id}`}
                    name="nav-radio"
                    id={`nav-${item.id}`}
                    type="radio"
                    checked={activeSection === item.id}
                    readOnly
                  />
                  <label
                    ref={(el) => { labelRefs.current[item.id] = el; }}
                    className="nav-label"
                    htmlFor={`nav-${item.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(e as unknown as React.MouseEvent<HTMLAnchorElement>, item.id);
                    }}
                  >
                    <span>{item.label}</span>
                  </label>
                </React.Fragment>
              ))}
              <div className="nav-bar"></div>
              <div className="nav-slidebar"></div>
            </div>
          </div>

          {/* Right column: language switcher and burger, both keyed to the same
              breakpoint, so there is no width where neither renders. */}
          <div className="flex items-center gap-2 nav-desktop:col-start-3 nav-desktop:justify-self-end">
            {/* Language Switcher */}
            <div className="hidden nav-desktop:flex items-center gap-1 bg-zinc-100 dark:bg-zinc-800 rounded-lg p-1 border border-zinc-300 dark:border-zinc-700">
              <button
                onClick={() => handleLanguageChange('en')}
                className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all min-w-[44px] text-center ${locale === 'en'
                  ? 'bg-gradient-to-r from-blue-600 to-sky-500 text-white shadow-md'
                  : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700'
                  }`}
              >
                EN
              </button>
              <button
                onClick={() => handleLanguageChange('de')}
                className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all min-w-[44px] text-center ${locale === 'de'
                  ? 'bg-gradient-to-r from-blue-600 to-sky-500 text-white shadow-md'
                  : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700'
                  }`}
              >
                DE
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="nav-desktop:hidden p-3 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors min-w-[44px] min-h-[44px]"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              <motion.div
                animate={{ rotate: isMenuOpen ? 90 : 0 }}
                transition={{ duration: 0.2 }}
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </motion.div>
            </button>
          </div>
        </div>

        {/* Mobile Navigation - Full Screen Overlay */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="nav-desktop:hidden absolute left-0 right-0 top-full bg-white dark:bg-zinc-950 border-b border-zinc-200 dark:border-zinc-800 shadow-lg overflow-y-auto"
              style={{ maxHeight: `calc(100vh - ${LAYOUT_CONSTANTS.HEADER_HEIGHT}px)` }}
            >
              <div className="container mx-auto px-10 py-4">
                <motion.ul
                  initial="closed"
                  animate="open"
                  exit="closed"
                  variants={{
                    open: {
                      transition: { staggerChildren: 0.07, delayChildren: 0.1 }
                    },
                    closed: {
                      transition: { staggerChildren: 0.05, staggerDirection: -1 }
                    }
                  }}
                  className="space-y-1"
                >
                  {navItems.map((item) => (
                    <motion.li
                      key={item.href}
                      variants={{
                        open: {
                          opacity: 1,
                          y: 0,
                          transition: { type: 'spring', damping: 20, stiffness: 300 }
                        },
                        closed: {
                          opacity: 0,
                          y: -10,
                          transition: { duration: 0.2 }
                        }
                      }}
                    >
                      <a
                        href={item.href}
                        onClick={(e) => handleNavClick(e, item.id)}
                        className={`
                          block py-3 px-4 rounded-lg text-base font-medium transition-all
                          ${activeSection === item.id
                            ? 'bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 border-l-4 border-blue-600 dark:border-blue-400'
                            : 'text-zinc-700 dark:text-zinc-300 border-l-4 border-transparent'
                          }
                        `}
                      >
                        <div className="flex items-center justify-between">
                          <span>{item.label}</span>
                          {activeSection === item.id && (
                            <motion.span
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="w-2 h-2 rounded-full bg-blue-600 dark:bg-blue-400"
                            />
                          )}
                        </div>
                      </a>
                    </motion.li>
                  ))}
                </motion.ul>

                {/* Language & Theme Controls */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ delay: 0.4 }}
                  className="mt-6 pt-4 border-t border-zinc-200 dark:border-zinc-800"
                >
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                      <ThemeToggle />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-base font-semibold text-zinc-700 dark:text-zinc-300">
                        Language
                      </span>
                      <div className="flex items-center gap-1 bg-zinc-100 dark:bg-zinc-800 rounded-lg p-1">
                        <button
                          onClick={() => handleLanguageChange('en')}
                          className={`px-4 py-2 text-sm font-medium rounded-md transition-all min-w-[60px] min-h-[44px] flex items-center justify-center ${locale === 'en'
                            ? 'bg-gradient-to-r from-blue-600 to-sky-500 text-white shadow-md'
                            : 'text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700'
                            }`}
                        >
                          EN
                        </button>
                        <button
                          onClick={() => handleLanguageChange('de')}
                          className={`px-4 py-2 text-sm font-medium rounded-md transition-all min-w-[60px] min-h-[44px] flex items-center justify-center ${locale === 'de'
                            ? 'bg-gradient-to-r from-blue-600 to-sky-500 text-white shadow-md'
                            : 'text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700'
                            }`}
                        >
                          DE
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

    </header>
  );
}
