import React, { useState } from 'react';
import { Building2, Settings, Award, BarChart3, Edit3, ChevronRight, FileText, Bell, Shield, HelpCircle, LogOut, MapPin, Phone, Mail, Calendar, CreditCard, Users, User, Briefcase } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { AppLogo } from '../components/ui';

const ProfilePage = () => {
  const navigate = useNavigate();

  // Current logged-in user data (business team member)
  const [currentUser] = useState({
    name: 'John Smith',
    email: 'john.smith@example.com',
    phone: '+1 555 123 4567',
    role: 'Facility Manager',
    department: 'Operations',
    avatarInitials: 'JS',
  });

  // Organization/Building data
  const [organization] = useState({
    buildingName: 'Central Mall',
    buildingType: 'Mall',
    address: '123 Main Street, Downtown District',
    contractPlan: 'Enterprise',
    smartBinCount: 24,
    contractStart: 'Jan 2024',
    contractEnd: 'Dec 2025',
    esgLevel: 'Gold',
    esgScore: 85,
    totalTeamMembers: 12,
    certifications: [
      { name: 'Green Building Certified', issuer: 'GBCI', year: '2024' },
      { name: 'ISO 14001', issuer: 'ISO', year: '2023' },
    ]
  });

  const menuItems = [
    {
      title: 'My Profile',
      description: 'Edit personal information',
      icon: User,
      color: '#164c51',
      action: () => console.log('Edit Profile')
    },
    {
      title: 'Organization Settings',
      description: 'Building details & preferences',
      icon: Building2,
      color: '#164c51',
      action: () => console.log('Edit Org')
    },
    {
      title: 'Team Management',
      description: 'Manage staff access & roles',
      icon: Users,
      color: '#0C2521',
      action: () => console.log('Manage Team')
    },
    {
      title: 'Billing & Subscription',
      description: 'View plan & invoices',
      icon: CreditCard,
      color: '#D48931',
      action: () => console.log('View Billing')
    },
    {
      title: 'Reports & Analytics',
      description: 'Download ESG reports',
      icon: FileText,
      color: '#164c51',
      action: () => navigate('/statistics')
    },
    {
      title: 'Notifications',
      description: 'Alert preferences',
      icon: Bell,
      color: '#6d1e04',
      action: () => navigate('/notifications')
    },
    {
      title: 'Privacy & Security',
      description: 'Data protection settings',
      icon: Shield,
      color: '#0C2521',
      action: () => console.log('Privacy Settings')
    },
    {
      title: 'Help & Support',
      description: 'Contact WasteWise team',
      icon: HelpCircle,
      color: '#6B7280',
      action: () => console.log('Help Center')
    }
  ];

  const MenuItem = ({ item, index }) => (
    <motion.button
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ x: 5 }}
      whileTap={{ scale: 0.98 }}
      onClick={item.action}
      className="w-full bg-white rounded-xl p-4 flex items-center shadow-sm mb-3"
      style={{ boxShadow: '0 2px 6px rgba(0,0,0,0.04)' }}
    >
      <div
        className="w-10 h-10 rounded-full flex items-center justify-center mr-4"
        style={{ backgroundColor: `${item.color}1A` }}
      >
        <item.icon size={20} style={{ color: item.color }} />
      </div>
      <div className="flex-1 text-left">
        <div className="font-medium text-[#0C2521]">{item.title}</div>
        <div className="text-xs text-[#6B7280]">{item.description}</div>
      </div>
      <ChevronRight size={16} className="text-[#6B7280]" />
    </motion.button>
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

        <motion.h1
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-2xl font-bold text-[#0C2521]"
        >
          My Account
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="text-[#6B7280] text-sm mt-1"
        >
          Profile & settings
        </motion.p>
      </motion.div>

      {/* User Profile Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mx-4 mb-4"
      >
        <div className="bg-white rounded-2xl p-5 shadow-sm">
          {/* User Info */}
          <div className="flex items-center mb-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#164c51] to-[#0C2521] flex items-center justify-center mr-4">
              <span className="text-white text-xl font-bold">{currentUser.avatarInitials}</span>
            </div>
            <div className="flex-1">
              <h2 className="text-lg font-bold text-[#0C2521]">{currentUser.name}</h2>
              <div className="flex items-center gap-2 mt-1">
                <span className="px-2 py-0.5 bg-[#164c51]/10 text-[#164c51] text-xs font-medium rounded">
                  {currentUser.role}
                </span>
                <span className="text-xs text-[#6B7280]">{currentUser.department}</span>
              </div>
            </div>
            <motion.button
              whileTap={{ scale: 0.95 }}
              className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center"
            >
              <Edit3 size={14} className="text-[#6B7280]" />
            </motion.button>
          </div>

          {/* Contact Info */}
          <div className="space-y-2 pb-4 border-b border-gray-100">
            <div className="flex items-center text-sm text-[#6B7280]">
              <Mail size={14} className="mr-2 text-[#164c51]" />
              <span>{currentUser.email}</span>
            </div>
            <div className="flex items-center text-sm text-[#6B7280]">
              <Phone size={14} className="mr-2 text-[#164c51]" />
              <span>{currentUser.phone}</span>
            </div>
          </div>

          {/* Organization Info */}
          <div className="mt-4 pt-2">
            <div className="flex items-center mb-3">
              <Building2 size={16} className="text-[#164c51] mr-2" />
              <span className="text-sm font-semibold text-[#1F2937]">Organization</span>
            </div>
            <div className="bg-gray-50 rounded-xl p-3">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-[#0C2521]">{organization.buildingName}</span>
                <span
                  className="px-2 py-0.5 rounded-full text-[10px] font-bold"
                  style={{
                    backgroundColor: organization.esgLevel === 'Gold' ? '#D489311A' : '#164c511A',
                    color: organization.esgLevel === 'Gold' ? '#D48931' : '#164c51'
                  }}
                >
                  {organization.esgLevel} • {organization.esgScore}%
                </span>
              </div>
              <div className="flex items-center text-xs text-[#6B7280]">
                <MapPin size={12} className="mr-1" />
                <span className="line-clamp-1">{organization.address}</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Quick Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mx-4 mb-4"
      >
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-white rounded-xl p-3 text-center shadow-sm">
            <div className="text-lg font-bold text-[#164c51]">{organization.smartBinCount}</div>
            <div className="text-[10px] text-[#6B7280]">Smart Bins</div>
          </div>
          <div className="bg-white rounded-xl p-3 text-center shadow-sm">
            <div className="text-lg font-bold text-[#0C2521]">{organization.totalTeamMembers}</div>
            <div className="text-[10px] text-[#6B7280]">Team Members</div>
          </div>
          <div className="bg-white rounded-xl p-3 text-center shadow-sm">
            <div className="text-sm font-bold text-[#D48931]">{organization.contractPlan}</div>
            <div className="text-[10px] text-[#6B7280]">Plan</div>
          </div>
        </div>
      </motion.div>

      {/* Certifications */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
        className="mx-4 mb-4"
      >
        <h3 className="text-sm font-semibold text-[#1F2937] mb-3">Organization Certifications</h3>
        <div className="flex gap-3 overflow-x-auto scrollbar-hide">
          {organization.certifications.map((cert, index) => (
            <div
              key={index}
              className="flex-shrink-0 bg-white rounded-xl p-3 shadow-sm flex items-center"
              style={{ boxShadow: '0 2px 6px rgba(0,0,0,0.04)' }}
            >
              <div className="w-10 h-10 bg-[#D48931]/10 rounded-full flex items-center justify-center mr-3">
                <Award size={20} className="text-[#D48931]" />
              </div>
              <div>
                <div className="text-sm font-medium text-[#1F2937]">{cert.name}</div>
                <div className="text-xs text-[#6B7280]">{cert.issuer} • {cert.year}</div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Contract Info Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mx-4 mb-4"
      >
        <div className="bg-gradient-to-r from-[#164c51] to-[#0C2521] rounded-xl p-4 flex items-center">
          <Calendar size={20} className="text-white mr-3" />
          <div className="flex-1">
            <div className="text-white text-sm font-medium">Contract Period</div>
            <div className="text-white/80 text-xs">{organization.contractStart} - {organization.contractEnd}</div>
          </div>
          <ChevronRight size={16} className="text-white/60" />
        </div>
      </motion.div>

      {/* Menu Items */}
      <div className="flex-1 px-4 pb-4 overflow-y-auto scrollbar-hide">
        {menuItems.map((item, index) => (
          <MenuItem key={item.title} item={item} index={index} />
        ))}

        {/* Logout Button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: menuItems.length * 0.05 }}
          whileHover={{ x: 5 }}
          whileTap={{ scale: 0.98 }}
          className="w-full bg-[#EF4444]/10 rounded-xl p-4 flex items-center mt-4"
        >
          <div className="w-10 h-10 rounded-full flex items-center justify-center mr-4 bg-[#EF4444]/20">
            <LogOut size={20} className="text-[#EF4444]" />
          </div>
          <span className="flex-1 text-left font-medium text-[#EF4444]">Sign Out</span>
        </motion.button>
      </div>
    </div>
  );
};

export default ProfilePage;