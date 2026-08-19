'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiMail, FiPhone, FiMessageSquare, FiCheckCircle, FiAlertCircle, FiArrowRight } from 'react-icons/fi';
import { Button } from '@/components/ui/Button';
import { siteConfig } from '@/config/site';
import { sectionFlags } from '@/config/sections';

export const Contact: React.FC = () => {
  if (!sectionFlags.contact) return null;

  const [formState, setFormState] = useState({
    name: '',
    email: '',
    service: 'Web Hosting',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formState),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to submit inquiry.');
      }

      setStatus('success');
      setFormState({ name: '', email: '', service: 'Web Hosting', message: '' });
    } catch (err: any) {
      setStatus('error');
      setErrorMessage(err.message || 'An error occurred. Please try again.');
    }
  };

  return (
    <section id="contact" className="relative py-24 bg-gradient-to-b from-white via-zinc-50/60 to-white border-t border-[#E5E5E5] scroll-mt-20 overflow-hidden">
      {/* Ambient background glow orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute bottom-0 right-1/4 w-[450px] h-[450px] bg-[#C81E1E]/6 rounded-full blur-[120px]" />
        <div className="absolute top-1/4 left-10 w-[400px] h-[400px] bg-[#F59E0B]/6 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Info & Channels */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 space-y-6 text-left"
          >
            <div className="inline-block">
              <span className="bg-[#F59E0B] text-white text-xs sm:text-sm font-bold px-4 py-1.5 rounded-full shadow-xs tracking-wide">
                Get In Touch
              </span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-black text-[#0F0F0F] tracking-tight leading-[1.12]">
              We Are Here to Help
            </h2>

            <p className="text-base sm:text-lg text-[#52525B] leading-relaxed font-normal">
              Have questions about web hosting, custom domains, or enterprise solutions? Contact our technical support team.
            </p>

            {/* Channels Card */}
            <div className="bg-white/95 backdrop-blur-md p-6 sm:p-8 rounded-3xl border border-zinc-200/90 shadow-sm space-y-6">
              <h3 className="text-lg font-bold text-[#0F0F0F]">Contact Channels</h3>
              
              <div className="space-y-5">
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="flex items-center gap-4 group text-[#52525B] hover:text-[#0F0F0F] transition-colors"
                >
                  <div className="w-12 h-12 rounded-2xl bg-zinc-100 flex items-center justify-center text-zinc-800 shrink-0 group-hover:scale-105 transition-transform">
                    <FiMail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-xs text-[#52525B] font-medium">Official Email</span>
                    <span className="font-semibold text-[#0F0F0F] text-base sm:text-lg">
                      {siteConfig.contact.email}
                    </span>
                  </div>
                </a>

                <a
                  href={`tel:${siteConfig.contact.phone.replace(/\s+/g, '')}`}
                  className="flex items-center gap-4 group text-[#52525B] hover:text-[#0F0F0F] transition-colors"
                >
                  <div className="w-12 h-12 rounded-2xl bg-zinc-100 flex items-center justify-center text-zinc-800 shrink-0 group-hover:scale-105 transition-transform">
                    <FiPhone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-xs text-[#52525B] font-medium">Direct Phone Line</span>
                    <span className="font-semibold text-[#0F0F0F] text-base sm:text-lg">
                      {siteConfig.contact.phone}
                    </span>
                  </div>
                </a>

                <a
                  href={siteConfig.contact.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 group text-[#52525B] hover:text-emerald-700 transition-colors"
                >
                  <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600 shrink-0 group-hover:scale-105 transition-transform border border-emerald-200">
                    <FiMessageSquare className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-xs text-[#52525B] font-medium">WhatsApp Support</span>
                    <span className="font-semibold text-[#0F0F0F] group-hover:text-emerald-700 text-base sm:text-lg flex items-center gap-1.5">
                      <span>Chat Live on WhatsApp</span>
                      <FiArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Compact Contact Form Card with Increased Text Size */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-7 bg-white/95 backdrop-blur-md p-6 sm:p-8 rounded-3xl border border-zinc-200/90 shadow-lg text-left"
          >
            <h3 className="text-2xl font-bold text-[#0F0F0F] mb-1">Send a Message</h3>
            <p className="text-sm text-[#52525B] mb-6">Fill in your details below and our team will get back to you promptly.</p>

            {status === 'success' ? (
              <div className="p-6 sm:p-8 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-center">
                <FiCheckCircle className="w-12 h-12 text-emerald-600 mx-auto mb-3" />
                <h4 className="text-lg font-bold mb-1">Message Sent Successfully!</h4>
                <p className="text-sm text-emerald-700">Thank you for reaching out. We will respond to your inquiry shortly.</p>
                <button
                  onClick={() => setStatus('idle')}
                  className="mt-5 text-sm font-bold underline cursor-pointer text-emerald-900"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {status === 'error' && (
                  <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm flex items-center gap-2">
                    <FiAlertCircle className="w-5 h-5 shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="name" className="block text-sm font-bold text-[#0F0F0F] mb-1.5">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      required
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      placeholder="Enter your full name"
                      className="w-full px-4 py-3.5 bg-white border border-[#E5E5E5] rounded-xl text-sm sm:text-base text-[#0F0F0F] focus:outline-none focus:ring-2 focus:ring-zinc-400 focus:border-transparent transition-all placeholder-zinc-400"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-bold text-[#0F0F0F] mb-1.5">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      required
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      placeholder="name@company.com"
                      className="w-full px-4 py-3.5 bg-white border border-[#E5E5E5] rounded-xl text-sm sm:text-base text-[#0F0F0F] focus:outline-none focus:ring-2 focus:ring-zinc-400 focus:border-transparent transition-all placeholder-zinc-400"
                    />
                  </div>
                </div>

                {/* Service Selection Dropdown Field */}
                <div>
                  <label htmlFor="service" className="block text-sm font-bold text-[#0F0F0F] mb-1.5">
                    Interested Service *
                  </label>
                  <select
                    id="service"
                    required
                    value={formState.service}
                    onChange={(e) => setFormState({ ...formState, service: e.target.value })}
                    className="w-full px-4 py-3.5 bg-white border border-[#E5E5E5] rounded-xl text-sm sm:text-base text-[#0F0F0F] focus:outline-none focus:ring-2 focus:ring-zinc-400 focus:border-transparent transition-all cursor-pointer font-medium"
                  >
                    <option value="Web Hosting">Web Hosting</option>
                    <option value="Domain Registration & Transfer">Domain Registration & Transfer</option>
                    <option value="Google Workspace">Google Workspace</option>
                    <option value="SSL Security & Wildcard Add-ons">SSL Security & Wildcard Add-ons</option>
                    <option value="Free Website Migration">Free Website Migration</option>
                    <option value="Other Technical Inquiry">Other Technical Inquiry</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-bold text-[#0F0F0F] mb-1.5">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={4}
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    placeholder="How can we assist you with hosting, domains, or email?"
                    className="w-full px-4 py-3.5 bg-white border border-[#E5E5E5] rounded-xl text-sm sm:text-base text-[#0F0F0F] focus:outline-none focus:ring-2 focus:ring-zinc-400 focus:border-transparent transition-all resize-none placeholder-zinc-400"
                  />
                </div>

                {/* Submit Button (Text ONLY per user request) */}
                <Button
                  type="submit"
                  disabled={status === 'loading'}
                  variant="primary"
                  size="lg"
                  className="w-full justify-center py-4 text-base sm:text-lg font-bold"
                >
                  <span>{status === 'loading' ? 'Submitting...' : 'Submit'}</span>
                </Button>
              </form>
            )}
          </motion.div>

        </div>

      </div>
    </section>
  );
};
