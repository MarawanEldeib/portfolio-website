import { useTranslations } from 'next-intl';
import dynamic from 'next/dynamic';
import Hero from '@/components/sections/Hero';
import Summary from '@/components/sections/Summary';
import About from '@/components/sections/About';
import Skills from '@/components/sections/Skills';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

// Lazy load below-the-fold components for better performance
const Projects = dynamic(() => import('@/components/sections/Projects'), {
  loading: () => <div className="min-h-screen flex items-center justify-center">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
  </div>
});

const Experience = dynamic(() => import('@/components/sections/Experience'));
const Education = dynamic(() => import('@/components/sections/Education'));
const Certifications = dynamic(() => import('@/components/sections/Certifications'));
const Recommendations = dynamic(() => import('@/components/sections/Recommendations'));
const Contact = dynamic(() => import('@/components/sections/Contact'));
const ScrollToTop = dynamic(() => import('@/components/ui/ScrollToTop'));

export default function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950">
      <Header />
      <main>
        <Hero />
        <Summary />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Education />
        <Certifications />
        <Recommendations />
        <Contact />
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
}
