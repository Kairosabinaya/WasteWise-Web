import React, { useState } from 'react';
import { ArrowLeft, CheckCircle, Zap, Truck, Minus, Plus, Leaf } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const OrderGasPage = () => {
    const navigate = useNavigate();
    const [orderType, setOrderType] = useState('single'); // single | subscribe
    const [quantity, setQuantity] = useState(1);
    const [showConfirm, setShowConfirm] = useState(false);
    const [confirmed, setConfirmed] = useState(false);

    const products = [
        { id: 1, name: 'Bio-LPG 3kg', price: 43500, originalPrice: 64200, image: '🔥', desc: 'Ideal for households', savings: 32 },
        { id: 2, name: 'Bio-LPG 12kg', price: 174000, originalPrice: 256800, image: '🔥', desc: 'Best value for families', savings: 32, popular: true },
        { id: 3, name: 'Bio-LPG 50kg', price: 725000, originalPrice: 1070000, image: '🏭', desc: 'Commercial use', savings: 32 },
    ];

    const [selectedProduct, setSelectedProduct] = useState(products[1]);

    const handleOrder = () => {
        setShowConfirm(true);
        setTimeout(() => setConfirmed(true), 1500);
    };

    const formatCurrency = (n) => `Rp ${n.toLocaleString('id-ID')}`;

    return (
        <div className="min-h-full bg-[#F0FDF9]">
            {/* Header */}
            <div className="bg-gradient-to-br from-[#B45309] to-[#D97706] px-5 pt-6 pb-16 relative">
                <div className="flex items-center mb-4">
                    <motion.button whileTap={{ scale: 0.9 }} onClick={() => navigate(-1)}
                        className="w-10 h-10 bg-white/15 rounded-full flex items-center justify-center mr-3">
                        <ArrowLeft size={20} className="text-white" />
                    </motion.button>
                    <h1 className="text-xl font-bold text-white">Order Bio-LPG</h1>
                </div>
                <div className="flex items-center gap-3">
                    <div className="flex-1 bg-white/15 rounded-xl p-3 text-center">
                        <div className="text-lg font-bold text-white">-32%</div>
                        <div className="text-[10px] text-white/80">vs Conv. LPG</div>
                    </div>
                    <div className="flex-1 bg-white/15 rounded-xl p-3 text-center">
                        <div className="text-lg font-bold text-white">850 EC</div>
                        <div className="text-[10px] text-white/80">Your Credits</div>
                    </div>
                    <div className="flex-1 bg-white/15 rounded-xl p-3 text-center">
                        <div className="text-lg font-bold text-white">0.42t</div>
                        <div className="text-[10px] text-white/80">CO₂ Saved</div>
                    </div>
                </div>
            </div>

            <div className="px-5 -mt-8 relative z-10">
                {!showConfirm ? (
                    <>
                        {/* Order Type Toggle */}
                        <div className="bg-white rounded-2xl p-2 shadow-lg mb-4 flex">
                            {[
                                { id: 'single', label: 'One-Time Order' },
                                { id: 'subscribe', label: 'Monthly Subscribe' },
                            ].map((t) => (
                                <motion.button key={t.id} whileTap={{ scale: 0.98 }}
                                    onClick={() => setOrderType(t.id)}
                                    className={`flex-1 py-2.5 rounded-xl text-xs font-semibold transition-all
                    ${orderType === t.id ? 'bg-gradient-to-r from-[#D97706] to-[#B45309] text-white' : 'text-gray-500'}`}>
                                    {t.label}
                                </motion.button>
                            ))}
                        </div>

                        {/* Product Selection */}
                        <div className="mb-4">
                            <h3 className="text-sm font-bold text-gray-800 mb-3">Select Cylinder</h3>
                            {products.map((product) => (
                                <motion.button key={product.id} whileTap={{ scale: 0.98 }}
                                    onClick={() => setSelectedProduct(product)}
                                    className={`w-full bg-white rounded-xl p-4 mb-2 text-left flex items-center transition-all shadow-sm
                    ${selectedProduct.id === product.id ? 'border-2 border-[#D97706] bg-[#D97706]/5' : 'border-2 border-transparent'}`}>
                                    <span className="text-3xl mr-3">{product.image}</span>
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2">
                                            <span className="text-sm font-bold text-gray-800">{product.name}</span>
                                            {product.popular && <span className="text-[9px] font-bold bg-[#D97706] text-white px-1.5 py-0.5 rounded">POPULAR</span>}
                                        </div>
                                        <div className="text-xs text-gray-500">{product.desc}</div>
                                        <div className="flex items-center gap-2 mt-1">
                                            <span className="text-sm font-bold text-[#065F46]">{formatCurrency(product.price)}</span>
                                            <span className="text-xs text-gray-400 line-through">{formatCurrency(product.originalPrice)}</span>
                                        </div>
                                    </div>
                                    {selectedProduct.id === product.id && <CheckCircle size={18} className="text-[#D97706]" />}
                                </motion.button>
                            ))}
                        </div>

                        {/* Quantity */}
                        <div className="bg-white rounded-2xl p-4 shadow-sm mb-4">
                            <h3 className="text-sm font-bold text-gray-800 mb-3">Quantity</h3>
                            <div className="flex items-center justify-center gap-6">
                                <motion.button whileTap={{ scale: 0.9 }} onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                    className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                                    <Minus size={18} className="text-gray-600" />
                                </motion.button>
                                <span className="text-3xl font-bold text-gray-800">{quantity}</span>
                                <motion.button whileTap={{ scale: 0.9 }} onClick={() => setQuantity(Math.min(10, quantity + 1))}
                                    className="w-10 h-10 bg-[#D97706] rounded-full flex items-center justify-center">
                                    <Plus size={18} className="text-white" />
                                </motion.button>
                            </div>
                        </div>

                        {/* Order Summary */}
                        <div className="bg-white rounded-2xl p-4 shadow-sm mb-4">
                            <h3 className="text-sm font-bold text-gray-800 mb-3">Order Summary</h3>
                            <div className="space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-500">{selectedProduct.name} x{quantity}</span>
                                    <span className="font-semibold">{formatCurrency(selectedProduct.price * quantity)}</span>
                                </div>
                                {orderType === 'subscribe' && (
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-500">Subscription Discount</span>
                                        <span className="font-semibold text-[#0D9488]">-5%</span>
                                    </div>
                                )}
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-500">Delivery</span>
                                    <span className="font-semibold text-[#0D9488]">Free</span>
                                </div>
                                <div className="border-t border-gray-100 pt-2 flex justify-between">
                                    <span className="text-sm font-bold text-gray-800">Total</span>
                                    <span className="text-sm font-bold text-[#065F46]">
                                        {formatCurrency(Math.round(selectedProduct.price * quantity * (orderType === 'subscribe' ? 0.95 : 1)))}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Environmental Impact */}
                        <div className="bg-gradient-to-r from-[#0D9488] to-[#065F46] rounded-2xl p-4 mb-4">
                            <h3 className="text-sm font-bold text-white mb-2 flex items-center gap-1.5"><Leaf size={14} /> Environmental Impact</h3>
                            <div className="flex gap-3">
                                <div className="flex-1 bg-white/15 rounded-lg p-2 text-center">
                                    <div className="text-sm font-bold text-white">{(selectedProduct.name.includes('3') ? 0.03 : selectedProduct.name.includes('12') ? 0.12 : 0.5) * quantity} ton</div>
                                    <div className="text-[9px] text-white/80">CO₂ Avoided</div>
                                </div>
                                <div className="flex-1 bg-white/15 rounded-lg p-2 text-center">
                                    <div className="text-sm font-bold text-white">{(selectedProduct.name.includes('3') ? 2 : selectedProduct.name.includes('12') ? 7 : 30) * quantity}</div>
                                    <div className="text-[9px] text-white/80">Trees Equiv.</div>
                                </div>
                            </div>
                        </div>

                        {/* Order Button */}
                        <motion.button whileTap={{ scale: 0.95 }} onClick={handleOrder}
                            className="w-full py-3.5 bg-gradient-to-r from-[#D97706] to-[#B45309] text-white rounded-xl font-semibold text-sm shadow-lg mb-8">
                            {orderType === 'subscribe' ? 'Subscribe Now' : 'Place Order'}
                        </motion.button>
                    </>
                ) : (
                    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                        className="bg-white rounded-2xl p-6 shadow-lg text-center mb-8">
                        {!confirmed ? (
                            <>
                                <div className="w-16 h-16 bg-[#D97706]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}>
                                        <Truck size={28} className="text-[#D97706]" />
                                    </motion.div>
                                </div>
                                <h3 className="text-lg font-bold text-gray-800 mb-1">Processing Order...</h3>
                                <p className="text-xs text-gray-500">Assigning delivery to your area</p>
                            </>
                        ) : (
                            <>
                                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring' }}
                                    className="w-16 h-16 bg-[#0D9488] rounded-full flex items-center justify-center mx-auto mb-4">
                                    <CheckCircle size={32} className="text-white" />
                                </motion.div>
                                <h3 className="text-lg font-bold text-gray-800 mb-1">Order Confirmed!</h3>
                                <p className="text-xs text-gray-500 mb-4">Your Bio-LPG will arrive soon</p>
                                <div className="bg-gray-50 rounded-xl p-4 text-left space-y-2.5">
                                    <div className="flex justify-between">
                                        <span className="text-xs text-gray-500">Product</span>
                                        <span className="text-xs font-semibold">{selectedProduct.name} x{quantity}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-xs text-gray-500">Delivery ETA</span>
                                        <span className="text-xs font-semibold">Today, 2-4 hours</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-xs text-gray-500">Credits Earned</span>
                                        <span className="text-xs font-bold text-[#0D9488] flex items-center gap-1"><Zap size={12} /> +{quantity * 25} EC</span>
                                    </div>
                                </div>
                                <motion.button whileTap={{ scale: 0.95 }}
                                    onClick={() => { setShowConfirm(false); setConfirmed(false); }}
                                    className="mt-4 w-full py-2.5 bg-gradient-to-r from-[#D97706] to-[#B45309] text-white rounded-xl text-sm font-semibold">
                                    Order Again
                                </motion.button>
                            </>
                        )}
                    </motion.div>
                )}
            </div>
        </div>
    );
};

export default OrderGasPage;
