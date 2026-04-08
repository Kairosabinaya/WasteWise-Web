import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, ScanLine, Truck, BarChart3, User, Flame, Shield, Zap, MapPin, BookOpen, Bell, DollarSign } from 'lucide-react';
import { clsx } from 'clsx';
import { motion } from 'framer-motion';
import useRoleStore from '../../context/RoleContext';

const BottomNav = () => {
  const { role } = useRoleStore();

  // Role-aware navigation — each role gets tabs matching their workflow
  const getNavItems = () => {
    if (role === 'supplier') {
      return [
        { path: '/', icon: LayoutDashboard, name: 'Home', color: '#0D9488' },
        { path: '/scan', icon: ScanLine, name: 'Scan', color: '#065F46' },
        { path: '/pickup', icon: Truck, name: 'Pickup', color: '#D97706' },
        { path: '/marketplace', icon: Zap, name: 'Rewards', color: '#0D9488' },
        { path: '/profile', icon: User, name: 'Profile', color: '#064E3B' },
      ];
    }

    if (role === 'customer') {
      return [
        { path: '/', icon: LayoutDashboard, name: 'Home', color: '#D97706' },
        { path: '/order-gas', icon: Flame, name: 'Gas', color: '#B45309' },
        { path: '/marketplace', icon: Zap, name: 'Rewards', color: '#0D9488' },
        { path: '/education', icon: BookOpen, name: 'Learn', color: '#065F46' },
        { path: '/profile', icon: User, name: 'Profile', color: '#064E3B' },
      ];
    }

    if (role === 'driver') {
      return [
        { path: '/', icon: LayoutDashboard, name: 'Home', color: '#2563EB' },
        { path: '/pickup', icon: Truck, name: 'Tasks', color: '#D97706' },
        { path: '/smart-bin', icon: MapPin, name: 'Map', color: '#0D9488' },
        { path: '/statistics', icon: DollarSign, name: 'Earnings', color: '#065F46' },
        { path: '/profile', icon: User, name: 'Profile', color: '#064E3B' },
      ];
    }

    // admin
    return [
      { path: '/', icon: Shield, name: 'Control', color: '#7C3AED' },
      { path: '/community', icon: LayoutDashboard, name: 'Network', color: '#0D9488' },
      { path: '/statistics', icon: BarChart3, name: 'Impact', color: '#065F46' },
      { path: '/notifications', icon: Bell, name: 'Alerts', color: '#D97706' },
      { path: '/profile', icon: User, name: 'Profile', color: '#064E3B' },
    ];
  };

  const navItems = getNavItems();

  return (
    <div className="absolute bottom-0 left-0 right-0 z-50">
      <div
        className="bg-white rounded-t-[20px] shadow-[0_-4px_20px_rgba(0,0,0,0.08)] h-[70px]"
      >
        <div className="h-full flex items-center justify-around px-2">
          {navItems.map((item) => (
            <NavLink
              key={item.name + item.path}
              to={item.path}
              className="flex-1 h-full"
            >
              {({ isActive }) => (
                <motion.div
                  className="flex flex-col items-center justify-center h-full px-1"
                  animate={isActive ? "active" : "inactive"}
                >
                  <motion.div
                    variants={{
                      active: { scale: 1.1 },
                      inactive: { scale: 1 }
                    }}
                    className={clsx(
                      "w-8 h-8 rounded-lg flex items-center justify-center mb-0.5",
                      { 'bg-opacity-10': isActive }
                    )}
                    style={{
                      backgroundColor: isActive ? `${item.color}1A` : 'transparent'
                    }}
                  >
                    <item.icon
                      size={19}
                      style={{
                        color: isActive ? item.color : '#9CA3AF'
                      }}
                    />
                  </motion.div>
                  <span
                    className={clsx(
                      "text-[10px] font-medium leading-none text-center whitespace-nowrap",
                      { 'font-semibold': isActive }
                    )}
                    style={{
                      color: isActive ? item.color : '#9CA3AF'
                    }}
                  >
                    {item.name}
                  </span>
                </motion.div>
              )}
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BottomNav;