import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Loader2 } from 'lucide-react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'violet' | 'ghost' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  as?: 'button' | 'a';
  href?: string;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = 'primary',
      size = 'md',
      isLoading = false,
      leftIcon,
      rightIcon,
      className,
      disabled,
      as = 'button',
      href,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-electric-500 focus-visible:ring-offset-2 focus-visible:ring-offset-navy-950 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]';

    const sizeStyles = {
      sm: 'text-xs md:text-sm px-3.5 py-1.5 gap-1.5 rounded-md',
      md: 'text-sm md:text-base px-5 py-2.5 gap-2 rounded-lg',
      lg: 'text-base md:text-lg px-7 py-3.5 gap-2.5 rounded-xl font-semibold',
    };

    const variantStyles = {
      primary:
        'bg-gradient-to-r from-electric-600 to-electric-500 text-white hover:from-electric-500 hover:to-electric-400 shadow-lg shadow-electric-600/20 hover:shadow-electric-500/30 border border-electric-400/30',
      violet:
        'bg-gradient-to-r from-violetAccent-600 to-violetAccent-500 text-white hover:from-violetAccent-500 hover:to-violetAccent-400 shadow-lg shadow-violetAccent-600/20 hover:shadow-violetAccent-500/30 border border-violetAccent-400/30',
      secondary:
        'bg-navy-850 hover:bg-navy-800 text-slate-200 border border-navy-700 hover:border-slate-600 shadow-sm',
      outline:
        'bg-transparent hover:bg-navy-850 text-slate-200 border border-navy-700 hover:border-electric-500/50',
      ghost:
        'bg-transparent hover:bg-navy-800/60 text-slate-300 hover:text-white',
    };

    const combinedClasses = twMerge(
      clsx(baseStyles, sizeStyles[size], variantStyles[variant], className)
    );

    if (as === 'a' && href) {
      return (
        <a
          href={href}
          className={combinedClasses}
          {...(props as unknown as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
        >
          {isLoading && <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />}
          {!isLoading && leftIcon && <span aria-hidden="true">{leftIcon}</span>}
          <span>{children}</span>
          {!isLoading && rightIcon && <span aria-hidden="true">{rightIcon}</span>}
        </a>
      );
    }

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={combinedClasses}
        {...props}
      >
        {isLoading && <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />}
        {!isLoading && leftIcon && <span aria-hidden="true">{leftIcon}</span>}
        <span>{children}</span>
        {!isLoading && rightIcon && <span aria-hidden="true">{rightIcon}</span>}
      </button>
    );
  }
);

Button.displayName = 'Button';
