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
    primary: 'bg-[#164c51] text-white shadow-lg shadow-[#164c51]/30 hover:bg-[#0C2521]',
    secondary: 'bg-[#D48931] text-white shadow-lg shadow-[#D48931]/30 hover:bg-[#6d1e04]',
    outline: 'border-2 border-[#164c51] text-[#164c51] bg-transparent hover:bg-[#164c51] hover:text-white',
    ghost: 'bg-[#164c51]/10 text-[#164c51] hover:bg-[#164c51]/20',
  };

  const sizes = {
    small: 'px-4 py-2 text-sm',
    medium: 'px-6 py-3 text-base',
    large: 'px-8 py-4 text-lg',
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