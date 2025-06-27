import React, { useState } from 'react';
import { Search, Star, Gift, ShoppingCart, Zap, Shirt, Home, Book, CreditCard, Droplets, BatteryCharging, UtensilsCrossed } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { clsx } from 'clsx';
import { PointsBadge, AppLogo, CameraFloatingButton } from '../components/ui';

// Add CSS for line clamping
const style = document.createElement('style');
style.textContent = `
  .line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
`;
document.head.appendChild(style);

const MarketplacePage = () => {
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [notification, setNotification] = useState(null);
  const userPoints = 2450; // Mock user points

  // Categories matching Flutter app exactly
  const categories = [
    'All',
    'Electronics', 
    'Fashion',
    'Home & Garden',
    'Books',
    'Vouchers',
  ];

  // Featured items matching Flutter app exactly
  const featuredItems = [
    {
      id: '1',
      name: 'Eco-Friendly Water Bottle',
      description: 'Stainless steel water bottle made from recycled materials for sustainable hydration',
      points: 500,
      originalPrice: 10,
      imageUrl: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400&h=300&fit=crop',
      category: 'Home & Garden',
      rating: 4.8,
      isPopular: true,
    },
    {
      id: '2',
      name: 'Organic Cotton T-Shirt',
      description: '100% organic cotton, sustainably produced with eco-friendly materials',
      points: 350,
      originalPrice: 7,
      imageUrl: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=300&fit=crop',
      category: 'Fashion',
      rating: 4.6,
      isPopular: false,
    },
    {
      id: '3',
      name: 'Reusable Shopping Bag',
      description: 'Durable canvas shopping bag made from organic cotton for sustainable shopping',
      points: 400,
      originalPrice: 8,
      imageUrl: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=300&fit=crop',
      category: 'Home & Garden',
      rating: 4.7,
      isPopular: true,
    },
    {
      id: '4',
      name: 'Reusable Coffee Cup',
      description: 'Eco-friendly travel mug made from bamboo fiber with leak-proof design',
      points: 350,
      originalPrice: 7,
      imageUrl: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=400&h=300&fit=crop',
      category: 'Home & Garden',
      rating: 4.5,
      isPopular: false,
    },
    {
      id: '5',
      name: 'Recycled Notebook',
      description: 'Made from 100% recycled paper with sustainable binding',
      points: 200,
      originalPrice: 4,
      imageUrl: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=300&fit=crop',
      category: 'Books',
      rating: 4.3,
      isPopular: false,
    },
    {
      id: '6',
      name: 'Green Store Voucher',
      description: 'Digital voucher for eco-friendly shopping at partner stores',
      points: 1000,
      originalPrice: 20,
      imageUrl: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop',
      category: 'Vouchers',
      rating: 4.7,
      isPopular: true,
    },
    {
      id: '7',
      name: 'Wireless Phone Charger',
      description: 'Energy-efficient wireless charging pad made from recycled materials',
      points: 800,
      originalPrice: 16,
      imageUrl: 'https://images.unsplash.com/photo-1588508065123-287b28e013da?w=400&h=300&fit=crop',
      category: 'Electronics',
      rating: 4.4,
      isPopular: false,
    },
  ];

  // Filter and search functionality
  const getFilteredItems = () => {
    let filtered = featuredItems;
    
    // Filter by category
    if (selectedCategory !== 0) {
      const selectedCategoryName = categories[selectedCategory];
      filtered = filtered.filter(item => 
        item.category.toLowerCase() === selectedCategoryName.toLowerCase()
      );
    }
    
    // Filter by search query
    if (searchQuery.trim()) {
      filtered = filtered.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    return filtered;
  };

  // Truncate description to 2 lines max
  const truncateDescription = (text, maxLength = 80) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength).trim() + '...';
  };

  // Handle exchange button click
  const handleExchange = (item) => {
    if (userPoints >= item.points) {
      setNotification({
        type: 'success',
        title: 'Exchange Successful!',
        message: `You've exchanged ${item.points} points for ${item.name}`,
        remainingPoints: userPoints - item.points
      });
    } else {
      setNotification({
        type: 'error',
        title: 'Insufficient Points',
        message: `You need ${item.points - userPoints} more points to exchange this item`,
        remainingPoints: userPoints
      });
    }
    
    // Auto hide notification after 4 seconds
    setTimeout(() => setNotification(null), 4000);
  };

  // Notification Badge Component
  const NotificationBadge = ({ notification, onClose }) => {
    if (!notification) return null;

    const isSuccess = notification.type === 'success';
    
    return (
      <motion.div
        initial={{ opacity: 0, y: -50, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -50, scale: 0.9 }}
        className={`absolute top-4 left-4 right-4 z-50 ${
          isSuccess ? 'bg-[#164c51]' : 'bg-[#D48931]'
        } text-white p-3 rounded-xl shadow-xl`}
        style={{ 
          boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
          maxWidth: '320px',
          margin: '0 auto'
        }}
      >
        <div className="flex items-start">
          <div className={`w-6 h-6 rounded-full flex items-center justify-center mr-2 ${
            isSuccess ? 'bg-white/20' : 'bg-white/20'
          }`}>
            {isSuccess ? (
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="20,6 9,17 4,12"></polyline>
              </svg>
            ) : (
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="15" y1="9" x2="9" y2="15"></line>
                <line x1="9" y1="9" x2="15" y2="15"></line>
              </svg>
            )}
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-xs mb-1">{notification.title}</h3>
            <p className="text-xs text-white/90 mb-1">{notification.message}</p>
            {isSuccess && (
              <div className="flex items-center text-xs">
                <Star size={10} className="mr-1" />
                <span>Remaining: {notification.remainingPoints.toLocaleString()} points</span>
              </div>
            )}
          </div>
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={onClose}
            className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center ml-2"
          >
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </motion.button>
        </div>
      </motion.div>
    );
  };

  // Get product icon based on category and name
  const getProductIcon = (category, productName) => {
    // First check specific product names
    if (productName.toLowerCase().includes('bottle')) {
      return Droplets;
    } else if (productName.toLowerCase().includes('shirt') || 
               productName.toLowerCase().includes('cotton')) {
      return Shirt;
    } else if (productName.toLowerCase().includes('power') || 
               productName.toLowerCase().includes('solar')) {
      return BatteryCharging;
    } else if (productName.toLowerCase().includes('lunch') || 
               productName.toLowerCase().includes('bamboo')) {
      return UtensilsCrossed;
    }

    // Then check by category
    switch (category.toLowerCase()) {
      case 'electronics':
        return Zap;
      case 'fashion':
        return Shirt;
      case 'home & garden':
        return Home;
      case 'books':
        return Book;
      case 'vouchers':
        return CreditCard;
      default:
        return Gift;
    }
  };

  // Product Card Component with fixed layout
  const ProductCard = ({ item, index }) => {
    return (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 }}
        whileHover={{ y: -5 }}
        className="bg-white rounded-2xl overflow-hidden shadow-sm flex flex-col"
        style={{ boxShadow: '0 2px 6px rgba(0,0,0,0.04)' }}
      >
        {/* Product Image */}
        <div className="h-32 relative overflow-hidden">
          <img 
            src={item.imageUrl} 
            alt={item.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'flex';
            }}
          />
          <div className="w-full h-full bg-gradient-to-br from-[#10B981] to-[#059669] hidden items-center justify-center">
            <Gift size={48} className="text-white" />
          </div>
          {item.isPopular && (
            <div className="absolute top-2 right-2 bg-[#EF4444] text-white text-xs font-bold px-2 py-1 rounded-full">
              Popular
            </div>
            )}
        </div>

        {/* Product Info - Fixed height layout */}
        <div className="p-4 flex flex-col flex-1">
          <h3 className="font-semibold text-[#0C2521] text-sm leading-tight mb-1">
            {item.name}
          </h3>
          
          {/* Fixed 2-line description */}
          <div className="h-8 mb-3">
            <p className="text-xs text-[#6B7280] leading-4 line-clamp-2">
              {truncateDescription(item.description)}
            </p>
          </div>

          {/* Rating */}
          <div className="flex items-center mb-3">
            <Star size={12} className="text-yellow-400 fill-current" />
            <span className="text-xs text-[#6B7280] ml-1">{item.rating}</span>
          </div>

          {/* Points and Price */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center">
              <Gift size={14} className="text-[#164c51] mr-1" />
              <span className="text-[#164c51] font-bold text-sm">{item.points}</span>
              <span className="text-[#6B7280] text-xs ml-1">pts</span>
            </div>
            <span className="text-[#6B7280] text-xs line-through">
              ${item.originalPrice}
            </span>
          </div>

          {/* Exchange Button - Always at bottom */}
          <div className="mt-auto">
            <motion.button 
              whileTap={{ scale: 0.98 }}
              whileHover={{ scale: 1.02 }}
              onClick={() => handleExchange(item)}
              disabled={userPoints < item.points}
              className={clsx(
                "w-full py-2 rounded-xl text-xs font-semibold transition-all",
                userPoints >= item.points
                  ? "bg-[#164c51] text-white shadow-lg shadow-[#164c51]/30 hover:bg-[#0C2521]"
                  : "bg-gray-100 text-gray-400 cursor-not-allowed"
              )}
            >
              {userPoints >= item.points ? 'Exchange Now' : 'Not Enough Points'}
            </motion.button>
          </div>
        </div>
    </motion.div>
    );
  };

    return (
    <div className="h-full bg-[#F8FAFC] flex flex-col relative">
      {/* In-App Notification */}
      <AnimatePresence>
        <NotificationBadge 
          notification={notification} 
          onClose={() => setNotification(null)} 
        />
      </AnimatePresence>

      {/* Header - exact Flutter recreation */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-4 pt-12"
      >
        {/* App Logo */}
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
              Marketplace
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="text-[#6B7280] text-sm mt-1"
            >
              Eco-friendly products
            </motion.p>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-[#D48931] text-white px-3 py-1.5 rounded-full flex items-center shadow-sm"
          >
            <Star size={14} className="mr-1" />
            <span className="text-sm font-semibold">{userPoints.toLocaleString()} PTS</span>
          </motion.div>
            </div>

        {/* Search Bar - exact Flutter recreation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-2xl p-3 shadow-sm"
          style={{ boxShadow: '0 2px 6px rgba(0,0,0,0.04)' }}
        >
          <div className="flex items-center">
            <Search size={20} className="text-[#6B7280] mr-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products..."
              className="flex-1 text-sm text-[#1F2937] placeholder-[#6B7280] bg-transparent outline-none"
            />
          </div>
        </motion.div>
                    </motion.div>

      {/* Category Tabs - exact Flutter recreation */}
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

      {/* Product Grid - exact Flutter recreation */}
      <div className="flex-1 px-4 pb-4 overflow-y-auto scrollbar-hide">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="grid grid-cols-2 gap-4"
        >
          {getFilteredItems().length > 0 ? (
            getFilteredItems().map((item, index) => (
              <ProductCard key={item.id} item={item} index={index} />
            ))
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="col-span-2 flex flex-col items-center justify-center py-12"
            >
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <Search size={32} className="text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-[#1F2937] mb-2">No Products Found</h3>
              <p className="text-[#6B7280] text-center text-sm leading-relaxed max-w-sm">
                {searchQuery ? 
                  `No products match "${searchQuery}". Try a different search term.` :
                  'No products available in this category.'
                }
              </p>
            </motion.div>
          )}
        </motion.div>
            </div>

      {/* Camera Floating Button */}
      <CameraFloatingButton />
        </div>
    );
};

export default MarketplacePage;
