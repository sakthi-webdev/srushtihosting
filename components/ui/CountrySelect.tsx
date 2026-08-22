'use client';

import React, { useState, useRef, useEffect } from 'react';
import { FiChevronDown, FiSearch, FiCheck } from 'react-icons/fi';
import { COUNTRIES, CountryOption, getCountryByCode, getCountryFlagUrl } from '@/lib/countries';

interface CountrySelectProps {
  value: string;
  onChange: (code: string) => void;
  className?: string;
}

export const CountrySelect: React.FC<CountrySelectProps> = ({ value, onChange, className = '' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const selectedCountry = getCountryByCode(value);

  // Filter countries by search query
  const filteredCountries = COUNTRIES.filter((c) => {
    const q = searchQuery.toLowerCase().trim();
    return c.name.toLowerCase().includes(q) || c.dialCode.includes(q) || c.code.toLowerCase().includes(q);
  });

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Auto-focus search input when opening
  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isOpen]);

  const handleSelect = (country: CountryOption) => {
    onChange(country.code);
    setIsOpen(false);
    setSearchQuery('');
  };

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-label="Select Country Code"
        className="w-full flex items-center justify-between gap-2 px-3 sm:px-3.5 py-3.5 bg-white border border-[#E5E5E5] rounded-xl text-sm text-[#0F0F0F] hover:border-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-400 transition-all cursor-pointer shadow-2xs select-none"
      >
        <div className="flex items-center gap-2 min-w-0">
          <img
            src={getCountryFlagUrl(selectedCountry.code)}
            alt={selectedCountry.name}
            className="w-5 h-3.5 object-cover rounded-[2px] shadow-2xs shrink-0 border border-zinc-200"
            loading="eager"
          />
          <span className="font-semibold text-xs sm:text-sm text-[#0F0F0F] tracking-tight shrink-0">
            {selectedCountry.dialCode}
          </span>
        </div>
        <FiChevronDown
          className={`w-4 h-4 text-zinc-400 shrink-0 transition-transform duration-200 ${
            isOpen ? 'rotate-180 text-zinc-800' : ''
          }`}
        />
      </button>

      {/* Popover Dropdown Menu */}
      {isOpen && (
        <div className="absolute left-0 top-full mt-2 w-72 sm:w-80 bg-white/98 backdrop-blur-xl border border-zinc-200/90 rounded-2xl shadow-xl z-50 overflow-hidden text-left animate-in fade-in slide-in-from-top-2 duration-150">
          {/* Search Bar Header */}
          <div className="p-2.5 border-b border-zinc-100 bg-zinc-50/60 sticky top-0 z-10">
            <div className="relative">
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search country or dial code..."
                className="w-full pl-9 pr-3 py-2 bg-white border border-zinc-200 rounded-xl text-xs sm:text-sm text-[#0F0F0F] focus:outline-none focus:ring-2 focus:ring-zinc-400 transition-all placeholder-zinc-400"
              />
            </div>
          </div>

          {/* Scrollable Country List */}
          <div className="max-h-60 overflow-y-auto p-1.5 space-y-0.5 custom-scrollbar">
            {filteredCountries.length === 0 ? (
              <div className="py-6 text-center text-xs text-zinc-500 font-medium">No countries found.</div>
            ) : (
              filteredCountries.map((c) => {
                const isSelected = c.code === selectedCountry.code;
                return (
                  <button
                    key={c.code}
                    type="button"
                    onClick={() => handleSelect(c)}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs sm:text-sm transition-colors cursor-pointer text-left ${
                      isSelected
                        ? 'bg-zinc-100 font-bold text-[#0F0F0F]'
                        : 'hover:bg-zinc-50 text-zinc-700 hover:text-[#0F0F0F]'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <img
                        src={getCountryFlagUrl(c.code)}
                        alt={c.name}
                        className="w-5 h-3.5 object-cover rounded-[2px] shadow-2xs shrink-0 border border-zinc-200"
                        loading="lazy"
                      />
                      <span className="truncate max-w-[130px] sm:max-w-[160px]">{c.name}</span>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="font-semibold text-xs text-zinc-500">{c.dialCode}</span>
                      {isSelected && <FiCheck className="w-4 h-4 text-[#C81E1E]" />}
                    </div>
                  </button>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
};
