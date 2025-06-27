import React from 'react';
import { motion } from 'framer-motion';
import { clsx } from 'clsx';

const StatCard = ({ 
  icon: Icon, 
  value, 
  label, 
  color = 'green',
  size = 'medium',
  animateValue = false,
  delay = 0,
  className
}) => {
  const colors = {
    green: 'bg-green-100 text-green-800',
    blue: 'bg-blue-100 text-blue-800',
    purple: 'bg-purple-100 text-purple-800',
    red: 'bg-red-100 text-red-800',
    yellow: 'bg-yellow-100 text-yellow-800',
    orange: 'bg-orange-100 text-orange-800',
  };

  const iconColors = {
    green: 'text-green-600 bg-green-200',
    blue: 'text-blue-600 bg-blue-200',
    purple: 'text-purple-600 bg-purple-200',
    red: 'text-red-600 bg-red-200',
    yellow: 'text-yellow-600 bg-yellow-200',
    orange: 'text-orange-600 bg-orange-200',
  };

  const sizes = {
    small: {
      container: 'p-3',
      icon: 'p-2',
      iconSize: 20,
      value: 'text-lg',
      label: 'text-xs',
    },
    medium: {
      container: 'p-4',
      icon: 'p-3',
      iconSize: 24,
      value: 'text-2xl',
      label: 'text-sm',
    },
    large: {
      container: 'p-6',
      icon: 'p-4',
      iconSize: 32,
      value: 'text-3xl',
      label: 'text-base',
    },
  };

  const currentSize = sizes[size];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      whileHover={{ y: -5, scale: 1.02 }}
      className={clsx(
        'bg-white rounded-2xl shadow-sm border border-gray-100',
        'flex flex-col items-center justify-center text-center',
        colors[color],
        currentSize.container,
        className
      )}
    >
      <div className={clsx(
        'rounded-full mb-3',
        iconColors[color],
        currentSize.icon
      )}>
        {Icon && <Icon size={currentSize.iconSize} />}
      </div>
      
      <motion.div
        className={clsx('font-bold mb-1', currentSize.value)}
        initial={animateValue ? { scale: 0 } : false}
        animate={animateValue ? { scale: 1 } : false}
        transition={{ delay: delay + 0.3, type: 'spring', stiffness: 200 }}
      >
        {value}
      </motion.div>
      
      <div className={clsx('text-gray-600', currentSize.label)}>
        {label}
      </div>
    </motion.div>
  );
};

export default StatCard; 