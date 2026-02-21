import React, { useState } from 'react';
import { Bell, CheckCircle, Clock, AlertTriangle, Truck, Flame, Zap, Package, X, Settings, Leaf } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { clsx } from 'clsx';
import useRoleStore from '../context/RoleContext';

const NotificationPage = () => {
  const { role } = useRoleStore();

  const allNotifications = [
    { id: 1, type: 'pickup', title: 'Pickup Confirmed', desc: 'Driver Budi S. will arrive at 08:30 AM for waste collection.', time: '10 min ago', read: false, icon: Truck, color: '#0D9488', roles: ['supplier'] },
    { id: 2, type: 'credits', title: '+35 Energy Credits Earned', desc: 'You earned credits for your latest food waste contribution of 45kg.', time: '1h ago', read: false, icon: Zap, color: '#D97706', roles: ['supplier'] },
    { id: 3, type: 'delivery', title: 'Bio-LPG Delivered', desc: 'Your 12kg Bio-LPG cylinder has been delivered successfully.', time: '2h ago', read: false, icon: Flame, color: '#D97706', roles: ['customer'] },
    { id: 4, type: 'savings', title: 'Monthly Savings Report', desc: 'You saved Rp 245,000 vs conventional LPG this month!', time: '5h ago', read: true, icon: Leaf, color: '#0D9488', roles: ['customer'] },
    { id: 5, type: 'task', title: 'New Pickup Task', desc: 'Pickup at Hotel Grand Nusantara - 120kg estimated. Start at 11:30 AM.', time: '30 min ago', read: false, icon: Package, color: '#2563EB', roles: ['driver'] },
    { id: 6, type: 'route', title: 'Route Optimized', desc: 'Your afternoon route has been re-optimized. Saving 12 min.', time: '45 min ago', read: true, icon: Truck, color: '#0D9488', roles: ['driver'] },
    { id: 7, type: 'alert', title: 'Reactor #3 Maintenance', desc: 'Scheduled maintenance for Reactor #3 at 2:00 PM today.', time: '1h ago', read: false, icon: AlertTriangle, color: '#DC2626', roles: ['admin'] },
    { id: 8, type: 'system', title: 'New Supplier Registered', desc: 'Warung Makan Sederhana has joined the BIMA network.', time: '3h ago', read: true, icon: CheckCircle, color: '#0D9488', roles: ['admin'] },
    { id: 9, type: 'milestone', title: 'Milestone Reached!', desc: 'Platform has processed 38 tons of waste this month!', time: '6h ago', read: true, icon: Leaf, color: '#065F46', roles: ['admin', 'supplier', 'customer', 'driver'] },
    { id: 10, type: 'credits', title: 'Marketplace: New Reward', desc: 'Bio-LPG 25% discount is now available in the marketplace.', time: '1d ago', read: true, icon: Zap, color: '#D97706', roles: ['supplier', 'customer'] },
    { id: 11, type: 'community', title: 'Challenge Update', desc: '1000 Ton Challenge is now at 78%. Keep contributing!', time: '1d ago', read: true, icon: Bell, color: '#7C3AED', roles: ['supplier', 'customer', 'driver', 'admin'] },
  ];

  const [notifications, setNotifications] = useState(allNotifications);
  const [filter, setFilter] = useState('all');

  const roleNotifications = notifications.filter(n => n.roles.includes(role));
  const filteredNotifications = filter === 'all' ? roleNotifications : filter === 'unread' ? roleNotifications.filter(n => !n.read) : roleNotifications.filter(n => n.type === filter);

  const markAsRead = (id) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const filters = [
    { id: 'all', label: 'All' },
    { id: 'unread', label: 'Unread' },
    { id: 'pickup', label: 'Pickups' },
    { id: 'credits', label: 'Credits' },
  ];

  const unreadCount = roleNotifications.filter(n => !n.read).length;

  return (
    <div className="min-h-full bg-[#F0FDF9]">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#065F46] to-[#0D9488] px-5 pt-6 pb-6">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h1 className="text-xl font-bold text-white">Notifications</h1>
            <p className="text-white/70 text-xs">{unreadCount} unread</p>
          </div>
          {unreadCount > 0 && (
            <motion.button whileTap={{ scale: 0.95 }} onClick={markAllAsRead}
              className="text-xs text-white/80 font-semibold bg-white/15 px-3 py-1.5 rounded-lg">
              Mark all read
            </motion.button>
          )}
        </div>

        {/* Filters */}
        <div className="flex gap-1.5">
          {filters.map((f) => (
            <motion.button key={f.id} whileTap={{ scale: 0.95 }}
              onClick={() => setFilter(f.id)}
              className={`px-3 py-1.5 rounded-full text-[11px] font-semibold transition-all
              ${filter === f.id ? 'bg-white text-[#065F46]' : 'bg-white/15 text-white/80'}`}>
              {f.label}
            </motion.button>
          ))}
        </div>
      </div>

      <div className="px-5 py-4">
        {filteredNotifications.length === 0 ? (
          <div className="text-center py-12">
            <Bell size={40} className="text-gray-300 mx-auto mb-3" />
            <p className="text-sm text-gray-400">No notifications</p>
          </div>
        ) : (
          <div className="space-y-2 mb-8">
            {filteredNotifications.map((notif, i) => (
              <motion.div key={notif.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => markAsRead(notif.id)}
                className={`bg-white rounded-xl p-3.5 shadow-sm flex items-start cursor-pointer transition-all
                  ${!notif.read ? 'border-l-3 ring-1 ring-[#0D9488]/20' : ''}`}
                style={!notif.read ? { borderLeft: `3px solid ${notif.color}` } : {}}>
                <div className="w-10 h-10 rounded-full flex items-center justify-center mr-3 flex-shrink-0"
                  style={{ backgroundColor: `${notif.color}15` }}>
                  <notif.icon size={18} style={{ color: notif.color }} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-0.5">
                    <h3 className={`text-sm font-semibold text-gray-800 truncate ${!notif.read ? 'font-bold' : ''}`}>
                      {notif.title}
                    </h3>
                    {!notif.read && <div className="w-2 h-2 rounded-full bg-[#0D9488] flex-shrink-0 ml-2" />}
                  </div>
                  <p className="text-xs text-gray-500 leading-relaxed">{notif.desc}</p>
                  <span className="text-[10px] text-gray-400 mt-1 block">{notif.time}</span>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationPage;