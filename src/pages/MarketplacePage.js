import React, { useState } from 'react';
import { Search, Zap, Package, Leaf, Flame, TreePine, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const MarketplacePage = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [credits, setCredits] = useState(1250);
  const [redeemed, setRedeemed] = useState({});
  const [toast, setToast] = useState(null);

  const showToast = (message) => {
    setToast(message);
    setTimeout(() => setToast(null), 2500);
  };

  const categories = [
    { id: 'all', label: 'All', icon: Package },
    { id: 'lpg', label: 'Bio-LPG', icon: Flame },
    { id: 'pickup', label: 'Pickup Credits', icon: Zap },
    { id: 'kitchen', label: 'Kitchen', icon: Package },
    { id: 'carbon', label: 'Carbon', icon: TreePine },
    { id: 'fertilizer', label: 'Fertilizer', icon: Leaf },
  ];

  const products = [
    { id: 1, name: 'Bio-LPG 10% Discount', category: 'lpg', price: 200, image: '🔥', desc: 'Get 10% off your next Bio-LPG order', tag: 'Popular', tagColor: '#D97706', details: 'Valid for 30 days from redemption. Applies to any Bio-LPG cylinder size.' },
    { id: 2, name: 'Free Waste Pickup', category: 'pickup', price: 150, image: '🚛', desc: 'One free scheduled waste collection', tag: 'Best Value', tagColor: '#0D9488', details: 'Schedule a free pickup for up to 100kg of waste. Valid in all coverage areas.' },
    { id: 3, name: 'Eco Kitchen Starter Kit', category: 'kitchen', price: 500, image: '🍳', desc: 'Sustainable bamboo kitchen set', tag: '', tagColor: '', details: 'Includes bamboo cutting board, utensil set, and storage containers. All sustainably sourced.' },
    { id: 4, name: 'Carbon Offset Token', category: 'carbon', price: 100, image: '🌱', desc: 'Offset 50kg CO₂ emissions', tag: 'Green', tagColor: '#065F46', details: 'Each token offsets 50kg of carbon dioxide. Verified by certified carbon registries.' },
    { id: 5, name: 'Organic Fertilizer 5kg', category: 'fertilizer', price: 300, image: '🌿', desc: 'Premium compost from biogas residue', tag: 'New', tagColor: '#7C3AED', details: 'Made from digestate, rich in nutrients. Perfect for gardens and farms.' },
    { id: 6, name: 'Bio-LPG 25% Discount', category: 'lpg', price: 450, image: '🔥', desc: '25% off your next 3 Bio-LPG orders', tag: 'Premium', tagColor: '#D97706', details: 'Massive savings! Valid for 90 days. Applies to 3 consecutive orders.' },
    { id: 7, name: 'Sustainability Badge', category: 'carbon', price: 50, image: '🏅', desc: 'Green Partner digital badge', tag: '', tagColor: '', details: 'Display on your profile and storefront. Shows your commitment to sustainability.' },
    { id: 8, name: 'Bamboo Straw Set', category: 'kitchen', price: 80, image: '🥤', desc: 'Reusable bamboo straw pack (6 pcs)', tag: '', tagColor: '', details: '6 reusable bamboo straws with cleaning brush and cotton pouch.' },
    { id: 9, name: 'Double Pickup Credits', category: 'pickup', price: 250, image: '⚡', desc: '2x credits on next 5 pickups', tag: 'Limited', tagColor: '#DC2626', details: 'Earn double Energy Credits on your next 5 waste pickups. Limited time offer!' },
    { id: 10, name: 'Organic Fertilizer 20kg', category: 'fertilizer', price: 900, image: '🌾', desc: 'Bulk compost for commercial use', tag: 'Bulk', tagColor: '#065F46', details: 'Commercial-grade organic fertilizer. Delivered to your location.' },
  ];

  const filteredProducts = products.filter(p => {
    const matchCat = activeCategory === 'all' || p.category === activeCategory;
    const matchSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="min-h-full bg-[#F0FDF9]">
      {/* Toast */}
      <AnimatePresence>
        {toast && (
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
            className="fixed top-14 left-1/2 -translate-x-1/2 z-[100] bg-gray-800 text-white px-4 py-2.5 rounded-xl text-xs font-semibold shadow-lg flex items-center gap-2 whitespace-nowrap">
            <Check size={14} className="text-[#0D9488]" />
            {toast}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <div className="bg-gradient-to-br from-[#065F46] to-[#0D9488] px-5 pt-6 pb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-xl font-bold text-white">Rewards Marketplace</h1>
            <p className="text-white/70 text-xs">Redeem your Energy Credits</p>
          </div>
          <div className="bg-white/15 rounded-xl px-3 py-1.5 flex items-center gap-1.5">
            <Zap size={14} className="text-yellow-300" />
            <span className="text-white text-sm font-bold">{credits.toLocaleString()} EC</span>
          </div>
        </div>

        {/* Search */}
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input type="text" placeholder="Search rewards..."
            value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 bg-white rounded-xl text-sm text-gray-800 placeholder:text-gray-400 outline-none" />
        </div>
      </div>

      {/* Categories */}
      <div className="px-5 py-3 overflow-x-auto scrollbar-hide">
        <div className="flex gap-1.5">
          {categories.map((cat) => (
            <motion.button key={cat.id} whileTap={{ scale: 0.95 }}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-[11px] font-semibold whitespace-nowrap transition-all
              ${activeCategory === cat.id ? 'bg-[#0D9488] text-white' : 'bg-white text-gray-600 shadow-sm'}`}>
              <cat.icon size={12} />
              {cat.label}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Products Grid */}
      <div className="px-5 pb-8">
        <div className="grid grid-cols-2 gap-3">
          {filteredProducts.map((product, i) => (
            <motion.div key={product.id}
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
              whileHover={{ y: -3 }}
              onClick={() => setSelectedProduct(product)}
              className="bg-white rounded-2xl overflow-hidden shadow-sm cursor-pointer">
              <div className="h-24 flex items-center justify-center bg-gradient-to-b from-gray-50 to-white relative">
                <span className="text-4xl">{product.image}</span>
                {product.tag && (
                  <span className="absolute top-2 right-2 text-[8px] font-bold text-white px-1.5 py-0.5 rounded"
                    style={{ backgroundColor: product.tagColor }}>
                    {product.tag}
                  </span>
                )}
              </div>
              <div className="p-3">
                <h3 className="text-xs font-bold text-gray-800 leading-tight mb-1">{product.name}</h3>
                <p className="text-[10px] text-gray-500 leading-tight mb-2">{product.desc}</p>
                <div className="flex items-center gap-1">
                  <Zap size={12} className="text-[#D97706]" />
                  <span className="text-xs font-bold text-[#065F46]">{product.price} EC</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Product Detail Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-end justify-center z-50"
            onClick={() => setSelectedProduct(null)}>
            <motion.div initial={{ y: 300 }} animate={{ y: 0 }} exit={{ y: 300 }}
              className="bg-white rounded-t-3xl p-6 w-full max-w-[450px]"
              onClick={(e) => e.stopPropagation()}>
              <div className="w-10 h-1 bg-gray-200 rounded-full mx-auto mb-4" />
              <div className="flex items-center gap-3 mb-4">
                <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center">
                  <span className="text-4xl">{selectedProduct.image}</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-base font-bold text-gray-800">{selectedProduct.name}</h3>
                  <div className="flex items-center gap-1 mt-0.5">
                    <Zap size={14} className="text-[#D97706]" />
                    <span className="text-sm font-bold text-[#065F46]">{selectedProduct.price} Energy Credits</span>
                  </div>
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-4">{selectedProduct.details}</p>
              <div className="flex gap-3">
                <motion.button whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedProduct(null)}
                  className="flex-1 py-3 rounded-xl text-sm font-semibold border border-gray-200 text-gray-600">
                  Cancel
                </motion.button>
                <motion.button whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    if (redeemed[selectedProduct.id]) {
                      showToast('Already redeemed!');
                    } else if (credits < selectedProduct.price) {
                      showToast('Not enough credits!');
                    } else {
                      setCredits(prev => prev - selectedProduct.price);
                      setRedeemed(prev => ({ ...prev, [selectedProduct.id]: true }));
                      showToast(`Redeemed ${selectedProduct.name}! 🎉`);
                    }
                    setSelectedProduct(null);
                  }}
                  className="flex-1 py-3 bg-gradient-to-r from-[#0D9488] to-[#065F46] text-white rounded-xl text-sm font-semibold">
                  Redeem
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MarketplacePage;
