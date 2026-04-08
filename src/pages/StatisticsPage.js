import React, { useState, useEffect } from 'react';
import { TrendingUp, Leaf, Flame, TreePine, Droplets, ArrowUp, ArrowDown } from 'lucide-react';
import { motion } from 'framer-motion';
import useRoleStore from '../context/RoleContext';
import useToast from '../hooks/useToast';
import { Toast } from '../components/ui';

const StatisticsPage = () => {
  const [period, setPeriod] = useState('month');
  const { role } = useRoleStore();
  const { toast, showToast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => { const t = setTimeout(() => setIsLoading(false), 600); return () => clearTimeout(t); }, []);

  const periods = ['week', 'month', 'quarter', 'year'];

  // Data changes based on selected period
  const periodData = {
    week: {
      metrics: [
        { label: 'Waste Diverted', value: '2,800 kg', icon: Leaf, color: '#0D9488', trend: '+8%', trendUp: true },
        { label: 'Biogas Generated', value: '1,150 m³', icon: Flame, color: '#D97706', trend: '+5%', trendUp: true },
        { label: 'CO₂ Reduced', value: '0.5 tons', icon: TreePine, color: '#065F46', trend: '+10%', trendUp: true },
        { label: 'Equivalent Trees', value: '26', icon: Droplets, color: '#2563EB', trend: '+7%', trendUp: true },
      ],
      chart: [
        { month: 'Mon', waste: 55 }, { month: 'Tue', waste: 62 }, { month: 'Wed', waste: 48 },
        { month: 'Thu', waste: 70 }, { month: 'Fri', waste: 85 }, { month: 'Sat', waste: 72 }, { month: 'Sun', waste: 40 },
      ],
      gas: [
        { label: 'Weekly Usage', value: '38 kg', change: '-5%', icon: Flame, color: '#D97706', desc: 'Good efficiency' },
        { label: 'Savings vs LPG', value: 'Rp 580K', change: '+32%', icon: TrendingUp, color: '#0D9488', desc: 'This week' },
        { label: 'CO₂ Avoided', value: '0.1 ton', change: '+12%', icon: Leaf, color: '#065F46', desc: 'From Bio-LPG' },
      ],
      breakdown: [
        { type: 'Food Waste', pct: 70, amount: '1,960 kg', color: '#0D9488' },
        { type: 'Oil & Grease', pct: 18, amount: '504 kg', color: '#D97706' },
        { type: 'Compostable', pct: 9, amount: '252 kg', color: '#065F46' },
        { type: 'Non-processable', pct: 3, amount: '84 kg', color: '#DC2626' },
      ],
      carbon: { co2: '0.5t', trees: '26', flights: '3' },
    },
    month: {
      metrics: [
        { label: 'Waste Diverted', value: '12,400 kg', icon: Leaf, color: '#0D9488', trend: '+18%', trendUp: true },
        { label: 'Biogas Generated', value: '5,200 m³', icon: Flame, color: '#D97706', trend: '+12%', trendUp: true },
        { label: 'CO₂ Reduced', value: '2.3 tons', icon: TreePine, color: '#065F46', trend: '+22%', trendUp: true },
        { label: 'Equivalent Trees', value: '120', icon: Droplets, color: '#2563EB', trend: '+15%', trendUp: true },
      ],
      chart: [
        { month: 'W1', waste: 65 }, { month: 'W2', waste: 72 }, { month: 'W3', waste: 80 }, { month: 'W4', waste: 92 },
      ],
      gas: [
        { label: 'Monthly Usage', value: '156 kg', change: '-8%', icon: Flame, color: '#D97706', desc: 'Efficient usage' },
        { label: 'Savings vs LPG', value: 'Rp 2.4M', change: '+32%', icon: TrendingUp, color: '#0D9488', desc: 'Year-to-date' },
        { label: 'CO₂ Avoided', value: '0.42 ton', change: '+15%', icon: Leaf, color: '#065F46', desc: 'From Bio-LPG switch' },
      ],
      breakdown: [
        { type: 'Food Waste', pct: 72, amount: '8,928 kg', color: '#0D9488' },
        { type: 'Oil & Grease', pct: 15, amount: '1,860 kg', color: '#D97706' },
        { type: 'Compostable', pct: 10, amount: '1,240 kg', color: '#065F46' },
        { type: 'Non-processable', pct: 3, amount: '372 kg', color: '#DC2626' },
      ],
      carbon: { co2: '2.3t', trees: '120', flights: '12' },
    },
    quarter: {
      metrics: [
        { label: 'Waste Diverted', value: '38,200 kg', icon: Leaf, color: '#0D9488', trend: '+24%', trendUp: true },
        { label: 'Biogas Generated', value: '16,100 m³', icon: Flame, color: '#D97706', trend: '+19%', trendUp: true },
        { label: 'CO₂ Reduced', value: '7.1 tons', icon: TreePine, color: '#065F46', trend: '+28%', trendUp: true },
        { label: 'Equivalent Trees', value: '370', icon: Droplets, color: '#2563EB', trend: '+20%', trendUp: true },
      ],
      chart: [
        { month: 'Dec', waste: 68 }, { month: 'Jan', waste: 82 }, { month: 'Feb', waste: 92 },
      ],
      gas: [
        { label: 'Quarterly Usage', value: '468 kg', change: '-12%', icon: Flame, color: '#D97706', desc: 'Trending down' },
        { label: 'Savings vs LPG', value: 'Rp 7.2M', change: '+35%', icon: TrendingUp, color: '#0D9488', desc: 'This quarter' },
        { label: 'CO₂ Avoided', value: '1.26 ton', change: '+18%', icon: Leaf, color: '#065F46', desc: 'Cumulative' },
      ],
      breakdown: [
        { type: 'Food Waste', pct: 74, amount: '28,268 kg', color: '#0D9488' },
        { type: 'Oil & Grease', pct: 14, amount: '5,348 kg', color: '#D97706' },
        { type: 'Compostable', pct: 9, amount: '3,438 kg', color: '#065F46' },
        { type: 'Non-processable', pct: 3, amount: '1,146 kg', color: '#DC2626' },
      ],
      carbon: { co2: '7.1t', trees: '370', flights: '36' },
    },
    year: {
      metrics: [
        { label: 'Waste Diverted', value: '148,800 kg', icon: Leaf, color: '#0D9488', trend: '+42%', trendUp: true },
        { label: 'Biogas Generated', value: '62,500 m³', icon: Flame, color: '#D97706', trend: '+38%', trendUp: true },
        { label: 'CO₂ Reduced', value: '27.6 tons', icon: TreePine, color: '#065F46', trend: '+45%', trendUp: true },
        { label: 'Equivalent Trees', value: '1,440', icon: Droplets, color: '#2563EB', trend: '+35%', trendUp: true },
      ],
      chart: [
        { month: 'Mar', waste: 45 }, { month: 'May', waste: 52 }, { month: 'Jul', waste: 60 },
        { month: 'Sep', waste: 72 }, { month: 'Nov', waste: 80 }, { month: 'Jan', waste: 92 },
      ],
      gas: [
        { label: 'Annual Usage', value: '1,872 kg', change: '-18%', icon: Flame, color: '#D97706', desc: 'vs last year' },
        { label: 'Savings vs LPG', value: 'Rp 28.8M', change: '+42%', icon: TrendingUp, color: '#0D9488', desc: 'Total savings' },
        { label: 'CO₂ Avoided', value: '5.04 ton', change: '+22%', icon: Leaf, color: '#065F46', desc: 'Annual total' },
      ],
      breakdown: [
        { type: 'Food Waste', pct: 71, amount: '105,648 kg', color: '#0D9488' },
        { type: 'Oil & Grease', pct: 16, amount: '23,808 kg', color: '#D97706' },
        { type: 'Compostable', pct: 10, amount: '14,880 kg', color: '#065F46' },
        { type: 'Non-processable', pct: 3, amount: '4,464 kg', color: '#DC2626' },
      ],
      carbon: { co2: '27.6t', trees: '1,440', flights: '142' },
    },
  };

  const data = periodData[period];
  const maxVal = 100;

  return (
    <div className="min-h-full bg-bima-secondary">
      <Toast message={toast} />
      {isLoading ? (
        <div className="px-5 pt-4 space-y-4">
          <div className="grid grid-cols-2 gap-3">
            {[1,2,3,4].map(i => <div key={i} className="animate-pulse bg-gray-200 rounded-2xl h-24" />)}
          </div>
          <div className="animate-pulse bg-gray-200 rounded-2xl h-40" />
          <div className="animate-pulse bg-gray-200 rounded-2xl h-32" />
        </div>
      ) : (
      <>
      {/* Header */}
      <div className="bg-gradient-to-br from-bima-dark to-bima-primary px-5 pt-6 pb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-xl font-bold text-white">
              {role === 'driver' ? 'Earnings' : 'Impact Dashboard'}
            </h1>
            <p className="text-white/70 text-xs">
              {role === 'driver' ? 'Your performance & earnings' : 'Environmental impact metrics'}
            </p>
          </div>
          <div className="bg-white/15 rounded-xl px-3 py-1.5">
            <span className="text-white text-xs font-semibold flex items-center gap-1">
              <TrendingUp size={12} /> {data.metrics[0].trend} Growth
            </span>
          </div>
        </div>

        {/* Period Selector */}
        <div className="flex bg-white/15 rounded-xl p-1">
          {periods.map((p) => (
            <motion.button key={p} whileTap={{ scale: 0.95 }}
              onClick={() => setPeriod(p)}
              className={`flex-1 py-2 rounded-lg text-xs font-semibold capitalize transition-all
              ${period === p ? 'bg-white text-bima-dark' : 'text-white/70'}`}>
              {p}
            </motion.button>
          ))}
        </div>
      </div>

      <div className="px-5 py-4">
        {/* Key Impact Metrics */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          {data.metrics.map((metric, i) => (
            <motion.div key={`${period}-${i}`} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              onClick={() => showToast(metric.label + ': ' + metric.value)}
              className="bg-white rounded-2xl p-4 shadow-sm cursor-pointer">
              <div className="flex items-center justify-between mb-2">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: `${metric.color}15` }}>
                  <metric.icon size={18} style={{ color: metric.color }} />
                </div>
                <span className={`text-[10px] font-bold flex items-center gap-0.5 px-1.5 py-0.5 rounded-full
                  ${metric.trendUp ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
                  {metric.trendUp ? <ArrowUp size={10} /> : <ArrowDown size={10} />}
                  {metric.trend}
                </span>
              </div>
              <div className="text-lg font-bold text-gray-800">{metric.value}</div>
              <div className="text-[10px] text-gray-500">{metric.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Chart */}
        <div className="bg-white rounded-2xl p-4 shadow-sm mb-6">
          <h3 className="text-sm font-bold text-gray-800 mb-4">
            {period === 'week' ? 'Daily' : period === 'month' ? 'Weekly' : period === 'quarter' ? 'Monthly' : 'Bi-Monthly'} Trends
          </h3>
          <div className="flex items-end gap-2 h-32">
            {data.chart.map((d, i) => (
              <div key={`${period}-${i}`} className="flex-1 flex flex-col items-center gap-1">
                <div className="w-full flex flex-col justify-end flex-1">
                  <motion.div className="w-full rounded-t bg-bima-primary"
                    initial={{ height: 0 }}
                    animate={{ height: `${(d.waste / maxVal) * 100}%` }}
                    transition={{ duration: 0.4, delay: i * 0.05 }} />
                </div>
                <span className="text-[9px] text-gray-400 font-medium">{d.month}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Gas Usage Analytics */}
        <div className="mb-6">
          <h3 className="text-sm font-bold text-gray-800 mb-3">
            {role === 'driver' ? 'Performance Metrics' : 'Gas Usage Analytics'}
          </h3>
          {data.gas.map((item, i) => (
            <motion.div key={`${period}-${i}`} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-white rounded-xl p-4 mb-2 shadow-sm flex items-center">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center mr-3"
                style={{ backgroundColor: `${item.color}15` }}>
                <item.icon size={18} style={{ color: item.color }} />
              </div>
              <div className="flex-1">
                <div className="text-sm font-semibold text-gray-800">{item.label}</div>
                <div className="text-[10px] text-gray-500">{item.desc}</div>
              </div>
              <div className="text-right">
                <div className="text-sm font-bold text-gray-800">{item.value}</div>
                <span className="text-[10px] font-bold text-bima-primary">{item.change}</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Breakdown */}
        <div className="bg-white rounded-2xl p-4 shadow-sm mb-6">
          <h3 className="text-sm font-bold text-gray-800 mb-3">Waste Breakdown</h3>
          {data.breakdown.map((item, i) => (
            <div key={`${period}-${i}`} className="mb-3 last:mb-0">
              <div className="flex justify-between text-xs mb-1">
                <span className="font-medium text-gray-700">{item.type}</span>
                <span className="text-gray-500">{item.amount} ({item.pct}%)</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2">
                <motion.div className="h-2 rounded-full"
                  style={{ backgroundColor: item.color }}
                  initial={{ width: 0 }}
                  animate={{ width: `${item.pct}%` }}
                  transition={{ duration: 0.5, delay: i * 0.08 }} />
              </div>
            </div>
          ))}
        </div>

        {/* Carbon Savings Summary */}
        <div className="bg-gradient-to-r from-bima-primary to-bima-dark rounded-2xl p-5 mb-8">
          <h3 className="text-sm font-bold text-white mb-3">Carbon Savings Summary</h3>
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: 'Total CO₂', value: data.carbon.co2, sub: 'Avoided' },
              { label: 'Trees', value: data.carbon.trees, sub: 'Equivalent' },
              { label: 'Flights', value: data.carbon.flights, sub: 'Equivalent' },
            ].map((item, i) => (
              <div key={i} className="bg-white/15 rounded-xl p-3 text-center">
                <div className="text-lg font-bold text-white">{item.value}</div>
                <div className="text-[9px] text-white/80">{item.label}</div>
                <div className="text-[8px] text-white/60">{item.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      </>
      )}
    </div>
  );
};

export default StatisticsPage;