import React, { useState } from 'react';
import { SEOHead } from '../components/common/SEOHead';
import { Navbar } from '../components/layout/navbar';
import { Hero } from '../components/sections/hero';
import { Services } from '../components/sections/services';
import { FeaturedProjects } from '../components/sections/featuredProjects';
import { AboutFounder } from '../components/sections/AboutFounder';
import { ProcessTimeline } from '../components/sections/ProcessTimeline';
import { WhyWorkWithMe } from '../components/sections/WhyWorkWithMe';
import { FAQ } from '../components/sections/FAQ';
import { ContactEnquiryForm } from '../components/sections/ContactEnquiryForm';
import { Footer } from '../components/layout/footer';

export const HomePage: React.FC = () => {
  const [prefilledService, setPrefilledService] = useState<string>('');

  const handleSelectService = (serviceTitle: string) => {
    setPrefilledService(serviceTitle);
  };

  return (
    <div className="min-h-screen bg-navy-950 flex flex-col">
      <SEOHead
        title="Saurabh | Web Developer & Founder"
        description="Turning Ideas Into Powerful Digital Experiences. Saurabh builds modern, responsive, and performant web solutions for businesses, schools, and startups."
        canonicalPath="/"
      />

      <Navbar />

      <main className="flex-grow">
        <Hero />
        <Services onSelectService={handleSelectService} />
        <FeaturedProjects />
        <AboutFounder />
        <ProcessTimeline />
        <WhyWorkWithMe />
        <FAQ />
        <ContactEnquiryForm prefilledService={prefilledService} />
      </main>

      <Footer />
    </div>
  );
};
