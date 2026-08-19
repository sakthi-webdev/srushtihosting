import React from 'react';

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

export const GlassCard: React.FC<GlassCardProps> = ({ children, className = '', ...props }) => {
  return (
    <div
      className={`glass-card rounded-xl p-6 sm:p-8 transition-all duration-300 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
