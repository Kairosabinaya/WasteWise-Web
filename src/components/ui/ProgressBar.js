import React from 'react';
import { motion } from 'framer-motion';
import { clsx } from 'clsx';

const ProgressBar = ({ 
  progress = 0, 
  color = 'green', 
  size = 'medium',
  showLabel = false,
  label,
  animated = true,
  className 
}) => {
  const colors = {
    green: 'bg-brand-primary',
    blue: 'bg-blue-500',
    yellow: 'bg-yellow-500',
    red: 'bg-red-500',
    purple: 'bg-purple-500',
  };

  const sizes = {
    small: 'h-2',
    medium: 'h-3',
    large: 'h-4',
  };

  const progressValue = Math.max(0, Math.min(100, progress));

  return (
    <div className={clsx('w-full', className)}>
      {showLabel && (
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700">{label}</span>
          <span className="text-sm text-gray-500">{progressValue}%</span>
        </div>
      )}
      <div className={clsx(
        'w-full bg-gray-200 rounded-full overflow-hidden',
        sizes[size]
      )}>
        <motion.div
          className={clsx('h-full rounded-full', colors[color])}
          initial={animated ? { width: 0 } : false}
          animate={{ width: `${progressValue}%` }}
          transition={{ duration: 1, ease: 'easeOut' }}
        />
      </div>
    </div>
  );
};

export default ProgressBar; 