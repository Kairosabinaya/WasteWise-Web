import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, BarChart3, CircleDollarSign, GraduationCap, Network } from 'lucide-react';
import { clsx } from 'clsx';
import { motion } from 'framer-motion';

const navItems = [
  { path: '/', icon: LayoutDashboard, name: 'Dashboard', color: '#164c51' },
  { path: '/statistics', icon: BarChart3, name: 'Analytics', color: '#D48931' },
  { path: '/marketplace', icon: CircleDollarSign, name: 'Revenue', color: '#6d1e04' },
  { path: '/education', icon: GraduationCap, name: 'Training', color: '#0C2521' },
  { path: '/community', icon: Network, name: 'Partners', color: '#164c51' },
];

const BottomNav = () => {
  return (
    <div className="absolute bottom-0 left-0 right-0 z-50">
      <div
        className="bg-white rounded-t-[20px] shadow-[0_-4px_20px_rgba(0,0,0,0.08)]"
        style={{ height: '90px' }}
      >
        <div className="h-full flex items-center justify-around px-2 py-2">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className="flex-1 h-full"
            >
              {({ isActive }) => (
                <motion.div
                  className="flex flex-col items-center justify-center h-full px-2 py-1.5"
                  animate={isActive ? "active" : "inactive"}
                >
                  <motion.div
                    variants={{
                      active: { scale: 1.15 },
                      inactive: { scale: 1 }
                    }}
                    className={clsx(
                      "w-8 h-8 rounded-lg flex items-center justify-center mb-1",
                      { 'bg-opacity-10': isActive }
                    )}
                    style={{
                      backgroundColor: isActive ? `${item.color}1A` : 'transparent'
                    }}
                  >
                    <item.icon
                      size={20}
                      style={{
                        color: isActive ? item.color : '#6B7280'
                      }}
                    />
                  </motion.div>
                  <span
                    className={clsx(
                      "text-[11px] font-medium leading-tight",
                      { 'font-semibold': isActive }
                    )}
                    style={{
                      color: isActive ? item.color : '#6B7280'
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