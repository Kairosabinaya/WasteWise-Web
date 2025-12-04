import React, { useState } from 'react';
import { Bell, Trash2, CheckCircle, Clock, AlertTriangle, Truck, Wrench, FileText, Package, X, Settings } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { clsx } from 'clsx';
import { AppLogo } from '../components/ui';

const NotificationPage = () => {
  const [notifications, setNotifications] = useState([
    {
      id: '1',
      type: 'capacity_warning',
      title: 'Bin Capacity Warning',
      message: 'Foodcourt Area A bin is at 85% capacity. Request pickup soon to avoid overflow.',
      time: '5 minutes ago',
      isRead: false,
      priority: 'high',
      icon: AlertTriangle,
      color: '#D48931',
      actionLabel: 'Request Pickup',
    },
    {
      id: '2',
      type: 'pickup_scheduled',
      title: 'Pickup Confirmed',
      message: 'Daily pickup scheduled for today at 08:00 AM. 3 bins will be emptied.',
      time: '1 hour ago',
      isRead: false,
      priority: 'normal',
      icon: Truck,
      color: '#164c51',
    },
    {
      id: '3',
      type: 'maintenance_required',
      title: 'Sensor Calibration Needed',
      message: 'Smart bin SB-004 sensor needs calibration. Accuracy may be affected.',
      time: '3 hours ago',
      isRead: true,
      priority: 'medium',
      icon: Wrench,
      color: '#6d1e04',
      actionLabel: 'Schedule Maintenance',
    },
    {
      id: '4',
      type: 'report_ready',
      title: 'Monthly ESG Report Ready',
      message: 'November 2024 waste audit and ESG compliance report is ready for download.',
      time: '1 day ago',
      isRead: true,
      priority: 'normal',
      icon: FileText,
      color: '#0C2521',
      actionLabel: 'Download Report',
    },
    {
      id: '5',
      type: 'capacity_critical',
      title: 'Urgent: Bin Full',
      message: 'Office Pantry B bin is at 95% capacity. Immediate pickup required.',
      time: '2 hours ago',
      isRead: false,
      priority: 'critical',
      icon: AlertTriangle,
      color: '#EF4444',
      actionLabel: 'Request Now',
    },
    {
      id: '6',
      type: 'pickup_completed',
      title: 'Pickup Completed',
      message: 'All scheduled bins have been emptied. Next pickup: Tomorrow 08:00 AM.',
      time: '2 days ago',
      isRead: true,
      priority: 'normal',
      icon: CheckCircle,
      color: '#164c51',
    },
    {
      id: '7',
      type: 'system',
      title: 'New Features Available',
      message: 'WasteWise dashboard now includes real-time CO2 tracking. Check it out!',
      time: '3 days ago',
      isRead: true,
      priority: 'low',
      icon: Package,
      color: '#6B7280',
    },
  ]);

  const [filter, setFilter] = useState('all');

  const filters = [
    { id: 'all', label: 'All', count: notifications.length },
    { id: 'unread', label: 'Unread', count: notifications.filter(n => !n.isRead).length },
    { id: 'urgent', label: 'Urgent', count: notifications.filter(n => n.priority === 'critical' || n.priority === 'high').length },
    { id: 'pickups', label: 'Pickups', count: notifications.filter(n => n.type.includes('pickup')).length },
  ];

  const filteredNotifications = notifications.filter(notification => {
    if (filter === 'all') return true;
    if (filter === 'unread') return !notification.isRead;
    if (filter === 'urgent') return notification.priority === 'critical' || notification.priority === 'high';
    if (filter === 'pickups') return notification.type.includes('pickup');
    return true;
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

  const getPriorityBadge = (priority) => {
    switch (priority) {
      case 'critical':
        return { label: 'CRITICAL', bg: '#EF44441A', color: '#EF4444' };
      case 'high':
        return { label: 'HIGH', bg: '#D489311A', color: '#D48931' };
      case 'medium':
        return { label: 'MEDIUM', bg: '#6d1e041A', color: '#6d1e04' };
      default:
        return null;
    }
  };

  // Filter Button Component
  const FilterButton = ({ filterItem, isActive, onClick }) => (
    <motion.button
      whileHover={{ y: -1 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={clsx(
        "px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap",
        isActive
          ? "bg-[#164c51] text-white shadow-lg shadow-[#164c51]/30"
          : "bg-white text-[#6B7280] border border-gray-200 hover:border-[#164c51]/50"
      )}
    >
      {filterItem.label}
      {filterItem.count > 0 && (
        <span className={clsx(
          "ml-1.5 px-1.5 py-0.5 rounded-full text-xs",
          isActive ? "bg-white/20" : "bg-gray-100"
        )}>
          {filterItem.count}
        </span>
      )}
    </motion.button>
  );

  // Notification Item Component
  const NotificationItem = ({ notification, index }) => {
    const priorityBadge = getPriorityBadge(notification.priority);

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.05 }}
        whileHover={{ x: 5 }}
        className={clsx(
          "bg-white rounded-xl p-4 shadow-sm mb-3 border-l-4 cursor-pointer",
          notification.isRead ? "opacity-75" : ""
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
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className={clsx(
                  "font-semibold text-sm leading-tight",
                  notification.isRead ? "text-[#6B7280]" : "text-[#0C2521]"
                )}>
                  {notification.title}
                </h3>
                {priorityBadge && (
                  <span
                    className="px-1.5 py-0.5 rounded text-[10px] font-bold"
                    style={{ backgroundColor: priorityBadge.bg, color: priorityBadge.color }}
                  >
                    {priorityBadge.label}
                  </span>
                )}
              </div>
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
              <span className="text-xs text-[#9CA3AF] flex items-center">
                <Clock size={10} className="mr-1" />
                {notification.time}
              </span>

              <div className="flex items-center gap-2">
                {notification.actionLabel && (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      console.log('Action:', notification.actionLabel);
                    }}
                    className="px-2.5 py-1 rounded-lg text-xs font-medium"
                    style={{
                      backgroundColor: `${notification.color}1A`,
                      color: notification.color
                    }}
                  >
                    {notification.actionLabel}
                  </motion.button>
                )}

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
  };

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
              Alerts & Updates
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="text-[#6B7280] text-sm mt-1"
            >
              Operational alerts & system updates
            </motion.p>
          </div>

          <div className="flex items-center gap-2">
            {notifications.some(n => !n.isRead) && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={markAllAsRead}
                className="px-3 py-1.5 bg-[#164c51] text-white rounded-lg text-xs font-medium"
              >
                Mark all read
              </motion.button>
            )}
            <motion.button
              whileTap={{ scale: 0.95 }}
              className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm"
            >
              <Settings size={20} className="text-[#6B7280]" />
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Summary Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="px-4 mb-4"
      >
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-white rounded-xl p-3 text-center shadow-sm">
            <div className="text-lg font-bold text-[#EF4444]">
              {notifications.filter(n => n.priority === 'critical').length}
            </div>
            <div className="text-xs text-[#6B7280]">Critical</div>
          </div>
          <div className="bg-white rounded-xl p-3 text-center shadow-sm">
            <div className="text-lg font-bold text-[#D48931]">
              {notifications.filter(n => n.priority === 'high').length}
            </div>
            <div className="text-xs text-[#6B7280]">High Priority</div>
          </div>
          <div className="bg-white rounded-xl p-3 text-center shadow-sm">
            <div className="text-lg font-bold text-[#164c51]">
              {notifications.filter(n => !n.isRead).length}
            </div>
            <div className="text-xs text-[#6B7280]">Unread</div>
          </div>
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
              <h3 className="text-lg font-semibold text-[#1F2937] mb-2">No Alerts</h3>
              <p className="text-[#6B7280] text-center text-sm leading-relaxed max-w-sm">
                {filter === 'all'
                  ? "You're all caught up! No new alerts at the moment."
                  : `No ${filter} alerts found.`
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