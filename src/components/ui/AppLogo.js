import React from 'react';
import { motion } from 'framer-motion';

const AppLogo = ({ variant = 'default', className = '', textColor = 'gradient' }) => {
  const getTextColorClass = () => {
    if (textColor === 'white') {
      return 'text-white';
    }
    return 'bg-gradient-to-r from-[#0C2521] to-[#164c51] bg-clip-text text-transparent';
  };

  if (variant === 'compact') {
    return (
      <motion.div 
        className={`flex items-center ${className}`}
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
      >
        <span className={`text-lg font-bold ${getTextColorClass()}`}>
          WasteWise
        </span>
      </motion.div>
    );
  }

  return (
    <motion.div 
      className={`flex items-center ${className}`}
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      <div>
        <motion.h1 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className={`text-2xl font-bold ${getTextColorClass()}`}
        >
          WasteWise
        </motion.h1>
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="h-0.5 bg-gradient-to-r from-[#0C2521] to-[#164c51] rounded-full"
        ></motion.div>
      </div>
    </motion.div>
  );
};

export default AppLogo; 