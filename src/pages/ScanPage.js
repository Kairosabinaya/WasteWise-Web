import React, { useState } from 'react';
import { ArrowLeft, ScanLine, Activity, Droplets, ThermometerSun, Flame, Zap, RefreshCw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const ScanPage = () => {
  const navigate = useNavigate();
  const [scanning, setScanning] = useState(false);
  const [scanComplete, setScanComplete] = useState(false);
  const [selectedSample, setSelectedSample] = useState(null);

  // Demo feedstock samples
  const samples = [
    {
      id: 1, name: 'Food Scraps', emoji: '🥗',
      result: {
        wasteType: 'High Methane Organic',
        category: 'Biogas Feedstock',
        energyScore: 'High',
        estimatedBiogas: '0.52 m³/kg',
        methaneYield: '62%',
        moistureEstimate: '78%',
        digestionCompat: 'Excellent',
        batchRecommend: 'Anaerobic Digestion Batch A',
        creditReward: 35,
        color: '#0D9488',
      },
    },
    {
      id: 2, name: 'Cooking Oil', emoji: '🫗',
      result: {
        wasteType: 'Oil & Grease',
        category: 'Biogas Feedstock',
        energyScore: 'Very High',
        estimatedBiogas: '0.85 m³/kg',
        methaneYield: '74%',
        moistureEstimate: '12%',
        digestionCompat: 'Good (pre-treat)',
        batchRecommend: 'Co-Digestion Batch B',
        creditReward: 50,
        color: '#D97706',
      },
    },
    {
      id: 3, name: 'Fruit Peels', emoji: '🍌',
      result: {
        wasteType: 'Compost Residue',
        category: 'Biogas Feedstock',
        energyScore: 'Medium',
        estimatedBiogas: '0.32 m³/kg',
        methaneYield: '48%',
        moistureEstimate: '82%',
        digestionCompat: 'Good',
        batchRecommend: 'Anaerobic Digestion Batch A',
        creditReward: 20,
        color: '#065F46',
      },
    },
    {
      id: 4, name: 'Mixed Plastic', emoji: '🧴',
      result: {
        wasteType: 'Non-Processable',
        category: 'Contaminated Waste',
        energyScore: 'None',
        estimatedBiogas: '0.00 m³/kg',
        methaneYield: 'N/A',
        moistureEstimate: '5%',
        digestionCompat: 'Incompatible',
        batchRecommend: 'Separate for recycling',
        creditReward: 5,
        color: '#DC2626',
      },
    },
    {
      id: 5, name: 'Rice & Noodles', emoji: '🍚',
      result: {
        wasteType: 'High Methane Organic',
        category: 'Biogas Feedstock',
        energyScore: 'High',
        estimatedBiogas: '0.48 m³/kg',
        methaneYield: '58%',
        moistureEstimate: '65%',
        digestionCompat: 'Excellent',
        batchRecommend: 'Anaerobic Digestion Batch A',
        creditReward: 30,
        color: '#0D9488',
      },
    },
  ];

  const handleScan = (sample) => {
    setSelectedSample(sample);
    setScanning(true);
    setScanComplete(false);
    setTimeout(() => {
      setScanning(false);
      setScanComplete(true);
    }, 2000);
  };

  const handleReset = () => {
    setSelectedSample(null);
    setScanning(false);
    setScanComplete(false);
  };

  const getScoreColor = (score) => {
    if (score === 'Very High' || score === 'High') return '#0D9488';
    if (score === 'Medium') return '#D97706';
    return '#DC2626';
  };

  return (
    <div className="min-h-full bg-bima-secondary">
      {/* Header */}
      <div className="bg-gradient-to-br from-bima-dark to-bima-primary px-5 pt-6 pb-8">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <motion.button whileTap={{ scale: 0.9 }} onClick={() => navigate(-1)}
              className="w-10 h-10 bg-white/15 rounded-full flex items-center justify-center mr-3">
              <ArrowLeft size={20} className="text-white" />
            </motion.button>
            <div>
              <h1 className="text-lg font-bold text-white">AI Feedstock Analyzer</h1>
              <p className="text-white/70 text-[11px]">Classify waste for biogas production</p>
            </div>
          </div>
          <div className="w-10 h-10 bg-white/15 rounded-full flex items-center justify-center">
            <ScanLine size={20} className="text-white" />
          </div>
        </div>
      </div>

      <div className="px-5 -mt-4 relative z-10">
        {/* Scanner Area */}
        {!scanComplete && (
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-4">
            {scanning ? (
              <motion.div className="h-48 bg-gradient-to-b from-bima-dark/10 to-bima-primary/20 flex flex-col items-center justify-center relative">
                {/* Scanning animation */}
                <motion.div animate={{ y: [-40, 40, -40] }} transition={{ duration: 1.5, repeat: Infinity }}
                  className="w-3/4 h-0.5 bg-bima-primary absolute" />
                <span className="text-4xl mb-2">{selectedSample?.emoji}</span>
                <motion.p animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 1, repeat: Infinity }}
                  className="text-sm font-semibold text-bima-dark">
                  Analyzing {selectedSample?.name}...
                </motion.p>
                <p className="text-xs text-gray-500 mt-1">Estimating methane yield & biogas potential</p>
              </motion.div>
            ) : (
              <div className="p-5">
                <h3 className="text-sm font-bold text-gray-800 mb-1">Tap a sample to scan</h3>
                <p className="text-xs text-gray-500 mb-4">Select a waste type to see its biogas production potential</p>
                <div className="grid grid-cols-5 gap-2 overflow-hidden">
                  {samples.map((sample) => (
                    <motion.button key={sample.id} whileTap={{ scale: 0.9 }}
                      onClick={() => handleScan(sample)}
                      className="flex flex-col items-center p-2 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors">
                      <span className="text-2xl mb-1">{sample.emoji}</span>
                      <span className="text-[9px] font-medium text-gray-600 text-center leading-tight">{sample.name}</span>
                    </motion.button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Scan Result */}
        <AnimatePresence>
          {scanComplete && selectedSample && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
              {/* Result Header */}
              <div className="bg-white rounded-2xl p-4 shadow-lg mb-3">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl"
                    style={{ backgroundColor: `${selectedSample.result.color}15` }}>
                    {selectedSample.emoji}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-base font-bold text-gray-800">{selectedSample.result.wasteType}</h3>
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-full"
                      style={{ backgroundColor: `${selectedSample.result.color}15`, color: selectedSample.result.color }}>
                      {selectedSample.result.category}
                    </span>
                  </div>
                </div>

                {/* Energy Score */}
                <div className="bg-gray-50 rounded-xl p-3">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-semibold text-gray-600">Energy Score</span>
                    <span className="text-sm font-bold" style={{ color: getScoreColor(selectedSample.result.energyScore) }}>
                      {selectedSample.result.energyScore}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <motion.div initial={{ width: 0 }}
                      animate={{ width: selectedSample.result.energyScore === 'Very High' ? '95%' : selectedSample.result.energyScore === 'High' ? '78%' : selectedSample.result.energyScore === 'Medium' ? '50%' : '5%' }}
                      transition={{ duration: 0.8 }}
                      className="h-2 rounded-full"
                      style={{ backgroundColor: getScoreColor(selectedSample.result.energyScore) }} />
                  </div>
                </div>
              </div>

              {/* Metrics Grid */}
              <div className="grid grid-cols-2 gap-3 mb-3">
                {[
                  { label: 'Estimated Biogas', value: selectedSample.result.estimatedBiogas, icon: Flame, color: '#D97706' },
                  { label: 'Methane Yield', value: selectedSample.result.methaneYield, icon: Activity, color: '#0D9488' },
                  { label: 'Moisture', value: selectedSample.result.moistureEstimate, icon: Droplets, color: '#2563EB' },
                  { label: 'Digestion Compat.', value: selectedSample.result.digestionCompat, icon: ThermometerSun, color: '#065F46' },
                ].map((metric, i) => (
                  <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="bg-white rounded-xl p-3 shadow-sm">
                    <div className="flex items-center gap-1.5 mb-1.5">
                      <metric.icon size={14} style={{ color: metric.color }} />
                      <span className="text-[10px] font-medium text-gray-500">{metric.label}</span>
                    </div>
                    <div className="text-sm font-bold text-gray-800">{metric.value}</div>
                  </motion.div>
                ))}
              </div>

              {/* Batch Recommendation */}
              <div className="bg-gradient-to-r from-bima-primary to-bima-dark rounded-2xl p-4 mb-3">
                <h4 className="text-xs font-semibold text-white/80 mb-1">Recommended Processing</h4>
                <p className="text-sm font-bold text-white">{selectedSample.result.batchRecommend}</p>
              </div>

              {/* Credits */}
              <div className="bg-white rounded-xl p-4 shadow-sm mb-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Zap size={18} className="text-bima-energy" />
                  <span className="text-sm font-semibold text-gray-800">Credits for this waste</span>
                </div>
                <span className="text-sm font-bold text-bima-primary">+{selectedSample.result.creditReward} EC/kg</span>
              </div>

              {/* Reset */}
              <motion.button whileTap={{ scale: 0.95 }} onClick={handleReset}
                className="w-full py-3 bg-white rounded-xl text-sm font-semibold text-bima-dark shadow-sm flex items-center justify-center gap-2 mb-8">
                <RefreshCw size={16} /> Scan Another Sample
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Info Section - always visible at bottom */}
        {!scanComplete && !scanning && (
          <div className="mb-8">
            <h3 className="text-sm font-bold text-gray-800 mb-3">How It Works</h3>
            {[
              { step: '1', title: 'Scan Your Waste', desc: 'AI identifies the waste type and composition', color: '#0D9488' },
              { step: '2', title: 'Get Analysis', desc: 'Methane yield, moisture, and biogas potential', color: '#D97706' },
              { step: '3', title: 'Earn Credits', desc: 'Higher quality feedstock earns more Energy Credits', color: '#065F46' },
            ].map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.15 }}
                className="bg-white rounded-xl p-3.5 mb-2 shadow-sm flex items-center">
                <div className="w-8 h-8 rounded-full flex items-center justify-center mr-3 text-xs font-bold text-white"
                  style={{ backgroundColor: item.color }}>
                  {item.step}
                </div>
                <div>
                  <div className="text-sm font-semibold text-gray-800">{item.title}</div>
                  <div className="text-xs text-gray-500">{item.desc}</div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ScanPage;