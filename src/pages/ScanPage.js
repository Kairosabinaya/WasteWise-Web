import React, { useState, useEffect } from 'react';
import { ArrowLeft, X, Activity, Wifi, WifiOff, AlertTriangle, CheckCircle, Truck, RefreshCw, Trash2, Recycle, Leaf } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { AppLogo } from '../components/ui';

const ScanPage = () => {
  const navigate = useNavigate();
  const [selectedBin, setSelectedBin] = useState(null);
  const [notification, setNotification] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Mock smart bin sensor data
  const [smartBins, setSmartBins] = useState([
    {
      id: 'SB-001',
      name: 'Foodcourt Area A',
      floor: 'Level 3',
      capacity: 85,
      status: 'warning',
      lastUpdate: '2 min ago',
      sensorOnline: true,
      wasteComposition: { organic: 65, recyclable: 30, residual: 5 },
      temperature: 28,
      fillRate: '+12% today'
    },
    {
      id: 'SB-002',
      name: 'Lobby Main Entrance',
      floor: 'Level 1',
      capacity: 42,
      status: 'normal',
      lastUpdate: '1 min ago',
      sensorOnline: true,
      wasteComposition: { organic: 20, recyclable: 60, residual: 20 },
      temperature: 25,
      fillRate: '+5% today'
    },
    {
      id: 'SB-003',
      name: 'Office Pantry B',
      floor: 'Level 5',
      capacity: 95,
      status: 'critical',
      lastUpdate: 'Just now',
      sensorOnline: true,
      wasteComposition: { organic: 80, recyclable: 15, residual: 5 },
      temperature: 30,
      fillRate: '+25% today'
    },
    {
      id: 'SB-004',
      name: 'Basement Parking',
      floor: 'Basement 1',
      capacity: 28,
      status: 'normal',
      lastUpdate: '5 min ago',
      sensorOnline: false,
      wasteComposition: { organic: 10, recyclable: 40, residual: 50 },
      temperature: 24,
      fillRate: '+3% today'
    },
  ]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'critical': return '#EF4444';
      case 'warning': return '#D48931';
      case 'normal': return '#164c51';
      default: return '#6B7280';
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'critical': return 'NEEDS PICKUP';
      case 'warning': return 'ATTENTION';
      case 'normal': return 'NORMAL';
      default: return 'UNKNOWN';
    }
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      setNotification({
        type: 'success',
        title: 'Data Refreshed',
        message: 'All sensor data has been updated'
      });
      setTimeout(() => setNotification(null), 3000);
    }, 1500);
  };

  const handleRequestPickup = (bin) => {
    setNotification({
      type: 'success',
      title: 'Pickup Requested',
      message: `Pickup request sent for ${bin.name}. Expected arrival: 30 minutes`
    });
    setTimeout(() => setNotification(null), 4000);
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
        className={`absolute top-4 left-4 right-4 z-50 ${isSuccess ? 'bg-[#164c51]' : 'bg-[#D48931]'
          } text-white p-3 rounded-xl shadow-xl`}
        style={{
          boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
          maxWidth: '320px',
          margin: '0 auto'
        }}
      >
        <div className="flex items-start">
          <div className="w-6 h-6 rounded-full flex items-center justify-center mr-2 bg-white/20">
            {isSuccess ? <CheckCircle size={12} /> : <AlertTriangle size={12} />}
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

  // Smart Bin Card Component
  const SmartBinCard = ({ bin }) => (
    <motion.div
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => setSelectedBin(bin)}
      className="bg-white rounded-xl p-4 shadow-sm mb-3 cursor-pointer"
      style={{ boxShadow: '0 2px 6px rgba(0,0,0,0.04)' }}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center">
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center mr-3"
            style={{ backgroundColor: `${getStatusColor(bin.status)}1A` }}
          >
            <Trash2 size={20} style={{ color: getStatusColor(bin.status) }} />
          </div>
          <div>
            <h3 className="font-semibold text-sm text-[#1F2937]">{bin.name}</h3>
            <p className="text-xs text-[#6B7280]">{bin.floor} • {bin.id}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {bin.sensorOnline ? (
            <Wifi size={14} className="text-[#164c51]" />
          ) : (
            <WifiOff size={14} className="text-[#EF4444]" />
          )}
          <span
            className="px-2 py-0.5 rounded-full text-[10px] font-bold"
            style={{
              backgroundColor: `${getStatusColor(bin.status)}1A`,
              color: getStatusColor(bin.status)
            }}
          >
            {getStatusLabel(bin.status)}
          </span>
        </div>
      </div>

      {/* Capacity Bar */}
      <div className="mb-3">
        <div className="flex justify-between items-center mb-1">
          <span className="text-xs text-[#6B7280]">Capacity</span>
          <span className="text-xs font-bold" style={{ color: getStatusColor(bin.status) }}>
            {bin.capacity}%
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <motion.div
            className="h-2 rounded-full"
            style={{ backgroundColor: getStatusColor(bin.status) }}
            initial={{ width: 0 }}
            animate={{ width: `${bin.capacity}%` }}
            transition={{ duration: 0.8 }}
          />
        </div>
      </div>

      {/* Waste Composition Mini */}
      <div className="flex items-center gap-2 text-xs text-[#6B7280]">
        <div className="flex items-center">
          <Leaf size={12} className="mr-1 text-[#164c51]" />
          {bin.wasteComposition.organic}%
        </div>
        <div className="flex items-center">
          <Recycle size={12} className="mr-1 text-[#164c51]" />
          {bin.wasteComposition.recyclable}%
        </div>
        <div className="flex-1 text-right">
          Updated {bin.lastUpdate}
        </div>
      </div>
    </motion.div>
  );

  // Bin Detail Modal
  const BinDetailModal = () => {
    if (!selectedBin) return null;

    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
        onClick={() => setSelectedBin(null)}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-white rounded-xl p-5 w-full mx-6 max-h-[80vh] overflow-y-auto"
          style={{ maxWidth: '340px' }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center mr-3"
                style={{ backgroundColor: `${getStatusColor(selectedBin.status)}1A` }}
              >
                <Trash2 size={24} style={{ color: getStatusColor(selectedBin.status) }} />
              </div>
              <div>
                <h2 className="font-bold text-lg text-[#1F2937]">{selectedBin.name}</h2>
                <p className="text-xs text-[#6B7280]">{selectedBin.floor} • {selectedBin.id}</p>
              </div>
            </div>
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setSelectedBin(null)}
              className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center"
            >
              <X size={16} className="text-gray-600" />
            </motion.button>
          </div>

          {/* Status & Capacity */}
          <div className="bg-gray-50 rounded-xl p-4 mb-4">
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm font-medium text-[#1F2937]">Current Capacity</span>
              <span
                className="px-2 py-1 rounded-full text-xs font-bold"
                style={{
                  backgroundColor: `${getStatusColor(selectedBin.status)}1A`,
                  color: getStatusColor(selectedBin.status)
                }}
              >
                {getStatusLabel(selectedBin.status)}
              </span>
            </div>
            <div className="text-3xl font-bold mb-2" style={{ color: getStatusColor(selectedBin.status) }}>
              {selectedBin.capacity}%
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <motion.div
                className="h-3 rounded-full"
                style={{ backgroundColor: getStatusColor(selectedBin.status) }}
                initial={{ width: 0 }}
                animate={{ width: `${selectedBin.capacity}%` }}
                transition={{ duration: 0.8 }}
              />
            </div>
            <p className="text-xs text-[#6B7280] mt-2">{selectedBin.fillRate}</p>
          </div>

          {/* Waste Composition */}
          <div className="mb-4">
            <h3 className="font-semibold text-sm text-[#1F2937] mb-3">Waste Composition (AI Detected)</h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Leaf size={14} className="mr-2 text-[#164c51]" />
                  <span className="text-sm text-[#6B7280]">Organic</span>
                </div>
                <span className="text-sm font-bold text-[#164c51]">{selectedBin.wasteComposition.organic}%</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Recycle size={14} className="mr-2 text-[#164c51]" />
                  <span className="text-sm text-[#6B7280]">Recyclable</span>
                </div>
                <span className="text-sm font-bold text-[#164c51]">{selectedBin.wasteComposition.recyclable}%</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Trash2 size={14} className="mr-2 text-[#6d1e04]" />
                  <span className="text-sm text-[#6B7280]">Residual</span>
                </div>
                <span className="text-sm font-bold text-[#6d1e04]">{selectedBin.wasteComposition.residual}%</span>
              </div>
            </div>
          </div>

          {/* Sensor Info */}
          <div className="bg-gray-50 rounded-xl p-4 mb-4">
            <h3 className="font-semibold text-sm text-[#1F2937] mb-2">Sensor Status</h3>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                {selectedBin.sensorOnline ? (
                  <>
                    <Wifi size={14} className="mr-2 text-[#164c51]" />
                    <span className="text-sm text-[#164c51]">Online</span>
                  </>
                ) : (
                  <>
                    <WifiOff size={14} className="mr-2 text-[#EF4444]" />
                    <span className="text-sm text-[#EF4444]">Offline</span>
                  </>
                )}
              </div>
              <span className="text-xs text-[#6B7280]">Temp: {selectedBin.temperature}°C</span>
            </div>
            <p className="text-xs text-[#6B7280] mt-2">Last update: {selectedBin.lastUpdate}</p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <motion.button
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelectedBin(null)}
              className="flex-1 py-3 bg-gray-100 text-[#6B7280] rounded-xl font-semibold text-sm"
            >
              Close
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                handleRequestPickup(selectedBin);
                setSelectedBin(null);
              }}
              className="flex-1 py-3 bg-[#164c51] text-white rounded-xl font-semibold text-sm flex items-center justify-center gap-2"
            >
              <Truck size={16} />
              Request Pickup
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    );
  };

  return (
    <div className="h-full bg-[#F8FAFC] flex flex-col relative">
      {/* In-App Notification */}
      <AnimatePresence>
        <NotificationBadge
          notification={notification}
          onClose={() => setNotification(null)}
        />
      </AnimatePresence>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-4 pt-12"
      >
        <div className="mb-4">
          <AppLogo variant="compact" />
        </div>

        <div className="flex items-center justify-between mb-4">
          <div>
            <motion.h1
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-2xl font-bold text-[#0C2521]"
            >
              Smart Bin Monitor
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="text-[#6B7280] text-sm mt-1"
            >
              Real-time sensor dashboard
            </motion.p>
          </div>

          <motion.button
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.05 }}
            onClick={handleRefresh}
            className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm"
            style={{ boxShadow: '0 2px 6px rgba(0,0,0,0.04)' }}
          >
            <RefreshCw
              size={20}
              className={`text-[#164c51] ${isRefreshing ? 'animate-spin' : ''}`}
            />
          </motion.button>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-3 gap-3 mb-4">
          <div className="bg-white rounded-xl p-3 text-center shadow-sm">
            <div className="text-lg font-bold text-[#164c51]">{smartBins.length}</div>
            <div className="text-xs text-[#6B7280]">Total Bins</div>
          </div>
          <div className="bg-white rounded-xl p-3 text-center shadow-sm">
            <div className="text-lg font-bold text-[#D48931]">
              {smartBins.filter(b => b.status === 'warning' || b.status === 'critical').length}
            </div>
            <div className="text-xs text-[#6B7280]">Need Attention</div>
          </div>
          <div className="bg-white rounded-xl p-3 text-center shadow-sm">
            <div className="text-lg font-bold text-[#164c51]">
              {smartBins.filter(b => b.sensorOnline).length}/{smartBins.length}
            </div>
            <div className="text-xs text-[#6B7280]">Online</div>
          </div>
        </div>
      </motion.div>

      {/* Bin List */}
      <div className="flex-1 px-4 pb-4 overflow-y-auto scrollbar-hide">
        <h2 className="text-base font-semibold text-[#1F2937] mb-3">All Smart Bins</h2>
        {smartBins.map((bin) => (
          <SmartBinCard key={bin.id} bin={bin} />
        ))}
      </div>

      {/* Bin Detail Modal */}
      <AnimatePresence>
        {selectedBin && <BinDetailModal />}
      </AnimatePresence>
    </div>
  );
};

export default ScanPage;