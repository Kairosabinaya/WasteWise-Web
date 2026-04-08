import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check } from 'lucide-react';

const Toast = ({ message }) => (
  <AnimatePresence>
    {message && (
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="fixed top-14 left-1/2 -translate-x-1/2 z-[100] bg-gray-800 text-white px-4 py-2.5 rounded-xl text-xs font-semibold shadow-lg flex items-center gap-2 max-w-[90vw]"
      >
        <Check size={14} className="text-bima-primary flex-shrink-0" />
        <span className="truncate">{message}</span>
      </motion.div>
    )}
  </AnimatePresence>
);

export default Toast;
