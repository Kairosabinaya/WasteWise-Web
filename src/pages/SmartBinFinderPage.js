import React, { useState } from 'react';
import { ArrowLeft, Map, Settings, Trash2, Recycle, MapPin, Wrench, Clock, Package, AlertTriangle, CheckCircle, Truck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { clsx } from 'clsx';
import { AppLogo, CameraFloatingButton } from '../components/ui';

const SmartBinFinderPage = () => {
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [notification, setNotification] = useState(null);

  // Building's smart bin fleet data
  const smartBins = [
    {
      id: 'SB-001',
      name: 'Foodcourt Area A',
      floor: 'Level 3',
      location: 'Near Main Escalator',
      types: ['Organic', 'Recyclable'],
      status: 'active',
      capacity: 75,
      lastEmptied: '2024-12-04 18:00',
      nextPickup: 'Today 08:00',
      icon: Recycle,
      color: '#164c51',
    },
    {
      id: 'SB-002',
      name: 'Lobby Main Entrance',
      floor: 'Level 1',
      location: 'Beside Information Desk',
      types: ['Recyclable', 'Residual'],
      status: 'active',
      capacity: 45,
      lastEmptied: '2024-12-04 20:00',
      nextPickup: 'Tomorrow 08:00',
      icon: Trash2,
      color: '#0C2521',
    },
    {
      id: 'SB-003',
      name: 'Office Pantry B',
      floor: 'Level 5',
      location: 'Pantry Area',
      types: ['Organic'],
      status: 'full',
      capacity: 95,
      lastEmptied: '2024-12-04 08:00',
      nextPickup: 'Urgent - Requested',
      icon: Package,
      color: '#D48931',
    },
    {
      id: 'SB-004',
      name: 'Basement Parking',
      floor: 'Basement 1',
      location: 'Near Exit Gate A',
      types: ['Residual'],
      status: 'maintenance',
      capacity: 30,
      lastEmptied: '2024-12-03 18:00',
      nextPickup: 'Pending Maintenance',
      icon: Wrench,
      color: '#6d1e04',
    },
    {
      id: 'SB-005',
      name: 'Cinema Wing',
      floor: 'Level 4',
      location: 'Near Snack Counter',
      types: ['Organic', 'Recyclable', 'Residual'],
      status: 'active',
      capacity: 60,
      lastEmptied: '2024-12-04 22:00',
      nextPickup: 'Today 14:00',
      icon: Recycle,
      color: '#164c51',
    },
  ];

  // Filter options for building bins
  const filters = [
    { name: 'All', color: '#164c51' },
    { name: 'Active', color: '#164c51' },
    { name: 'Full', color: '#D48931' },
    { name: 'Maintenance', color: '#6d1e04' },
  ];

  // Filter smart bins based on selected filter
  const getFilteredBins = () => {
    if (selectedFilter === 'All') {
      return smartBins;
    }
    return smartBins.filter(bin =>
      bin.status.toLowerCase() === selectedFilter.toLowerCase()
    );
  };

  const filteredBins = getFilteredBins();

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return '#164c51';
      case 'full': return '#D48931';
      case 'maintenance': return '#6d1e04';
      default: return '#6B7280';
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'active': return 'Active';
      case 'full': return 'Full';
      case 'maintenance': return 'Maintenance';
      default: return 'Unknown';
    }
  };

  const handleRequestPickup = (bin) => {
    setNotification({
      type: 'success',
      title: 'Pickup Requested',
      message: `Pickup request sent for ${bin.name}. ETA: 30 minutes`
    });
    setTimeout(() => setNotification(null), 4000);
  };

  const handleScheduleMaintenance = (bin) => {
    setNotification({
      type: 'success',
      title: 'Maintenance Scheduled',
      message: `Maintenance request submitted for ${bin.name}`
    });
    setTimeout(() => setNotification(null), 4000);
  };

  // Notification Component
  const NotificationBadge = ({ notification, onClose }) => {
    if (!notification) return null;

    return (
      <motion.div
        initial={{ opacity: 0, y: -50, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -50, scale: 0.9 }}
        className="absolute top-4 left-4 right-4 z-50 bg-[#164c51] text-white p-3 rounded-xl shadow-xl"
        style={{ maxWidth: '320px', margin: '0 auto' }}
      >
        <div className="flex items-start">
          <div className="w-6 h-6 rounded-full flex items-center justify-center mr-2 bg-white/20">
            <CheckCircle size={12} />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-xs mb-1">{notification.title}</h3>
            <p className="text-xs text-white/90">{notification.message}</p>
          </div>
        </div>
      </motion.div>
    );
  };

  // Filter Button Component
  const FilterButton = ({ filter, isActive, onClick }) => (
    <motion.button
      whileHover={{ y: -2, scale: 1.02 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={clsx(
        "px-4 py-2 rounded-full font-medium text-sm whitespace-nowrap transition-all border",
        {
          'text-white shadow-lg': isActive,
          'bg-white text-gray-700 border-gray-200 hover:shadow-md': !isActive,
        }
      )}
      style={{
        backgroundColor: isActive ? filter.color : undefined,
        borderColor: isActive ? 'transparent' : `${filter.color}4D`,
        boxShadow: isActive ? `0 2px 6px ${filter.color}4D` : '0 2px 6px rgba(0,0,0,0.04)'
      }}
    >
      {filter.name}
    </motion.button>
  );

  // Smart Bin Card Component
  const SmartBinCard = ({ bin, index }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -2, scale: 1.01 }}
      className="bg-white rounded-2xl p-4 shadow-sm mb-3"
      style={{ boxShadow: '0 2px 6px rgba(0,0,0,0.04)' }}
    >
      <div className="flex items-start">
        {/* Icon */}
        <div
          className="w-12 h-12 rounded-full flex items-center justify-center mr-3 flex-shrink-0"
          style={{ backgroundColor: `${bin.color}1A` }}
        >
          <bin.icon size={24} style={{ color: bin.color }} />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h3 className="text-sm font-semibold text-[#1F2937] leading-tight">
                {bin.name}
              </h3>
              <p className="text-xs text-[#6B7280] mt-0.5">{bin.floor} • {bin.location}</p>
            </div>
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

          {/* Types */}
          <div className="flex flex-wrap gap-1 mb-3">
            {bin.types.map((type, typeIndex) => (
              <span
                key={typeIndex}
                className="px-1.5 py-0.5 text-[10px] font-medium rounded-md"
                style={{
                  backgroundColor: `${bin.color}1A`,
                  color: bin.color
                }}
              >
                {type}
              </span>
            ))}
          </div>

          {/* Capacity Bar */}
          <div className="mb-3">
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs text-[#6B7280]">Capacity</span>
              <span className="text-xs font-bold" style={{ color: bin.capacity > 80 ? '#D48931' : '#164c51' }}>
                {bin.capacity}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-1.5">
              <div
                className={clsx(
                  "h-1.5 rounded-full transition-all",
                  {
                    'bg-[#164c51]': bin.capacity < 70,
                    'bg-[#D48931]': bin.capacity >= 70 && bin.capacity < 90,
                    'bg-[#EF4444]': bin.capacity >= 90,
                  }
                )}
                style={{ width: `${bin.capacity}%` }}
              />
            </div>
          </div>

          {/* Info & Actions */}
          <div className="flex items-center justify-between">
            <div className="text-xs text-[#6B7280]">
              <Clock size={10} className="inline mr-1" />
              Next: {bin.nextPickup}
            </div>
            <div className="flex gap-2">
              {bin.status === 'maintenance' ? (
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleScheduleMaintenance(bin)}
                  className="px-2 py-1 bg-[#6d1e04]/10 text-[#6d1e04] rounded-lg text-xs font-medium flex items-center gap-1"
                >
                  <Wrench size={12} />
                  Schedule
                </motion.button>
              ) : (
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleRequestPickup(bin)}
                  className="px-2 py-1 bg-[#164c51]/10 text-[#164c51] rounded-lg text-xs font-medium flex items-center gap-1"
                >
                  <Truck size={12} />
                  Pickup
                </motion.button>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="h-full bg-[#F8FAFC] flex flex-col relative">
      {/* Notification */}
      <AnimatePresence>
        {notification && <NotificationBadge notification={notification} onClose={() => setNotification(null)} />}
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

        <div className="flex items-center mb-4">
          <div className="flex-1">
            <motion.h1
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-2xl font-bold text-[#0C2521]"
            >
              Smart Bin Fleet
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="text-[#6B7280] text-sm mt-1"
            >
              Manage your building's smart bins
            </motion.p>
          </div>

          <motion.button
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.05 }}
            className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm"
            style={{ boxShadow: '0 2px 6px rgba(0,0,0,0.04)' }}
          >
            <Settings size={20} className="text-[#1F2937]" />
          </motion.button>
        </div>
      </motion.div>

      {/* Fleet Overview Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mx-4 mb-4"
      >
        <motion.div
          className="h-[140px] rounded-2xl relative overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, #164c51, #0C2521)',
            boxShadow: '0 6px 12px #164c514D'
          }}
        >
          <div className="absolute inset-0 p-5 flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center mr-3">
                  <MapPin size={20} className="text-white" />
                </div>
                <div>
                  <h3 className="text-white text-base font-semibold">Central Mall</h3>
                  <p className="text-white/70 text-sm">{smartBins.length} Smart Bins Deployed</p>
                </div>
              </div>
            </div>

            <div className="flex-1" />

            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-white text-lg font-bold">
                  {smartBins.filter(b => b.status === 'active').length}
                </div>
                <div className="text-white/70 text-xs">Active</div>
              </div>
              <div className="text-center">
                <div className="text-[#D48931] text-lg font-bold">
                  {smartBins.filter(b => b.status === 'full').length}
                </div>
                <div className="text-white/70 text-xs">Full</div>
              </div>
              <div className="text-center">
                <div className="text-white text-lg font-bold">
                  {smartBins.filter(b => b.status === 'maintenance').length}
                </div>
                <div className="text-white/70 text-xs">Maintenance</div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Filter Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="px-4 mb-4"
      >
        <h2 className="text-base font-medium text-[#1F2937] mb-3">Filter by Status</h2>
        <div className="flex gap-2 overflow-x-auto scrollbar-hide">
          {filters.map((filter) => (
            <FilterButton
              key={filter.name}
              filter={filter}
              isActive={selectedFilter === filter.name}
              onClick={() => setSelectedFilter(filter.name)}
            />
          ))}
        </div>
      </motion.div>

      {/* Smart Bins List */}
      <div className="flex-1 px-4 pb-4 overflow-y-auto scrollbar-hide">
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedFilter}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {filteredBins.length > 0 ? (
              filteredBins.map((bin, index) => (
                <SmartBinCard key={bin.id} bin={bin} index={index} />
              ))
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col items-center justify-center py-12"
              >
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <Trash2 size={32} className="text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-[#1F2937] mb-2">No Bins Found</h3>
                <p className="text-[#6B7280] text-center text-sm leading-relaxed max-w-sm">
                  No smart bins with{' '}
                  <span className="font-medium text-[#1F2937]">{selectedFilter}</span> status.
                </p>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Camera Floating Button */}
      <CameraFloatingButton />
    </div>
  );
};

export default SmartBinFinderPage;
