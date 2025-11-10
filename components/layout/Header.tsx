'use client';

import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { personalInfo } from '@/lib/data';
import ThemeToggle from '@/components/ui/ThemeToggle';
import { motion, AnimatePresence } from 'framer-motion';

export default function Header() {
  const t = useTranslations('nav');
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const locale = pathname.split('/')[1];

  const navItems = [
    { href: `/${locale}#home`, label: t('home'), id: 'home' },
    { href: `/${locale}#about`, label: t('about'), id: 'about' },
    { href: `/${locale}#skills`, label: t('skills'), id: 'skills' },
    { href: `/${locale}#projects`, label: t('projects'), id: 'projects' },
    { href: `/${locale}#experience`, label: t('experience'), id: 'experience' },
    { href: `/${locale}#education`, label: t('education'), id: 'education' },
    { href: `/${locale}#certifications`, label: t('certifications'), id: 'certifications' },
    { href: `/${locale}#volunteering`, label: t('volunteering'), id: 'volunteering' },
    { href: `/${locale}#recommendations`, label: t('recommendations'), id: 'recommendations' },
    { href: `/${locale}#contact`, label: t('contact'), id: 'contact' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 80; // Height of fixed header
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

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
    
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const sections = navItems.map(item => item.id);
          const scrollPosition = window.scrollY + 100; // Offset for header height

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
            <Link
              href="/en"
              className={`px-3 py-1 text-sm rounded ${
                locale === 'en'
                  ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900'
                  : 'text-zinc-600 dark:text-zinc-400'
              }`}
            >
              EN
            </Link>
            <Link
              href="/de"
              className={`px-3 py-1 text-sm rounded ${
                locale === 'de'
                  ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900'
                  : 'text-zinc-600 dark:text-zinc-400'
              }`}
            >
              DE
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
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
              initial={{ opacity: 0, x: '100%' }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="md:hidden fixed inset-0 top-[73px] bg-white dark:bg-zinc-950 z-40 overflow-y-auto"
            >
              <div className="container mx-auto px-4 py-6">
                <motion.ul
                  initial="closed"
                  animate="open"
                  exit="closed"
                  variants={{
                    open: {
                      transition: { staggerChildren: 0.05, delayChildren: 0.1 }
                    },
                    closed: {
                      transition: { staggerChildren: 0.03, staggerDirection: -1 }
                    }
                  }}
                  className="space-y-1"
                >
                  {navItems.map((item, index) => (
                    <motion.li
                      key={item.href}
                      variants={{
                        open: {
                          opacity: 1,
                          x: 0,
                          transition: { type: 'spring', damping: 20, stiffness: 300 }
                        },
                        closed: {
                          opacity: 0,
                          x: 50,
                          transition: { duration: 0.2 }
                        }
                      }}
                    >
                      <a
                        href={item.href}
                        onClick={(e) => handleNavClick(e, item.id)}
                        className={`
                          block py-4 px-4 rounded-lg text-base font-medium transition-all
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
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ delay: 0.3 }}
                  className="mt-8 pt-6 border-t border-zinc-200 dark:border-zinc-800"
                >
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
                        Theme
                      </span>
                      <ThemeToggle />
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
                        Language
                      </span>
                      <Link
                        href="/en"
                        className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                          locale === 'en'
                            ? 'bg-blue-600 text-white dark:bg-blue-500'
                            : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300'
                        }`}
                      >
                        EN
                      </Link>
                      <Link
                        href="/de"
                        className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                          locale === 'de'
                            ? 'bg-blue-600 text-white dark:bg-blue-500'
                            : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300'
                        }`}
                      >
                        DE
                      </Link>
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
