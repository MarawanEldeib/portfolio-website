import { useTranslations } from 'next-intl';
import dynamic from 'next/dynamic';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Summary from '@/components/sections/Summary';
import Skills from '@/components/sections/Skills';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

// Lazy load below-the-fold components for better performance
const Projects = dynamic(() => import('@/components/sections/Projects'), {
  loading: () => <LoadingSpinner />
});

const Experience = dynamic(() => import('@/components/sections/Experience'));
const Education = dynamic(() => import('@/components/sections/Education'));
const Certifications = dynamic(() => import('@/components/sections/Certifications'));
const Volunteering = dynamic(() => import('@/components/sections/Volunteering'));
const Recommendations = dynamic(() => import('@/components/sections/Recommendations'));
const Contact = dynamic(() => import('@/components/sections/Contact'));
const ScrollToTop = dynamic(() => import('@/components/ui/ScrollToTop'));

export default function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950">
      <Header />
      <main>
        <Hero />
        <About />
        <Summary />
        <Skills />
        <Projects />
        <Experience />
        <Education />
        <Certifications />
        <Volunteering />
        <Recommendations />
        <Contact />
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
}
