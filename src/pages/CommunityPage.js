import React, { useState, useEffect } from 'react';
import { Heart, MessageCircle, Share2, Plus, Trophy, Clock, Star, Users, Target, Award, X, CheckCircle, Calendar, MapPin } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSearchParams } from 'react-router-dom';
import { clsx } from 'clsx';
import { AppLogo } from '../components/ui';

const CommunityPage = () => {
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState(0);

  // Handle tab parameter from URL
  useEffect(() => {
    const tabParam = searchParams.get('tab');
    if (tabParam) {
      const tabIndex = parseInt(tabParam);
      if (tabIndex >= 0 && tabIndex < 3) {
        setActiveTab(tabIndex);
      }
    }
  }, [searchParams]);
  const [showChallengeModal, setShowChallengeModal] = useState(false);
  const [selectedChallenge, setSelectedChallenge] = useState(null);
  const [notification, setNotification] = useState(null);
  const [posts, setPosts] = useState([
    {
      id: '1',
      author: 'Sarah Green',
      avatar: 'SG',
      timeAgo: '2 hours ago',
      content: 'Successfully made compost from kitchen waste this week! The results are great and plants are more fertile 🌱',
      imageUrl: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=300&fit=crop&crop=center',
      likes: 24,
      comments: 8,
      isLiked: false,
      tags: ['compost', 'organic'],
    },
    {
      id: '2',
      author: 'Budi Recycler',
      avatar: 'BR',
      timeAgo: '5 hours ago',
      content: "Today's tip: Used plastic bottles can be turned into unique plant pots! Try it at home 💡",
      imageUrl: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=400&h=300&fit=crop&crop=center',
      likes: 18,
      comments: 12,
      isLiked: true,
      tags: ['diy', 'plastic'],
    },
    {
      id: '3',
      author: 'Eco Warrior',
      avatar: 'EW',
      timeAgo: '1 day ago',
      content: "This week's challenge: Zero waste for 7 days! Who wants to join? 🌍",
      imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop&crop=center',
      likes: 45,
      comments: 23,
      isLiked: false,
      tags: ['challenge', 'zerowaste'],
    },
    {
      id: '4',
      author: 'Green Guru',
      avatar: 'GG',
      timeAgo: '2 days ago',
      content: 'Made my own eco-friendly cleaning products using vinegar and baking soda. Amazing results! ✨',
      imageUrl: 'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=400&h=300&fit=crop&crop=center',
      likes: 31,
      comments: 15,
      isLiked: false,
      tags: ['diy', 'cleaning', 'ecofriendly'],
    },
    {
      id: '5',
      author: 'Earth Guardian',
      avatar: 'EG',
      timeAgo: '3 days ago',
      content: 'Visited local farmers market today and bought everything using reusable bags. Zero plastic! 🛍️',
      imageUrl: 'https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=400&h=300&fit=crop&crop=center',
      likes: 52,
      comments: 19,
      isLiked: true,
      tags: ['zerowaste', 'shopping', 'sustainable'],
    },
  ]);

  const challenges = [
    {
      id: '1',
      title: 'Zero Waste Week',
      description: 'Try to produce zero waste for 7 consecutive days',
      participants: 156,
      points: 200,
      timeLeft: '3 days left',
      progress: 0.6,
      color: '#164c51',
      icon: Target,
      fullDescription: 'Join our Zero Waste Week challenge and learn to minimize your environmental impact! For 7 consecutive days, aim to produce as little waste as possible.',
      requirements: [
        'Use reusable bags for shopping',
        'Avoid single-use plastics',
        'Compost organic waste',
        'Repair instead of throwing away',
        'Buy only what you need'
      ],
      tips: [
        'Plan your meals to avoid food waste',
        'Bring your own containers when buying food',
        'Choose products with minimal packaging',
        'Share or donate items you no longer need'
      ]
    },
    {
      id: '2',
      title: 'Plastic Free July',
      description: 'Avoid single-use plastic for the entire month',
      participants: 89,
      points: 500,
      timeLeft: '15 days left',
      progress: 0.3,
      color: '#6d1e04',
      icon: Trophy,
      fullDescription: 'Take on the ultimate plastic-free challenge! Spend the entire month of July without using any single-use plastic items.',
      requirements: [
        'No plastic bags or containers',
        'Use glass or metal water bottles',
        'Avoid plastic-wrapped foods',
        'Choose bar soap over liquid',
        'Use bamboo or metal straws'
      ],
      tips: [
        'Carry a reusable shopping bag everywhere',
        'Invest in glass food storage containers',
        'Find local stores that sell bulk items',
        'Make your own cleaning products'
      ]
    },
    {
      id: '3',
      title: 'Compost Challenge',
      description: 'Create compost from organic waste at home',
      participants: 234,
      points: 150,
      timeLeft: '1 week left',
      progress: 0.0,
      color: '#D48931',
      icon: Star,
      fullDescription: 'Transform your kitchen scraps into nutrient-rich compost! Learn the art of composting and create your own organic fertilizer.',
      requirements: [
        'Set up a compost bin or pile',
        'Collect organic kitchen waste',
        'Maintain proper carbon-nitrogen ratio',
        'Turn compost regularly',
        'Monitor moisture levels'
      ],
      tips: [
        'Mix green waste (food scraps) with brown waste (dry leaves)',
        'Keep compost moist but not soggy',
        'Turn every 2-3 weeks for faster decomposition',
        'Avoid meat, dairy, and oily foods'
      ]
    },
  ];

  const leaderboard = [
    {
      name: 'Eco Master',
      points: 3450,
      level: 'Expert',
      avatar: 'EM',
      rank: 1,
    },
    {
      name: 'Green Ninja',
      points: 2890,
      level: 'Advanced',
      avatar: 'GN',
      rank: 2,
    },
    {
      name: 'Earth Lover',
      points: 2650,
      level: 'Advanced',
      avatar: 'EL',
      rank: 3,
    },
    {
      name: 'You',
      points: 2450,
      level: 'Intermediate',
      avatar: 'Y',
      rank: 4,
    },
  ];

  const tabs = ['Feed', 'Challenges', 'Leaderboard'];

  const handleLike = (postId) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { 
            ...post, 
            isLiked: !post.isLiked, 
            likes: post.isLiked ? post.likes - 1 : post.likes + 1 
          }
        : post
    ));
  };

  const handleChallengeClick = (challenge) => {
    setSelectedChallenge(challenge);
    setShowChallengeModal(true);
  };

  const handleShare = (post) => {
    // Simulate share functionality
    if (navigator.share) {
      navigator.share({
        title: `${post.author}'s post`,
        text: post.content,
        url: window.location.href,
      });
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(`${post.content} - ${window.location.href}`);
      setNotification({
        type: 'success',
        title: 'Link Copied!',
        message: 'Post link has been copied to clipboard'
      });
      setTimeout(() => setNotification(null), 3000);
    }
  };

  const getRankColor = (rank) => {
    switch (rank) {
      case 1: return '#D48931'; // Gold
      case 2: return '#6B7280'; // Silver
      case 3: return '#6d1e04'; // Bronze
      default: return '#164c51'; // Green
    }
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
        className={`absolute top-4 left-4 right-4 z-50 ${
          isSuccess ? 'bg-[#164c51]' : 'bg-[#D48931]'
        } text-white p-3 rounded-xl shadow-xl`}
        style={{ 
          boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
          maxWidth: '320px',
          margin: '0 auto'
        }}
      >
        <div className="flex items-start">
          <div className={`w-6 h-6 rounded-full flex items-center justify-center mr-2 ${
            isSuccess ? 'bg-white/20' : 'bg-white/20'
          }`}>
            {isSuccess ? (
              <CheckCircle size={12} />
            ) : (
              <X size={12} />
            )}
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

  // Post Card Component
  const PostCard = ({ post, index }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -2, boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}
      className="bg-white rounded-2xl p-4 shadow-sm mb-4 cursor-pointer"
      style={{ boxShadow: '0 2px 6px rgba(0,0,0,0.04)' }}
    >
      {/* Header */}
      <div className="flex items-center mb-3">
        <motion.div 
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="w-10 h-10 bg-[#164c51] rounded-full flex items-center justify-center mr-3 cursor-pointer"
        >
          <span className="text-white font-semibold text-sm">{post.avatar}</span>
        </motion.div>
        <div className="flex-1">
          <motion.h3 
            whileHover={{ color: '#164c51' }}
            className="font-semibold text-[#0C2521] text-sm cursor-pointer transition-colors"
          >
            {post.author}
          </motion.h3>
          <p className="text-xs text-[#6B7280]">{post.timeAgo}</p>
        </div>
      </div>

      {/* Content */}
      <p className="text-[#0C2521] text-sm leading-relaxed mb-3">{post.content}</p>

      {/* Image */}
      {post.imageUrl && (
        <motion.div 
          whileHover={{ scale: 1.02 }}
          className="w-full h-40 rounded-xl mb-3 overflow-hidden cursor-pointer"
        >
          <img 
            src={post.imageUrl} 
            alt={post.content}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'flex';
            }}
          />
          <div className="w-full h-full bg-gradient-to-br from-[#164c51]/20 to-[#0C2521]/20 hidden items-center justify-center">
            <span className="text-[#164c51] text-xs">📸 Image unavailable</span>
          </div>
        </motion.div>
      )}

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-3">
        {post.tags.map((tag, tagIndex) => (
          <motion.span
            key={tagIndex}
            whileHover={{ scale: 1.05, backgroundColor: '#164c51', color: 'white' }}
            whileTap={{ scale: 0.95 }}
            className="px-2 py-1 bg-[#164c51]/10 text-[#164c51] text-xs font-medium rounded-full cursor-pointer transition-colors"
          >
            #{tag}
          </motion.span>
        ))}
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between pt-3 border-t border-gray-100">
        <div className="flex items-center gap-4">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => handleLike(post.id)}
            className="flex items-center gap-1"
          >
            <Heart 
              size={16} 
              className={clsx(
                post.isLiked ? 'text-[#D48931] fill-current' : 'text-[#6B7280]'
              )} 
            />
            <span className="text-sm text-[#6B7280]">{post.likes}</span>
          </motion.button>
          <motion.button 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-1"
          >
            <MessageCircle size={16} className="text-[#6B7280] hover:text-[#164c51] transition-colors" />
            <span className="text-sm text-[#6B7280]">{post.comments}</span>
          </motion.button>
        </div>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => handleShare(post)}
        >
          <Share2 size={16} className="text-[#6B7280] hover:text-[#164c51] transition-colors" />
        </motion.button>
      </div>
    </motion.div>
  );

  // Challenge Card Component
  const ChallengeCard = ({ challenge, index }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="bg-white rounded-2xl p-4 shadow-sm mb-4"
      style={{ boxShadow: '0 2px 6px rgba(0,0,0,0.04)' }}
    >
      <div className="flex items-start mb-3">
        <div 
          className="w-12 h-12 rounded-full flex items-center justify-center mr-3"
          style={{ backgroundColor: `${challenge.color}1A` }}
        >
          <challenge.icon size={24} style={{ color: challenge.color }} />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-[#1F2937] text-base">{challenge.title}</h3>
          <p className="text-sm text-[#6B7280] mt-1">{challenge.description}</p>
        </div>
      </div>

      <div className="flex items-center justify-between mb-3 text-sm text-[#6B7280]">
        <div className="flex items-center gap-4">
                <div className="flex items-center">
            <Users size={14} className="mr-1" />
            {challenge.participants} joined
                    </div>
          <div className="flex items-center">
            <Star size={14} className="mr-1 text-[#F59E0B]" />
            {challenge.points} pts
                    </div>
                </div>
        <div className="flex items-center">
          <Clock size={14} className="mr-1" />
          {challenge.timeLeft}
        </div>
            </div>

      {/* Progress Bar */}
      {challenge.progress > 0 && (
        <div className="mb-3">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-[#1F2937]">Progress</span>
            <span 
              className="text-sm font-bold"
              style={{ color: challenge.color }}
            >
              {Math.round(challenge.progress * 100)}%
            </span>
                </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <motion.div
              className="h-2 rounded-full"
              style={{ backgroundColor: challenge.color }}
              initial={{ width: 0 }}
              animate={{ width: `${challenge.progress * 100}%` }}
              transition={{ duration: 1, delay: index * 0.1 + 0.3 }}
            />
            </div>
        </div>
      )}

      <motion.button
        whileTap={{ scale: 0.98 }}
        whileHover={{ scale: 1.02 }}
        onClick={() => handleChallengeClick(challenge)}
        className="w-full py-2.5 bg-[#164c51] text-white rounded-xl font-semibold text-sm shadow-lg shadow-[#164c51]/30 hover:bg-[#0C2521] transition-colors"
      >
        {challenge.progress > 0 ? 'Continue' : 'Join Challenge'}
      </motion.button>
    </motion.div>
  );

  // Challenge Modal Component
  const ChallengeModal = () => {
    if (!selectedChallenge) return null;

    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-white rounded-xl p-4 w-full mx-4 max-h-[80vh] overflow-y-auto"
          style={{ 
            maxWidth: '350px',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(0, 0, 0, 0.05)'
          }}
        >
            {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <div 
                className="w-10 h-10 rounded-full flex items-center justify-center mr-3"
                style={{ backgroundColor: `${selectedChallenge.color}1A` }}
              >
                <selectedChallenge.icon size={20} style={{ color: selectedChallenge.color }} />
              </div>
              <h2 className="text-lg font-bold text-[#1F2937]">{selectedChallenge.title}</h2>
            </div>
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setShowChallengeModal(false)}
              className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200"
            >
              <X size={16} className="text-gray-600" />
            </motion.button>
          </div>

          {/* Challenge Info */}
          <div className="mb-4">
            <p className="text-sm text-[#6B7280] mb-3">{selectedChallenge.fullDescription}</p>
            
            <div className="flex items-center justify-between mb-4 text-sm">
              <div className="flex items-center gap-4">
                <div className="flex items-center">
                  <Users size={14} className="mr-1 text-[#6B7280]" />
                  <span className="text-[#6B7280]">{selectedChallenge.participants} joined</span>
                </div>
                <div className="flex items-center">
                  <Star size={14} className="mr-1 text-[#F59E0B]" />
                  <span className="text-[#6B7280]">{selectedChallenge.points} pts</span>
                </div>
              </div>
              <div className="flex items-center">
                <Clock size={14} className="mr-1 text-[#6B7280]" />
                <span className="text-[#6B7280]">{selectedChallenge.timeLeft}</span>
              </div>
            </div>
          </div>

          {/* Requirements */}
          <div className="mb-4">
            <h3 className="font-semibold text-[#1F2937] mb-2 flex items-center">
              <CheckCircle size={16} className="mr-2 text-[#164c51]" />
              Requirements
            </h3>
            <ul className="space-y-2">
              {selectedChallenge.requirements.map((req, index) => (
                <li key={index} className="flex items-start text-sm text-[#6B7280]">
                  <span className="w-1.5 h-1.5 bg-[#164c51] rounded-full mt-2 mr-2 flex-shrink-0"></span>
                  {req}
                </li>
              ))}
            </ul>
          </div>

          {/* Tips */}
          <div className="mb-6">
            <h3 className="font-semibold text-[#1F2937] mb-2 flex items-center">
              <Star size={16} className="mr-2 text-[#F59E0B]" />
              Tips for Success
            </h3>
            <ul className="space-y-2">
              {selectedChallenge.tips.map((tip, index) => (
                <li key={index} className="flex items-start text-sm text-[#6B7280]">
                  <span className="w-1.5 h-1.5 bg-[#F59E0B] rounded-full mt-2 mr-2 flex-shrink-0"></span>
                  {tip}
                </li>
              ))}
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <motion.button
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowChallengeModal(false)}
              className="flex-1 py-2.5 bg-gray-100 text-[#6B7280] rounded-xl font-semibold text-sm"
            >
              Cancel
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.98 }}
              whileHover={{ scale: 1.02 }}
              onClick={() => {
                setShowChallengeModal(false);
                // Show success notification
                setNotification({
                  type: 'success',
                  title: 'Challenge Joined!',
                  message: `You've successfully joined the ${selectedChallenge.title} challenge. Good luck!`
                });
                // Auto hide notification after 4 seconds
                setTimeout(() => setNotification(null), 4000);
              }}
              className="flex-1 py-2.5 bg-[#164c51] text-white rounded-xl font-semibold text-sm shadow-lg shadow-[#164c51]/30"
            >
              {selectedChallenge.progress > 0 ? 'Continue' : 'Join Now'}
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    );
  };

  // Leaderboard Item Component
  const LeaderboardItem = ({ user, index }) => {
    const isCurrentUser = user.name === 'You';

    return (
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: index * 0.1 }}
        className={clsx(
          "bg-white rounded-2xl p-4 shadow-sm mb-3",
          isCurrentUser && "border-2 border-[#164c51]"
        )}
        style={{ boxShadow: '0 2px 6px rgba(0,0,0,0.04)' }}
      >
        <div className="flex items-center">
          {/* Rank */}
          <div 
            className="w-10 h-10 rounded-full flex items-center justify-center mr-3"
            style={{ backgroundColor: `${getRankColor(user.rank)}1A` }}
          >
            <span 
              className="font-bold text-sm"
              style={{ color: getRankColor(user.rank) }}
            >
              #{user.rank}
            </span>
          </div>

          {/* Avatar */}
          <div 
            className="w-12 h-12 rounded-full flex items-center justify-center mr-3"
            style={{ 
              backgroundColor: isCurrentUser ? '#164c51' : '#6d1e04'
            }}
          >
            <span className="text-white font-semibold">{user.avatar}</span>
          </div>

          {/* User Info */}
          <div className="flex-1">
            <h3 
              className={clsx(
                "font-semibold text-base",
                isCurrentUser ? "text-[#164c51]" : "text-[#1F2937]"
              )}
            >
              {user.name}
            </h3>
            <p className="text-sm text-[#6B7280]">{user.level}</p>
            </div>

          {/* Points */}
          <div className="text-right">
            <div className="text-lg font-bold text-[#F59E0B]">{user.points}</div>
            <div className="text-xs text-[#6B7280]">points</div>
            </div>
        </div>
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

      {/* Header - exact Flutter recreation */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-4 pt-12"
      >
        {/* App Logo */}
        <div className="mb-4">
          <AppLogo variant="compact" />
        </div>

        <motion.h1 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-2xl font-bold text-[#1F2937]"
        >
          Community
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="text-[#6B7280] text-sm mt-1"
        >
          Share experiences with fellow eco-warriors
        </motion.p>
      </motion.div>

      {/* Tab Bar - exact Flutter recreation */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="px-4 mb-4"
      >
        <div className="flex border-b border-gray-200">
          {tabs.map((tab, index) => (
            <motion.button
              key={tab}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveTab(index)}
              className={clsx(
                "flex-1 py-3 text-sm font-semibold relative",
                activeTab === index 
                  ? "text-[#164c51]" 
                  : "text-[#6B7280]"
              )}
            >
              {tab}
              {activeTab === index && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#164c51]"
                />
              )}
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Tab Content */}
      <div className="flex-1 overflow-y-auto scrollbar-hide">
        <AnimatePresence mode="wait">
          {activeTab === 0 && (
            <motion.div
              key="feed"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="px-4 pb-4"
            >
              {posts.map((post, index) => (
                <PostCard key={post.id} post={post} index={index} />
              ))}
            </motion.div>
          )}

          {activeTab === 1 && (
            <motion.div
              key="challenges"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="px-4 pb-4"
            >
              {challenges.map((challenge, index) => (
                <ChallengeCard key={challenge.id} challenge={challenge} index={index} />
              ))}
            </motion.div>
          )}

          {activeTab === 2 && (
            <motion.div
              key="leaderboard"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="px-4 pb-4"
            >
              <h2 className="text-lg font-bold text-[#1F2937] mb-4">Top Eco-Warriors</h2>
              {leaderboard.map((user, index) => (
                <LeaderboardItem key={user.name} user={user} index={index} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Floating Action Button - Only show on Feed tab */}
      {activeTab === 0 && (
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0 }}
          className="absolute bottom-6 right-6 w-14 h-14 bg-[#164c51] rounded-full flex items-center justify-center shadow-lg shadow-[#164c51]/30"
        >
          <Plus size={24} className="text-white" />
        </motion.button>
      )}

      {/* Challenge Modal */}
      <AnimatePresence>
        {showChallengeModal && <ChallengeModal />}
      </AnimatePresence>
        </div>
    );
};

export default CommunityPage; 