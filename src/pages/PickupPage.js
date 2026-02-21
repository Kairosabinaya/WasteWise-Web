import React, { useState } from 'react';
import { ArrowLeft, Truck, Clock, Package, MapPin, CheckCircle, Calendar, Scale, ChevronRight, Zap, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import useRoleStore from '../context/RoleContext';

const PickupPage = () => {
    const navigate = useNavigate();
    const { role } = useRoleStore();
    const [selectedTime, setSelectedTime] = useState(null);
    const [estimatedWeight, setEstimatedWeight] = useState('');
    const [showConfirm, setShowConfirm] = useState(false);
    const [confirmed, setConfirmed] = useState(false);

    const timeSlots = [
        { id: 1, time: '06:00 - 08:00', label: 'Early Morning', available: true },
        { id: 2, time: '08:00 - 10:00', label: 'Morning', available: true },
        { id: 3, time: '10:00 - 12:00', label: 'Late Morning', available: false },
        { id: 4, time: '14:00 - 16:00', label: 'Afternoon', available: true },
        { id: 5, time: '16:00 - 18:00', label: 'Evening', available: true },
    ];

    const upcomingPickups = [
        { id: 1, date: 'Today', time: '08:00 AM', weight: '45 kg', status: 'confirmed', driver: 'Budi S.', eta: '15 min' },
        { id: 2, date: 'Tomorrow', time: '10:00 AM', weight: '60 kg', status: 'scheduled', driver: 'Assigned', eta: '-' },
        { id: 3, date: 'Feb 24', time: '08:00 AM', weight: '35 kg', status: 'completed', driver: 'Andi R.', eta: 'Done' },
    ];

    const handleConfirm = () => {
        setShowConfirm(true);
        setTimeout(() => {
            setConfirmed(true);
        }, 1500);
    };

    // Driver sees different content
    if (role === 'driver') {
        return (
            <div className="min-h-full bg-[#F0FDF9]">
                {/* Header */}
                <div className="bg-gradient-to-br from-[#1E40AF] to-[#2563EB] px-5 pt-6 pb-16 relative">
                    <div className="flex items-center mb-4">
                        <motion.button whileTap={{ scale: 0.9 }} onClick={() => navigate(-1)}
                            className="w-10 h-10 bg-white/15 rounded-full flex items-center justify-center mr-3">
                            <ArrowLeft size={20} className="text-white" />
                        </motion.button>
                        <h1 className="text-xl font-bold text-white">My Tasks</h1>
                    </div>
                    <div className="flex gap-3">
                        <div className="flex-1 bg-white/15 rounded-xl p-3 text-center">
                            <div className="text-2xl font-bold text-white">8</div>
                            <div className="text-[10px] text-white/80">Pickups</div>
                        </div>
                        <div className="flex-1 bg-white/15 rounded-xl p-3 text-center">
                            <div className="text-2xl font-bold text-white">6</div>
                            <div className="text-[10px] text-white/80">Deliveries</div>
                        </div>
                        <div className="flex-1 bg-white/15 rounded-xl p-3 text-center">
                            <div className="text-2xl font-bold text-white">87%</div>
                            <div className="text-[10px] text-white/80">Efficiency</div>
                        </div>
                    </div>
                </div>

                {/* Driver Tasks */}
                <div className="px-5 -mt-8 relative z-10">
                    {[
                        { type: 'Pickup', loc: 'Restoran Padang Jaya', time: '08:30', weight: '45kg', addr: 'Jl. Sudirman 45', status: 'In Progress' },
                        { type: 'Pickup', loc: 'Bakso Malang Cak To', time: '09:15', weight: '30kg', addr: 'Jl. Ahmad Yani 12', status: 'Next' },
                        { type: 'Delivery', loc: 'Ibu Sari', time: '10:00', weight: '12kg Bio-LPG', addr: 'Jl. Merdeka 8', status: 'Scheduled' },
                        { type: 'Pickup', loc: 'Hotel Grand Nusantara', time: '11:30', weight: '120kg', addr: 'Jl. Thamrin 1', status: 'Scheduled' },
                        { type: 'Delivery', loc: 'Warung Bu Eko', time: '13:00', weight: '12kg Bio-LPG', addr: 'Jl. Diponegoro 22', status: 'Scheduled' },
                    ].map((task, i) => (
                        <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                            className="bg-white rounded-xl p-4 mb-3 shadow-sm">
                            <div className="flex items-center justify-between mb-2">
                                <span className={`text-xs font-bold px-2 py-0.5 rounded ${task.type === 'Pickup' ? 'bg-amber-50 text-amber-700' : 'bg-teal-50 text-teal-700'}`}>{task.type}</span>
                                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded ${task.status === 'In Progress' ? 'bg-blue-50 text-blue-700' : task.status === 'Next' ? 'bg-amber-50 text-amber-700' : 'bg-gray-100 text-gray-500'}`}>{task.status}</span>
                            </div>
                            <h3 className="text-sm font-bold text-gray-800">{task.loc}</h3>
                            <p className="text-xs text-gray-500 mt-0.5">{task.addr}</p>
                            <div className="flex items-center gap-3 mt-2">
                                <span className="text-xs text-gray-500 flex items-center gap-1"><Clock size={12} />{task.time}</span>
                                <span className="text-xs text-gray-500 flex items-center gap-1"><Package size={12} />{task.weight}</span>
                            </div>
                            {task.status === 'In Progress' && (
                                <motion.button whileTap={{ scale: 0.95 }}
                                    className="mt-3 w-full bg-gradient-to-r from-[#2563EB] to-[#1E40AF] text-white py-2 rounded-lg text-xs font-semibold">
                                    Complete Task
                                </motion.button>
                            )}
                        </motion.div>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-full bg-[#F0FDF9]">
            {/* Header */}
            <div className="bg-gradient-to-br from-[#065F46] to-[#0D9488] px-5 pt-6 pb-16 relative">
                <div className="flex items-center mb-4">
                    <motion.button whileTap={{ scale: 0.9 }} onClick={() => navigate(-1)}
                        className="w-10 h-10 bg-white/15 rounded-full flex items-center justify-center mr-3">
                        <ArrowLeft size={20} className="text-white" />
                    </motion.button>
                    <h1 className="text-xl font-bold text-white">Schedule Pickup</h1>
                </div>
                <p className="text-white/80 text-sm">Schedule waste collection and earn Energy Credits!</p>
            </div>

            {/* Content */}
            <div className="px-5 -mt-8 relative z-10">
                {!showConfirm ? (
                    <>
                        {/* Time Slot Selection */}
                        <div className="bg-white rounded-2xl p-4 shadow-lg mb-4">
                            <h3 className="text-sm font-bold text-gray-800 mb-3 flex items-center gap-2">
                                <Calendar size={16} className="text-[#0D9488]" /> Select Pickup Time
                            </h3>
                            <div className="space-y-2">
                                {timeSlots.map((slot) => (
                                    <motion.button key={slot.id} whileTap={{ scale: 0.98 }}
                                        onClick={() => slot.available && setSelectedTime(slot.id)}
                                        className={`w-full p-3 rounded-xl text-left flex items-center justify-between transition-all
                      ${!slot.available ? 'bg-gray-50 opacity-50 cursor-not-allowed' :
                                                selectedTime === slot.id ? 'bg-[#0D9488]/10 border-2 border-[#0D9488]' : 'bg-gray-50 hover:bg-gray-100'}`}>
                                        <div>
                                            <div className="text-sm font-semibold text-gray-800">{slot.time}</div>
                                            <div className="text-[10px] text-gray-500">{slot.label}{!slot.available && ' • Full'}</div>
                                        </div>
                                        {selectedTime === slot.id && <CheckCircle size={18} className="text-[#0D9488]" />}
                                    </motion.button>
                                ))}
                            </div>
                        </div>

                        {/* Estimated Weight */}
                        <div className="bg-white rounded-2xl p-4 shadow-sm mb-4">
                            <h3 className="text-sm font-bold text-gray-800 mb-3 flex items-center gap-2">
                                <Scale size={16} className="text-[#D97706]" /> Estimated Weight
                            </h3>
                            <div className="flex gap-2">
                                {['20', '40', '60', '80', '100+'].map((w) => (
                                    <motion.button key={w} whileTap={{ scale: 0.95 }}
                                        onClick={() => setEstimatedWeight(w)}
                                        className={`flex-1 py-2.5 rounded-xl text-xs font-semibold transition-all
                      ${estimatedWeight === w ? 'bg-[#D97706] text-white' : 'bg-gray-50 text-gray-600'}`}>
                                        {w} kg
                                    </motion.button>
                                ))}
                            </div>
                        </div>

                        {/* Confirm Button */}
                        <motion.button whileTap={{ scale: 0.95 }}
                            onClick={handleConfirm}
                            disabled={!selectedTime || !estimatedWeight}
                            className={`w-full py-3.5 rounded-xl font-semibold text-sm mb-6 transition-all
                ${selectedTime && estimatedWeight
                                    ? 'bg-gradient-to-r from-[#0D9488] to-[#065F46] text-white shadow-lg'
                                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}>
                            Confirm Pickup Request
                        </motion.button>
                    </>
                ) : (
                    <AnimatePresence>
                        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                            className="bg-white rounded-2xl p-6 shadow-lg text-center">
                            {!confirmed ? (
                                <>
                                    <div className="w-16 h-16 bg-[#0D9488]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}>
                                            <Truck size={28} className="text-[#0D9488]" />
                                        </motion.div>
                                    </div>
                                    <h3 className="text-lg font-bold text-gray-800 mb-1">Finding a driver...</h3>
                                    <p className="text-xs text-gray-500">Matching you with the nearest available driver</p>
                                </>
                            ) : (
                                <>
                                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring' }}
                                        className="w-16 h-16 bg-[#0D9488] rounded-full flex items-center justify-center mx-auto mb-4">
                                        <CheckCircle size={32} className="text-white" />
                                    </motion.div>
                                    <h3 className="text-lg font-bold text-gray-800 mb-1">Pickup Confirmed!</h3>
                                    <p className="text-xs text-gray-500 mb-4">Your waste collection is scheduled</p>
                                    <div className="bg-gray-50 rounded-xl p-4 text-left space-y-3">
                                        <div className="flex justify-between">
                                            <span className="text-xs text-gray-500">Driver</span>
                                            <span className="text-xs font-semibold text-gray-800">Budi Santoso</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-xs text-gray-500">ETA</span>
                                            <span className="text-xs font-semibold text-gray-800">15 minutes</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-xs text-gray-500">Credits Earned</span>
                                            <span className="text-xs font-bold text-[#0D9488] flex items-center gap-1"><Zap size={12} /> +{estimatedWeight === '100+' ? 150 : parseInt(estimatedWeight) * 1.5} EC</span>
                                        </div>
                                    </div>
                                    <motion.button whileTap={{ scale: 0.95 }} onClick={() => { setShowConfirm(false); setConfirmed(false); setSelectedTime(null); setEstimatedWeight(''); }}
                                        className="mt-4 w-full py-2.5 bg-gradient-to-r from-[#0D9488] to-[#065F46] text-white rounded-xl text-sm font-semibold">
                                        Schedule Another
                                    </motion.button>
                                </>
                            )}
                        </motion.div>
                    </AnimatePresence>
                )}

                {/* Upcoming pickups (show below form or after confirm) */}
                <div className="mt-4 mb-8">
                    <h3 className="text-sm font-bold text-gray-800 mb-3">Pickup History</h3>
                    {upcomingPickups.map((pickup, i) => (
                        <motion.div key={pickup.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="bg-white rounded-xl p-3.5 mb-2 shadow-sm flex items-center">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 ${pickup.status === 'completed' ? 'bg-gray-100' : pickup.status === 'confirmed' ? 'bg-[#0D9488]/10' : 'bg-[#D97706]/10'}`}>
                                {pickup.status === 'completed' ? <CheckCircle size={18} className="text-gray-400" /> : <Truck size={18} className={pickup.status === 'confirmed' ? 'text-[#0D9488]' : 'text-[#D97706]'} />}
                            </div>
                            <div className="flex-1">
                                <div className="text-sm font-semibold text-gray-800">{pickup.date} • {pickup.time}</div>
                                <div className="text-xs text-gray-500">{pickup.weight} • {pickup.driver}</div>
                            </div>
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${pickup.status === 'confirmed' ? 'bg-teal-50 text-teal-700' :
                                    pickup.status === 'scheduled' ? 'bg-amber-50 text-amber-700' :
                                        'bg-gray-100 text-gray-500'
                                }`}>{pickup.status}</span>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PickupPage;
