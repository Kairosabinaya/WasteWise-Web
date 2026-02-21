import React, { useState } from 'react';
import { Users, Trophy, MessageCircle, TrendingUp, Building2, Award, Star, ChevronRight, Filter, Target, Newspaper, Calendar, MapPin, Handshake, Landmark } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { clsx } from 'clsx';
import { AppLogo } from '../components/ui';

const CommunityPage = () => {
  const [activeTab, setActiveTab] = useState('news');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Industry categories for leaderboard
  const categories = ['All', 'Mall', 'Hotel', 'Hospital', 'Office'];

  // Industry news & best practices (English)
  const industryNews = [
    {
      id: '1',
      author: 'WasteWise Team',
      authorType: 'Official',
      title: 'New ESG Regulation 2024: What Buildings Need to Know',
      content: 'The Ministry of Environment has released new guidelines for commercial waste management compliance. Key changes include mandatory reporting requirements...',
      category: 'Regulation',
      date: '2 hours ago',
      icon: Landmark,
      color: '#164c51',
    },
    {
      id: '2',
      author: 'Pacific Place Mall',
      authorType: 'Mall',
      title: 'How We Achieved 95% Waste Diversion Rate',
      content: 'Sharing our journey to becoming the most sustainable mall in the region. The key factors were staff training, smart bin deployment, and...',
      category: 'Success Story',
      date: '1 day ago',
      icon: Trophy,
      color: '#D48931',
    },
    {
      id: '3',
      author: 'WasteWise Team',
      authorType: 'Official',
      title: 'Smart Bin Firmware Update v2.5 Released',
      content: 'New features: Improved AI waste detection accuracy up to 95%, better capacity prediction algorithms, and energy optimization...',
      category: 'Product Update',
      date: '2 days ago',
      icon: MessageCircle,
      color: '#164c51',
    },
    {
      id: '4',
      author: 'Hyatt Regency',
      authorType: 'Hotel',
      title: 'Composting Program: 6 Months Review',
      content: 'Our organic waste composting initiative has generated 2 tons of compost and reduced waste disposal costs by 35%...',
      category: 'Success Story',
      date: '3 days ago',
      icon: Target,
      color: '#0C2521',
    },
  ];

  // Industry challenges/targets
  const industryTargets = [
    {
      id: '1',
      title: 'Q4 Zero Landfill Challenge',
      description: 'Achieve 95%+ waste diversion rate for Q4 2024',
      participants: 45,
      deadline: 'Dec 31, 2024',
      reward: 'ESG Excellence Award',
      icon: Target,
      color: '#164c51',
      progress: 72,
    },
    {
      id: '2',
      title: 'Organic Waste Reduction',
      description: 'Reduce organic waste by 30% compared to last quarter',
      participants: 32,
      deadline: 'Dec 15, 2024',
      reward: 'Green Champion Badge',
      icon: TrendingUp,
      color: '#D48931',
      progress: 58,
    },
    {
      id: '3',
      title: 'Staff Certification Drive',
      description: '100% staff certified in basic waste sorting by Q1 2025',
      participants: 28,
      deadline: 'Jan 31, 2025',
      reward: 'Training Excellence Award',
      icon: Award,
      color: '#0C2521',
      progress: 85,
    },
  ];

  // Industry leaderboard (Generic/English names)
  const industryLeaderboard = [
    {
      rank: 1,
      name: 'Pacific Place Mall',
      category: 'Mall',
      location: 'Downtown',
      wasteDiverted: '95%',
      esgScore: 98,
      badge: 'Platinum',
      badgeColor: '#164c51',
    },
    {
      rank: 2,
      name: 'Hyatt Regency Hotel',
      category: 'Hotel',
      location: 'Central Business District',
      wasteDiverted: '92%',
      esgScore: 94,
      badge: 'Platinum',
      badgeColor: '#164c51',
    },
    {
      rank: 3,
      name: 'City General Hospital',
      category: 'Hospital',
      location: 'Medical District',
      wasteDiverted: '89%',
      esgScore: 91,
      badge: 'Gold',
      badgeColor: '#D48931',
    },
    {
      rank: 4,
      name: 'Central Mall',
      category: 'Mall',
      location: 'City Center',
      wasteDiverted: '87%',
      esgScore: 88,
      badge: 'Gold',
      badgeColor: '#D48931',
      isCurrentUser: true,
    },
    {
      rank: 5,
      name: 'Tech Tower Office',
      category: 'Office',
      location: 'Tech Park',
      wasteDiverted: '85%',
      esgScore: 86,
      badge: 'Gold',
      badgeColor: '#D48931',
    },
    {
      rank: 6,
      name: 'Plaza Shopping Center',
      category: 'Mall',
      location: 'Uptown',
      wasteDiverted: '83%',
      esgScore: 84,
      badge: 'Silver',
      badgeColor: '#6B7280',
    },
    {
      rank: 7,
      name: 'Ritz Carlton Hotel',
      category: 'Hotel',
      location: 'Resort Area',
      wasteDiverted: '81%',
      esgScore: 82,
      badge: 'Silver',
      badgeColor: '#6B7280',
    },
  ];

  // Filter leaderboard by category
  const filteredLeaderboard = selectedCategory === 'All'
    ? industryLeaderboard
    : industryLeaderboard.filter(b => b.category === selectedCategory);

  // Tab Component
  const TabButton = ({ id, label, icon: Icon, isActive }) => (
    <motion.button
      whileTap={{ scale: 0.95 }}
      onClick={() => setActiveTab(id)}
      className={clsx(
        "flex-1 py-2.5 px-3 rounded-xl font-medium text-xs transition-all flex items-center justify-center gap-1.5",
        isActive
          ? "bg-[#164c51] text-white shadow-lg shadow-[#164c51]/30"
          : "bg-white text-[#6B7280]"
      )}
    >
      <Icon size={14} />
      {label}
    </motion.button>
  );

  // News Item Component
  const NewsItem = ({ news, index }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -2 }}
      className="bg-white rounded-2xl p-4 shadow-sm mb-3 cursor-pointer"
      style={{ boxShadow: '0 2px 6px rgba(0,0,0,0.04)' }}
    >
      <div className="flex items-start mb-3">
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center mr-3 flex-shrink-0"
          style={{ backgroundColor: `${news.color}1A` }}
        >
          <news.icon size={20} style={{ color: news.color }} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-0.5">
            <span className="text-sm font-semibold text-[#1F2937]">{news.author}</span>
            <span
              className="px-1.5 py-0.5 rounded text-[10px] font-medium"
              style={{
                backgroundColor: `${news.color}1A`,
                color: news.color
              }}
            >
              {news.authorType}
            </span>
          </div>
          <span className="text-xs text-[#6B7280]">{news.date}</span>
        </div>
        <span
          className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-gray-100 text-gray-600"
        >
          {news.category}
        </span>
      </div>

      <h3 className="text-sm font-semibold text-[#1F2937] mb-2">{news.title}</h3>
      <p className="text-xs text-[#6B7280] leading-relaxed line-clamp-2">{news.content}</p>
    </motion.div>
  );

  // Target Card Component
  const TargetCard = ({ target, index }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -2 }}
      className="bg-white rounded-2xl p-4 shadow-sm mb-3"
      style={{ boxShadow: '0 2px 6px rgba(0,0,0,0.04)' }}
    >
      <div className="flex items-start mb-3">
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center mr-3 flex-shrink-0"
          style={{ backgroundColor: `${target.color}1A` }}
        >
          <target.icon size={24} style={{ color: target.color }} />
        </div>
        <div className="flex-1">
          <h3 className="text-sm font-semibold text-[#1F2937] mb-1">{target.title}</h3>
          <p className="text-xs text-[#6B7280] line-clamp-2">{target.description}</p>
        </div>
      </div>

      {/* Progress */}
      <div className="mb-3">
        <div className="flex justify-between items-center mb-1">
          <span className="text-xs text-[#6B7280]">Progress</span>
          <span className="text-xs font-bold" style={{ color: target.color }}>{target.progress}%</span>
        </div>
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <motion.div
            className="h-full rounded-full"
            style={{ backgroundColor: target.color }}
            initial={{ width: 0 }}
            animate={{ width: `${target.progress}%` }}
            transition={{ duration: 0.8 }}
          />
        </div>
      </div>

      {/* Details */}
      <div className="flex items-center justify-between text-xs text-[#6B7280]">
        <div className="flex items-center gap-3">
          <span className="flex items-center">
            <Users size={12} className="mr-1" />
            {target.participants} participants
          </span>
          <span className="flex items-center">
            <Calendar size={12} className="mr-1" />
            {target.deadline}
          </span>
        </div>
        <span className="flex items-center text-[#D48931] font-medium">
          <Award size={12} className="mr-1" />
          {target.reward}
        </span>
      </div>
    </motion.div>
  );

  // Leaderboard Item Component
  const LeaderboardItem = ({ building, index }) => (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05 }}
      className={clsx(
        "bg-white rounded-2xl p-4 shadow-sm mb-3",
        building.isCurrentUser && "border-2 border-[#164c51]"
      )}
      style={{ boxShadow: '0 2px 6px rgba(0,0,0,0.04)' }}
    >
      <div className="flex items-center">
        {/* Rank */}
        <div
          className={clsx(
            "w-10 h-10 rounded-full flex items-center justify-center mr-3 font-bold text-sm",
            building.rank <= 3
              ? 'bg-gradient-to-br from-[#D48931] to-[#B8741F] text-white'
              : 'bg-gray-100 text-gray-600'
          )}
        >
          #{building.rank}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-0.5">
            <h3 className="text-sm font-semibold text-[#1F2937] truncate">{building.name}</h3>
            {building.isCurrentUser && (
              <span className="px-1.5 py-0.5 bg-[#164c51] text-white text-[10px] font-bold rounded">
                YOU
              </span>
            )}
          </div>
          <div className="flex items-center gap-2 text-xs text-[#6B7280]">
            <Building2 size={12} />
            <span>{building.category}</span>
            <span>•</span>
            <MapPin size={12} />
            <span>{building.location}</span>
          </div>
        </div>

        {/* Stats */}
        <div className="text-right">
          <div
            className="px-2 py-0.5 rounded-full text-[10px] font-bold mb-1"
            style={{
              backgroundColor: `${building.badgeColor}1A`,
              color: building.badgeColor
            }}
          >
            {building.badge}
          </div>
          <div className="text-sm font-bold text-[#164c51]">{building.wasteDiverted}</div>
          <div className="text-[10px] text-[#6B7280]">diverted</div>
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="h-full bg-[#F8FAFC] flex flex-col relative">
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
          Partner Network
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="text-[#6B7280] text-sm mt-1"
        >
          Industry benchmarks & partner insights
        </motion.p>
      </motion.div>

      {/* Partner Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mx-4 mb-4 p-4 rounded-xl bg-gradient-to-r from-[#164c51] to-[#0C2521]"
      >
        <div className="flex items-center justify-between text-white">
          <div className="flex items-center">
            <Handshake size={24} className="mr-3" />
            <div>
              <div className="text-lg font-bold">150+ Partners</div>
              <div className="text-xs text-white/80">Across all industries</div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-lg font-bold">#4</div>
            <div className="text-xs text-white/80">Your Rank</div>
          </div>
        </div>
      </motion.div>

      {/* Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="px-4 mb-4"
      >
        <div className="flex gap-2 bg-gray-100 p-1 rounded-xl">
          <TabButton id="news" label="News" icon={Newspaper} isActive={activeTab === 'news'} />
          <TabButton id="targets" label="Targets" icon={Target} isActive={activeTab === 'targets'} />
          <TabButton id="leaderboard" label="Rankings" icon={Trophy} isActive={activeTab === 'leaderboard'} />
        </div>
      </motion.div>

      {/* Category Filter for Leaderboard */}
      {activeTab === 'leaderboard' && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="px-4 mb-3"
        >
          <div className="flex gap-2 overflow-x-auto scrollbar-hide">
            {categories.map((category) => (
              <motion.button
                key={category}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory(category)}
                className={clsx(
                  "px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all",
                  selectedCategory === category
                    ? "bg-[#164c51] text-white"
                    : "bg-white text-[#6B7280] border border-gray-200"
                )}
              >
                {category}
              </motion.button>
            ))}
          </div>
        </motion.div>
      )}

      {/* Content */}
      <div className="flex-1 px-4 pb-4 overflow-y-auto scrollbar-hide">
        <AnimatePresence mode="wait">
          {activeTab === 'news' && (
            <motion.div
              key="news"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {industryNews.map((news, index) => (
                <NewsItem key={news.id} news={news} index={index} />
              ))}
            </motion.div>
          )}

          {activeTab === 'targets' && (
            <motion.div
              key="targets"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {industryTargets.map((target, index) => (
                <TargetCard key={target.id} target={target} index={index} />
              ))}
            </motion.div>
          )}

          {activeTab === 'leaderboard' && (
            <motion.div
              key="leaderboard"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {filteredLeaderboard.map((building, index) => (
                <LeaderboardItem key={building.rank} building={building} index={index} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default CommunityPage;