import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

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
        bg-[#D48931] 
        text-white font-bold rounded-full
        shadow-lg shadow-[#D48931]/30
        ${sizes[size]}
      `}
    >
      <Star size={16} className="fill-current" />
      <span>{points?.toLocaleString() || '0'} PTS</span>
    </motion.div>
  );
};

export default PointsBadge; 