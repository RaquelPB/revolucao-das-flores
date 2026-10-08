import React from 'react';
import logoWorkshop from '../assets/images/logo_workshop_revolucao.png';

interface WorkshopLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showSubtitle?: boolean;
  className?: string;
}

export const WorkshopLogo: React.FC<WorkshopLogoProps> = ({
  size = 'xl',
  className = '',
}) => {
  const sizeClass =
    size === 'sm'
      ? 'w-45'
      : size === 'md'
      ? 'w-65'
      : size === 'lg'
      ? 'w-85'
      : 'w-62.5 sm:w-90 md:w-100';

  return (
    <div className={`flex w-full justify-center ${className}`}>
      <img
        src={logoWorkshop}
        alt="Workshop Revolução das Flores"
        className={`${sizeClass} max-w-full h-auto object-contain`}
      />
    </div>
  );
};
