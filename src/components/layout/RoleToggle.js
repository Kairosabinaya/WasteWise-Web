import React from 'react';
import { motion } from 'framer-motion';
import { Factory, Flame, Truck, Shield } from 'lucide-react';
import useRoleStore from '../../context/RoleContext';

const roles = [
    { id: 'supplier', label: 'Supplier', icon: Factory, color: '#0D9488' },
    { id: 'customer', label: 'Customer', icon: Flame, color: '#D97706' },
    { id: 'driver', label: 'Driver', icon: Truck, color: '#2563EB' },
    { id: 'admin', label: 'Admin', icon: Shield, color: '#7C3AED' },
];

const RoleToggle = () => {
    const { role, setRole } = useRoleStore();

    return (
        <div className="bg-white/95 backdrop-blur-md border-b border-gray-100 px-2 py-1.5 sticky top-0 z-50">
            <div className="flex gap-1">
                {roles.map((r) => {
                    const isActive = role === r.id;
                    return (
                        <motion.button
                            key={r.id}
                            onClick={() => setRole(r.id)}
                            whileTap={{ scale: 0.95 }}
                            className={`
                  flex items-center gap-1 px-1.5 py-1.5 rounded-lg text-[10px] font-semibold
                  transition-all duration-200 flex-1 justify-center min-w-0
                  ${isActive
                                    ? 'text-white shadow-md'
                                    : 'text-gray-500 bg-gray-50 hover:bg-gray-100'
                                }
                `}
                            style={isActive ? {
                                backgroundColor: r.color,
                                boxShadow: `0 2px 8px ${r.color}40`,
                            } : {}}
                        >
                            <r.icon size={12} className="flex-shrink-0" />
                            <span className="truncate">{r.label}</span>
                        </motion.button>
                    );
                })}
            </div>
        </div>
    );
};

export default RoleToggle;
