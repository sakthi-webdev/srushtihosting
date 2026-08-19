import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'red' | 'gray';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'red',
  className = '',
}) => {
  const variants = {
    red: 'bg-[#FFF1F0] text-[#E31E1E] border border-[#E31E1E]/20',
    gray: 'bg-[#FAFAFA] text-[#52525B] border border-[#E5E5E5]',
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wider ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  );
};
