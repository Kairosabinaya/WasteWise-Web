import React, { useState, useEffect } from 'react';
import { Settings, Award, BarChart3, ChevronRight, Bell, Shield, HelpCircle, LogOut, MapPin, Zap, Leaf, Flame, Truck, Edit3 } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import useRoleStore from '../context/RoleContext';
import useToast from '../hooks/useToast';
import { Toast } from '../components/ui';

const ProfilePage = () => {
  const navigate = useNavigate();
  const { role, roleInfo } = useRoleStore();
  const current = roleInfo[role];
  const { toast, showToast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => { const t = setTimeout(() => setIsLoading(false), 600); return () => clearTimeout(t); }, []);

  const menuItems = [
    { icon: BarChart3, label: role === 'driver' ? 'Earnings' : 'Impact Dashboard', path: '/statistics', color: '#0D9488' },
    { icon: Award, label: 'Energy Credits', path: '/marketplace', color: '#D97706' },
    { icon: MapPin, label: 'Collection Network', path: '/smart-bin', color: '#065F46' },
    { icon: Bell, label: 'Notifications', path: '/notifications', color: '#7C3AED' },
    { icon: Shield, label: 'Privacy & Security', path: null, color: '#2563EB', action: () => showToast('Privacy settings coming soon') },
    { icon: HelpCircle, label: 'Help & Support', path: null, color: '#6B7280', action: () => showToast('Support: hello@bima.id') },
    { icon: Settings, label: 'Settings', path: null, color: '#6B7280', action: () => showToast('Settings coming soon') },
  ];

  const stats = role === 'supplier'
    ? [
      { label: 'Total Contributed', value: '12.4 ton', icon: Leaf },
      { label: 'Energy Credits', value: '1,250 EC', icon: Zap },
      { label: 'Pickups', value: '48', icon: Truck },
    ]
    : role === 'customer'
      ? [
        { label: 'Bio-LPG Ordered', value: '156 kg', icon: Flame },
        { label: 'Energy Credits', value: '850 EC', icon: Zap },
        { label: 'CO₂ Saved', value: '0.42 ton', icon: Leaf },
      ]
      : role === 'driver'
        ? [
          { label: 'Trips Completed', value: '342', icon: Truck },
          { label: 'Distance', value: '4,218 km', icon: MapPin },
          { label: 'Efficiency', value: '87%', icon: BarChart3 },
        ]
        : [
          { label: 'Platform Users', value: '1,247', icon: Shield },
          { label: 'Active Suppliers', value: '74', icon: Leaf },
          { label: 'Gas Orders/mo', value: '3,840', icon: Flame },
        ];

  return (
    <div className="min-h-full bg-bima-secondary">
      <Toast message={toast} />

      {isLoading ? (
        <div className="space-y-4">
          <div className="animate-pulse bg-gray-200 h-40 rounded-b-3xl" />
          <div className="px-5 space-y-3">
            <div className="animate-pulse bg-gray-200 rounded-2xl h-24" />
            {[1,2,3,4].map(i => (
              <div key={i} className="animate-pulse bg-gray-200 rounded-xl h-12" />
            ))}
          </div>
        </div>
      ) : (
      <>
      {/* Header */}
      <div className="bg-gradient-to-br from-bima-dark to-bima-primary px-5 pt-6 pb-16 relative">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-xl font-bold text-white">Profile</h1>
          <motion.button whileTap={{ scale: 0.9 }} onClick={() => showToast('Edit profile coming soon')}
            className="w-10 h-10 bg-white/15 rounded-full flex items-center justify-center">
            <Edit3 size={18} className="text-white" />
          </motion.button>
        </div>

        {/* Profile Card */}
        <div className="flex items-center gap-3">
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-xl font-bold text-white"
            style={{ backgroundColor: `${current.color}80` }}>
            {current.avatar}
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">{current.name}</h2>
            <p className="text-white/80 text-sm">{current.subtitle}</p>
            <span className="text-[10px] font-bold text-white/60 bg-white/15 px-2 py-0.5 rounded-full mt-1 inline-block capitalize">
              {role}
            </span>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="px-5 -mt-8 relative z-10 mb-4">
        <div className="bg-white rounded-2xl p-4 shadow-lg">
          <div className="grid grid-cols-3 gap-3">
            {stats.map((stat, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="text-center">
                <div className="w-9 h-9 rounded-full bg-bima-primary/10 flex items-center justify-center mx-auto mb-1.5">
                  <stat.icon size={16} className="text-bima-primary" />
                </div>
                <div className="text-sm font-bold text-gray-800">{stat.value}</div>
                <div className="text-[9px] text-gray-500">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <div className="px-5 mb-8">
        <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
          {menuItems.map((item, i) => (
            <motion.button key={i} whileTap={{ scale: 0.98 }}
              onClick={() => {
                if (item.path) navigate(item.path);
                else if (item.action) item.action();
              }}
              className={`w-full flex items-center px-4 py-3.5 text-left ${i < menuItems.length - 1 ? 'border-b border-gray-50' : ''}`}>
              <div className="w-9 h-9 rounded-xl flex items-center justify-center mr-3"
                style={{ backgroundColor: `${item.color}12` }}>
                <item.icon size={18} style={{ color: item.color }} />
              </div>
              <span className="flex-1 text-sm font-medium text-gray-800">{item.label}</span>
              <ChevronRight size={16} className="text-gray-300" />
            </motion.button>
          ))}
        </div>

        {/* Logout */}
        <motion.button whileTap={{ scale: 0.98 }}
          onClick={() => showToast('Logged out successfully')}
          className="w-full mt-3 bg-white rounded-2xl flex items-center px-4 py-3.5 shadow-sm">
          <div className="w-9 h-9 rounded-xl bg-red-50 flex items-center justify-center mr-3">
            <LogOut size={18} className="text-red-500" />
          </div>
          <span className="text-sm font-medium text-red-500">Log Out</span>
        </motion.button>

        {/* Version */}
        <p className="text-center text-[10px] text-gray-400 mt-4">BIMA Platform v1.0.0 • Frontend Prototype</p>
      </div>
      </>
      )}
    </div>
  );
};

export default ProfilePage;