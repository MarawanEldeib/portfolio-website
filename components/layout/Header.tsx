'use client';

import { useTranslations } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useState, useEffect, useMemo } from 'react';
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
  const [isLanguageChanging, setIsLanguageChanging] = useState(false);

  const locale = pathname.split('/')[1];

  const handleLanguageChange = (newLocale: string) => {
    setIsLanguageChanging(true);
    router.push(`/${newLocale}`);
  };

  const navItems = useMemo(() => [
    { href: `/${locale}#about`, label: t('about'), id: 'about' },
    { href: `/${locale}#experience`, label: t('experience'), id: 'experience' },
    { href: `/${locale}#education`, label: t('education'), id: 'education' },
    { href: `/${locale}#projects`, label: t('projects'), id: 'projects' },
    { href: `/${locale}#skills`, label: t('skills'), id: 'skills' },
    { href: `/${locale}#certifications`, label: t('certifications'), id: 'certifications' },
    { href: `/${locale}#volunteering`, label: t('volunteering'), id: 'volunteering' },
    { href: `/${locale}#recommendations`, label: t('recommendations'), id: 'recommendations' },
    { href: `/${locale}#contact`, label: t('contact'), id: 'contact' },
  ], [locale, t]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
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
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  useEffect(() => {
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

          for (let i = sections.length - 1; i >= 0; i--) {
            const section = document.getElementById(sections[i]);
            if (section) {
              const sectionTop = section.offsetTop;
              const sectionHeight = section.offsetHeight;

              if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                setActiveSection(sections[i]);
                break;
              }
            }
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

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href={`/${locale}`} className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
            {personalInfo.name}
          </Link>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.id)}
                  className={`text-sm font-medium transition-all relative ${
                    activeSection === item.id
                      ? 'text-blue-600 dark:text-blue-400'
                      : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100'
                  }`}
                >
                  {item.label}
                  {activeSection === item.id && (
                    <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-blue-600 dark:bg-blue-400 rounded-full" />
                  )}
                </a>
              </li>
            ))}
          </ul>

          {/* Language Switcher & Theme Toggle */}
          <div className="hidden md:flex items-center gap-2">
            <ThemeToggle />
            <div className="w-px h-6 bg-zinc-300 dark:bg-zinc-700 mx-2" />
            <div className="flex items-center gap-1 bg-zinc-100 dark:bg-zinc-800 rounded-lg p-1">
              <button
                onClick={() => handleLanguageChange('en')}
                className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all min-w-[44px] text-center ${
                  locale === 'en'
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-md'
                    : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700'
                }`}
              >
                EN
              </button>
              <button
                onClick={() => handleLanguageChange('de')}
                className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all min-w-[44px] text-center ${
                  locale === 'de'
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-md'
                    : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700'
                }`}
              >
                DE
              </button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-3 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors min-w-[44px] min-h-[44px]"
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

        {/* Mobile Navigation - Full Screen Overlay */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="md:hidden absolute left-0 right-0 top-full bg-white dark:bg-zinc-950 border-b border-zinc-200 dark:border-zinc-800 shadow-lg max-h-[calc(100vh-73px)] overflow-y-auto"
            >
              <div className="container mx-auto px-4 py-4">
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
                            : 'text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800/50 border-l-4 border-transparent'
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
                          className={`px-4 py-2 text-sm font-medium rounded-md transition-all min-w-[60px] min-h-[44px] flex items-center justify-center ${
                            locale === 'en'
                              ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-md'
                              : 'text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700'
                          }`}
                        >
                          EN
                        </button>
                        <button
                          onClick={() => handleLanguageChange('de')}
                          className={`px-4 py-2 text-sm font-medium rounded-md transition-all min-w-[60px] min-h-[44px] flex items-center justify-center ${
                            locale === 'de'
                              ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-md'
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
