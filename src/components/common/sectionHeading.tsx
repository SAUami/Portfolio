import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Badge } from './badge';

export interface SectionHeadingProps {
  eyebrow?: string;
  eyebrowVariant?: 'default' | 'electric' | 'violet' | 'emerald' | 'amber';
  title: string;
  highlightText?: string;
  description?: string;
  align?: 'left' | 'center';
  className?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  eyebrow,
  eyebrowVariant = 'electric',
  title,
  highlightText,
  description,
  align = 'center',
  className,
}) => {
  const isCentered = align === 'center';

  return (
    <div
      className={twMerge(
        clsx(
          'mb-12 md:mb-16',
          isCentered ? 'text-center mx-auto max-w-3xl' : 'text-left max-w-2xl',
          className
        )
      )}
    >
      {eyebrow && (
        <div className={clsx('mb-3', isCentered ? 'flex justify-center' : 'flex justify-start')}>
          <Badge variant={eyebrowVariant} size="sm" dot>
            {eyebrow}
          </Badge>
        </div>
      )}

      <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl font-extrabold tracking-tight text-white leading-tight">
        {title}{' '}
        {highlightText && (
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-electric-400 to-violetAccent-400">
            {highlightText}
          </span>
        )}
      </h2>

      {description && (
        <p className="mt-4 text-base md:text-lg text-slate-300 leading-relaxed font-normal">
          {description}
        </p>
      )}
    </div>
  );
};
