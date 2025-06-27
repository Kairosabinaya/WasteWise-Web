import React, { useState } from 'react';
import { Bell, Award, Trash2, CheckCircle, Clock, Star, Gift, Users, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { clsx } from 'clsx';
import { AppLogo } from '../components/ui';

const NotificationPage = () => {
  const [notifications, setNotifications] = useState([
    {
      id: '1',
      type: 'achievement',
      title: 'New Achievement Unlocked!',
      message: 'You\'ve earned the "Eco Pioneer" badge for recycling 100+ items',
      time: '2 minutes ago',
      isRead: false,
      icon: Award,
      color: '#D48931'
    },
    {
      id: '2',
      type: 'points',
      title: 'Points Earned',
      message: 'You earned 25 points for proper waste sorting today',
      time: '1 hour ago',
      isRead: false,
      icon: Star,
      color: '#164c51'
    },
    {
      id: '3',
      type: 'reminder',
      title: 'Scan Reminder',
      message: 'Don\'t forget to scan your waste today to earn points!',
      time: '3 hours ago',
      isRead: true,
      icon: Clock,
      color: '#6d1e04'
    },
    {
      id: '4',
      type: 'community',
      title: 'New Challenge Available',
      message: 'Join the "Zero Waste Week" challenge and compete with friends',
      time: '1 day ago',
      isRead: true,
      icon: Users,
      color: '#0C2521'
    },
    {
      id: '5',
      type: 'reward',
      title: 'Reward Available',
      message: 'You have enough points to exchange for an eco-friendly water bottle',
      time: '2 days ago',
      isRead: true,
      icon: Gift,
      color: '#D48931'
    },
    {
      id: '6',
      type: 'system',
      title: 'App Update',
      message: 'WasteWise has been updated with new features and improvements',
      time: '3 days ago',
      isRead: true,
      icon: AlertCircle,
      color: '#6B7280'
    }
  ]);

  const [filter, setFilter] = useState('all');

  const filters = [
    { id: 'all', label: 'All', count: notifications.length },
    { id: 'unread', label: 'Unread', count: notifications.filter(n => !n.isRead).length },
    { id: 'achievement', label: 'Achievements', count: notifications.filter(n => n.type === 'achievement').length },
    { id: 'points', label: 'Points', count: notifications.filter(n => n.type === 'points').length }
  ];

  const filteredNotifications = notifications.filter(notification => {
    if (filter === 'all') return true;
    if (filter === 'unread') return !notification.isRead;
    return notification.type === filter;
  });

  const markAsRead = (id) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id 
          ? { ...notification, isRead: true }
          : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, isRead: true }))
    );
  };

  const deleteNotification = (id) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  };

  // Filter Button Component
  const FilterButton = ({ filterItem, isActive, onClick }) => (
    <motion.button
      whileHover={{ y: -1 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={clsx(
        "px-4 py-2 rounded-full text-sm font-medium transition-all",
        isActive
          ? "bg-[#164c51] text-white shadow-lg shadow-[#164c51]/30"
          : "bg-white text-[#6B7280] border border-gray-200 hover:border-[#164c51]/50"
      )}
    >
      {filterItem.label}
      {filterItem.count > 0 && (
        <span className={clsx(
          "ml-1 px-1.5 py-0.5 rounded-full text-xs",
          isActive ? "bg-white/20" : "bg-gray-100"
        )}>
          {filterItem.count}
        </span>
      )}
    </motion.button>
  );

  // Notification Item Component
  const NotificationItem = ({ notification, index }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ x: 5 }}
      className={clsx(
        "bg-white rounded-xl p-4 shadow-sm mb-3 border-l-4 cursor-pointer",
        notification.isRead ? "opacity-75" : "border-l-[#164c51]"
      )}
      style={{ 
        boxShadow: '0 2px 6px rgba(0,0,0,0.04)',
        borderLeftColor: notification.isRead ? '#E5E7EB' : notification.color
      }}
      onClick={() => !notification.isRead && markAsRead(notification.id)}
    >
      <div className="flex items-start">
        <div 
          className="w-10 h-10 rounded-full flex items-center justify-center mr-3 flex-shrink-0"
          style={{ backgroundColor: `${notification.color}1A` }}
        >
          <notification.icon size={20} style={{ color: notification.color }} />
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-1">
            <h3 className={clsx(
              "font-semibold text-sm leading-tight",
              notification.isRead ? "text-[#6B7280]" : "text-[#0C2521]"
            )}>
              {notification.title}
            </h3>
            {!notification.isRead && (
              <div className="w-2 h-2 bg-[#164c51] rounded-full ml-2 flex-shrink-0" />
            )}
          </div>
          
          <p className={clsx(
            "text-xs leading-relaxed mb-2",
            notification.isRead ? "text-[#9CA3AF]" : "text-[#6B7280]"
          )}>
            {notification.message}
          </p>
          
          <div className="flex items-center justify-between">
            <span className="text-xs text-[#9CA3AF]">{notification.time}</span>
            
            <div className="flex items-center gap-2">
              {!notification.isRead && (
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    markAsRead(notification.id);
                  }}
                  className="w-6 h-6 bg-[#164c51]/10 rounded-full flex items-center justify-center"
                >
                  <CheckCircle size={12} className="text-[#164c51]" />
                </motion.button>
              )}
              
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={(e) => {
                  e.stopPropagation();
                  deleteNotification(notification.id);
                }}
                className="w-6 h-6 bg-[#EF4444]/10 rounded-full flex items-center justify-center"
              >
                <Trash2 size={12} className="text-[#EF4444]" />
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
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

        <div className="flex items-center justify-between mb-4">
          <div>
            <motion.h1 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-2xl font-bold text-[#1F2937]"
            >
              Notifications
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="text-[#6B7280] text-sm mt-1"
            >
              Stay updated with your eco journey
            </motion.p>
          </div>
          
          {notifications.some(n => !n.isRead) && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={markAllAsRead}
              className="px-3 py-1.5 bg-[#10B981] text-white rounded-lg text-xs font-medium"
            >
              Mark all read
            </motion.button>
          )}
        </div>
      </motion.div>

      {/* Filters */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="px-4 mb-4"
      >
        <div className="flex gap-2 overflow-x-auto scrollbar-hide">
          {filters.map((filterItem) => (
            <FilterButton
              key={filterItem.id}
              filterItem={filterItem}
              isActive={filter === filterItem.id}
              onClick={() => setFilter(filterItem.id)}
            />
          ))}
        </div>
      </motion.div>

      {/* Notifications List */}
      <div className="flex-1 px-4 pb-4 overflow-y-auto scrollbar-hide">
        <AnimatePresence mode="wait">
          {filteredNotifications.length > 0 ? (
            <motion.div
              key={filter}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {filteredNotifications.map((notification, index) => (
                <NotificationItem 
                  key={notification.id} 
                  notification={notification} 
                  index={index} 
                />
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center justify-center py-12"
            >
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <Bell size={32} className="text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-[#1F2937] mb-2">No Notifications</h3>
              <p className="text-[#6B7280] text-center text-sm leading-relaxed max-w-sm">
                {filter === 'all' 
                  ? "You're all caught up! No new notifications at the moment."
                  : `No ${filter} notifications found.`
                }
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default NotificationPage; 