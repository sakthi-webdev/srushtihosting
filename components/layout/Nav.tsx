'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX, FiUser, FiArrowRight } from 'react-icons/fi';
import { siteConfig } from '@/config/site';

export const Nav: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Lock body scrolling when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { name: 'Hosting', href: '#hosting' },
    { name: 'Domains', href: '#domains' },
    { name: 'Google Workspace', href: '#workspace' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    // Smooth scroll to section
    const targetElement = document.querySelector(href);
    if (targetElement) {
      setTimeout(() => {
        targetElement.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-[#E5E5E5]/70 transition-all shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-24">

            {/* Brand Logo Only */}
            <Link href="/" className="flex items-center group py-2">
              <div className="relative h-14 sm:h-16 w-auto flex items-center">
                <Image
                  src="/logo.png"
                  alt="Srushti Hosting"
                  width={220}
                  height={64}
                  priority
                  loading="eager"
                  style={{ width: 'auto', height: 'auto' }}
                  className="object-contain h-16 sm:h-16 w-auto"
                />
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-10">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-base font-semibold text-zinc-700 hover:text-[#C81E1E] transition-colors py-2 tracking-wide"
                >
                  {link.name}
                </a>
              ))}
            </nav>

            {/* Desktop Action Button */}
            <div className="hidden md:flex items-center gap-4">
              <a
                href={siteConfig.upmind.clientAreaUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#C81E1E] hover:bg-[#b01818] text-white text-base font-bold px-7 py-3 rounded-full transition-all shadow-sm cursor-pointer hover:shadow-md hover:scale-[1.02]"
              >
                <FiUser className="w-4.5 h-4.5 text-white/90" />
                <span>Login</span>
              </a>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex md:hidden">
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="p-3 rounded-2xl text-[#0F0F0F] bg-zinc-100 hover:bg-zinc-200 focus:outline-none transition-colors cursor-pointer"
                aria-label="Open navigation menu"
              >
                <FiMenu className="w-7 h-7" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Full-Screen Mobile Navigation Overlay Portal */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[9999] h-[100dvh] w-full bg-white flex flex-col justify-between p-6 sm:p-8 overflow-y-auto text-left"
          >
            {/* Top Bar inside Overlay */}
            <div className="flex items-center justify-between pb-5 border-b border-zinc-100 shrink-0">
              <Link href="/" onClick={() => setMobileMenuOpen(false)}>
                <Image
                  src="/logo.png"
                  alt="Srushti Hosting"
                  width={200}
                  height={56}
                  priority
                  loading="eager"
                  style={{ width: 'auto', height: 'auto' }}
                  className="object-contain h-16 w-auto"
                />
              </Link>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-3 rounded-full bg-zinc-100 text-[#0F0F0F] hover:bg-zinc-200 focus:outline-none transition-colors cursor-pointer"
                aria-label="Close navigation menu"
              >
                <FiX className="w-7 h-7" />
              </button>
            </div>

            {/* Content Container Stacked From Top */}
            <div className="flex-grow flex flex-col justify-start pt-6 pb-6 overflow-y-auto">
              <div className="flex flex-col space-y-2 text-left mb-8">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(link.href);
                    }}
                    className="text-2xl font-black text-[#0F0F0F] hover:text-[#C81E1E] transition-colors flex items-center justify-between py-3.5 border-b border-zinc-100 group cursor-pointer"
                  >
                    <span>{link.name}</span>
                    <FiArrowRight className="w-5 h-5 text-zinc-400 group-hover:text-[#C81E1E] group-hover:translate-x-1.5 transition-all" />
                  </a>
                ))}
              </div>

              <div className="space-y-4">
                <a
                  href={siteConfig.upmind.clientAreaUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full inline-flex items-center justify-center gap-2 bg-[#C81E1E] hover:bg-[#b01818] text-white text-base font-bold px-8 py-4 rounded-full transition-all shadow-md active:scale-95"
                >
                  <FiUser className="w-5 h-5" />
                  <span>Client Area Login</span>
                </a>
              </div>
            </div>

            {/* Bottom Copyright inside Overlay */}
            <div className="pt-4 border-t border-zinc-100 shrink-0">
              <p className="text-xs text-center text-zinc-500 font-medium">
                © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
