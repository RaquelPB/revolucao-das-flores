import React from 'react';
import logoFloresDaPipol from '../assets/images/logo-flores-da-pipol.png';

interface FloresDaPipolLogoProps {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'light' | 'dark';
  withName?: boolean;
  className?: string;
}

export const FloresDaPipolLogo: React.FC<FloresDaPipolLogoProps> = ({
  size = 'md',
  withName = false,
  className = '',
}) => {
  const sizeClass =
    size === 'sm'
      ? 'h-14 w-14 sm:h-16 sm:w-16'
      : size === 'lg'
      ? 'h-20 w-20 sm:h-28 sm:w-28'
      : 'h-13 w-13 sm:h-20 sm:w-20';

  const nameClass =
    size === 'lg'
      ? 'text-2xl sm:text-3xl'
      : size === 'sm'
      ? 'text-base sm:text-lg'
      : 'text-lg sm:text-2xl';

  const taglineClass =
    size === 'lg'
      ? 'text-[10px] sm:text-xs tracking-[0.3em]'
      : 'text-[8px] sm:text-[10px] tracking-[0.25em]';

  return (
    <div className={`flex items-center gap-2 sm:gap-3 ${className}`}>
      <img
        src={logoFloresDaPipol}
        alt={withName ? '' : 'Flores da Pipol'}
        className={`${sizeClass} shrink-0 object-contain drop-shadow-sm`}
      />

      {withName && (
        <div className="flex flex-col leading-none">
          <span
            className={`${nameClass} font-serif-luxury font-bold text-[#6c7427] whitespace-nowrap`}
          >
            Flores da Pipol
          </span>
          <span
            className={`${taglineClass} mt-1 font-semibold uppercase text-[#B07A2A] whitespace-nowrap`}
          >
            Transformações
          </span>
        </div>
      )}
    </div>
  );
};
