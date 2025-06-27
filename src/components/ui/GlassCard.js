import React from 'react';
import { clsx } from 'clsx';

const GlassCard = ({ 
  children, 
  className, 
  onClick, 
  padding = 'p-4',
  blur = true,
  border = true,
  shadow = true,
  ...props 
}) => {
  return (
    <div
      className={clsx(
        'relative rounded-2xl',
        blur && 'backdrop-blur-md',
        border && 'border border-white/20',
        shadow && 'shadow-lg shadow-black/5',
        'bg-white/90',
        padding,
        onClick && 'cursor-pointer transition-all duration-200 hover:bg-white/95 hover:shadow-xl',
        className
      )}
      onClick={onClick}
      {...props}
    >
      {children}
    </div>
  );
};

export default GlassCard; 