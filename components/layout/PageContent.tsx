'use client';

import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import Hero from '@/components/sections/Hero';
import Skills from '@/components/sections/Skills';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import BackToTop from '@/components/ui/BackToTop';

// Lazy load below-the-fold components for better performance
const Projects = dynamic(() => import('@/components/sections/Projects'), {
  loading: () => <LoadingSpinner />,
  ssr: false,
});

const Experience = dynamic(() => import('@/components/sections/Experience'), {
  ssr: false,
});

const Education = dynamic(() => import('@/components/sections/Education'), {
  ssr: false,
});

const Certifications = dynamic(() => import('@/components/sections/Certifications'), {
  ssr: false,
});

const Volunteering = dynamic(() => import('@/components/sections/Volunteering'), {
  ssr: false,
});

const Recommendations = dynamic(() => import('@/components/sections/Recommendations'), {
  ssr: false,
});

const Contact = dynamic(() => import('@/components/sections/Contact'), {
  ssr: false,
});

export default function PageContent() {
  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950">
      <Header />
      <main>
        <Hero />
        <Suspense fallback={<LoadingSpinner />}>
          <Experience />
        </Suspense>
        <Suspense fallback={<LoadingSpinner />}>
          <Education />
        </Suspense>
        <Suspense fallback={<LoadingSpinner />}>
          <Projects />
        </Suspense>
        <Skills />
        <Suspense fallback={<LoadingSpinner />}>
          <Certifications />
        </Suspense>
        <Suspense fallback={<LoadingSpinner />}>
          <Volunteering />
        </Suspense>
        <Suspense fallback={<LoadingSpinner />}>
          <Recommendations />
        </Suspense>
        <Suspense fallback={<LoadingSpinner />}>
          <Contact />
        </Suspense>
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
}
