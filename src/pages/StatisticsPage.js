import React, { useState } from 'react';
import { BarChart3, TrendingUp, Calendar, Trash2, ArrowUp, ArrowDown, Leaf, Recycle, AlertTriangle, DollarSign, FileText, Download, Target, Building2, Truck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { clsx } from 'clsx';
import { AppLogo } from '../components/ui';

const StatisticsPage = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [selectedTab, setSelectedTab] = useState('waste');

  const periods = [
    { id: 'week', label: 'Week' },
    { id: 'month', label: 'Month' },
    { id: 'quarter', label: 'Quarter' },
    { id: 'year', label: 'Year' },
  ];

  const tabs = [
    { id: 'waste', label: 'Waste', icon: Trash2 },
    { id: 'esg', label: 'ESG', icon: Target },
    { id: 'financial', label: 'Financial', icon: DollarSign },
  ];

  // Mock data for building analytics
  const analyticsData = {
    week: {
      waste: {
        total: '580 kg',
        change: '+8%',
        trend: 'up',
        breakdown: [
          { type: 'Organic', amount: 232, percentage: 40, color: '#164c51', icon: Leaf },
          { type: 'Recyclable', amount: 261, percentage: 45, color: '#22807A', icon: Recycle },
          { type: 'Hazardous', amount: 29, percentage: 5, color: '#D48931', icon: AlertTriangle },
          { type: 'Residual', amount: 58, percentage: 10, color: '#6d1e04', icon: Trash2 },
        ],
        chartData: [
          { label: 'Mon', organic: 30, recyclable: 35, hazardous: 4, residual: 8 },
          { label: 'Tue', organic: 35, recyclable: 40, hazardous: 5, residual: 10 },
          { label: 'Wed', organic: 28, recyclable: 32, hazardous: 3, residual: 7 },
          { label: 'Thu', organic: 38, recyclable: 42, hazardous: 6, residual: 12 },
          { label: 'Fri', organic: 42, recyclable: 48, hazardous: 5, residual: 11 },
          { label: 'Sat', organic: 32, recyclable: 38, hazardous: 3, residual: 6 },
          { label: 'Sun', organic: 27, recyclable: 26, hazardous: 3, residual: 4 },
        ]
      },
      esg: {
        score: 85,
        level: 'Gold',
        tpaDiversion: '90%',
        co2Reduced: '145 kg',
        change: '+2%',
      },
      financial: {
        costSaving: 3800000,
        revenue: 2100000,
        pickupCost: 1200000,
        change: '+12%',
      }
    },
    month: {
      waste: {
        total: '2.4 ton',
        change: '+12%',
        trend: 'up',
        breakdown: [
          { type: 'Organic', amount: 900, percentage: 38, color: '#164c51', icon: Leaf },
          { type: 'Recyclable', amount: 1200, percentage: 50, color: '#22807A', icon: Recycle },
          { type: 'Hazardous', amount: 100, percentage: 4, color: '#D48931', icon: AlertTriangle },
          { type: 'Residual', amount: 200, percentage: 8, color: '#6d1e04', icon: Trash2 },
        ],
        chartData: [
          { label: 'W1', organic: 200, recyclable: 280, hazardous: 22, residual: 45 },
          { label: 'W2', organic: 230, recyclable: 310, hazardous: 28, residual: 52 },
          { label: 'W3', organic: 220, recyclable: 290, hazardous: 24, residual: 48 },
          { label: 'W4', organic: 250, recyclable: 320, hazardous: 26, residual: 55 },
        ]
      },
      esg: {
        score: 85,
        level: 'Gold',
        tpaDiversion: '92%',
        co2Reduced: '620 kg',
        change: '+5%',
      },
      financial: {
        costSaving: 15500000,
        revenue: 8200000,
        pickupCost: 4500000,
        change: '+18%',
      }
    },
    quarter: {
      waste: {
        total: '7.2 ton',
        change: '+15%',
        trend: 'up',
        breakdown: [
          { type: 'Organic', amount: 2700, percentage: 38, color: '#164c51', icon: Leaf },
          { type: 'Recyclable', amount: 3600, percentage: 50, color: '#22807A', icon: Recycle },
          { type: 'Hazardous', amount: 290, percentage: 4, color: '#D48931', icon: AlertTriangle },
          { type: 'Residual', amount: 610, percentage: 8, color: '#6d1e04', icon: Trash2 },
        ],
        chartData: [
          { label: 'M1', organic: 850, recyclable: 1150, hazardous: 90, residual: 190 },
          { label: 'M2', organic: 920, recyclable: 1220, hazardous: 100, residual: 210 },
          { label: 'M3', organic: 930, recyclable: 1230, hazardous: 100, residual: 210 },
        ]
      },
      esg: {
        score: 85,
        level: 'Gold',
        tpaDiversion: '92%',
        co2Reduced: '1,860 kg',
        change: '+8%',
      },
      financial: {
        costSaving: 46500000,
        revenue: 24600000,
        pickupCost: 13500000,
        change: '+22%',
      }
    },
    year: {
      waste: {
        total: '28.8 ton',
        change: '+22%',
        trend: 'up',
        breakdown: [
          { type: 'Organic', amount: 10944, percentage: 38, color: '#164c51', icon: Leaf },
          { type: 'Recyclable', amount: 14400, percentage: 50, color: '#22807A', icon: Recycle },
          { type: 'Hazardous', amount: 1152, percentage: 4, color: '#D48931', icon: AlertTriangle },
          { type: 'Residual', amount: 2304, percentage: 8, color: '#6d1e04', icon: Trash2 },
        ],
        chartData: [
          { label: 'Q1', organic: 2600, recyclable: 3400, hazardous: 280, residual: 560 },
          { label: 'Q2', organic: 2800, recyclable: 3700, hazardous: 300, residual: 590 },
          { label: 'Q3', organic: 2744, recyclable: 3600, hazardous: 286, residual: 577 },
          { label: 'Q4', organic: 2800, recyclable: 3700, hazardous: 286, residual: 577 },
        ]
      },
      esg: {
        score: 85,
        level: 'Gold',
        tpaDiversion: '92%',
        co2Reduced: '7,440 kg',
        change: '+15%',
      },
      financial: {
        costSaving: 186000000,
        revenue: 98400000,
        pickupCost: 54000000,
        change: '+28%',
      }
    }
  };

  const currentData = analyticsData[selectedPeriod];

  const formatCurrency = (amount) => {
    if (amount >= 1000000000) {
      return `Rp ${(amount / 1000000000).toFixed(1)}B`;
    }
    if (amount >= 1000000) {
      return `Rp ${(amount / 1000000).toFixed(1)}M`;
    }
    return `Rp ${amount.toLocaleString()}`;
  };

  // Period Selector
  const PeriodSelector = () => (
    <div className="flex bg-gray-100 rounded-xl p-1">
      {periods.map((period) => (
        <motion.button
          key={period.id}
          whileTap={{ scale: 0.95 }}
          onClick={() => setSelectedPeriod(period.id)}
          className={clsx(
            "flex-1 py-2 px-2 rounded-lg text-xs font-medium transition-all",
            selectedPeriod === period.id
              ? "bg-white text-[#164c51] shadow-sm"
              : "text-[#6B7280]"
          )}
        >
          {period.label}
        </motion.button>
      ))}
    </div>
  );

  // Tab Selector
  const TabSelector = () => (
    <div className="flex gap-2 overflow-x-auto scrollbar-hide">
      {tabs.map((tab) => (
        <motion.button
          key={tab.id}
          whileTap={{ scale: 0.95 }}
          onClick={() => setSelectedTab(tab.id)}
          className={clsx(
            "flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap",
            selectedTab === tab.id
              ? "bg-[#164c51] text-white shadow-lg shadow-[#164c51]/30"
              : "bg-white text-[#6B7280] border border-gray-200"
          )}
        >
          <tab.icon size={14} />
          {tab.label}
        </motion.button>
      ))}
    </div>
  );

  // Fixed Stacked Bar Chart Component
  const WasteChart = () => {
    const chartData = currentData.waste.chartData;
    const maxValue = Math.max(...chartData.map(d =>
      d.organic + d.recyclable + d.hazardous + d.residual
    ));

    return (
      <div className="bg-white rounded-xl p-4 shadow-sm">
        <h3 className="font-semibold text-[#1F2937] mb-4">Waste by Period</h3>

        {/* Legend */}
        <div className="flex flex-wrap gap-3 mb-4">
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-[#164c51] mr-1.5"></div>
            <span className="text-xs text-[#6B7280]">Organic</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-[#22807A] mr-1.5"></div>
            <span className="text-xs text-[#6B7280]">Recyclable</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-[#D48931] mr-1.5"></div>
            <span className="text-xs text-[#6B7280]">Hazardous</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-[#6d1e04] mr-1.5"></div>
            <span className="text-xs text-[#6B7280]">Residual</span>
          </div>
        </div>

        {/* Bar Chart - Fixed with proper structure */}
        <div className="flex items-end justify-between gap-2" style={{ height: '140px' }}>
          {chartData.map((data, index) => {
            const total = data.organic + data.recyclable + data.hazardous + data.residual;
            const barHeight = (total / maxValue) * 120; // Max height 120px

            // Calculate segment heights as pixels
            const organicH = (data.organic / total) * barHeight;
            const recyclableH = (data.recyclable / total) * barHeight;
            const hazardousH = (data.hazardous / total) * barHeight;
            const residualH = (data.residual / total) * barHeight;

            return (
              <div key={data.label} className="flex-1 flex flex-col items-center">
                <div
                  className="w-full flex flex-col-reverse rounded-t-md overflow-hidden"
                  style={{ height: `${barHeight}px` }}
                >
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: organicH }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    className="w-full bg-[#164c51]"
                    style={{ minHeight: organicH > 0 ? '2px' : 0 }}
                  />
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: recyclableH }}
                    transition={{ delay: index * 0.1 + 0.1, duration: 0.5 }}
                    className="w-full bg-[#22807A]"
                    style={{ minHeight: recyclableH > 0 ? '2px' : 0 }}
                  />
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: hazardousH }}
                    transition={{ delay: index * 0.1 + 0.2, duration: 0.5 }}
                    className="w-full bg-[#D48931]"
                    style={{ minHeight: hazardousH > 0 ? '1px' : 0 }}
                  />
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: residualH }}
                    transition={{ delay: index * 0.1 + 0.3, duration: 0.5 }}
                    className="w-full bg-[#6d1e04]"
                    style={{ minHeight: residualH > 0 ? '1px' : 0 }}
                  />
                </div>
                <span className="text-xs text-[#6B7280] mt-2 font-medium">{data.label}</span>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  // Waste Breakdown Component
  const WasteBreakdown = () => (
    <div className="bg-white rounded-xl p-4 shadow-sm">
      <h3 className="font-semibold text-[#1F2937] mb-4">Waste Breakdown</h3>
      <div className="space-y-3">
        {currentData.waste.breakdown.map((item, index) => (
          <motion.div
            key={item.type}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center"
          >
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center mr-3"
              style={{ backgroundColor: `${item.color}1A` }}
            >
              <item.icon size={16} style={{ color: item.color }} />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium text-[#1F2937]">{item.type}</span>
                <span className="text-sm text-[#6B7280]">{item.amount} kg</span>
              </div>
              <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${item.percentage}%` }}
                  transition={{ delay: index * 0.1 + 0.3, duration: 0.8 }}
                  className="h-full rounded-full"
                  style={{ backgroundColor: item.color }}
                />
              </div>
            </div>
            <span className="text-xs font-bold text-[#1F2937] w-10 text-right">{item.percentage}%</span>
          </motion.div>
        ))}
      </div>
    </div>
  );

  // ESG Metrics Component
  const ESGMetrics = () => (
    <div className="space-y-4">
      {/* ESG Score Card */}
      <div className="bg-gradient-to-r from-[#164c51] to-[#0C2521] rounded-xl p-5 text-white">
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="text-sm text-white/80">ESG Compliance Score</div>
            <div className="text-3xl font-bold">{currentData.esg.score}%</div>
          </div>
          <div
            className="px-3 py-1 rounded-full text-sm font-bold"
            style={{ backgroundColor: 'rgba(212, 137, 49, 0.3)' }}
          >
            {currentData.esg.level}
          </div>
        </div>
        <div className="flex items-center text-sm text-white/80">
          <ArrowUp size={14} className="mr-1" />
          {currentData.esg.change} from last period
        </div>
      </div>

      {/* ESG Metrics Grid */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <div className="flex items-center mb-2">
            <Target size={16} className="text-[#164c51] mr-2" />
            <span className="text-xs text-[#6B7280]">Landfill Diversion</span>
          </div>
          <div className="text-xl font-bold text-[#164c51]">{currentData.esg.tpaDiversion}</div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <div className="flex items-center mb-2">
            <Leaf size={16} className="text-[#164c51] mr-2" />
            <span className="text-xs text-[#6B7280]">CO₂ Reduced</span>
          </div>
          <div className="text-xl font-bold text-[#164c51]">{currentData.esg.co2Reduced}</div>
        </div>
      </div>

      {/* Download Report Button */}
      <motion.button
        whileTap={{ scale: 0.98 }}
        className="w-full py-3 bg-white border border-[#164c51] text-[#164c51] rounded-xl font-semibold text-sm flex items-center justify-center gap-2"
      >
        <Download size={16} />
        Download ESG Report
      </motion.button>
    </div>
  );

  // Financial Metrics Component
  const FinancialMetrics = () => (
    <div className="space-y-4">
      {/* Revenue Summary */}
      <div className="bg-white rounded-xl p-4 shadow-sm">
        <h3 className="font-semibold text-[#1F2937] mb-4">Financial Summary</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-green-50 rounded-xl">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3">
                <TrendingUp size={20} className="text-green-600" />
              </div>
              <div>
                <div className="text-sm font-medium text-[#1F2937]">Cost Savings</div>
                <div className="text-xs text-[#6B7280]">From waste reduction</div>
              </div>
            </div>
            <div className="text-lg font-bold text-green-600">
              {formatCurrency(currentData.financial.costSaving)}
            </div>
          </div>

          <div className="flex items-center justify-between p-3 bg-[#164c51]/10 rounded-xl">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-[#164c51]/20 rounded-full flex items-center justify-center mr-3">
                <Recycle size={20} className="text-[#164c51]" />
              </div>
              <div>
                <div className="text-sm font-medium text-[#1F2937]">Recycling Revenue</div>
                <div className="text-xs text-[#6B7280]">From byproduct sales</div>
              </div>
            </div>
            <div className="text-lg font-bold text-[#164c51]">
              {formatCurrency(currentData.financial.revenue)}
            </div>
          </div>

          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mr-3">
                <Truck size={20} className="text-gray-600" />
              </div>
              <div>
                <div className="text-sm font-medium text-[#1F2937]">Pickup Cost</div>
                <div className="text-xs text-[#6B7280]">Waste collection fees</div>
              </div>
            </div>
            <div className="text-lg font-bold text-gray-600">
              {formatCurrency(currentData.financial.pickupCost)}
            </div>
          </div>
        </div>
      </div>

      {/* Net Benefit */}
      <div className="bg-gradient-to-r from-[#D48931] to-[#B8741F] rounded-xl p-4 text-white">
        <div className="text-sm text-white/80 mb-1">Net Financial Benefit</div>
        <div className="text-2xl font-bold">
          {formatCurrency(currentData.financial.costSaving + currentData.financial.revenue - currentData.financial.pickupCost)}
        </div>
        <div className="flex items-center text-sm text-white/80 mt-2">
          <ArrowUp size={14} className="mr-1" />
          {currentData.financial.change} vs last period
        </div>
      </div>
    </div>
  );

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

        <div className="flex items-center justify-between mb-4">
          <div>
            <motion.h1
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-2xl font-bold text-[#0C2521]"
            >
              Analytics Dashboard
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="text-[#6B7280] text-sm mt-1"
            >
              Building waste analytics & ESG metrics
            </motion.p>
          </div>
          <motion.button
            whileTap={{ scale: 0.95 }}
            className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm"
          >
            <FileText size={20} className="text-[#164c51]" />
          </motion.button>
        </div>
      </motion.div>

      {/* Period Selector */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="px-4 mb-4"
      >
        <PeriodSelector />
      </motion.div>

      {/* Overview Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="px-4 mb-4"
      >
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold text-[#0C2521]">Total Waste Processed</h3>
            <div className="flex items-center">
              <span
                className={clsx(
                  "text-sm font-medium flex items-center",
                  currentData.waste.trend === 'up' ? 'text-[#164c51]' : 'text-[#D48931]'
                )}
              >
                {currentData.waste.trend === 'up' ? <ArrowUp size={14} /> : <ArrowDown size={14} />}
                {currentData.waste.change}
              </span>
            </div>
          </div>
          <div className="text-3xl font-bold text-[#0C2521] mb-1">{currentData.waste.total}</div>
          <div className="text-sm text-[#6B7280]">Compared to last {selectedPeriod}</div>
        </div>
      </motion.div>

      {/* Tab Selector */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="px-4 mb-4"
      >
        <TabSelector />
      </motion.div>

      {/* Content */}
      <div className="flex-1 px-4 pb-4 overflow-y-auto scrollbar-hide">
        <AnimatePresence mode="wait">
          {selectedTab === 'waste' && (
            <motion.div
              key="waste"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-4"
            >
              <WasteChart />
              <WasteBreakdown />
            </motion.div>
          )}

          {selectedTab === 'esg' && (
            <motion.div
              key="esg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <ESGMetrics />
            </motion.div>
          )}

          {selectedTab === 'financial' && (
            <motion.div
              key="financial"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <FinancialMetrics />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default StatisticsPage;