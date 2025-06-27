import React, { useState, useEffect } from 'react';
import { Bell, Gift, Box, Star, Camera, MapPin, User, ArrowRightLeft, Package, BarChart3, Leaf, Recycle, AlertTriangle, Trash2, Users, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { CurvedHeader } from '../components/layout';
import { GlassCard, GamifiedButton, PointsBadge, ProgressBar, StatCard, AppLogo, CameraFloatingButton } from '../components/ui';

const HomePage = () => {
  const [points, setPoints] = useState(0);
  const navigate = useNavigate();
  
  // Mock user data matching Flutter app exactly
  const user = {
    name: 'Kairos',
    points: 16500,
    level: 'Eco Warrior',
    levelProgress: 80,
    avatar: null,
  };

  // Animate points counter
  useEffect(() => {
    const timer = setTimeout(() => {
      let current = 0;
      const increment = user.points / 50;
      const counter = setInterval(() => {
        current += increment;
        if (current >= user.points) {
          setPoints(user.points);
          clearInterval(counter);
        } else {
          setPoints(Math.floor(current));
        }
      }, 30);
      return () => clearInterval(counter);
    }, 500);
    return () => clearTimeout(timer);
  }, [user.points]);

  // Updated waste data with new color palette
  const wasteData = [
    { type: 'Organic', amount: '2.4', unit: 'kg', icon: Leaf, color: '#164c51' },
    { type: 'Recyclable', amount: '3.6', unit: 'kg', icon: Recycle, color: '#164c51' },
    { type: 'Hazardous', amount: '0.2', unit: 'kg', icon: AlertTriangle, color: '#D48931' },
    { type: 'Residual', amount: '0.8', unit: 'kg', icon: Trash2, color: '#6d1e04' },
  ];

  // Updated statistics with new color palette
  const statistics = [
    { title: 'Items Recycled', value: '12', icon: Package, color: '#164c51' },
    { title: "Today's Points", value: '340', icon: Star, color: '#D48931' },
  ];

  // Updated quick actions with new color palette
  const quickActions = [
    { title: 'Statistics', icon: BarChart3, color: '#164c51', path: '/statistics' },
    { title: 'Marketplace', icon: Gift, color: '#D48931', path: '/marketplace' },
    { title: 'Education', icon: Package, color: '#0C2521', path: '/education' },
    { title: 'Community', icon: Users, color: '#6d1e04', path: '/community' },
  ];

  // Updated achievements with new color palette
  const achievements = [
    {
      title: 'Eco Pioneer',
      desc: '100+ items recycled',
      color: '#164c51',
      icon: Leaf,
      tag: 'NEW',
      tagColor: '#164c51',
    },
    {
      title: 'Point Master',
      desc: '10,000 points collected',
      color: '#D48931',
      icon: Star,
      tag: 'COMPLETED',
      tagColor: '#D48931',
    },
    {
      title: 'Community Hero',
      desc: '50+ people helped',
      color: '#6d1e04',
      icon: Users,
      tag: null,
      tagColor: null,
    },
  ];

  // Waste Card Component - with navigation to statistics
  const WasteCard = ({ type, amount, unit, icon: Icon, color }) => (
    <motion.div
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => navigate('/statistics')}
      className="bg-white rounded-xl shadow-sm p-3 h-[70px] flex items-center cursor-pointer"
      style={{ boxShadow: '0 2px 6px rgba(0,0,0,0.04)' }}
    >
      <div 
        className="w-8 h-8 rounded-full flex items-center justify-center mr-2"
        style={{ backgroundColor: `${color}1A` }}
      >
        <Icon size={16} style={{ color }} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-base font-bold text-[#1F2937] leading-tight">
          {amount} {unit}
        </div>
        <div className="text-xs text-[#6B7280] leading-tight">
          {type}
        </div>
      </div>
    </motion.div>
  );

  // Statistics Card Component - exact Flutter recreation with gradient
  const StatCard = ({ title, value, icon: Icon, color }) => (
    <motion.div
      whileHover={{ y: -2 }}
      className="rounded-xl p-4 flex items-center"
      style={{
        background: `linear-gradient(135deg, ${color}, ${color}CC)`,
      }}
    >
      <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center mr-3">
        <Icon size={20} className="text-white" />
      </div>
      <div className="flex-1">
        <div className="text-xl font-bold text-white leading-tight">
          {value}
        </div>
        <div className="text-xs text-white/90 font-medium leading-tight">
          {title}
        </div>
      </div>
    </motion.div>
  );

  // Quick Action Card Component - with navigation
  const QuickActionCard = ({ title, icon: Icon, color, path }) => (
    <motion.div
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => navigate(path)}
      className="bg-white rounded-xl shadow-sm p-3.5 h-[90px] flex flex-col items-center justify-center cursor-pointer"
      style={{ boxShadow: '0 2px 6px rgba(0,0,0,0.04)' }}
    >
      <div 
        className="w-9 h-9 rounded-full flex items-center justify-center mb-2"
        style={{
          background: `linear-gradient(135deg, ${color}, ${color}CC)`,
          boxShadow: `0 2px 6px ${color}4D`
        }}
      >
        <Icon size={18} className="text-white" />
      </div>
      <div className="text-xs font-semibold text-[#1F2937] text-center leading-tight">
        {title}
      </div>
    </motion.div>
  );

  // Achievement Item Component - with navigation to community leaderboard
  const AchievementItem = ({ achievement }) => (
    <motion.div
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => navigate('/community?tab=2')}
      className="bg-white rounded-xl p-4 flex items-center cursor-pointer mb-3"
      style={{ boxShadow: '0 2px 6px rgba(0,0,0,0.04)' }}
    >
      <div 
        className="w-12 h-12 rounded-full flex items-center justify-center mr-3"
        style={{
          background: `linear-gradient(135deg, ${achievement.color}, ${achievement.color}CC)`,
        }}
      >
        <achievement.icon size={24} className="text-white" />
      </div>
      <div className="flex-1">
        <div className="flex items-center mb-0.5">
          <span className="text-sm font-bold text-[#1F2937]">{achievement.title}</span>
          {achievement.tag && (
            <span 
              className="ml-2 px-1.5 py-0.5 text-[8px] font-bold rounded"
              style={{ 
                backgroundColor: `${achievement.tagColor}1A`,
                color: achievement.tagColor 
              }}
            >
              {achievement.tag}
            </span>
          )}
        </div>
        <div className="text-xs text-[#6B7280]">{achievement.desc}</div>
      </div>
      <ChevronRight size={16} className="text-[#6B7280]" />
    </motion.div>
  );

  return (
    <div className="h-full bg-[#F8FAFC] flex flex-col relative">
      {/* Header Section - exact Flutter recreation with 356px height */}
              <div className="h-[411px] relative flex-shrink-0">
                {/* Curved Header - using CurvedHeader component with proper content */}
        <CurvedHeader className="h-[220px] !pt-10">
          {/* App Logo - large and centered */}
          <div className="text-center mb-4">
            <motion.h1 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl font-bold text-white"
            >
              WasteWise
            </motion.h1>
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: "80px" }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="h-1 bg-white/60 rounded-full mx-auto mt-2"
            ></motion.div>
          </div>
          
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
              <motion.div 
                className="w-[54px] h-[54px] rounded-full border-2 border-white/30 cursor-pointer overflow-hidden"
                animate={{ scale: [1, 1.03, 1] }}
                transition={{ duration: 3, repeat: Infinity }}
                onClick={() => navigate('/profile')}
              >
                <img 
                  src="/ProfilePicture.jpg" 
                  alt={user.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
                <div className="w-full h-full bg-white/20 flex items-center justify-center hidden">
                  <User className="text-white" size={26} />
             </div>
              </motion.div>
             <div>
                <h1 className="text-[18px] font-semibold text-white leading-tight">Welcome, {user.name}</h1>
                <p className="text-white/90 text-sm leading-tight mt-1">Let's make a positive impact today</p>
             </div>
          </div>
            <motion.div 
                              whileHover={{ scale: 1.1 }} 
              onClick={() => navigate('/notifications')}
              className="relative w-12 h-12 bg-white/15 rounded-full flex items-center justify-center cursor-pointer"
            >
              <Bell className="text-white" size={22} />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-[#D48931] rounded-full border-2 border-[#164c51]"></span>
          </motion.div>
        </div>
      </CurvedHeader>

        {/* Points Panel - positioned higher up for better visual balance */}
        <div className="absolute bottom-4 left-0 right-0 px-5">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white p-6 rounded-2xl shadow-lg"
          >
            <div className="flex justify-between items-start mb-4">
            <div>
                <p className="text-[#6B7280] text-xs font-normal">Your Total Points</p>
                <motion.p 
                  className="text-[28px] font-extrabold text-[#0C2521] leading-tight mt-1"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.5, type: 'spring' }}
                >
                  {points.toLocaleString()}
                </motion.p>
                <p className="text-[#6B7280] text-[11px] font-normal">Points</p>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/marketplace')}
                className="bg-gradient-to-r from-[#164c51] to-[#0C2521] text-white px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-lg shadow-[#164c51]/30"
              >
                <ArrowRightLeft size={14} />
                Exchange Points
              </motion.button>
            </div>

            {/* Level Progress - exact Flutter recreation */}
            <div className="bg-[#164c51]/10 p-3 rounded-xl">
              <div className="flex items-center">
                <div className="bg-[#164c51] px-2 py-1 rounded-lg flex items-center justify-center">
                  <span className="text-white text-[10px] font-bold">Level 4</span>
                </div>
                <div className="flex-1 mx-3">
                  <div className="flex justify-between items-center mb-1.5">
                    <span className="text-xs font-semibold text-[#0C2521]">Eco Warrior</span>
                    <span className="text-[11px] font-semibold text-[#164c51]">80%</span>
                  </div>
                  <div className="w-full bg-white rounded-full h-1">
                    <motion.div
                      className="bg-[#164c51] h-1 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: '80%' }}
                      transition={{ duration: 1, delay: 0.7 }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
          </div>


      {/* Main Content - exact Flutter spacing */}
      <div className="flex-1 px-5 pt-2 pb-4 overflow-y-auto scrollbar-hide">
        
        {/* Smart Bin CTA */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="pt-2 pb-8"
        >
          <motion.div
            whileHover={{ y: -2, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate('/smart-bin')}
            className="bg-gradient-to-r from-[#164c51] to-[#0C2521] rounded-2xl p-4 cursor-pointer shadow-lg shadow-[#164c51]/30"
          >
            <div className="flex items-center">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mr-4">
                <MapPin size={24} className="text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-white font-semibold text-base">Find Smart Bins</h3>
                <p className="text-white/90 text-sm">Locate nearby smart bins for proper waste disposal</p>
              </div>
              <ChevronRight size={20} className="text-white/80" />
            </div>
          </motion.div>
        </motion.div>
        {/* Today's Impact Section */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-[#0C2521] mb-3">Today's Impact</h2>
          <div className="space-y-3">
            <div className="flex gap-3">
              <div className="flex-1">
                <WasteCard {...wasteData[0]} />
              </div>
              <div className="flex-1">
                <WasteCard {...wasteData[1]} />
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex-1">
                <WasteCard {...wasteData[2]} />
          </div>
              <div className="flex-1">
                <WasteCard {...wasteData[3]} />
            </div>
            </div>
          </div>
        </div>

        {/* Statistics Section */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-[#0C2521] mb-3">Statistics</h2>
          <div className="flex gap-3">
            <div className="flex-1">
              <StatCard {...statistics[0]} />
            </div>
            <div className="flex-1">
              <StatCard {...statistics[1]} />
                </div>
          </div>
        </div>
        
        {/* Quick Actions Section */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-[#0C2521] mb-3">Quick Actions</h2>
          <div className="space-y-3">
            <div className="flex gap-3">
              <div className="flex-1">
                <QuickActionCard {...quickActions[0]} />
              </div>
              <div className="flex-1">
                <QuickActionCard {...quickActions[1]} />
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex-1">
                <QuickActionCard {...quickActions[2]} />
              </div>
              <div className="flex-1">
                <QuickActionCard {...quickActions[3]} />
              </div>
            </div>
          </div>
        </div>

        {/* Achievements Section - exact Flutter recreation */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-[#0C2521] mb-3">Achievements</h2>
        <div>
            {achievements.map((achievement, index) => (
              <AchievementItem key={index} achievement={achievement} />
            ))}
          </div>
        </div>
      </div>

      {/* Camera Floating Button */}
      <CameraFloatingButton />
    </div>
  );
};

export default HomePage; 