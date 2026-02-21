import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { BottomNav, RoleToggle } from './components/layout';
import HomePage from './pages/HomePage';
import ScanPage from './pages/ScanPage';
import SmartBinFinderPage from './pages/SmartBinFinderPage';
import MarketplacePage from './pages/MarketplacePage';
import EducationPage from './pages/EducationPage';
import CommunityPage from './pages/CommunityPage';
import StatisticsPage from './pages/StatisticsPage';
import ProfilePage from './pages/ProfilePage';
import NotificationPage from './pages/NotificationPage';
import PickupPage from './pages/PickupPage';
import OrderGasPage from './pages/OrderGasPage';

function App() {
  return (
    <Router>
      {/* Phone Container - Full height, phone aspect ratio */}
      <div className="min-h-screen bg-[#064E3B] flex items-center justify-center">
        <div
          className="relative bg-[#F0FDF9] overflow-hidden shadow-2xl"
          style={{
            height: '100vh',
            width: 'min(100vw, calc(100vh * 9 / 19.5))', // Phone aspect ratio 9:19.5
            maxWidth: '450px'
          }}
        >
          {/* Role Toggle - Always at top */}
          <RoleToggle />

          {/* Main Content - Scrollable without visible scrollbar */}
          <div
            className="pb-[70px] overflow-y-auto scrollbar-hide"
            style={{
              height: 'calc(100% - 38px)', // subtract role toggle height
              scrollbarWidth: 'none', /* Firefox */
              msOverflowStyle: 'none', /* IE and Edge */
            }}
          >
            <style>{`
              .scrollbar-hide::-webkit-scrollbar {
                display: none; /* Chrome, Safari, Opera */
              }
            `}</style>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/scan" element={<ScanPage />} />
              <Route path="/smart-bin" element={<SmartBinFinderPage />} />
              <Route path="/marketplace" element={<MarketplacePage />} />
              <Route path="/education" element={<EducationPage />} />
              <Route path="/community" element={<CommunityPage />} />
              <Route path="/statistics" element={<StatisticsPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/notifications" element={<NotificationPage />} />
              <Route path="/pickup" element={<PickupPage />} />
              <Route path="/order-gas" element={<OrderGasPage />} />
            </Routes>
          </div>

          {/* Fixed Bottom Navigation - Always at bottom */}
          <BottomNav />
        </div>
      </div>
    </Router>
  );
}

export default App;
