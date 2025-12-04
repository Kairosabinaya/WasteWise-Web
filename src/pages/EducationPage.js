import React, { useState } from 'react';
import { BookOpen, ChevronRight, Clock, Award, CheckCircle, Star, Users, Shield, AlertTriangle, Wrench, GraduationCap, FileText, Calendar, MapPin, Video, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { clsx } from 'clsx';
import { AppLogo } from '../components/ui';

const EducationPage = () => {
  const [activeTab, setActiveTab] = useState('upcoming');
  const [selectedSession, setSelectedSession] = useState(null);
  const [showBookingModal, setShowBookingModal] = useState(false);

  // Upcoming training sessions that can be booked
  const upcomingSessions = [
    {
      id: '1',
      title: 'Smart Bin Operations Workshop',
      description: 'Hands-on training for operating and maintaining WasteWise smart bins',
      date: 'Dec 15, 2024',
      time: '09:00 - 12:00',
      location: 'Training Room A, Grand Indonesia',
      type: 'In-Person',
      instructor: 'WasteWise Technical Team',
      certification: 'Smart Bin Operator Certificate',
      targetRole: 'Cleaning Staff',
      spotsLeft: 8,
      totalSpots: 15,
      icon: Wrench,
      color: '#164c51',
    },
    {
      id: '2',
      title: 'Waste Sorting Best Practices',
      description: 'Standard operating procedures for waste segregation at source',
      date: 'Dec 18, 2024',
      time: '14:00 - 16:00',
      location: 'Virtual (Zoom)',
      type: 'Virtual',
      instructor: 'Environmental Compliance Officer',
      certification: 'Waste Sorting Certification',
      targetRole: 'All Staff',
      spotsLeft: 25,
      totalSpots: 50,
      icon: BookOpen,
      color: '#164c51',
    },
    {
      id: '3',
      title: 'ESG Compliance for Managers',
      description: 'Understanding ESG metrics, reporting standards, and compliance requirements',
      date: 'Dec 20, 2024',
      time: '10:00 - 13:00',
      location: 'Conference Room B',
      type: 'In-Person',
      instructor: 'ESG Consultant',
      certification: 'ESG Manager Certification',
      targetRole: 'Managers',
      spotsLeft: 3,
      totalSpots: 10,
      icon: FileText,
      color: '#D48931',
    },
    {
      id: '4',
      title: 'Hazardous Waste Safety Training',
      description: 'Safety protocols and emergency procedures for hazardous material handling',
      date: 'Dec 22, 2024',
      time: '09:00 - 11:00',
      location: 'Training Room A',
      type: 'In-Person',
      instructor: 'Safety & Compliance Team',
      certification: 'Hazardous Waste Handler License',
      targetRole: 'Supervisors',
      spotsLeft: 5,
      totalSpots: 12,
      icon: AlertTriangle,
      color: '#6d1e04',
    },
  ];

  // Staff certifications overview
  const certificationStats = [
    {
      id: '1',
      name: 'Smart Bin Operator',
      totalStaff: 24,
      certified: 18,
      expiringSoon: 3,
      icon: Wrench,
      color: '#164c51',
    },
    {
      id: '2',
      name: 'Waste Sorting',
      totalStaff: 45,
      certified: 32,
      expiringSoon: 5,
      icon: BookOpen,
      color: '#164c51',
    },
    {
      id: '3',
      name: 'Hazardous Waste Handler',
      totalStaff: 12,
      certified: 8,
      expiringSoon: 2,
      icon: AlertTriangle,
      color: '#6d1e04',
    },
    {
      id: '4',
      name: 'ESG Compliance Manager',
      totalStaff: 5,
      certified: 2,
      expiringSoon: 0,
      icon: FileText,
      color: '#D48931',
    },
  ];

  // Recently booked sessions
  const bookedSessions = [
    {
      id: 'B1',
      title: 'Waste Sorting Best Practices',
      date: 'Dec 18, 2024',
      time: '14:00 - 16:00',
      attendees: 8,
      status: 'confirmed',
      icon: BookOpen,
      color: '#164c51',
    },
    {
      id: 'B2',
      title: 'Smart Bin Operations Workshop',
      date: 'Dec 15, 2024',
      time: '09:00 - 12:00',
      attendees: 5,
      status: 'pending',
      icon: Wrench,
      color: '#164c51',
    },
  ];

  // Tab Component
  const TabButton = ({ id, label, isActive }) => (
    <motion.button
      whileTap={{ scale: 0.95 }}
      onClick={() => setActiveTab(id)}
      className={clsx(
        "flex-1 py-3 px-4 rounded-xl font-medium text-sm transition-all",
        isActive
          ? "bg-[#164c51] text-white shadow-lg shadow-[#164c51]/30"
          : "bg-white text-[#6B7280]"
      )}
    >
      {label}
    </motion.button>
  );

  // Session Card Component
  const SessionCard = ({ session, index }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -2 }}
      onClick={() => setSelectedSession(session)}
      className="bg-white rounded-2xl p-4 shadow-sm mb-3 cursor-pointer"
      style={{ boxShadow: '0 2px 6px rgba(0,0,0,0.04)' }}
    >
      <div className="flex items-start">
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center mr-3 flex-shrink-0"
          style={{ backgroundColor: `${session.color}1A` }}
        >
          <session.icon size={24} style={{ color: session.color }} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-1">
            <div className="flex-1">
              <h3 className="text-sm font-semibold text-[#1F2937] leading-tight">
                {session.title}
              </h3>
              <p className="text-xs text-[#6B7280] mt-0.5">{session.targetRole}</p>
            </div>
            <span
              className={clsx(
                "px-2 py-0.5 rounded-full text-[10px] font-bold flex items-center gap-1",
                session.type === 'Virtual'
                  ? 'bg-blue-100 text-blue-600'
                  : 'bg-green-100 text-green-600'
              )}
            >
              {session.type === 'Virtual' ? <Video size={10} /> : <MapPin size={10} />}
              {session.type}
            </span>
          </div>

          <p className="text-xs text-[#6B7280] mb-2 line-clamp-2">{session.description}</p>

          {/* Date & Spots */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 text-xs text-[#6B7280]">
              <span className="flex items-center">
                <Calendar size={12} className="mr-1" />
                {session.date}
              </span>
              <span className="flex items-center">
                <Clock size={12} className="mr-1" />
                {session.time}
              </span>
            </div>
            <span
              className={clsx(
                "text-xs font-medium",
                session.spotsLeft <= 5 ? 'text-[#D48931]' : 'text-[#164c51]'
              )}
            >
              {session.spotsLeft} spots left
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );

  // Certification Stats Card Component
  const CertificationCard = ({ cert, index }) => {
    const percentage = Math.round((cert.certified / cert.totalStaff) * 100);

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 }}
        className="bg-white rounded-2xl p-4 shadow-sm mb-3"
        style={{ boxShadow: '0 2px 6px rgba(0,0,0,0.04)' }}
      >
        <div className="flex items-center mb-3">
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center mr-3"
            style={{ backgroundColor: `${cert.color}1A` }}
          >
            <cert.icon size={20} style={{ color: cert.color }} />
          </div>
          <div className="flex-1">
            <h3 className="text-sm font-semibold text-[#1F2937]">{cert.name}</h3>
            <p className="text-xs text-[#6B7280]">{cert.certified}/{cert.totalStaff} staff certified</p>
          </div>
          <div
            className="text-lg font-bold"
            style={{ color: percentage >= 80 ? '#164c51' : '#D48931' }}
          >
            {percentage}%
          </div>
        </div>

        <div className="h-2 bg-gray-200 rounded-full overflow-hidden mb-2">
          <motion.div
            className="h-full rounded-full"
            style={{
              backgroundColor: percentage >= 80 ? '#164c51' : '#D48931',
            }}
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            transition={{ duration: 0.8 }}
          />
        </div>

        {cert.expiringSoon > 0 && (
          <div className="flex items-center text-xs text-[#D48931]">
            <AlertTriangle size={12} className="mr-1" />
            {cert.expiringSoon} certifications expiring soon
          </div>
        )}
      </motion.div>
    );
  };

  // Booked Session Card
  const BookedSessionCard = ({ session, index }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="bg-white rounded-xl p-4 shadow-sm mb-3"
      style={{ boxShadow: '0 2px 6px rgba(0,0,0,0.04)' }}
    >
      <div className="flex items-center">
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center mr-3"
          style={{ backgroundColor: `${session.color}1A` }}
        >
          <session.icon size={20} style={{ color: session.color }} />
        </div>
        <div className="flex-1">
          <h3 className="text-sm font-semibold text-[#1F2937]">{session.title}</h3>
          <div className="flex items-center gap-2 text-xs text-[#6B7280] mt-0.5">
            <span>{session.date}</span>
            <span>•</span>
            <span>{session.attendees} attendees</span>
          </div>
        </div>
        <span
          className={clsx(
            "px-2 py-1 rounded-full text-[10px] font-bold",
            session.status === 'confirmed'
              ? 'bg-green-100 text-green-600'
              : 'bg-yellow-100 text-yellow-600'
          )}
        >
          {session.status === 'confirmed' ? 'CONFIRMED' : 'PENDING'}
        </span>
      </div>
    </motion.div>
  );

  // Session Detail Modal
  const SessionDetailModal = () => {
    if (!selectedSession) return null;

    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
        onClick={() => setSelectedSession(null)}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-white rounded-xl p-5 w-full mx-6 max-h-[85vh] overflow-y-auto"
          style={{ maxWidth: '340px' }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mr-3"
                style={{ backgroundColor: `${selectedSession.color}1A` }}
              >
                <selectedSession.icon size={24} style={{ color: selectedSession.color }} />
              </div>
              <div>
                <h2 className="font-bold text-lg text-[#1F2937]">{selectedSession.title}</h2>
                <span
                  className={clsx(
                    "px-2 py-0.5 rounded-full text-[10px] font-bold",
                    selectedSession.type === 'Virtual'
                      ? 'bg-blue-100 text-blue-600'
                      : 'bg-green-100 text-green-600'
                  )}
                >
                  {selectedSession.type}
                </span>
              </div>
            </div>
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setSelectedSession(null)}
              className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center"
            >
              <X size={16} className="text-gray-600" />
            </motion.button>
          </div>

          <p className="text-sm text-[#6B7280] mb-4">{selectedSession.description}</p>

          {/* Session Details */}
          <div className="bg-gray-50 rounded-xl p-4 mb-4">
            <h3 className="font-semibold text-sm text-[#1F2937] mb-3">Session Details</h3>
            <div className="space-y-2">
              <div className="flex items-center text-sm">
                <Calendar size={16} className="text-[#6B7280] mr-3" />
                <span className="text-[#1F2937]">{selectedSession.date}</span>
              </div>
              <div className="flex items-center text-sm">
                <Clock size={16} className="text-[#6B7280] mr-3" />
                <span className="text-[#1F2937]">{selectedSession.time}</span>
              </div>
              <div className="flex items-center text-sm">
                <MapPin size={16} className="text-[#6B7280] mr-3" />
                <span className="text-[#1F2937]">{selectedSession.location}</span>
              </div>
              <div className="flex items-center text-sm">
                <Users size={16} className="text-[#6B7280] mr-3" />
                <span className="text-[#1F2937]">{selectedSession.targetRole}</span>
              </div>
            </div>
          </div>

          {/* Certification */}
          <div className="bg-[#D48931]/10 rounded-xl p-4 mb-4 flex items-center">
            <Award size={20} className="text-[#D48931] mr-3" />
            <div>
              <div className="text-xs text-[#6B7280]">Upon Completion</div>
              <div className="text-sm font-semibold text-[#1F2937]">{selectedSession.certification}</div>
            </div>
          </div>

          {/* Availability */}
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-[#6B7280]">Available Spots</span>
              <span className="text-sm font-bold text-[#164c51]">
                {selectedSession.spotsLeft} of {selectedSession.totalSpots}
              </span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full bg-[#164c51]"
                style={{ width: `${((selectedSession.totalSpots - selectedSession.spotsLeft) / selectedSession.totalSpots) * 100}%` }}
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <motion.button
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelectedSession(null)}
              className="flex-1 py-3 bg-gray-100 text-[#6B7280] rounded-xl font-semibold text-sm"
            >
              Close
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                setShowBookingModal(true);
                setSelectedSession(null);
              }}
              className="flex-1 py-3 bg-[#164c51] text-white rounded-xl font-semibold text-sm flex items-center justify-center gap-2"
            >
              <Calendar size={16} />
              Book for Team
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    );
  };

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
          Training & Certification
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="text-[#6B7280] text-sm mt-1"
        >
          Book training sessions for your team
        </motion.p>
      </motion.div>

      {/* Stats Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="px-4 mb-4"
      >
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-white rounded-xl p-3 text-center shadow-sm">
            <GraduationCap size={20} className="text-[#164c51] mx-auto mb-1" />
            <div className="text-lg font-bold text-[#164c51]">{upcomingSessions.length}</div>
            <div className="text-xs text-[#6B7280]">Upcoming</div>
          </div>
          <div className="bg-white rounded-xl p-3 text-center shadow-sm">
            <CheckCircle size={20} className="text-[#164c51] mx-auto mb-1" />
            <div className="text-lg font-bold text-[#164c51]">
              {bookedSessions.length}
            </div>
            <div className="text-xs text-[#6B7280]">Booked</div>
          </div>
          <div className="bg-white rounded-xl p-3 text-center shadow-sm">
            <Award size={20} className="text-[#D48931] mx-auto mb-1" />
            <div className="text-lg font-bold text-[#D48931]">
              {certificationStats.length}
            </div>
            <div className="text-xs text-[#6B7280]">Certificates</div>
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
        <div className="flex gap-3 bg-gray-100 p-1 rounded-xl">
          <TabButton id="upcoming" label="Available" isActive={activeTab === 'upcoming'} />
          <TabButton id="booked" label="My Bookings" isActive={activeTab === 'booked'} />
          <TabButton id="certs" label="Certificates" isActive={activeTab === 'certs'} />
        </div>
      </motion.div>

      {/* Content */}
      <div className="flex-1 px-4 pb-4 overflow-y-auto scrollbar-hide">
        <AnimatePresence mode="wait">
          {activeTab === 'upcoming' && (
            <motion.div
              key="upcoming"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <h2 className="text-sm font-semibold text-[#1F2937] mb-3">Available Training Sessions</h2>
              {upcomingSessions.map((session, index) => (
                <SessionCard key={session.id} session={session} index={index} />
              ))}
            </motion.div>
          )}

          {activeTab === 'booked' && (
            <motion.div
              key="booked"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <h2 className="text-sm font-semibold text-[#1F2937] mb-3">Your Booked Sessions</h2>
              {bookedSessions.length > 0 ? (
                bookedSessions.map((session, index) => (
                  <BookedSessionCard key={session.id} session={session} index={index} />
                ))
              ) : (
                <div className="flex flex-col items-center justify-center py-12">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                    <Calendar size={32} className="text-gray-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-[#1F2937] mb-2">No Bookings Yet</h3>
                  <p className="text-[#6B7280] text-center text-sm">
                    Browse available sessions and book training for your team.
                  </p>
                </div>
              )}
            </motion.div>
          )}

          {activeTab === 'certs' && (
            <motion.div
              key="certs"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <h2 className="text-sm font-semibold text-[#1F2937] mb-3">Team Certification Status</h2>
              {certificationStats.map((cert, index) => (
                <CertificationCard key={cert.id} cert={cert} index={index} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Session Detail Modal */}
      <AnimatePresence>
        {selectedSession && <SessionDetailModal />}
      </AnimatePresence>
    </div>
  );
};

export default EducationPage;