import React, { useState, useEffect } from 'react';
import { Trophy, TrendingUp, Target, Leaf, Flame, Globe } from 'lucide-react';
import { motion } from 'framer-motion';
import useToast from '../hooks/useToast';
import { Toast } from '../components/ui';

const CommunityPage = () => {
  const [activeTab, setActiveTab] = useState('feed');
  const [likedPosts, setLikedPosts] = useState({});
  const [joinedChallenges, setJoinedChallenges] = useState({});
  const { toast, showToast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => { const t = setTimeout(() => setIsLoading(false), 600); return () => clearTimeout(t); }, []);

  const tabs = [
    { id: 'feed', label: 'Impact Feed', icon: Leaf },
    { id: 'leaderboard', label: 'Leaderboard', icon: Trophy },
    { id: 'challenges', label: 'Challenges', icon: Target },
  ];

  const feedPosts = [
    { id: 1, author: 'Restoran Padang Jaya', avatar: '🍽️', time: '2h ago', content: 'We diverted 200kg of food waste this month through BIMA! Our kitchen team is proud to contribute to clean energy.', likes: 42, impact: '200 kg diverted', impactIcon: Leaf, color: '#0D9488' },
    { id: 2, author: 'Hotel Grand Nusantara', avatar: '🏨', time: '5h ago', content: 'Achieved Gold Sustainability status! Thank you BIMA for helping us reduce our carbon footprint by 40%.', likes: 89, impact: '40% CO₂ reduction', impactIcon: TrendingUp, color: '#065F46' },
    { id: 3, author: 'Warung Bu Eko', avatar: '🍜', time: '1d ago', content: 'Just switched to Bio-LPG from conventional LPG. Saving 32% on fuel costs while helping the environment!', likes: 31, impact: 'Rp 245K saved', impactIcon: Flame, color: '#D97706' },
    { id: 4, author: 'Kota Surabaya', avatar: '🏙️', time: '2d ago', content: 'Our city reached a milestone: 500 tons of food waste diverted from landfills through the BIMA network!', likes: 156, impact: '500 tons diverted', impactIcon: Globe, color: '#7C3AED' },
  ];

  const leaderboards = [
    {
      category: 'Top Restaurants', items: [
        { rank: 1, name: 'Restoran Padang Jaya', value: '2,400 kg', trend: '+12%', avatar: '🍽️' },
        { rank: 2, name: 'Bakso Malang Cak To', value: '1,850 kg', trend: '+8%', avatar: '🍜' },
        { rank: 3, name: 'Sate Pak Kumis', value: '1,200 kg', trend: '+15%', avatar: '🥘' },
        { rank: 4, name: 'Nasi Goreng Bu Eni', value: '980 kg', trend: '+5%', avatar: '🍚' },
        { rank: 5, name: 'Warung Spesial Sambal', value: '750 kg', trend: '+20%', avatar: '🌶️' },
      ]
    },
    {
      category: 'Top Waste Contributors', items: [
        { rank: 1, name: 'Hotel Grand Nusantara', value: '8,500 kg', trend: '+22%', avatar: '🏨' },
        { rank: 2, name: 'Mall Central Plaza', value: '6,200 kg', trend: '+10%', avatar: '🏬' },
        { rank: 3, name: 'RS Siloam Surabaya', value: '4,800 kg', trend: '+7%', avatar: '🏥' },
      ]
    },
    {
      category: 'Top Green Cities', items: [
        { rank: 1, name: 'Surabaya', value: '38 tons', trend: '+18%', avatar: '🏙️' },
        { rank: 2, name: 'Malang', value: '22 tons', trend: '+25%', avatar: '🌿' },
        { rank: 3, name: 'Sidoarjo', value: '15 tons', trend: '+30%', avatar: '🏘️' },
      ]
    },
  ];

  const challenges = [
    { id: 1, title: '1000 Ton Challenge', desc: 'City-wide goal to divert 1000 tons by March', progress: 78, participants: 156, reward: '500 EC', color: '#0D9488', deadline: '28 days left' },
    { id: 2, title: 'Zero Waste Week', desc: 'Reduce contaminated waste to zero for 7 days', progress: 42, participants: 89, reward: '200 EC', color: '#D97706', deadline: '5 days left' },
    { id: 3, title: 'Bio-LPG Switch', desc: 'Help 50 households switch to Bio-LPG', progress: 64, participants: 234, reward: '300 EC', color: '#065F46', deadline: '14 days left' },
    { id: 4, title: 'Refer & Impact', desc: 'Refer 10 new suppliers to BIMA platform', progress: 25, participants: 45, reward: '150 EC', color: '#7C3AED', deadline: '21 days left' },
  ];

  const toggleLike = (postId) => {
    setLikedPosts(prev => ({ ...prev, [postId]: !prev[postId] }));
  };

  const toggleJoin = (challengeId) => {
    const isJoined = joinedChallenges[challengeId];
    setJoinedChallenges(prev => ({ ...prev, [challengeId]: !isJoined }));
    showToast(isJoined ? 'Left challenge' : 'Joined challenge! 🎉');
  };

  return (
    <div className="min-h-full bg-bima-secondary">
      {/* Toast */}
      <Toast message={toast} />

      {/* Header */}
      <div className="bg-gradient-to-br from-bima-dark to-bima-primary px-5 pt-6 pb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-xl font-bold text-white">Community</h1>
            <p className="text-white/70 text-xs">Impact sharing & sustainability rankings</p>
          </div>
          <div className="bg-white/15 rounded-xl px-3 py-1.5">
            <span className="text-white text-xs font-semibold">Rank #12</span>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex bg-white/15 rounded-xl p-1">
          {tabs.map((tab) => (
            <motion.button key={tab.id} whileTap={{ scale: 0.95 }}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 py-2 rounded-lg text-[11px] font-semibold transition-all flex items-center justify-center gap-1
              ${activeTab === tab.id ? 'bg-white text-bima-dark' : 'text-white/70'}`}>
              <tab.icon size={12} />
              {tab.label}
            </motion.button>
          ))}
        </div>
      </div>

      {isLoading ? (
        <div className="px-5 py-4 space-y-3">
          {[1,2,3].map(i => (
            <div key={i} className="animate-pulse bg-gray-200 rounded-2xl h-32" />
          ))}
        </div>
      ) : (
        <div className="px-5 py-4">
          {/* Impact Feed */}
          {activeTab === 'feed' && (
            <div className="space-y-3 mb-8">
              {feedPosts.map((post, i) => (
                <motion.div key={post.id} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                  onClick={() => showToast(post.author + ': ' + post.content.substring(0, 60) + '...')}
                  className="bg-white rounded-2xl p-4 shadow-sm cursor-pointer">
                  <div className="flex items-center gap-2 mb-2.5">
                    <span className="text-2xl">{post.avatar}</span>
                    <div>
                      <h3 className="text-sm font-bold text-gray-800 truncate">{post.author}</h3>
                      <span className="text-[10px] text-gray-400">{post.time}</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-700 leading-relaxed mb-3 line-clamp-3">{post.content}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full"
                      style={{ backgroundColor: `${post.color}10` }}>
                      <post.impactIcon size={12} style={{ color: post.color }} />
                      <span className="text-[10px] font-bold" style={{ color: post.color }}>{post.impact}</span>
                    </div>
                    <motion.button whileTap={{ scale: 0.9 }}
                      onClick={(e) => { e.stopPropagation(); toggleLike(post.id); }}
                      className="flex items-center gap-1 text-xs text-gray-400 hover:text-red-400 transition-colors">
                      <span>{likedPosts[post.id] ? '❤️' : '🤍'}</span>
                      <span>{post.likes + (likedPosts[post.id] ? 1 : 0)}</span>
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {/* Leaderboard */}
          {activeTab === 'leaderboard' && (
            <div className="space-y-6 mb-8">
              {leaderboards.map((board, bi) => (
                <div key={bi}>
                  <h3 className="text-sm font-bold text-gray-800 mb-2">{board.category}</h3>
                  <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
                    {board.items.map((item, i) => (
                      <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.08 }}
                        className={`flex items-center p-3 ${i < board.items.length - 1 ? 'border-b border-gray-50' : ''}`}>
                        <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold mr-3
                          ${item.rank === 1 ? 'bg-yellow-100 text-yellow-700' :
                            item.rank === 2 ? 'bg-gray-100 text-gray-600' :
                              item.rank === 3 ? 'bg-amber-100 text-amber-700' :
                                'bg-gray-50 text-gray-400'}`}>
                          {item.rank}
                        </div>
                        <span className="text-lg mr-2">{item.avatar}</span>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-xs font-semibold text-gray-800 truncate">{item.name}</h4>
                          <span className="text-[10px] text-gray-500">{item.value}</span>
                        </div>
                        <span className="text-[10px] font-bold text-bima-primary">{item.trend}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Challenges */}
          {activeTab === 'challenges' && (
            <div className="space-y-3 mb-8">
              {challenges.map((challenge, i) => {
                const isJoined = joinedChallenges[challenge.id];
                return (
                  <motion.div key={challenge.id} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.08 }}
                    className="bg-white rounded-2xl p-4 shadow-sm">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-sm font-bold text-gray-800">{challenge.title}</h3>
                      <span className="text-[9px] font-bold px-2 py-0.5 rounded-full"
                        style={{ backgroundColor: `${challenge.color}15`, color: challenge.color }}>
                        {challenge.deadline}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 mb-3">{challenge.desc}</p>
                    <div className="w-full bg-gray-100 rounded-full h-2 mb-2">
                      <motion.div className="h-2 rounded-full"
                        style={{ backgroundColor: challenge.color }}
                        initial={{ width: 0 }}
                        animate={{ width: `${challenge.progress}%` }}
                        transition={{ duration: 0.8, delay: i * 0.1 }} />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] text-gray-400">
                        {challenge.progress}% • {challenge.participants + (isJoined ? 1 : 0)} participants
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold text-bima-primary">🏆 {challenge.reward}</span>
                        <motion.button whileTap={{ scale: 0.95 }}
                          onClick={() => toggleJoin(challenge.id)}
                          className={`text-[10px] font-bold px-3 py-1 rounded-lg transition-all
                            ${isJoined
                              ? 'bg-gray-100 text-gray-500'
                              : 'text-white'}`}
                          style={!isJoined ? { backgroundColor: challenge.color } : {}}>
                          {isJoined ? 'Joined ✓' : 'Join'}
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CommunityPage;