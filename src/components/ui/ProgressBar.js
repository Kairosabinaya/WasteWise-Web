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
    green: 'bg-bima-button',
    blue: 'bg-bima-button',
    yellow: 'bg-bima-button-secondary',
    red: 'bg-bima-button-secondary-dark',
    purple: 'bg-bima-button-dark',
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
      <div
        className={clsx(
          'w-full bg-gray-200 rounded-full overflow-hidden',
          sizes[size]
        )}
        role="progressbar"
        aria-valuenow={progressValue}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={label || 'Progress'}
      >
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