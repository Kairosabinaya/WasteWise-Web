import React, { useState, useEffect } from 'react';
import { ArrowLeft, X, Camera, Image, Lightbulb, CheckCircle, Star, ZapOff, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { GlassCard, GamifiedButton, PointsBadge, AppLogo } from '../components/ui';

const ScanPage = () => {
  const navigate = useNavigate();
  const [isScanning, setIsScanning] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [notification, setNotification] = useState(null);

  // Mock scan result data matching Flutter app
  const scanResult = {
    detectedWaste: "Plastic Bottle",
    wasteCategory: "Recyclable Plastic",
    earnedPoints: 15,
    recyclingTip: "Make sure the bottle is empty and clean before recycling",
    confidence: 95,
    instructions: [
      "Remove cap and labels if possible",
      "Rinse with water to remove residue",
      "Place in blue recycling bin",
      "Earn points for proper disposal"
    ]
  };

  // Animate scan line
  useEffect(() => {
    if (isScanning) {
      const interval = setInterval(() => {
        setScanProgress(prev => (prev + 1) % 100);
      }, 20);
      return () => clearInterval(interval);
    }
  }, [isScanning]);

  const startScanning = async () => {
    if (isScanning) return;
    
    setIsScanning(true);
    setShowResult(false);
    
    // Simulate AI processing - 3 seconds
    setTimeout(() => {
      setIsScanning(false);
      setIsProcessing(true);
      
      // Processing time - 2 seconds
      setTimeout(() => {
        setIsProcessing(false);
        setShowResult(true);
      }, 2000);
    }, 3000);
  };

  const resetScan = () => {
    setShowResult(false);
    setIsScanning(false);
    setIsProcessing(false);
    setScanProgress(0);
  };

  const handleSaveResult = () => {
    // Show success notification
    setNotification({
      type: 'success',
      title: 'Result Saved!',
      message: `${scanResult.detectedWaste} scan result saved successfully. You earned ${scanResult.earnedPoints} points!`
    });
    
    // Auto hide notification and navigate to home after 3 seconds
    setTimeout(() => {
      setNotification(null);
      navigate('/');
    }, 3000);
  };

  // Notification Badge Component
  const NotificationBadge = ({ notification, onClose }) => {
    if (!notification) return null;

    const isSuccess = notification.type === 'success';
    
    return (
      <motion.div
        initial={{ opacity: 0, y: -50, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -50, scale: 0.9 }}
        className={`absolute top-4 left-4 right-4 z-50 ${
          isSuccess ? 'bg-[#10B981]' : 'bg-[#EF4444]'
        } text-white p-3 rounded-xl shadow-xl`}
        style={{ 
          boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
          maxWidth: '320px',
          margin: '0 auto'
        }}
      >
        <div className="flex items-start">
          <div className={`w-6 h-6 rounded-full flex items-center justify-center mr-2 ${
            isSuccess ? 'bg-white/20' : 'bg-white/20'
          }`}>
            {isSuccess ? (
              <CheckCircle size={12} />
            ) : (
              <AlertCircle size={12} />
            )}
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-xs mb-1">{notification.title}</h3>
            <p className="text-xs text-white/90">{notification.message}</p>
          </div>
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={onClose}
            className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center ml-2"
          >
            <X size={10} />
          </motion.button>
        </div>
      </motion.div>
    );
  };

  // Grid Pattern Component
  const GridPattern = () => (
    <div className="absolute inset-0 opacity-10">
      <svg width="100%" height="100%">
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>
    </div>
  );

  // Corner Indicators Component
  const CornerIndicators = () => (
    <>
      {/* Top Left */}
      <div className="absolute top-0 left-0 w-5 h-5 border-t-[3px] border-l-[3px] border-[#10B981]" />
      {/* Top Right */}
      <div className="absolute top-0 right-0 w-5 h-5 border-t-[3px] border-r-[3px] border-[#10B981]" />
      {/* Bottom Left */}
      <div className="absolute bottom-0 left-0 w-5 h-5 border-b-[3px] border-l-[3px] border-[#10B981]" />
      {/* Bottom Right */}
      <div className="absolute bottom-0 right-0 w-5 h-5 border-b-[3px] border-r-[3px] border-[#10B981]" />
    </>
  );

    return (
    <div className="h-full bg-gradient-to-b from-[#1A1A1A] via-[#2D2D2D] to-[#1A1A1A] relative overflow-hidden">
      {/* In-App Notification */}
      <AnimatePresence>
        <NotificationBadge 
          notification={notification} 
          onClose={() => setNotification(null)} 
        />
      </AnimatePresence>
      {/* Camera Preview Background */}
      <div className="absolute inset-0">
        {/* Plastic Bottle Background Image */}
        <div className="absolute inset-0 flex items-center justify-center">
          <img 
            src="plasticbottle.jpg"
            alt="Plastic Bottle"
            className="w-full h-full object-cover"
            onError={(e) => {
              // Fallback to grid pattern if image not found
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'block';
            }}
          />
          <div className="absolute inset-0 hidden">
            <GridPattern />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-[200px] h-[200px] bg-white/10 rounded-[20px] flex items-center justify-center">
                <Camera size={80} className="text-white/30" />
              </div>
            </div>
          </div>
        </div>
        {/* Dark overlay for better contrast */}
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Header - consistent with other pages */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="absolute top-0 left-0 right-0 z-10"
      >
        <div className="bg-gradient-to-b from-black/70 to-transparent p-4 pt-12">
          {/* App Logo */}
          <div className="mb-4">
            <AppLogo variant="compact" className="justify-center" />
          </div>

          <div className="flex items-center justify-between">
            <motion.button
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.05 }}
              onClick={() => window.history.back()}
              className="w-10 h-10 bg-black/50 rounded-full flex items-center justify-center backdrop-blur-sm"
            >
              <ArrowLeft size={20} className="text-white" />
            </motion.button>
            
            <div className="flex-1 text-center">
              <motion.h1 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-white text-2xl font-bold"
              >
                Scan
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-white/80 text-sm mt-1"
              >
                AI-powered waste identification
              </motion.p>
            </div>
            
            <motion.button
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.05 }}
              className="w-10 h-10 bg-black/50 rounded-full flex items-center justify-center backdrop-blur-sm"
            >
              <ZapOff size={20} className="text-white" />
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Scan Area - exact Flutter recreation */}
      {!showResult && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <div className="flex flex-col items-center">
            {/* Scan Frame */}
            <div 
              className={`relative w-[280px] h-[280px] rounded-[20px] border-2 ${
                isScanning ? 'border-[#10B981]' : 'border-white/50'
              }`}
            >
              <CornerIndicators />
              
              {/* Animated Scan Line */}
              {isScanning && (
                <motion.div
                  className="absolute left-2.5 right-2.5 h-0.5 bg-gradient-to-r from-transparent via-[#10B981] to-transparent shadow-[0_0_10px_#10B981,0_0_20px_#10B981]"
                  animate={{
                    top: ['10px', '260px', '10px']
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              )}
            </div>

            {/* Instructions */}
            <div className="mt-8 text-center">
              <h2 className="text-white text-lg font-medium leading-relaxed">
                {isScanning 
                  ? 'Analyzing waste...' 
                  : 'Point camera at waste\nto identify type'
                }
              </h2>
              
              {isScanning && (
                <div className="mt-4 flex items-center justify-center">
                  <div className="w-6 h-6 border-2 border-[#10B981] border-t-transparent rounded-full animate-spin" />
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )}

      {/* Bottom Controls - exact Flutter recreation */}
      {!showResult && (
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute bottom-0 left-0 right-0 p-8"
        >
          <div className="flex items-center justify-center">
            <motion.button
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.05 }}
              onClick={startScanning}
              disabled={isScanning}
              className={`w-20 h-20 rounded-full border-4 border-white flex items-center justify-center ${
                isScanning ? 'bg-[#10B981] border-[#10B981]' : 'bg-transparent'
              }`}
            >
              <div className={`w-16 h-16 rounded-full ${
                isScanning ? 'bg-white' : 'bg-[#10B981]'
              } flex items-center justify-center`}>
                <Camera size={32} className={isScanning ? 'text-[#10B981]' : 'text-white'} />
              </div>
            </motion.button>
                </div>

          <div className="mt-4 text-center">
            <p className="text-white/70 text-sm">
              {isScanning ? 'Scanning in progress...' : 'Tap to scan waste'}
            </p>
          </div>
        </motion.div>
      )}

      {/* Processing Overlay */}
      <AnimatePresence>
        {isProcessing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/80 flex items-center justify-center z-50"
          >
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-[#10B981] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
              <h3 className="text-white text-xl font-semibold mb-2">Processing...</h3>
              <p className="text-white/70">AI is analyzing your waste</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Result Sheet - exact Flutter recreation */}
      <AnimatePresence>
        {showResult && (
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="absolute inset-0 bg-[#F8FAFC] z-40"
          >
            <div className="h-full flex flex-col">
              {/* Header */}
              <div className="bg-white p-4 shadow-sm">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-[#1F2937]">Scan Result</h2>
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    whileHover={{ scale: 1.05, backgroundColor: '#F3F4F6' }}
                    onClick={resetScan}
                    className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
                  >
                    <X size={20} className="text-[#6B7280]" />
                  </motion.button>
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 p-5 space-y-6 overflow-y-auto scrollbar-hide">
                {/* Detection Result */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  whileHover={{ y: -2, boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}
                  className="bg-white rounded-2xl p-6 shadow-sm cursor-pointer"
                >
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-[#10B981]/10 rounded-full flex items-center justify-center mr-4">
                      <CheckCircle size={24} className="text-[#10B981]" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-[#1F2937]">{scanResult.detectedWaste}</h3>
                      <p className="text-sm text-[#6B7280]">{scanResult.wasteCategory}</p>
                    </div>
                </div>

                  <div className="bg-[#ECFDF5] p-4 rounded-xl">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Star size={20} className="text-[#10B981] mr-2" />
                        <span className="text-[#1F2937] font-semibold">Points Earned</span>
                      </div>
                      <span className="text-2xl font-bold text-[#10B981]">+{scanResult.earnedPoints}</span>
                    </div>
                  </div>
                </motion.div>

                {/* Recycling Tip */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  whileHover={{ y: -2, boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}
                  className="bg-white rounded-2xl p-6 shadow-sm cursor-pointer"
                >
                  <div className="flex items-center mb-3">
                    <Lightbulb size={20} className="text-[#F59E0B] mr-2" />
                    <h4 className="font-semibold text-[#1F2937]">Recycling Tip</h4>
                  </div>
                  <p className="text-[#6B7280] text-sm leading-relaxed">
                    {scanResult.recyclingTip}
                  </p>
                </motion.div>

                {/* Instructions */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  whileHover={{ y: -2, boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}
                  className="bg-white rounded-2xl p-6 shadow-sm cursor-pointer"
                >
                  <h4 className="font-semibold text-[#1F2937] mb-3">How to Recycle</h4>
                  <div className="space-y-2">
                    {scanResult.instructions.map((instruction, index) => (
                      <div key={index} className="flex items-start">
                        <div className="w-6 h-6 bg-[#10B981] text-white rounded-full flex items-center justify-center text-xs font-bold mr-3 mt-0.5 flex-shrink-0">
                          {index + 1}
                        </div>
                        <p className="text-[#6B7280] text-sm">{instruction}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>

              {/* Bottom Actions */}
              <div className="p-5 bg-white border-t border-gray-100">
                <div className="flex gap-3">
                  <motion.button
                    whileTap={{ scale: 0.98 }}
                    whileHover={{ scale: 1.02 }}
                    onClick={resetScan}
                    className="flex-1 bg-gray-100 text-[#6B7280] py-3 rounded-xl font-semibold hover:bg-gray-200 transition-colors"
                  >
                    Scan Again
                  </motion.button>
                  <motion.button
                    whileTap={{ scale: 0.98 }}
                    whileHover={{ scale: 1.02 }}
                    onClick={handleSaveResult}
                    className="flex-1 bg-[#10B981] text-white py-3 rounded-xl font-semibold hover:bg-[#059669] transition-colors shadow-lg shadow-[#10B981]/30"
                  >
                    Save Result
                  </motion.button>
                </div>
                </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
        </div>
    );
};

export default ScanPage; 