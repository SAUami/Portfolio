import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, ArrowRight, Code2, Linkedin, Instagram } from 'lucide-react';
import { brandConfig } from '../../config/brand.config';
import { Button } from '../common/button';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { label: 'Services', href: '#services' },
    { label: 'Case Studies', href: '#projects' },
    { label: 'About', href: '#about' },
    { label: 'Process', href: '#process' },
    { label: 'Why Work With Me', href: '#why-me' },
    { label: 'FAQ', href: '#faq' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);

    if (location.pathname !== '/') {
      navigate('/' + href);
      return;
    }

    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleCtaClick = () => {
    setMobileMenuOpen(false);
    if (location.pathname !== '/') {
      navigate('/#contact');
    } else {
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-navy-950/85 backdrop-blur-md border-b border-navy-800/80 shadow-lg shadow-navy-950/40 py-3.5'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo / Brand Name */}
          <Link
            to="/"
            className="flex items-center gap-2.5 text-white font-bold text-lg md:text-xl tracking-tight group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-electric-500 rounded-lg p-1"
            aria-label={`${brandConfig.founder.name} Portfolio - Home`}
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-electric-600 to-violetAccent-600 flex items-center justify-center text-white shadow-md shadow-electric-600/20 group-hover:shadow-electric-500/40 transition-shadow">
              <Code2 className="w-5 h-5 text-white" aria-hidden="true" />
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-white leading-none">
                {brandConfig.founder.name}
              </span>
              <span className="text-[11px] text-electric-400 font-mono tracking-wider uppercase mt-0.5">
                Web Studio
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1.5" aria-label="Main Navigation">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="px-3.5 py-1.5 text-sm font-medium text-slate-300 hover:text-white hover:bg-navy-850/80 rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-electric-500"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Header Action Button & Social Links */}
          <div className="hidden sm:flex items-center gap-3">
            <div className="flex items-center gap-1.5 mr-1 bg-navy-900/60 p-1 rounded-xl border border-navy-800">
              <a
                href={brandConfig.founder.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Saurabh Sharma on LinkedIn"
                title="Saurabh Sharma on LinkedIn"
                className="p-1.5 text-slate-300 hover:text-blue-400 hover:bg-navy-800 rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href={brandConfig.founder.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Saurabh Sharma on Instagram"
                title="Saurabh Sharma on Instagram"
                className="p-1.5 text-slate-300 hover:text-rose-400 hover:bg-navy-800 rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-400"
              >
                <Instagram className="w-4 h-4" />
              </a>
            </div>

            <Button
              variant="primary"
              size="sm"
              onClick={handleCtaClick}
              rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
            >
              Discuss Project
            </Button>
          </div>

          {/* Mobile Menu Hamburger */}
          <div className="flex sm:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-300 hover:text-white hover:bg-navy-850 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-electric-500"
              aria-expanded={mobileMenuOpen}
              aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          className="sm:hidden bg-navy-950/95 backdrop-blur-xl border-b border-navy-800 px-4 pt-3 pb-6 animate-in slide-in-from-top-2 duration-200"
          id="mobile-navigation"
        >
          <div className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="px-3 py-2.5 text-base font-medium text-slate-200 hover:text-white hover:bg-navy-850 rounded-lg transition-colors"
              >
                {link.label}
              </a>
            ))}

            <div className="pt-3 border-t border-navy-800 flex flex-col gap-3">
              {/* Mobile Social Links */}
              <div className="grid grid-cols-2 gap-2">
                <a
                  href={brandConfig.founder.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 py-2 px-3 rounded-lg bg-navy-900 border border-blue-500/30 text-blue-300 text-xs font-semibold"
                >
                  <Linkedin className="w-3.5 h-3.5 text-blue-400" />
                  <span>LinkedIn</span>
                </a>
                <a
                  href={brandConfig.founder.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 py-2 px-3 rounded-lg bg-navy-900 border border-rose-500/30 text-rose-300 text-xs font-semibold"
                >
                  <Instagram className="w-3.5 h-3.5 text-rose-400" />
                  <span>Instagram</span>
                </a>
              </div>

              <Button
                variant="primary"
                size="md"
                className="w-full justify-center"
                onClick={handleCtaClick}
                rightIcon={<ArrowRight className="w-4 h-4" />}
              >
                Discuss Your Project
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
