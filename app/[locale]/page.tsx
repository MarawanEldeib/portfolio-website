import dynamic from 'next/dynamic';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Summary from '@/components/sections/Summary';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

// Lazy load below-the-fold components for better performance (no loading spinner to reduce bundle)
const Skills = dynamic(() => import('@/components/sections/Skills'), { ssr: true });
const Experience = dynamic(() => import('@/components/sections/Experience'), { ssr: true });
const Education = dynamic(() => import('@/components/sections/Education'), { ssr: true });
const Projects = dynamic(() => import('@/components/sections/Projects'), { ssr: true });
const Certifications = dynamic(() => import('@/components/sections/Certifications'), { ssr: true });
const Volunteering = dynamic(() => import('@/components/sections/Volunteering'), { ssr: true });
const Recommendations = dynamic(() => import('@/components/sections/Recommendations'), { ssr: true });
const Contact = dynamic(() => import('@/components/sections/Contact'), { ssr: false });

export default function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950">
      <Header />
      <main>
        <Hero />
        <About />
        <Summary />
        <Experience />
        <Education />
        <Projects />
        <Skills />
        <Certifications />
        <Volunteering />
        <Recommendations />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
