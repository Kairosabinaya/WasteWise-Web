import React, { useState } from 'react';
import { ArrowLeft, Map, SlidersHorizontal, Trash2, Recycle, MapPin, Navigation, Clock, Package, Home } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { clsx } from 'clsx';
import { AppLogo, CameraFloatingButton } from '../components/ui';

const SmartBinFinderPage = () => {
  const [selectedFilter, setSelectedFilter] = useState('All');

  // Smart bins data matching Flutter app exactly
  const smartBins = [
    {
      name: 'Central Park Smart Bin',
      distance: '0.2 km',
      types: ['Organic', 'Recyclable'],
      status: 'Available',
      address: '123 Green Street, Downtown',
      capacity: 85,
      icon: Trash2,
      color: '#164c51',
    },
    {
      name: 'University Campus Bin',
      distance: '0.5 km',
      types: ['Recyclable', 'Hazardous'],
      status: 'Full',
      address: '456 Education Ave, Campus',
      capacity: 100,
      icon: Recycle,
      color: '#D48931',
    },
    {
      name: 'Shopping Mall Hub',
      distance: '0.8 km',
      types: ['All Types'],
      status: 'Available',
      address: '789 Commerce Blvd, Mall District',
      capacity: 42,
      icon: Package,
      color: '#6d1e04',
    },
    {
      name: 'Community Center Bin',
      distance: '1.2 km',
      types: ['Organic', 'Residual'],
      status: 'Available',
      address: '321 Community Dr, Residential',
      capacity: 67,
      icon: Home,
      color: '#0C2521',
    },
  ];

  // Filter options matching Flutter app
  const filters = [
    { name: 'All', color: '#164c51' },
    { name: 'Organic', color: '#164c51' },
    { name: 'Recyclable', color: '#164c51' },
    { name: 'Hazardous', color: '#D48931' },
    { name: 'Residual', color: '#6d1e04' },
  ];

  // Filter smart bins based on selected filter
  const getFilteredBins = () => {
    if (selectedFilter === 'All') {
      return smartBins;
    }
    
    return smartBins.filter(bin => {
      // Check if bin supports the selected waste type
      return bin.types.some(type => 
        type.toLowerCase() === selectedFilter.toLowerCase() || 
        type === 'All Types' // Bins that accept all types should always be shown
      );
    });
  };

  const filteredBins = getFilteredBins();

  // Map Pattern Component
  const MapPattern = () => (
    <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 100 100">
      <defs>
        <pattern id="mapPattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
          <circle cx="10" cy="10" r="1" fill="white" opacity="0.5"/>
          <path d="M0,10 L20,10 M10,0 L10,20" stroke="white" strokeWidth="0.5" opacity="0.3"/>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#mapPattern)" />
    </svg>
  );

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
      whileTap={{ scale: 0.98 }}
      className="bg-white rounded-2xl p-3 shadow-sm mb-3 cursor-pointer hover:shadow-md transition-all"
      style={{ boxShadow: '0 2px 6px rgba(0,0,0,0.04)' }}
      onClick={() => console.log(`Selected bin: ${bin.name}`)}
    >
      <div className="flex items-start">
        {/* Icon */}
        <div 
          className="w-10 h-10 rounded-full flex items-center justify-center mr-3 flex-shrink-0"
          style={{ backgroundColor: `${bin.color}1A` }}
        >
          <bin.icon size={20} style={{ color: bin.color }} />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-1.5">
            <div>
              <h3 className="text-sm font-semibold text-[#1F2937] leading-tight">
                {bin.name}
              </h3>
              <p className="text-xs text-[#6B7280] mt-0.5">{bin.address}</p>
            </div>
            <div className="text-right">
              <div className="flex items-center text-[#6B7280] text-xs">
                <Navigation size={12} className="mr-1" />
                {bin.distance}
              </div>
            </div>
          </div>

          {/* Types */}
          <div className="flex flex-wrap gap-1 mb-2">
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

          {/* Status and Capacity */}
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className={clsx(
                "w-1.5 h-1.5 rounded-full mr-1.5",
                {
                  'bg-green-500': bin.status === 'Available',
                  'bg-red-500': bin.status === 'Full',
                }
              )} />
              <span className={clsx(
                "text-xs font-medium",
                {
                  'text-green-600': bin.status === 'Available',
                  'text-red-600': bin.status === 'Full',
                }
              )}>
                {bin.status}
              </span>
            </div>
            <div className="text-xs text-[#6B7280]">
              {bin.capacity}% capacity
            </div>
          </div>

          {/* Capacity Bar */}
          <div className="mt-2">
            <div className="w-full bg-gray-200 rounded-full h-1">
              <div 
                className={clsx(
                  "h-1 rounded-full transition-all",
                  {
                    'bg-green-500': bin.capacity < 80,
                    'bg-yellow-500': bin.capacity >= 80 && bin.capacity < 95,
                    'bg-red-500': bin.capacity >= 95,
                  }
                )}
                style={{ width: `${bin.capacity}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="h-full bg-[#F8FAFC] flex flex-col relative">
      {/* Header - matching MarketplacePage style */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-4 pt-12"
      >
        {/* App Logo */}
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
              Smart Bin Finder
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="text-[#6B7280] text-sm mt-1"
            >
              Find nearby smart bins
            </motion.p>
          </div>
          
          <motion.button
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.05 }}
            className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm"
            style={{ boxShadow: '0 2px 6px rgba(0,0,0,0.04)' }}
          >
            <Map size={20} className="text-[#1F2937]" />
          </motion.button>
        </div>
      </motion.div>

      {/* Map Placeholder - exact Flutter recreation */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mx-4 mb-4"
      >
        <motion.div 
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="h-[200px] rounded-2xl relative overflow-hidden cursor-pointer transition-all"
          style={{
            background: 'linear-gradient(135deg, #164c51, #0C2521)',
            boxShadow: '0 6px 12px #164c514D'
          }}
          onClick={() => console.log('Map clicked')}
        >
          {/* Map Pattern */}
          <div className="absolute inset-0 bg-white/10 rounded-2xl">
            <MapPattern />
          </div>

          {/* Content */}
          <div className="absolute inset-0 p-5 flex flex-col">
            <div className="flex items-start">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mr-3">
                <MapPin size={24} className="text-white" />
              </div>
              <div>
                <h3 className="text-white text-base font-semibold">Your Location</h3>
                <p className="text-white/70 text-sm">Downtown District</p>
              </div>
            </div>

            <div className="flex-1" />

            <div className="flex items-center justify-between">
              <span className="text-white text-sm font-semibold">
                {filteredBins.length} Smart Bin{filteredBins.length !== 1 ? 's' : ''} Nearby
              </span>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-3 py-1.5 bg-white/20 rounded-xl hover:bg-white/30 transition-all"
                onClick={() => console.log('Opening map view...')}
              >
                <span className="text-white text-xs font-medium">
                  Tap to view map
                </span>
              </motion.button>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Filter Section - exact Flutter recreation */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="px-4 mb-4"
      >
        <h2 className="text-base font-medium text-[#1F2937] mb-3">Filter by Waste Type</h2>
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

      {/* Smart Bins List - exact Flutter recreation */}
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
                <SmartBinCard key={`${bin.name}-${selectedFilter}`} bin={bin} index={index} />
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
                <h3 className="text-lg font-semibold text-[#1F2937] mb-2">No Smart Bins Found</h3>
                <p className="text-[#6B7280] text-center text-sm leading-relaxed max-w-sm">
                  No smart bins in your area accept{' '}
                  <span className="font-medium text-[#1F2937]">{selectedFilter}</span> waste.
                  Try selecting a different waste type.
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
