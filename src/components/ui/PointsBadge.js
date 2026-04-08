import React from 'react';
import { motion } from 'framer-motion';
import { Zap } from 'lucide-react';

const PointsBadge = ({ points, showAnimation = false, size = 'medium' }) => {
  const sizes = {
    small: 'px-3 py-1 text-sm',
    medium: 'px-4 py-2 text-base',
    large: 'px-6 py-3 text-lg',
  };

  return (
    <motion.div
      initial={showAnimation ? { scale: 0.8, opacity: 0 } : false}
      animate={showAnimation ? { scale: 1, opacity: 1 } : false}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className={`
        inline-flex items-center gap-2 
        bg-gradient-to-r from-bima-primary to-bima-dark
        text-white font-bold rounded-full
        shadow-lg shadow-bima-primary/30
        ${sizes[size]}
      `}
    >
      <Zap size={16} className="fill-current" />
      <span>{points?.toLocaleString() || '0'} EC</span>
    </motion.div>
  );
};

export default PointsBadge;