import React from 'react';
import { motion } from 'framer-motion';
import { clsx } from 'clsx';

const GamifiedButton = ({
  children,
  variant = 'primary',
  size = 'medium',
  icon: Icon,
  isLoading = false,
  disabled = false,
  onClick,
  className,
  ...props
}) => {
  const variants = {
    primary: 'bg-bima-button text-white shadow-lg shadow-bima-button/30 hover:bg-bima-button-dark',
    secondary: 'bg-bima-button-secondary text-white shadow-lg shadow-bima-button-secondary/30 hover:bg-bima-button-secondary-dark',
    outline: 'border-2 border-bima-button text-bima-button bg-transparent hover:bg-bima-button hover:text-white',
    ghost: 'bg-bima-button/10 text-bima-button hover:bg-bima-button/20',
  };

  const sizes = {
    small: 'px-4 py-2.5 text-sm min-h-[44px]',
    medium: 'px-6 py-3 text-base min-h-[44px]',
    large: 'px-8 py-4 text-lg min-h-[48px]',
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={clsx(
        'relative font-semibold rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed',
        'flex items-center justify-center gap-2',
        variants[variant],
        sizes[size],
        className
      )}
      onClick={onClick}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
      ) : (
        <>
          {Icon && <Icon size={20} />}
          {children}
        </>
      )}
    </motion.button>
  );
};

export default GamifiedButton; 