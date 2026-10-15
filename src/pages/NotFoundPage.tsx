import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Terminal, AlertTriangle } from 'lucide-react';
import { SEOHead } from '../components/common/SEOHead';
import { Navbar } from '../components/layout/navbar';
import { Footer } from '../components/layout/footer';
import { Button } from '../components/common/button';
import { Badge } from '../components/common/badge';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-navy-950 flex flex-col">
      <SEOHead
        title="404 Page Not Found | Saurabh"
        description="The requested page could not be found on Saurabh's portfolio."
        noIndex={true}
      />

      <Navbar />

      <main className="flex-grow flex items-center justify-center py-28 px-4 sm:px-6 lg:px-8">
        <div className="max-w-xl w-full text-center space-y-6">
          <div className="inline-flex items-center gap-2">
            <Badge variant="amber" size="md" dot>
              HTTP Error 404
            </Badge>
          </div>

          <div className="relative">
            <h1 className="text-7xl sm:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-b from-slate-200 via-navy-700 to-navy-900 select-none">
              404
            </h1>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 rounded-2xl bg-navy-900/90 border border-navy-700 flex items-center justify-center shadow-xl">
                <AlertTriangle className="w-8 h-8 text-electric-400" />
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Page Not Located
            </h2>
            <p className="text-sm sm:text-base text-slate-300 max-w-md mx-auto leading-relaxed">
              The route or document you requested does not exist or has been relocated.
            </p>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/">
              <Button
                variant="primary"
                size="md"
                leftIcon={<Home className="w-4 h-4" />}
              >
                Return to Homepage
              </Button>
            </Link>
            <Link to="/#projects">
              <Button
                variant="secondary"
                size="md"
                leftIcon={<Terminal className="w-4 h-4 text-electric-400" />}
              >
                Explore Projects
              </Button>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};
