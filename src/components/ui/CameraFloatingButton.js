import React from 'react';
import { Activity } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const MonitorFloatingButton = ({ className = "" }) => {
  const navigate = useNavigate();

  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={() => navigate('/scan')}
      aria-label="Open scanner"
      className={`absolute bottom-6 right-6 w-14 h-14 bg-bima-button rounded-full flex items-center justify-center shadow-lg shadow-bima-button/30 z-50 hover:bg-bima-button-dark transition-colors ${className}`}
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: 'spring', delay: 0.5 }}
    >
      <Activity size={24} className="text-white" />
    </motion.button>
  );
};

export default MonitorFloatingButton;