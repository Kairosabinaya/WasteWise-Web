import React, { useState } from 'react';
import { BookOpen, ChevronRight, Clock, Award, CheckCircle, Star, GraduationCap, X, Play, Leaf, Flame, Factory, Globe, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { clsx } from 'clsx';

const EducationPage = () => {
  const [activeTab, setActiveTab] = useState('courses');
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [courseProgress, setCourseProgress] = useState({
    1: 100, 2: 65, 3: 30, 4: 0, 5: 0,
  });
  const [toast, setToast] = useState(null);

  const showToast = (message) => {
    setToast(message);
    setTimeout(() => setToast(null), 2000);
  };

  const tabs = [
    { id: 'courses', label: 'Courses' },
    { id: 'badges', label: 'Badges' },
    { id: 'certificates', label: 'Certificates' },
  ];

  const courses = [
    { id: 1, title: 'Food Waste Economics', desc: 'Understanding the financial impact of food waste in Southeast Asia', duration: '15 min', level: 'Beginner', icon: '📊', color: '#0D9488', credits: 20 },
    { id: 2, title: 'Biogas Production 101', desc: 'How anaerobic digestion converts organic waste into clean energy', duration: '25 min', level: 'Beginner', icon: '⚡', color: '#D97706', credits: 35 },
    { id: 3, title: 'Circular Economy Principles', desc: 'Moving from linear to circular: the BIMA approach', duration: '20 min', level: 'Intermediate', icon: '♻️', color: '#065F46', credits: 30 },
    { id: 4, title: 'Methane Emissions & Climate', desc: 'Why reducing methane from waste matters for climate goals', duration: '18 min', level: 'Intermediate', icon: '🌍', color: '#7C3AED', credits: 25 },
    { id: 5, title: 'Net Zero Cities', desc: 'How decentralized energy systems help cities reach net zero', duration: '30 min', level: 'Advanced', icon: '🏙️', color: '#2563EB', credits: 50 },
  ];

  const badges = [
    { id: 1, name: 'Waste Warrior', desc: 'Complete 5 waste pickups', icon: '⚔️', earned: true, color: '#0D9488' },
    { id: 2, name: 'Green Learner', desc: 'Finish 3 courses', icon: '📚', earned: true, color: '#065F46' },
    { id: 3, name: 'Bio-Pioneer', desc: 'First Bio-LPG order', icon: '🔥', earned: true, color: '#D97706' },
    { id: 4, name: 'Carbon Hero', desc: 'Offset 100kg CO₂', icon: '🌱', earned: false, color: '#7C3AED', progress: '72/100 kg' },
    { id: 5, name: 'Community Leader', desc: 'Refer 10 partners', icon: '👥', earned: false, color: '#2563EB', progress: '4/10' },
    { id: 6, name: 'Sustainability Champion', desc: 'Complete all courses', icon: '🏆', earned: false, color: '#DC2626', progress: '1/5' },
  ];

  const certificates = [
    { id: 1, title: 'Food Waste Management', issuer: 'BIMA Academy', date: 'Jan 2026', status: 'earned', color: '#0D9488' },
    { id: 2, title: 'Biogas Technology Basics', issuer: 'BIMA Academy', date: 'In Progress', status: 'progress', color: '#D97706' },
    { id: 3, title: 'Circular Economy Professional', issuer: 'BIMA x GBCI', date: 'Locked', status: 'locked', color: '#065F46' },
  ];

  const handleStartCourse = (course) => {
    const current = courseProgress[course.id] || 0;
    if (current >= 100) {
      showToast(`Already completed! +${course.credits} EC earned`);
    } else {
      const newProgress = Math.min(100, current + 35);
      setCourseProgress(prev => ({ ...prev, [course.id]: newProgress }));
      if (newProgress >= 100) {
        showToast(`Course completed! +${course.credits} EC earned 🎉`);
      } else {
        showToast(`Progress: ${newProgress}% — keep going!`);
      }
    }
    setSelectedCourse(null);
  };

  const completedCount = Object.values(courseProgress).filter(p => p >= 100).length;

  return (
    <div className="min-h-full bg-[#F0FDF9]">
      {/* Toast */}
      <AnimatePresence>
        {toast && (
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
            className="fixed top-14 left-1/2 -translate-x-1/2 z-[100] bg-gray-800 text-white px-4 py-2.5 rounded-xl text-xs font-semibold shadow-lg flex items-center gap-2 whitespace-nowrap">
            <Check size={14} className="text-[#0D9488]" />
            {toast}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <div className="bg-gradient-to-br from-[#065F46] to-[#0D9488] px-5 pt-6 pb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-xl font-bold text-white">Education Hub</h1>
            <p className="text-white/70 text-xs">Learn about circular energy</p>
          </div>
          <div className="bg-white/15 rounded-xl px-3 py-1.5">
            <span className="text-white text-xs font-semibold">{completedCount} Completed</span>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex bg-white/15 rounded-xl p-1">
          {tabs.map((tab) => (
            <motion.button key={tab.id} whileTap={{ scale: 0.95 }}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 py-2 rounded-lg text-xs font-semibold transition-all
              ${activeTab === tab.id ? 'bg-white text-[#065F46]' : 'text-white/70'}`}>
              {tab.label}
            </motion.button>
          ))}
        </div>
      </div>

      <div className="px-5 py-4">
        {/* Courses Tab */}
        {activeTab === 'courses' && (
          <div className="space-y-3 mb-8">
            {courses.map((course, i) => {
              const progress = courseProgress[course.id] || 0;
              return (
                <motion.div key={course.id} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                  whileHover={{ y: -2 }}
                  onClick={() => setSelectedCourse(course)}
                  className="bg-white rounded-2xl p-4 shadow-sm cursor-pointer">
                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
                      style={{ backgroundColor: `${course.color}15` }}>
                      {course.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm font-bold text-gray-800 mb-0.5">{course.title}</h3>
                      <p className="text-[10px] text-gray-500 leading-tight mb-2">{course.desc}</p>
                      <div className="flex items-center gap-3">
                        <span className="text-[10px] text-gray-400 flex items-center gap-0.5"><Clock size={10} />{course.duration}</span>
                        <span className="text-[10px] text-gray-400">{course.level}</span>
                        <span className="text-[10px] font-bold text-[#0D9488]">+{course.credits} EC</span>
                      </div>
                      <div className="mt-2 w-full bg-gray-100 rounded-full h-1.5">
                        <motion.div className="h-1.5 rounded-full"
                          style={{ backgroundColor: course.color }}
                          initial={{ width: 0 }}
                          animate={{ width: `${progress}%` }}
                          transition={{ duration: 0.8, delay: i * 0.1 }} />
                      </div>
                      <span className="text-[9px] text-gray-400 mt-0.5 block">
                        {progress >= 100 ? '✓ Completed' : progress > 0 ? `${progress}% complete` : 'Not started'}
                      </span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}

        {/* Badges Tab */}
        {activeTab === 'badges' && (
          <div className="grid grid-cols-2 gap-3 mb-8">
            {badges.map((badge, i) => (
              <motion.div key={badge.id} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.08 }}
                className={`bg-white rounded-2xl p-4 text-center shadow-sm ${!badge.earned ? 'opacity-60' : ''}`}>
                <div className="text-3xl mb-2">{badge.icon}</div>
                <h3 className="text-xs font-bold text-gray-800 mb-0.5">{badge.name}</h3>
                <p className="text-[10px] text-gray-500 mb-2">{badge.desc}</p>
                {badge.earned ? (
                  <span className="text-[9px] font-bold text-[#0D9488] bg-[#0D9488]/10 px-2 py-0.5 rounded-full">
                    ✓ Earned
                  </span>
                ) : (
                  <span className="text-[9px] font-semibold text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
                    {badge.progress}
                  </span>
                )}
              </motion.div>
            ))}
          </div>
        )}

        {/* Certificates Tab */}
        {activeTab === 'certificates' && (
          <div className="space-y-3 mb-8">
            {certificates.map((cert, i) => (
              <motion.div key={cert.id} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className={`bg-white rounded-2xl p-4 shadow-sm ${cert.status === 'locked' ? 'opacity-50' : ''}`}>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: `${cert.color}15` }}>
                    <GraduationCap size={22} style={{ color: cert.color }} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-bold text-gray-800">{cert.title}</h3>
                    <p className="text-[10px] text-gray-500">{cert.issuer}</p>
                    <span className={`text-[10px] font-bold mt-1 inline-block px-2 py-0.5 rounded-full
                      ${cert.status === 'earned' ? 'bg-[#0D9488]/10 text-[#0D9488]' :
                        cert.status === 'progress' ? 'bg-[#D97706]/10 text-[#D97706]' :
                          'bg-gray-100 text-gray-400'}`}>
                      {cert.date}
                    </span>
                  </div>
                  {cert.status === 'earned' && <Award size={20} style={{ color: cert.color }} />}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Course Detail Modal */}
      <AnimatePresence>
        {selectedCourse && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-end justify-center z-50"
            onClick={() => setSelectedCourse(null)}>
            <motion.div initial={{ y: 300 }} animate={{ y: 0 }} exit={{ y: 300 }}
              className="bg-white rounded-t-3xl p-6 w-full max-w-[450px]"
              onClick={(e) => e.stopPropagation()}>
              <div className="w-10 h-1 bg-gray-200 rounded-full mx-auto mb-4" />
              <div className="flex items-center gap-3 mb-4">
                <span className="text-4xl">{selectedCourse.icon}</span>
                <div>
                  <h3 className="text-base font-bold text-gray-800">{selectedCourse.title}</h3>
                  <p className="text-xs text-gray-500">{selectedCourse.duration} • {selectedCourse.level}</p>
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-4">{selectedCourse.desc}</p>
              <div className="bg-gray-50 rounded-xl p-3 mb-2 flex justify-between">
                <span className="text-xs text-gray-500">Reward</span>
                <span className="text-xs font-bold text-[#0D9488]">+{selectedCourse.credits} Energy Credits</span>
              </div>
              <div className="bg-gray-50 rounded-xl p-3 mb-4 flex justify-between">
                <span className="text-xs text-gray-500">Progress</span>
                <span className="text-xs font-bold text-gray-800">{courseProgress[selectedCourse.id] || 0}%</span>
              </div>
              <motion.button whileTap={{ scale: 0.95 }}
                className="w-full py-3 bg-gradient-to-r from-[#0D9488] to-[#065F46] text-white rounded-xl text-sm font-semibold flex items-center justify-center gap-2"
                onClick={() => handleStartCourse(selectedCourse)}>
                <Play size={16} />
                {(courseProgress[selectedCourse.id] || 0) >= 100
                  ? 'Completed ✓'
                  : (courseProgress[selectedCourse.id] || 0) > 0
                    ? 'Continue Course'
                    : 'Start Course'}
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default EducationPage;