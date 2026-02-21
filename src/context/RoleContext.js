import { create } from 'zustand';

const useRoleStore = create((set) => ({
  role: 'supplier', // 'supplier' | 'customer' | 'driver' | 'admin'
  setRole: (role) => set({ role }),
  
  // Role display info
  roleInfo: {
    supplier: {
      label: 'Supplier',
      name: 'Restoran Nusantara',
      subtitle: 'Food Waste Supplier',
      avatar: 'RN',
      color: '#0D9488',
    },
    customer: {
      label: 'Customer',
      name: 'Ibu Sari',
      subtitle: 'Bio-LPG Customer',
      avatar: 'IS',
      color: '#D97706',
    },
    driver: {
      label: 'Driver',
      name: 'Budi Santoso',
      subtitle: 'Logistics Driver',
      avatar: 'BS',
      color: '#2563EB',
    },
    admin: {
      label: 'Admin',
      name: 'BIMA Control',
      subtitle: 'Platform Admin',
      avatar: 'BA',
      color: '#7C3AED',
    },
  },
}));

export default useRoleStore;
