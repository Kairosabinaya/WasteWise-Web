import React from 'react';
import { Bell, Leaf, Zap, Truck, TrendingUp, ChevronRight, Clock, CheckCircle, Flame, Factory, Shield, Package, BarChart3, MapPin, Users, AlertTriangle, Droplets, ThermometerSun, Gauge } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { CurvedHeader } from '../components/layout';
import useRoleStore from '../context/RoleContext';

const HomePage = () => {
  const navigate = useNavigate();
  const { role, roleInfo } = useRoleStore();
  const currentRole = roleInfo[role];

  // ===== SUPPLIER VIEW =====
  const SupplierDashboard = () => (
    <>
      {/* Main Stats Panel */}
      <div className="px-5 -mt-10 mb-4 relative z-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-white p-5 rounded-2xl shadow-lg"
        >
          <div className="flex justify-between items-start mb-3">
            <div>
              <p className="text-gray-500 text-xs">Waste Contributed</p>
              <motion.p
                className="text-[28px] font-extrabold text-[#065F46] leading-tight mt-1"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.1, type: 'spring' }}
              >
                2.4 ton
              </motion.p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/pickup')}
              className="bg-gradient-to-r from-[#0D9488] to-[#065F46] text-white px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5"
            >
              <Truck size={14} />
              Schedule Pickup
            </motion.button>
          </div>

          {/* Energy Credits */}
          <div className="bg-[#0D9488]/10 p-3 rounded-xl">
            <div className="flex items-center">
              <div className="bg-[#D97706] px-2 py-1 rounded-lg">
                <span className="text-white text-[10px] font-bold">1,250 EC</span>
              </div>
              <div className="flex-1 mx-3">
                <div className="flex justify-between items-center mb-1.5">
                  <span className="text-xs font-semibold text-[#065F46]">Energy Credits</span>
                  <span className="text-[11px] font-semibold text-[#0D9488]">Level 3</span>
                </div>
                <div className="w-full bg-white rounded-full h-1">
                  <motion.div
                    className="bg-[#0D9488] h-1 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: '72%' }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                  />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Waste Breakdown */}
      <div className="px-5 mb-6">
        <h2 className="text-lg font-semibold text-[#065F46] mb-3">Waste Breakdown</h2>
        <div className="grid grid-cols-2 gap-3">
          {[
            { type: 'Food Waste', amount: '1.8 ton', icon: Leaf, color: '#0D9488' },
            { type: 'Oil & Grease', amount: '0.3 ton', icon: Droplets, color: '#D97706' },
            { type: 'Compostable', amount: '0.2 ton', icon: ThermometerSun, color: '#065F46' },
            { type: 'Unusable', amount: '0.1 ton', icon: AlertTriangle, color: '#DC2626' },
          ].map((item, i) => (
            <motion.div key={i} whileHover={{ y: -2 }} className="bg-white rounded-xl shadow-sm p-3 flex items-center"
              style={{ boxShadow: '0 2px 6px rgba(0,0,0,0.04)' }}>
              <div className="w-8 h-8 rounded-full flex items-center justify-center mr-2"
                style={{ backgroundColor: `${item.color}1A` }}>
                <item.icon size={16} style={{ color: item.color }} />
              </div>
              <div>
                <div className="text-sm font-bold text-gray-800">{item.amount}</div>
                <div className="text-xs text-gray-500">{item.type}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Impact Metrics */}
      <div className="px-5 mb-6">
        <h2 className="text-lg font-semibold text-[#065F46] mb-3">Your Impact</h2>
        <div className="grid grid-cols-2 gap-3">
          {[
            { title: 'CO₂ Reduced', value: '0.8 ton', icon: TrendingUp, color: '#0D9488' },
            { title: 'Biogas Generated', value: '520 m³', icon: Flame, color: '#D97706' },
          ].map((item, i) => (
            <motion.div key={i} whileHover={{ y: -2 }} className="rounded-xl p-4 flex items-center"
              style={{ background: `linear-gradient(135deg, ${item.color}, ${item.color}CC)` }}>
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center mr-3">
                <item.icon size={20} className="text-white" />
              </div>
              <div>
                <div className="text-xl font-bold text-white">{item.value}</div>
                <div className="text-xs text-white/90">{item.title}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Next Pickup CTA */}
      <div className="px-5 mb-6">
        <motion.div whileHover={{ y: -2 }} onClick={() => navigate('/pickup')}
          className="bg-gradient-to-r from-[#0D9488] to-[#065F46] rounded-2xl p-4 cursor-pointer shadow-lg">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mr-4">
              <Truck size={24} className="text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-white font-semibold">Next Pickup</h3>
              <p className="text-white/90 text-sm">Today, 08:00 AM • Driver assigned</p>
            </div>
            <ChevronRight size={20} className="text-white/80" />
          </div>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <div className="px-5 mb-24">
        <h2 className="text-lg font-semibold text-[#065F46] mb-3">Quick Actions</h2>
        <div className="grid grid-cols-4 gap-2">
          {[
            { title: 'Scan', icon: Leaf, path: '/scan', color: '#0D9488' },
            { title: 'Impact', icon: BarChart3, path: '/statistics', color: '#065F46' },
            { title: 'Rewards', icon: Zap, path: '/marketplace', color: '#D97706' },
            { title: 'Learn', icon: Package, path: '/education', color: '#064E3B' },
          ].map((item, i) => (
            <motion.div key={i} whileTap={{ scale: 0.95 }} onClick={() => navigate(item.path)}
              className="bg-white rounded-xl p-3 flex flex-col items-center cursor-pointer"
              style={{ boxShadow: '0 2px 6px rgba(0,0,0,0.04)' }}>
              <div className="w-9 h-9 rounded-full flex items-center justify-center mb-1.5"
                style={{ background: `linear-gradient(135deg, ${item.color}, ${item.color}CC)` }}>
                <item.icon size={16} className="text-white" />
              </div>
              <span className="text-[11px] font-semibold text-gray-700">{item.title}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </>
  );

  // ===== CUSTOMER VIEW =====
  const CustomerDashboard = () => (
    <>
      <div className="px-5 -mt-10 mb-4 relative z-20">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}
          className="bg-white p-5 rounded-2xl shadow-lg">
          <div className="flex justify-between items-start mb-3">
            <div>
              <p className="text-gray-500 text-xs">Bio-LPG Used This Month</p>
              <motion.p className="text-[28px] font-extrabold text-[#065F46] leading-tight mt-1"
                initial={{ scale: 0.8 }} animate={{ scale: 1 }} transition={{ delay: 0.1, type: 'spring' }}>
                156 kg
              </motion.p>
            </div>
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/order-gas')}
              className="bg-gradient-to-r from-[#D97706] to-[#B45309] text-white px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5">
              <Flame size={14} />
              Order Gas
            </motion.button>
          </div>
          <div className="bg-[#D97706]/10 p-3 rounded-xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Zap size={16} className="text-[#D97706]" />
                <span className="text-xs font-semibold text-[#92400E]">Energy Credits: 850 EC</span>
              </div>
              <span className="text-[11px] font-semibold text-[#D97706]">Save 32% vs LPG</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Savings Comparison */}
      <div className="px-5 mb-6">
        <h2 className="text-lg font-semibold text-[#065F46] mb-3">Your Savings</h2>
        <div className="grid grid-cols-2 gap-3">
          {[
            { title: 'Monthly Savings', value: 'Rp 245K', icon: TrendingUp, color: '#0D9488' },
            { title: 'CO₂ Reduced', value: '0.42 ton', icon: Leaf, color: '#065F46' },
          ].map((item, i) => (
            <motion.div key={i} whileHover={{ y: -2 }} className="rounded-xl p-4"
              style={{ background: `linear-gradient(135deg, ${item.color}, ${item.color}CC)` }}>
              <item.icon size={20} className="text-white mb-2" />
              <div className="text-xl font-bold text-white">{item.value}</div>
              <div className="text-xs text-white/90">{item.title}</div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Active Subscription */}
      <div className="px-5 mb-6">
        <motion.div whileHover={{ y: -2 }}
          className="bg-gradient-to-r from-[#D97706] to-[#B45309] rounded-2xl p-4 cursor-pointer shadow-lg"
          onClick={() => navigate('/order-gas')}>
          <div className="flex items-center">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mr-4">
              <Flame size={24} className="text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-white font-semibold">Monthly Subscription</h3>
              <p className="text-white/90 text-sm">Next delivery: Feb 25 • 12kg Bio-LPG</p>
            </div>
            <ChevronRight size={20} className="text-white/80" />
          </div>
        </motion.div>
      </div>

      {/* Price Comparison */}
      <div className="px-5 mb-6">
        <h2 className="text-lg font-semibold text-[#065F46] mb-3">Price Comparison</h2>
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          {[
            { label: 'Bio-LPG (BIMA)', price: 'Rp 14,500/kg', savings: '-32%', highlight: true },
            { label: 'Conventional LPG', price: 'Rp 21,400/kg', savings: '', highlight: false },
          ].map((item, i) => (
            <div key={i} className={`flex items-center justify-between py-3 ${i === 0 ? 'border-b border-gray-100' : ''}`}>
              <div className="flex items-center gap-2">
                {item.highlight && <div className="w-2 h-2 rounded-full bg-[#0D9488]" />}
                {!item.highlight && <div className="w-2 h-2 rounded-full bg-gray-300" />}
                <span className={`text-sm ${item.highlight ? 'font-bold text-[#065F46]' : 'text-gray-500'}`}>{item.label}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className={`text-sm ${item.highlight ? 'font-bold text-[#065F46]' : 'text-gray-500'}`}>{item.price}</span>
                {item.savings && <span className="text-xs font-bold text-[#0D9488] bg-[#0D9488]/10 px-1.5 py-0.5 rounded">{item.savings}</span>}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="px-5 mb-24">
        <div className="grid grid-cols-4 gap-2">
          {[
            { title: 'Order', icon: Flame, path: '/order-gas', color: '#D97706' },
            { title: 'Impact', icon: BarChart3, path: '/statistics', color: '#0D9488' },
            { title: 'Rewards', icon: Zap, path: '/marketplace', color: '#065F46' },
            { title: 'Learn', icon: Package, path: '/education', color: '#064E3B' },
          ].map((item, i) => (
            <motion.div key={i} whileTap={{ scale: 0.95 }} onClick={() => navigate(item.path)}
              className="bg-white rounded-xl p-3 flex flex-col items-center cursor-pointer shadow-sm">
              <div className="w-9 h-9 rounded-full flex items-center justify-center mb-1.5"
                style={{ background: `linear-gradient(135deg, ${item.color}, ${item.color}CC)` }}>
                <item.icon size={16} className="text-white" />
              </div>
              <span className="text-[11px] font-semibold text-gray-700">{item.title}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </>
  );

  // ===== DRIVER VIEW =====
  const DriverDashboard = () => (
    <>
      <div className="px-5 -mt-10 mb-4 relative z-20">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}
          className="bg-white p-5 rounded-2xl shadow-lg">
          <div className="flex justify-between items-start mb-3">
            <div>
              <p className="text-gray-500 text-xs">Today's Tasks</p>
              <motion.p className="text-[28px] font-extrabold text-[#2563EB] leading-tight mt-1"
                initial={{ scale: 0.8 }} animate={{ scale: 1 }} transition={{ delay: 0.1, type: 'spring' }}>
                34 trips
              </motion.p>
            </div>
            <div className="bg-[#0D9488] text-white px-3 py-1.5 rounded-xl text-xs font-semibold">
              <CheckCircle size={12} className="inline mr-1" /> On Duty
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {[
              { label: 'Pickups', value: '18', color: '#D97706' },
              { label: 'Deliveries', value: '12', color: '#0D9488' },
              { label: 'Completed', value: '24', color: '#065F46' },
            ].map((item, i) => (
              <div key={i} className="text-center p-2 rounded-lg" style={{ backgroundColor: `${item.color}10` }}>
                <div className="text-lg font-bold" style={{ color: item.color }}>{item.value}</div>
                <div className="text-[10px] text-gray-500">{item.label}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Active Tasks */}
      <div className="px-5 mb-6">
        <h2 className="text-lg font-semibold text-[#065F46] mb-3">Active Tasks</h2>
        {[
          { type: 'Pickup', loc: 'Restoran Padang Jaya', time: '08:30 AM', weight: '45kg', status: 'In Progress', color: '#D97706' },
          { type: 'Delivery', loc: 'Ibu Sari - Jl. Merdeka 12', time: '10:00 AM', weight: '12kg Bio-LPG', status: 'Next', color: '#0D9488' },
          { type: 'Pickup', loc: 'Hotel Grand Nusantara', time: '11:30 AM', weight: '120kg', status: 'Scheduled', color: '#2563EB' },
        ].map((task, i) => (
          <motion.div key={i} whileHover={{ y: -1 }} className="bg-white rounded-xl p-4 mb-3 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold px-2 py-0.5 rounded" style={{ backgroundColor: `${task.color}15`, color: task.color }}>{task.type}</span>
              <span className="text-xs font-semibold px-2 py-0.5 rounded" style={{ backgroundColor: task.status === 'In Progress' ? '#FEF3C7' : '#F3F4F6', color: task.status === 'In Progress' ? '#92400E' : '#6B7280' }}>{task.status}</span>
            </div>
            <h3 className="text-sm font-semibold text-gray-800">{task.loc}</h3>
            <div className="flex items-center gap-3 mt-1.5">
              <span className="text-xs text-gray-500 flex items-center gap-1"><Clock size={12} />{task.time}</span>
              <span className="text-xs text-gray-500 flex items-center gap-1"><Package size={12} />{task.weight}</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Route Efficiency */}
      <div className="px-5 mb-24">
        <h2 className="text-lg font-semibold text-[#065F46] mb-3">Route Efficiency</h2>
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-semibold text-gray-800">Today's Route</span>
            <span className="text-sm font-bold text-[#0D9488]">87% efficient</span>
          </div>
          <div className="w-full bg-gray-100 rounded-full h-2">
            <motion.div className="bg-gradient-to-r from-[#0D9488] to-[#065F46] h-2 rounded-full"
              initial={{ width: 0 }} animate={{ width: '87%' }} transition={{ duration: 1 }} />
          </div>
          <div className="flex justify-between mt-3">
            {[
              { label: 'Distance', value: '42 km' },
              { label: 'Fuel Saved', value: '3.2 L' },
              { label: 'CO₂ Saved', value: '8.4 kg' },
            ].map((item, i) => (
              <div key={i} className="text-center">
                <div className="text-sm font-bold text-gray-800">{item.value}</div>
                <div className="text-[10px] text-gray-500">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );

  // ===== ADMIN VIEW =====
  const AdminDashboard = () => (
    <>
      <div className="px-5 -mt-10 mb-4 relative z-20">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}
          className="bg-white p-5 rounded-2xl shadow-lg">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-gray-500 text-xs">Total Waste Processed</p>
              <motion.p className="text-[28px] font-extrabold text-[#7C3AED] leading-tight mt-1"
                initial={{ scale: 0.8 }} animate={{ scale: 1 }} transition={{ delay: 0.1, type: 'spring' }}>
                38 tons
              </motion.p>
            </div>
            <div className="bg-[#7C3AED] text-white px-3 py-1.5 rounded-xl text-xs font-semibold">
              <Shield size={12} className="inline mr-1" /> Admin
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {[
              { label: 'Active Suppliers', value: '74', color: '#0D9488' },
              { label: 'Gas Orders Today', value: '129', color: '#D97706' },
              { label: 'Reactors Online', value: '5/6', color: '#065F46' },
              { label: 'Drivers Active', value: '23', color: '#2563EB' },
            ].map((item, i) => (
              <div key={i} className="text-center p-2.5 rounded-xl" style={{ backgroundColor: `${item.color}10` }}>
                <div className="text-lg font-bold" style={{ color: item.color }}>{item.value}</div>
                <div className="text-[10px] text-gray-500 font-medium">{item.label}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* System Status */}
      <div className="px-5 mb-6">
        <h2 className="text-lg font-semibold text-[#065F46] mb-3">System Status</h2>
        {[
          { label: 'Waste Supply Pipeline', status: 'Optimal', pct: 92, color: '#0D9488' },
          { label: 'Gas Production', status: 'Running', pct: 78, color: '#D97706' },
          { label: 'Demand Forecast Accuracy', status: 'High', pct: 89, color: '#065F46' },
          { label: 'Reactor Efficiency', status: 'Normal', pct: 85, color: '#7C3AED' },
        ].map((item, i) => (
          <div key={i} className="bg-white rounded-xl p-3 mb-2 shadow-sm">
            <div className="flex justify-between items-center mb-1.5">
              <span className="text-sm font-semibold text-gray-800">{item.label}</span>
              <span className="text-xs font-bold px-2 py-0.5 rounded" style={{ backgroundColor: `${item.color}15`, color: item.color }}>{item.status}</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-1.5">
              <motion.div className="h-1.5 rounded-full" style={{ backgroundColor: item.color }}
                initial={{ width: 0 }} animate={{ width: `${item.pct}%` }} transition={{ duration: 1, delay: i * 0.15 }} />
            </div>
          </div>
        ))}
      </div>

      {/* Platform Metrics */}
      <div className="px-5 mb-6">
        <h2 className="text-lg font-semibold text-[#065F46] mb-3">Platform Metrics</h2>
        <div className="grid grid-cols-2 gap-3">
          {[
            { title: 'CO₂ Reduced', value: '2.3 ton', icon: Leaf, color: '#0D9488' },
            { title: 'Biogas Generated', value: '5,200 m³', icon: Flame, color: '#D97706' },
            { title: 'Revenue Today', value: 'Rp 42M', icon: TrendingUp, color: '#065F46' },
            { title: 'Network Growth', value: '+12%', icon: Users, color: '#7C3AED' },
          ].map((item, i) => (
            <motion.div key={i} whileHover={{ y: -2 }} className="rounded-xl p-3.5"
              style={{ background: `linear-gradient(135deg, ${item.color}, ${item.color}CC)` }}>
              <item.icon size={18} className="text-white mb-1.5" />
              <div className="text-lg font-bold text-white">{item.value}</div>
              <div className="text-[10px] text-white/90">{item.title}</div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="px-5 mb-24">
        <div className="grid grid-cols-4 gap-2">
          {[
            { title: 'Map', icon: MapPin, path: '/smart-bin', color: '#0D9488' },
            { title: 'Stats', icon: BarChart3, path: '/statistics', color: '#065F46' },
            { title: 'Network', icon: Users, path: '/community', color: '#D97706' },
            { title: 'Alerts', icon: Bell, path: '/notifications', color: '#7C3AED' },
          ].map((item, i) => (
            <motion.div key={i} whileTap={{ scale: 0.95 }} onClick={() => navigate(item.path)}
              className="bg-white rounded-xl p-3 flex flex-col items-center cursor-pointer shadow-sm">
              <div className="w-9 h-9 rounded-full flex items-center justify-center mb-1.5"
                style={{ background: `linear-gradient(135deg, ${item.color}, ${item.color}CC)` }}>
                <item.icon size={16} className="text-white" />
              </div>
              <span className="text-[11px] font-semibold text-gray-700">{item.title}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </>
  );

  const getRoleTitle = () => {
    if (role === 'supplier') return 'Waste Supplier Dashboard';
    if (role === 'customer') return 'Bio-LPG Customer';
    if (role === 'driver') return 'Driver Operations';
    return 'Control Center';
  };

  return (
    <div className="h-full bg-[#F0FDF9] flex flex-col relative">
      {/* Header */}
      <CurvedHeader className="!pt-8 !pb-20">
        <div className="text-center mb-3">
          <motion.h1 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-bold text-white">
            BIMA
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
            className="text-white/80 text-xs mt-0.5">
            Bio-Energy Integrated Management with AI
          </motion.p>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <motion.div
              className="w-12 h-12 rounded-full border-2 border-white/30 cursor-pointer overflow-hidden flex items-center justify-center"
              style={{ backgroundColor: `${currentRole.color}40` }}
              animate={{ scale: [1, 1.03, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
              onClick={() => navigate('/profile')}
            >
              <span className="text-white font-bold text-sm">{currentRole.avatar}</span>
            </motion.div>
            <div>
              <h2 className="text-[16px] font-semibold text-white leading-tight">{currentRole.name}</h2>
              <p className="text-white/90 text-xs leading-tight mt-0.5">{getRoleTitle()}</p>
            </div>
          </div>
          <motion.div whileHover={{ scale: 1.1 }} onClick={() => navigate('/notifications')}
            className="relative w-11 h-11 bg-white/15 rounded-full flex items-center justify-center cursor-pointer">
            <Bell className="text-white" size={20} />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-[#D97706] rounded-full border-2 border-[#065F46]" />
          </motion.div>
        </div>
      </CurvedHeader>

      {/* Main Content */}
      <div className="flex-1">
        {role === 'supplier' && <SupplierDashboard />}
        {role === 'customer' && <CustomerDashboard />}
        {role === 'driver' && <DriverDashboard />}
        {role === 'admin' && <AdminDashboard />}
      </div>
    </div>
  );
};

export default HomePage;