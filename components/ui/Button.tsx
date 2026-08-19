import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'brand' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  target?: string;
  rel?: string;
  children: React.ReactNode;
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  href,
  target,
  rel,
  children,
  className = '',
  ...props
}) => {
  const baseStyles =
    'inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-zinc-400 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none cursor-pointer';

  const variants = {
    primary: 'bg-[#0F0F0F] hover:bg-[#27272a] text-white shadow-sm',
    secondary: 'bg-zinc-100 hover:bg-zinc-200 text-[#0F0F0F] shadow-xs',
    brand: 'bg-[#C81E1E] hover:bg-[#b01818] text-white shadow-sm shadow-[#C81E1E]/15',
    outline: 'border border-[#E5E5E5] bg-white hover:bg-[#FAFAFA] text-[#0F0F0F] hover:border-[#d4d4d8]',
    ghost: 'text-[#52525B] hover:bg-[#FAFAFA] hover:text-[#0F0F0F]',
  };

  const sizes = {
    sm: 'text-xs px-3 py-1.5 rounded-md',
    md: 'text-sm px-4 py-2.5 rounded-lg',
    lg: 'text-base px-6 py-3.5 rounded-xl',
  };

  const combinedClasses = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`;

  if (href) {
    return (
      <a href={href} target={target} rel={rel} className={combinedClasses}>
        {children}
      </a>
    );
  }

  return (
    <button className={combinedClasses} {...props}>
      {children}
    </button>
  );
};
