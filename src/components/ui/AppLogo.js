import React from 'react';
import { motion } from 'framer-motion';

const AppLogo = ({ variant = 'default', className = '', textColor = 'gradient', showTagline = true }) => {
  const getTextColorClass = () => {
    if (textColor === 'white') {
      return 'text-white';
    }
    return 'bg-gradient-to-r from-[#0C2521] to-[#164c51] bg-clip-text text-transparent';
  };

  const getTaglineColorClass = () => {
    if (textColor === 'white') {
      return 'text-white/80';
    }
    return 'text-[#6B7280]';
  };

  if (variant === 'compact') {
    return (
      <motion.div 
        className={`flex flex-col ${className}`}
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
      >
        <span className={`text-lg font-bold ${getTextColorClass()}`}>
          WasteWise
        </span>
        {showTagline && (
          <span className={`text-[10px] font-medium ${getTaglineColorClass()}`}>
            Smart Building Waste Management
          </span>
        )}
      </motion.div>
    );
  }

  return (
    <motion.div 
      className={`flex flex-col ${className}`}
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
        {showTagline && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className={`text-xs font-medium ${getTaglineColorClass()} mt-0.5`}
          >
            Smart Building Waste Management
          </motion.p>
        )}
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="h-0.5 bg-gradient-to-r from-[#0C2521] to-[#164c51] rounded-full mt-1"
        ></motion.div>
      </div>
    </motion.div>
  );
};

export default AppLogo;