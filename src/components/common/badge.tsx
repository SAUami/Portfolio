import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'electric' | 'violet' | 'emerald' | 'amber' | 'outline';
  size?: 'sm' | 'md';
  dot?: boolean;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
  size = 'md',
  dot = false,
  className,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center font-medium rounded-full transition-colors select-none';

  const sizeStyles = {
    sm: 'text-xs px-2.5 py-0.5 gap-1.5',
    md: 'text-xs md:text-sm px-3 py-1 gap-2',
  };

  const variantStyles = {
    default: 'bg-navy-800 text-slate-300 border border-navy-700',
    electric: 'bg-electric-600/10 text-electric-400 border border-electric-500/30',
    violet: 'bg-violetAccent-600/10 text-violetAccent-400 border border-violetAccent-500/30',
    emerald: 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30',
    amber: 'bg-amber-500/10 text-amber-400 border border-amber-500/30',
    outline: 'bg-transparent text-slate-400 border border-navy-700',
  };

  const dotColors = {
    default: 'bg-slate-400',
    electric: 'bg-electric-400',
    violet: 'bg-violetAccent-400',
    emerald: 'bg-emerald-400',
    amber: 'bg-amber-400',
    outline: 'bg-slate-500',
  };

  return (
    <span
      className={twMerge(clsx(baseStyles, sizeStyles[size], variantStyles[variant], className))}
      {...props}
    >
      {dot && (
        <span
          className={clsx('w-1.5 h-1.5 rounded-full animate-pulse', dotColors[variant])}
          aria-hidden="true"
        />
      )}
      {children}
    </span>
  );
};
