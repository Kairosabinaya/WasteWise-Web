import React, { useState } from 'react';
import { User, Settings, Award, BarChart3, Edit3, ChevronRight, Camera, Bell, Shield, HelpCircle, LogOut } from 'lucide-react';
import { motion } from 'framer-motion';
import { AppLogo } from '../components/ui';

const ProfilePage = () => {
  const [user] = useState({
    name: 'Kairos Abinaya Susanto',
    email: 'kairos@wastewise.com',
    avatar: null,
    level: 'Eco Warrior',
    levelProgress: 80,
    totalPoints: 16500,
    joinDate: 'January 2024',
    wasteReduced: '45.2 kg',
    co2Saved: '12.4 kg',
    achievements: 8,
    rank: 4
  });

  const menuItems = [
    {
      title: 'Edit Profile',
      icon: Edit3,
      color: '#164c51',
      action: () => console.log('Edit Profile')
    },
    {
      title: 'Achievements',
      icon: Award,
      color: '#D48931',
      action: () => console.log('View Achievements')
    },
    {
      title: 'Statistics',
      icon: BarChart3,
      color: '#164c51',
      action: () => console.log('View Statistics')
    },
    {
      title: 'Notifications',
      icon: Bell,
      color: '#6d1e04',
      action: () => console.log('Notification Settings')
    },
    {
      title: 'Privacy & Security',
      icon: Shield,
      color: '#0C2521',
      action: () => console.log('Privacy Settings')
    },
    {
      title: 'Help & Support',
      icon: HelpCircle,
      color: '#6B7280',
      action: () => console.log('Help Center')
    }
  ];

  const MenuItem = ({ item, index }) => (
    <motion.button
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ x: 5 }}
      whileTap={{ scale: 0.98 }}
      onClick={item.action}
      className="w-full bg-white rounded-xl p-4 flex items-center shadow-sm mb-3"
      style={{ boxShadow: '0 2px 6px rgba(0,0,0,0.04)' }}
    >
      <div 
        className="w-10 h-10 rounded-full flex items-center justify-center mr-4"
        style={{ backgroundColor: `${item.color}1A` }}
      >
        <item.icon size={20} style={{ color: item.color }} />
      </div>
      <span className="flex-1 text-left font-medium text-[#0C2521]">{item.title}</span>
      <ChevronRight size={16} className="text-[#6B7280]" />
    </motion.button>
  );

  return (
    <div className="h-full bg-[#F8FAFC] flex flex-col">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-4 pt-12"
      >
        <div className="mb-4">
          <AppLogo variant="compact" />
        </div>

        <motion.h1 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-2xl font-bold text-[#0C2521]"
        >
          Profile
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="text-[#6B7280] text-sm mt-1"
        >
          Manage your account and preferences
        </motion.p>
      </motion.div>

      {/* Profile Card */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mx-4 mb-6"
      >
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center mb-4">
            <div className="relative">
              <div className="w-16 h-16 rounded-full mr-4 overflow-hidden border-2 border-[#164c51]">
                <img 
                  src="/ProfilePicture.jpg" 
                  alt={user.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
                <div className="w-full h-full bg-[#164c51] flex items-center justify-center hidden">
                  <User size={32} className="text-white" />
                </div>
              </div>
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold text-[#0C2521]">{user.name}</h2>
              <p className="text-[#6B7280] text-sm">{user.email}</p>
              <div className="flex items-center mt-1">
                <div className="bg-[#164c51] px-2 py-1 rounded-lg">
                  <span className="text-white text-xs font-bold">{user.level}</span>
                </div>
                <span className="text-xs text-[#6B7280] ml-2">Level 4</span>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-lg font-bold text-[#0C2521]">{user.totalPoints.toLocaleString()}</div>
              <div className="text-xs text-[#6B7280]">Total Points</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-[#0C2521]">#{user.rank}</div>
              <div className="text-xs text-[#6B7280]">Global Rank</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-[#0C2521]">{user.achievements}</div>
              <div className="text-xs text-[#6B7280]">Achievements</div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Menu Items */}
      <div className="flex-1 px-4 pb-4 overflow-y-auto scrollbar-hide">
        {menuItems.map((item, index) => (
          <MenuItem key={item.title} item={item} index={index} />
        ))}

        {/* Logout Button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: menuItems.length * 0.1 }}
          whileHover={{ x: 5 }}
          whileTap={{ scale: 0.98 }}
          className="w-full bg-[#D48931]/10 rounded-xl p-4 flex items-center mt-6"
        >
          <div className="w-10 h-10 rounded-full flex items-center justify-center mr-4 bg-[#D48931]/20">
            <LogOut size={20} className="text-[#D48931]" />
          </div>
          <span className="flex-1 text-left font-medium text-[#D48931]">Sign Out</span>
        </motion.button>
      </div>
    </div>
  );
};

export default ProfilePage; 