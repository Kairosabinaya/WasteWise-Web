import React, { useState } from 'react';
import { ArrowLeft, MapPin, Factory, Truck, Flame, Filter, Navigation, Clock, Package, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const SmartBinFinderPage = () => {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedPin, setSelectedPin] = useState(null);

  const filters = [
    { id: 'all', label: 'All', icon: MapPin },
    { id: 'supplier', label: 'Suppliers', icon: Factory },
    { id: 'hub', label: 'Hubs', icon: Package },
    { id: 'route', label: 'Routes', icon: Truck },
    { id: 'refill', label: 'Gas Stations', icon: Flame },
  ];

  const locations = [
    { id: 1, name: 'Restoran Padang Jaya', type: 'supplier', status: 'Active', waste: '45 kg/day', dist: '0.3 km', x: 25, y: 30, color: '#0D9488' },
    { id: 2, name: 'Bakso Malang Cak To', type: 'supplier', status: 'Active', waste: '30 kg/day', dist: '0.8 km', x: 60, y: 25, color: '#0D9488' },
    { id: 3, name: 'BIMA Collection Hub A', type: 'hub', status: 'Operational', waste: '500 kg cap.', dist: '1.2 km', x: 45, y: 50, color: '#7C3AED' },
    { id: 4, name: 'Bio-LPG Station Sudirman', type: 'refill', status: 'Open', waste: '12 cylinders', dist: '0.5 km', x: 70, y: 65, color: '#D97706' },
    { id: 5, name: 'Hotel Grand Nusantara', type: 'supplier', status: 'Scheduled', waste: '120 kg/day', dist: '1.5 km', x: 20, y: 70, color: '#0D9488' },
    { id: 6, name: 'Bio-LPG Station Merdeka', type: 'refill', status: 'Open', waste: '8 cylinders', dist: '2.1 km', x: 85, y: 40, color: '#D97706' },
    { id: 7, name: 'BIMA Collection Hub B', type: 'hub', status: 'Operational', waste: '750 kg cap.', dist: '3.0 km', x: 35, y: 85, color: '#7C3AED' },
    { id: 8, name: 'Pickup Route Alpha', type: 'route', status: 'In Progress', waste: '6 stops', dist: '12 km', x: 50, y: 35, color: '#2563EB' },
  ];

  const filtered = activeFilter === 'all' ? locations : locations.filter(l => l.type === activeFilter);

  const getTypeIcon = (type) => {
    if (type === 'supplier') return Factory;
    if (type === 'hub') return Package;
    if (type === 'route') return Truck;
    return Flame;
  };

  return (
    <div className="min-h-full bg-[#F0FDF9]">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#065F46] to-[#0D9488] px-5 pt-6 pb-4">
        <div className="flex items-center mb-4">
          <motion.button whileTap={{ scale: 0.9 }} onClick={() => navigate(-1)}
            className="w-10 h-10 bg-white/15 rounded-full flex items-center justify-center mr-3">
            <ArrowLeft size={20} className="text-white" />
          </motion.button>
          <div>
            <h1 className="text-lg font-bold text-white">Collection Network</h1>
            <p className="text-white/70 text-[11px]">Waste suppliers, hubs & gas stations</p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex gap-1.5 overflow-x-auto pb-2 scrollbar-hide">
          {filters.map((f) => (
            <motion.button key={f.id} whileTap={{ scale: 0.95 }}
              onClick={() => setActiveFilter(f.id)}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-[11px] font-semibold whitespace-nowrap transition-all
              ${activeFilter === f.id ? 'bg-white text-[#065F46]' : 'bg-white/15 text-white/80'}`}>
              <f.icon size={12} />
              {f.label}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Simulated Map */}
      <div className="px-5 py-4">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-4 relative"
          style={{ height: '280px', background: 'linear-gradient(135deg, #E0F2FE 0%, #CCFBF1 50%, #FEF3C7 100%)' }}>
          {/* Map grid lines */}
          <svg className="absolute inset-0 w-full h-full opacity-10">
            {[...Array(10)].map((_, i) => (
              <React.Fragment key={i}>
                <line x1={`${(i + 1) * 10}%`} y1="0" x2={`${(i + 1) * 10}%`} y2="100%" stroke="#065F46" strokeWidth="1" />
                <line x1="0" y1={`${(i + 1) * 10}%`} x2="100%" y2={`${(i + 1) * 10}%`} stroke="#065F46" strokeWidth="1" />
              </React.Fragment>
            ))}
          </svg>

          {/* Simulated route line */}
          <svg className="absolute inset-0 w-full h-full">
            <motion.path d="M 90 84 Q 162 140 135 238 Q 175 175 252 98 Q 210 70 216 175"
              fill="none" stroke="#2563EB" strokeWidth="2" strokeDasharray="6 4" opacity="0.5"
              initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 2 }} />
          </svg>

          {/* Map pins */}
          {filtered.map((loc) => (
            <motion.div key={loc.id}
              initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: loc.id * 0.08, type: 'spring' }}
              className="absolute cursor-pointer"
              style={{ left: `${loc.x}%`, top: `${loc.y}%`, transform: 'translate(-50%, -50%)' }}
              onClick={() => setSelectedPin(selectedPin?.id === loc.id ? null : loc)}>
              <motion.div whileHover={{ scale: 1.3 }} className="relative">
                <div className="w-8 h-8 rounded-full flex items-center justify-center shadow-lg"
                  style={{ backgroundColor: loc.color }}>
                  {React.createElement(getTypeIcon(loc.type), { size: 14, className: 'text-white' })}
                </div>
                {selectedPin?.id === loc.id && (
                  <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }}
                    className="absolute -bottom-1 left-1/2 -translate-x-1/2 translate-y-full bg-white rounded-lg shadow-lg p-2 w-36 z-30">
                    <div className="text-[10px] font-bold text-gray-800 truncate">{loc.name}</div>
                    <div className="text-[9px] text-gray-500">{loc.dist} away</div>
                  </motion.div>
                )}
              </motion.div>
            </motion.div>
          ))}

          {/* My location */}
          <div className="absolute" style={{ left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}>
            <motion.div animate={{ scale: [1, 1.5, 1] }} transition={{ duration: 2, repeat: Infinity }}
              className="w-3 h-3 bg-blue-500 rounded-full border-2 border-white shadow-lg" />
          </div>
        </div>

        {/* Location Cards */}
        <h3 className="text-sm font-bold text-gray-800 mb-3">Nearby ({filtered.length})</h3>
        <div className="space-y-2 mb-8">
          {filtered.map((loc, i) => {
            const TypeIcon = getTypeIcon(loc.type);
            return (
              <motion.div key={loc.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className={`bg-white rounded-xl p-3.5 shadow-sm flex items-center cursor-pointer transition-all ${selectedPin?.id === loc.id ? 'ring-2' : ''}`}
                style={selectedPin?.id === loc.id ? { borderColor: loc.color } : {}}
                onClick={() => setSelectedPin(loc)}>
                <div className="w-10 h-10 rounded-full flex items-center justify-center mr-3"
                  style={{ backgroundColor: `${loc.color}15` }}>
                  <TypeIcon size={18} style={{ color: loc.color }} />
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-semibold text-gray-800">{loc.name}</h4>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-[10px] text-gray-500 flex items-center gap-0.5"><Navigation size={10} />{loc.dist}</span>
                    <span className="text-[10px] text-gray-500">{loc.waste}</span>
                  </div>
                </div>
                <span className="text-[9px] font-bold px-2 py-0.5 rounded-full"
                  style={{ backgroundColor: `${loc.color}15`, color: loc.color }}>
                  {loc.status}
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SmartBinFinderPage;
