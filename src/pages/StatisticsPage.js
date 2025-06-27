import React, { useState } from 'react';
import { BarChart3, TrendingUp, Calendar, Filter, Trash2, Clock, ArrowUp, ArrowDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { clsx } from 'clsx';
import { AppLogo, CameraFloatingButton } from '../components/ui';

const StatisticsPage = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('week');
  const [selectedMetric, setSelectedMetric] = useState('waste');

  const periods = [
    { id: 'week', label: 'This Week' },
    { id: 'month', label: 'This Month' },
    { id: 'year', label: 'This Year' },
  ];

  const metrics = [
    { id: 'waste', label: 'Waste Sorted', icon: Trash2, color: '#10B981' },
    { id: 'points', label: 'Points Earned', icon: TrendingUp, color: '#F59E0B' },
  ];

  // Mock data for different periods
  const statisticsData = {
    week: {
      waste: {
        total: '6.8 kg',
        change: '+12%',
        trend: 'up',
        breakdown: [
          { type: 'Organic', amount: 2.4, percentage: 35, color: '#059669' },
          { type: 'Recyclable', amount: 3.6, percentage: 53, color: '#0EA5E9' },
          { type: 'Hazardous', amount: 0.2, percentage: 3, color: '#F59E0B' },
          { type: 'Residual', amount: 0.6, percentage: 9, color: '#6B7280' },
        ],
        dailyData: [
          { day: 'Mon', organic: 1.2, recyclable: 2.1, hazardous: 0.3, residual: 0.8 },
          { day: 'Tue', organic: 1.8, recyclable: 2.5, hazardous: 0.2, residual: 1.0 },
          { day: 'Wed', organic: 0.9, recyclable: 1.6, hazardous: 0.4, residual: 0.6 },
          { day: 'Thu', organic: 2.1, recyclable: 3.2, hazardous: 0.1, residual: 1.2 },
          { day: 'Fri', organic: 1.6, recyclable: 2.8, hazardous: 0.5, residual: 0.9 },
          { day: 'Sat', organic: 1.3, recyclable: 2.0, hazardous: 0.2, residual: 0.7 },
          { day: 'Sun', organic: 1.5, recyclable: 2.3, hazardous: 0.3, residual: 0.8 },
        ]
      },
      points: {
        total: '2,340',
        change: '+18%',
        trend: 'up',
        dailyData: [120, 180, 150, 240, 200, 160, 290]
      },
      impact: {
        co2Saved: '12.4 kg',
        waterSaved: '340 L',
        energySaved: '45 kWh',
        treesEquivalent: '0.8'
      }
    },
    month: {
      waste: {
        total: '28.5 kg',
        change: '+8%',
        trend: 'up',
        breakdown: [
          { type: 'Organic', amount: 10.2, percentage: 36, color: '#059669' },
          { type: 'Recyclable', amount: 14.8, percentage: 52, color: '#0EA5E9' },
          { type: 'Hazardous', amount: 0.9, percentage: 3, color: '#F59E0B' },
          { type: 'Residual', amount: 2.6, percentage: 9, color: '#6B7280' },
        ],
        dailyData: [
          { day: 'W1', organic: 6.8, recyclable: 9.2, hazardous: 1.1, residual: 2.4 },
          { day: 'W2', organic: 7.5, recyclable: 10.8, hazardous: 1.3, residual: 2.8 },
          { day: 'W3', organic: 5.9, recyclable: 8.6, hazardous: 0.9, residual: 2.1 },
          { day: 'W4', organic: 8.2, recyclable: 11.4, hazardous: 1.5, residual: 3.2 },
        ]
      },
      points: {
        total: '9,650',
        change: '+15%',
        trend: 'up',
        dailyData: [2340, 2580, 2120, 2610]
      },
      impact: {
        co2Saved: '52.3 kg',
        waterSaved: '1,420 L',
        energySaved: '189 kWh',
        treesEquivalent: '3.2'
      }
    },
    year: {
      waste: {
        total: '342 kg',
        change: '+22%',
        trend: 'up',
        breakdown: [
          { type: 'Organic', amount: 125.6, percentage: 37, color: '#059669' },
          { type: 'Recyclable', amount: 175.3, percentage: 51, color: '#0EA5E9' },
          { type: 'Hazardous', amount: 10.8, percentage: 3, color: '#F59E0B' },
          { type: 'Residual', amount: 30.3, percentage: 9, color: '#6B7280' },
        ],
        dailyData: [
          { day: 'Q1', organic: 82.5, recyclable: 118.4, hazardous: 8.2, residual: 24.6 },
          { day: 'Q2', organic: 95.8, recyclable: 132.6, hazardous: 9.8, residual: 28.4 },
          { day: 'Q3', organic: 88.2, recyclable: 125.8, hazardous: 9.1, residual: 26.8 },
          { day: 'Q4', organic: 92.1, recyclable: 128.2, hazardous: 8.9, residual: 27.2 },
        ]
      },
      points: {
        total: '118,500',
        change: '+28%',
        trend: 'up',
        dailyData: [28500, 31200, 29800, 29000]
      },
      impact: {
        co2Saved: '628 kg',
        waterSaved: '17,040 L',
        energySaved: '2,268 kWh',
        treesEquivalent: '38.4'
      }
    }
  };

  const currentData = statisticsData[selectedPeriod] || statisticsData.week;

  // Period Selector Component
  const PeriodSelector = () => (
    <div className="flex bg-gray-100 rounded-xl p-1">
      {periods.map((period) => (
        <motion.button
          key={period.id}
          whileTap={{ scale: 0.95 }}
          onClick={() => setSelectedPeriod(period.id)}
          className={clsx(
            "flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all",
            selectedPeriod === period.id
              ? "bg-white text-[#10B981] shadow-sm"
              : "text-[#6B7280]"
          )}
        >
          {period.label}
        </motion.button>
      ))}
    </div>
  );

  // Metric Card Component
  const MetricCard = ({ metric, isActive, onClick }) => (
    <motion.button
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={clsx(
        "p-4 rounded-xl border-2 transition-all",
        isActive
          ? "border-[#10B981] bg-[#10B981]/5"
          : "border-gray-200 bg-white hover:border-gray-300"
      )}
    >
      <div className="flex items-center">
        <div 
          className="w-10 h-10 rounded-full flex items-center justify-center mr-3"
          style={{ backgroundColor: `${metric.color}1A` }}
        >
          <metric.icon size={20} style={{ color: metric.color }} />
        </div>
        <div className="text-left">
          <div className="text-sm font-semibold text-[#1F2937]">{metric.label}</div>
          <div className="text-xs text-[#6B7280]">View details</div>
        </div>
      </div>
    </motion.button>
  );

  // Chart Component
  const WasteChart = () => {
    if (!currentData?.waste?.dailyData) {
      return (
        <div className="bg-white rounded-xl p-4">
          <h3 className="font-semibold text-[#1F2937] mb-4">Daily Waste Sorting</h3>
          <div className="flex items-center justify-center h-32">
            <p className="text-[#6B7280] text-sm">No data available</p>
          </div>
        </div>
      );
    }

    const maxValue = Math.max(...currentData.waste.dailyData.map(d => 
      d.organic + d.recyclable + d.hazardous + d.residual
    ));

    const getChartTitle = () => {
      switch (selectedPeriod) {
        case 'week': return 'Daily Waste Sorting';
        case 'month': return 'Weekly Waste Sorting';
        case 'year': return 'Quarterly Waste Sorting';
        default: return 'Waste Sorting';
      }
    };

    return (
      <div className="bg-white rounded-xl p-4">
        <h3 className="font-semibold text-[#1F2937] mb-4">{getChartTitle()}</h3>
        
        {/* Legend */}
        <div className="flex flex-wrap gap-3 mb-4">
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-[#059669] mr-2"></div>
            <span className="text-xs text-[#6B7280]">Organic</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-[#0EA5E9] mr-2"></div>
            <span className="text-xs text-[#6B7280]">Recyclable</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-[#F59E0B] mr-2"></div>
            <span className="text-xs text-[#6B7280]">Hazardous</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-[#6B7280] mr-2"></div>
            <span className="text-xs text-[#6B7280]">Residual</span>
          </div>
        </div>

        <div className="flex items-end justify-between h-40 gap-2">
          {currentData.waste.dailyData.map((data, index) => {
            const total = data.organic + data.recyclable + data.hazardous + data.residual;
            const organicHeight = maxValue > 0 ? (data.organic / maxValue) * 100 : 0;
            const recyclableHeight = maxValue > 0 ? (data.recyclable / maxValue) * 100 : 0;
            const hazardousHeight = maxValue > 0 ? (data.hazardous / maxValue) * 100 : 0;
            const residualHeight = maxValue > 0 ? (data.residual / maxValue) * 100 : 0;
            
            return (
              <div key={data.day} className="flex-1 flex flex-col items-center">
                <div className="w-full flex flex-col justify-end h-32 gap-0.5">
                  {/* Organic */}
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${organicHeight}%` }}
                    transition={{ delay: index * 0.1, duration: 0.8 }}
                    className="w-full bg-[#059669] rounded-sm min-h-[2px]"
                  />
                  {/* Recyclable */}
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${recyclableHeight}%` }}
                    transition={{ delay: index * 0.1 + 0.1, duration: 0.8 }}
                    className="w-full bg-[#0EA5E9] rounded-sm min-h-[2px]"
                  />
                  {/* Hazardous */}
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${hazardousHeight}%` }}
                    transition={{ delay: index * 0.1 + 0.2, duration: 0.8 }}
                    className="w-full bg-[#F59E0B] rounded-sm min-h-[2px]"
                  />
                  {/* Residual */}
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${residualHeight}%` }}
                    transition={{ delay: index * 0.1 + 0.3, duration: 0.8 }}
                    className="w-full bg-[#6B7280] rounded-sm min-h-[2px]"
                  />
                </div>
                <span className="text-xs text-[#6B7280] font-medium mt-2">{data.day}</span>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  // Waste Breakdown Component
  const WasteBreakdown = () => {
    if (!currentData?.waste?.breakdown) {
      return (
        <div className="bg-white rounded-xl p-4">
          <h3 className="font-semibold text-[#1F2937] mb-4">Waste Type Breakdown</h3>
          <div className="flex items-center justify-center py-8">
            <p className="text-[#6B7280] text-sm">No breakdown data available</p>
          </div>
        </div>
      );
    }

    return (
      <div className="bg-white rounded-xl p-4">
        <h3 className="font-semibold text-[#1F2937] mb-4">Waste Type Breakdown</h3>
        <div className="space-y-3">
          {currentData.waste.breakdown.map((item, index) => (
          <motion.div
            key={item.type}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center"
          >
            <div className="flex items-center flex-1">
              <div 
                className="w-3 h-3 rounded-full mr-3"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-sm font-medium text-[#1F2937]">{item.type}</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm text-[#6B7280]">{item.amount} kg</span>
              <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${item.percentage}%` }}
                  transition={{ delay: index * 0.1 + 0.3, duration: 0.8 }}
                  className="h-full rounded-full"
                  style={{ backgroundColor: item.color }}
                />
              </div>
              <span className="text-xs font-medium text-[#1F2937] w-8">{item.percentage}%</span>
            </div>
          </motion.div>
        ))}
        </div>
      </div>
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
          className="text-2xl font-bold text-[#1F2937]"
        >
          Statistics
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="text-[#6B7280] text-sm mt-1"
        >
          Track your environmental impact
        </motion.p>
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

      {/* Overview Cards */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="px-4 mb-4"
      >
        <div className="bg-white rounded-xl p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-[#1F2937]">Total Waste Sorted</h3>
            <div className="flex items-center">
              <span 
                className={clsx(
                  "text-sm font-medium flex items-center",
                  currentData.waste.trend === 'up' ? 'text-green-600' : 'text-red-600'
                )}
              >
                {currentData.waste.trend === 'up' ? <ArrowUp size={14} /> : <ArrowDown size={14} />}
                {currentData.waste.change}
              </span>
            </div>
          </div>
          <div className="text-3xl font-bold text-[#1F2937] mb-2">{currentData.waste.total}</div>
          <div className="text-sm text-[#6B7280]">Compared to last {selectedPeriod}</div>
        </div>
      </motion.div>

      {/* Content */}
      <div className="flex-1 px-4 pb-4 overflow-y-auto scrollbar-hide">
        <div className="space-y-4">
          {/* Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <WasteChart />
          </motion.div>

          {/* Waste Breakdown */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <WasteBreakdown />
          </motion.div>


        </div>
      </div>

      {/* Camera Floating Button */}
      <CameraFloatingButton />
    </div>
  );
};

export default StatisticsPage; 