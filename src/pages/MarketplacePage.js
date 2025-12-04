import React, { useState } from 'react';
import { Search, TrendingUp, Package, Leaf, Recycle, Factory, Flame, ChevronRight, DollarSign, Calendar, Building2, Truck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { clsx } from 'clsx';
import { AppLogo } from '../components/ui';

const MarketplacePage = () => {
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Revenue summary for this month
  const revenueSummary = {
    totalRevenue: 15500000,
    pendingPayments: 3200000,
    totalSold: 1250, // kg
    activePartners: 8,
  };

  // Categories for circular economy products (English)
  const categories = [
    'All',
    'Compost',
    'BSF Larvae',
    'Plastic Pellets',
    'RDF',
  ];

  // Circular economy products/byproducts (English names)
  const circularProducts = [
    {
      id: 'CP-001',
      name: 'Premium Organic Compost',
      category: 'Compost',
      description: 'High-quality compost from organic waste, perfect for agriculture and gardening',
      pricePerKg: 5000,
      totalSoldMonth: 450,
      revenueMonth: 2250000,
      buyer: 'Green Farms Corp',
      buyerType: 'Agriculture',
      icon: Leaf,
      color: '#164c51',
      status: 'active',
      nextDelivery: '2024-12-06',
    },
    {
      id: 'CP-002',
      name: 'Black Soldier Fly Larvae',
      category: 'BSF Larvae',
      description: 'Protein-rich BSF larvae feed for aquaculture and poultry farms',
      pricePerKg: 15000,
      totalSoldMonth: 180,
      revenueMonth: 2700000,
      buyer: 'AquaFarm Industries',
      buyerType: 'Aquaculture',
      icon: Package,
      color: '#D48931',
      status: 'active',
      nextDelivery: '2024-12-07',
    },
    {
      id: 'CP-003',
      name: 'Recycled PET Pellets',
      category: 'Plastic Pellets',
      description: 'Clean recycled PET pellets for plastic manufacturing industry',
      pricePerKg: 8000,
      totalSoldMonth: 320,
      revenueMonth: 2560000,
      buyer: 'EcoPlast Manufacturing',
      buyerType: 'Manufacturing',
      icon: Recycle,
      color: '#164c51',
      status: 'active',
      nextDelivery: '2024-12-08',
    },
    {
      id: 'CP-004',
      name: 'HDPE Flakes',
      category: 'Plastic Pellets',
      description: 'High-density polyethylene flakes for industrial recycling',
      pricePerKg: 6500,
      totalSoldMonth: 200,
      revenueMonth: 1300000,
      buyer: 'Industrial Recyclers Ltd',
      buyerType: 'Manufacturing',
      icon: Recycle,
      color: '#164c51',
      status: 'pending',
      nextDelivery: '2024-12-10',
    },
    {
      id: 'CP-005',
      name: 'Refuse Derived Fuel',
      category: 'RDF',
      description: 'Alternative fuel for cement kilns from processed residual waste',
      pricePerKg: 3500,
      totalSoldMonth: 400,
      revenueMonth: 1400000,
      buyer: 'Cement Industries Group',
      buyerType: 'Cement Industry',
      icon: Flame,
      color: '#6d1e04',
      status: 'active',
      nextDelivery: '2024-12-05',
    },
    {
      id: 'CP-006',
      name: 'Vermicompost Premium',
      category: 'Compost',
      description: 'Worm-processed organic fertilizer with high nutrient content',
      pricePerKg: 8000,
      totalSoldMonth: 150,
      revenueMonth: 1200000,
      buyer: 'Farmers Cooperative',
      buyerType: 'Agriculture',
      icon: Leaf,
      color: '#164c51',
      status: 'active',
      nextDelivery: '2024-12-09',
    },
  ];

  // Filter by category
  const getFilteredProducts = () => {
    if (selectedCategory === 0) {
      return circularProducts;
    }
    const categoryName = categories[selectedCategory];
    return circularProducts.filter(p => p.category === categoryName);
  };

  const filteredProducts = getFilteredProducts();

  // Format currency
  const formatCurrency = (amount) => {
    if (amount >= 1000000) {
      return `Rp ${(amount / 1000000).toFixed(1)}M`;
    }
    return `Rp ${amount.toLocaleString()}`;
  };

  // Product Card Component
  const ProductCard = ({ product, index }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -2 }}
      onClick={() => setSelectedProduct(product)}
      className="bg-white rounded-2xl p-4 shadow-sm mb-3 cursor-pointer"
      style={{ boxShadow: '0 2px 6px rgba(0,0,0,0.04)' }}
    >
      <div className="flex items-start">
        {/* Icon */}
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center mr-3 flex-shrink-0"
          style={{ backgroundColor: `${product.color}1A` }}
        >
          <product.icon size={24} style={{ color: product.color }} />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-1">
            <div>
              <h3 className="text-sm font-semibold text-[#1F2937] leading-tight">
                {product.name}
              </h3>
              <p className="text-xs text-[#6B7280] mt-0.5">{product.category}</p>
            </div>
            <span
              className={clsx(
                "px-2 py-0.5 rounded-full text-[10px] font-bold",
                product.status === 'active'
                  ? 'bg-[#164c51]/10 text-[#164c51]'
                  : 'bg-[#D48931]/10 text-[#D48931]'
              )}
            >
              {product.status === 'active' ? 'ACTIVE' : 'PENDING'}
            </span>
          </div>

          <p className="text-xs text-[#6B7280] mb-2 line-clamp-2">{product.description}</p>

          {/* Price & Stats */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div>
                <div className="text-xs text-[#6B7280]">Price</div>
                <div className="text-sm font-bold text-[#164c51]">
                  Rp {product.pricePerKg.toLocaleString()}/kg
                </div>
              </div>
              <div className="w-px h-8 bg-gray-200" />
              <div>
                <div className="text-xs text-[#6B7280]">This Month</div>
                <div className="text-sm font-bold text-[#D48931]">
                  {formatCurrency(product.revenueMonth)}
                </div>
              </div>
            </div>
            <ChevronRight size={16} className="text-[#6B7280]" />
          </div>
        </div>
      </div>
    </motion.div>
  );

  // Product Detail Modal
  const ProductDetailModal = () => {
    if (!selectedProduct) return null;

    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
        onClick={() => setSelectedProduct(null)}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-white rounded-xl p-5 w-full mx-6 max-h-[80vh] overflow-y-auto"
          style={{ maxWidth: '340px' }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center mb-4">
            <div
              className="w-14 h-14 rounded-xl flex items-center justify-center mr-3"
              style={{ backgroundColor: `${selectedProduct.color}1A` }}
            >
              <selectedProduct.icon size={28} style={{ color: selectedProduct.color }} />
            </div>
            <div className="flex-1">
              <h2 className="font-bold text-lg text-[#1F2937]">{selectedProduct.name}</h2>
              <p className="text-sm text-[#6B7280]">{selectedProduct.category}</p>
            </div>
          </div>

          <p className="text-sm text-[#6B7280] mb-4">{selectedProduct.description}</p>

          {/* Revenue Stats */}
          <div className="bg-gradient-to-r from-[#164c51] to-[#0C2521] rounded-xl p-4 mb-4 text-white">
            <div className="text-xs text-white/70 mb-1">Monthly Revenue</div>
            <div className="text-2xl font-bold">{formatCurrency(selectedProduct.revenueMonth)}</div>
            <div className="text-sm text-white/80 mt-1">{selectedProduct.totalSoldMonth} kg sold</div>
          </div>

          {/* Pricing */}
          <div className="bg-gray-50 rounded-xl p-4 mb-4">
            <h3 className="font-semibold text-sm text-[#1F2937] mb-3">Pricing Details</h3>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-[#6B7280]">Price per kg</span>
              <span className="text-sm font-bold text-[#164c51]">
                Rp {selectedProduct.pricePerKg.toLocaleString()}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-[#6B7280]">Contract Type</span>
              <span className="text-sm font-medium text-[#1F2937]">Monthly</span>
            </div>
          </div>

          {/* Buyer Info */}
          <div className="bg-gray-50 rounded-xl p-4 mb-4">
            <h3 className="font-semibold text-sm text-[#1F2937] mb-3">Buyer Partner</h3>
            <div className="flex items-center mb-2">
              <Building2 size={16} className="text-[#6B7280] mr-2" />
              <span className="text-sm text-[#1F2937]">{selectedProduct.buyer}</span>
            </div>
            <div className="flex items-center mb-2">
              <Factory size={16} className="text-[#6B7280] mr-2" />
              <span className="text-sm text-[#6B7280]">{selectedProduct.buyerType}</span>
            </div>
            <div className="flex items-center">
              <Truck size={16} className="text-[#6B7280] mr-2" />
              <span className="text-sm text-[#6B7280]">Next delivery: {selectedProduct.nextDelivery}</span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <motion.button
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelectedProduct(null)}
              className="flex-1 py-3 bg-gray-100 text-[#6B7280] rounded-xl font-semibold text-sm"
            >
              Close
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.98 }}
              className="flex-1 py-3 bg-[#164c51] text-white rounded-xl font-semibold text-sm"
            >
              View Orders
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

        <div className="flex justify-between items-start mb-4">
          <div>
            <motion.h1
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-2xl font-bold text-[#0C2521]"
            >
              Circular Economy
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="text-[#6B7280] text-sm mt-1"
            >
              Revenue from waste byproducts
            </motion.p>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-[#164c51] text-white px-3 py-1.5 rounded-full flex items-center shadow-sm"
          >
            <TrendingUp size={14} className="mr-1" />
            <span className="text-sm font-semibold">{formatCurrency(revenueSummary.totalRevenue)}</span>
          </motion.div>
        </div>

        {/* Revenue Summary Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-3 gap-3 mb-4"
        >
          <div className="bg-white rounded-xl p-3 shadow-sm">
            <div className="text-xs text-[#6B7280] mb-1">Sold</div>
            <div className="text-lg font-bold text-[#164c51]">{revenueSummary.totalSold} kg</div>
          </div>
          <div className="bg-white rounded-xl p-3 shadow-sm">
            <div className="text-xs text-[#6B7280] mb-1">Pending</div>
            <div className="text-lg font-bold text-[#D48931]">{formatCurrency(revenueSummary.pendingPayments)}</div>
          </div>
          <div className="bg-white rounded-xl p-3 shadow-sm">
            <div className="text-xs text-[#6B7280] mb-1">Partners</div>
            <div className="text-lg font-bold text-[#164c51]">{revenueSummary.activePartners}</div>
          </div>
        </motion.div>
      </motion.div>

      {/* Category Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="px-4 mb-4"
      >
        <div className="flex overflow-x-auto scrollbar-hide gap-3">
          {categories.map((category, index) => (
            <motion.button
              key={category}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedCategory(index)}
              className={clsx(
                "px-5 py-2 rounded-full font-medium text-sm whitespace-nowrap transition-all border",
                {
                  'text-white shadow-lg': selectedCategory === index,
                  'bg-white text-gray-700 border-gray-200 hover:shadow-md': selectedCategory !== index,
                }
              )}
              style={{
                backgroundColor: selectedCategory === index ? '#164c51' : undefined,
                borderColor: selectedCategory === index ? 'transparent' : '#164c514D',
                boxShadow: selectedCategory === index ? '0 2px 6px #164c514D' : '0 2px 6px rgba(0,0,0,0.04)'
              }}
            >
              {category}
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Products List */}
      <div className="flex-1 px-4 pb-4 overflow-y-auto scrollbar-hide">
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedCategory}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col items-center justify-center py-12"
              >
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <Package size={32} className="text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-[#1F2937] mb-2">No Products</h3>
                <p className="text-[#6B7280] text-center text-sm">
                  No byproducts available in this category.
                </p>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Product Detail Modal */}
      <AnimatePresence>
        {selectedProduct && <ProductDetailModal />}
      </AnimatePresence>
    </div>
  );
};

export default MarketplacePage;
