import React from 'react';
import { Camera } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const CameraFloatingButton = ({ className = "" }) => {
  const navigate = useNavigate();

  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={() => navigate('/scan')}
      className={`absolute bottom-6 right-6 w-14 h-14 bg-[#164c51] rounded-full flex items-center justify-center shadow-lg shadow-[#164c51]/30 z-50 hover:bg-[#0C2521] transition-colors ${className}`}
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: 'spring', delay: 0.5 }}
    >
      <Camera size={24} className="text-white" />
    </motion.button>
  );
};

export default CameraFloatingButton; 