import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { generateMockData, newCoinsData } from '../data/mockData';
import MarketItem from './MarketItem';
import TabButton from './TabButton';
import MobileSlider from './MobileSlider';

const OpportunitiesSection = () => {
  const [marketData, setMarketData] = useState(generateMockData());
  const [activeTab, setActiveTab] = useState('hot');
  const [isMobile, setIsMobile] = useState(false);
  const sectionRef = useRef(null);
  const { isIntersecting } = useIntersectionObserver(sectionRef, { threshold: 0.1 });

  // Check for mobile screen
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Update market data every 3-4 seconds when in view
  useEffect(() => {
    if (!isIntersecting) return;

    const interval = setInterval(() => {
      setMarketData(prevData => {
        const newData = [...prevData];
        
        // Update 2-3 random items
        const itemsToUpdate = Math.floor(Math.random() * 3) + 2;
        
        for (let i = 0; i < itemsToUpdate; i++) {
          const randomIndex = Math.floor(Math.random() * newData.length);
          const item = newData[randomIndex];
          
          // Simulate realistic price changes
          const changePercent = (Math.random() - 0.5) * 8; // -4% to +4%
          const newPrice = Math.max(0.000001, item.price * (1 + changePercent / 100));
          
          newData[randomIndex] = {
            ...item,
            price: newPrice,
            change: changePercent,
            changePercent: `${changePercent >= 0 ? '+' : ''}${changePercent.toFixed(2)}%`
          };
        }
        
        return newData;
      });
    }, Math.random() * 2000 + 3000); // 3-5 seconds

    return () => clearInterval(interval);
  }, [isIntersecting, activeTab]);

  const tabs = [
    { id: 'hot', label: 'Hot List', icon: '🔥' },
    { id: 'new', label: 'New Coins', icon: '⭐' },
    { id: 'gainers', label: 'Top Gainers', icon: '📈' }
  ];

  const getCurrentData = (tabId) => {
    switch (tabId) {
      case 'new':
        return newCoinsData;
      case 'gainers':
        return [...marketData].sort((a, b) => b.change - a.change);
      case 'hot':
      default:
        return [...marketData].sort((a, b) => b.price - a.price);
    }
  };

  // Get data for each tab (for desktop view)
  const getTabData = (tabId) => {
    return getCurrentData(tabId).slice(0, 5);
  };

  // Get data for mobile view (current active tab)
  const displayData = getCurrentData(activeTab).slice(0, 5);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      {/* Header section for spacing */}
      <div className="h-20"></div>
      
      <div ref={sectionRef} className="max-w-6xl mx-auto px-4 py-16">
        {/* Title and Description with Animations */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >

          <div className="relative inline-block">
            {/* GLOW */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 0.5, scale: 1.4 }}
              transition={{ duration: 1.5, ease: 'easeOut' }}
              className="absolute inset-0 mx-auto bg-purple-500/30 blur-3xl rounded-full z-0"
            />

            {/* TITLE ON TOP */}
            <motion.h1
              initial={{ opacity: 0, filter: 'blur(20px)', y: 20 }}
              animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="relative z-10 text-4xl md:text-6xl font-bold mb-6 leading-tight"
            >
              <span className="text-blue-500">TRADE</span> YOUR FAVOURITE{' '}
              <br className="hidden md:block" />
              <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                MARKETS
              </span>
            </motion.h1>
          </div>
          
          <motion.p
            initial={{ opacity: 0, filter: 'blur(10px)', y: 20 }}
            animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto mb-8 leading-relaxed"
          >
            Want to buy Bitcoin outright or trade CFDs on Gold or EUR/USD? We've got you covered with 
            access to 100+ global markets on one platform.
          </motion.p>
          
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            View All coins →
          </motion.button>
        </motion.div>

        {/* Market List Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="w-full"
        >
          {/* Desktop/Tablet View */}
          {!isMobile && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {tabs.map((tab) => (
                <div key={tab.id} className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 hover:border-gray-600/50 transition-all duration-300">
                  <div className="flex items-center space-x-2 mb-4">
                    <span className="text-2xl">{tab.icon}</span>
                    <h3 className="text-xl font-semibold">{tab.label}</h3>
                  </div>
                  <div className="space-y-3">
                    <div className="space-y-3">
                      <AnimatePresence>
                        {getTabData(tab.id).map((item, index) => (
                          <MarketItem key={item.id} item={item} index={index} />
                        ))}
                      </AnimatePresence>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Mobile View */}
          {isMobile && (
              <div className="relative">
                  <div className="mb-6">
                    <div className="flex space-x-2 overflow-x-auto scrollbar-hide px-1">
                      {tabs.map((tab) => (
                        <TabButton
                          key={tab.id}
                          active={activeTab === tab.id}
                          onClick={() => setActiveTab(tab.id)}
                          icon={tab.icon}
                        >
                          {tab.label}
                        </TabButton>
                      ))}
                    </div>
                  </div>
              
              <MobileSlider data={displayData} />
            </div>
          )}
        </motion.div>
      </div>
      
      {/* Footer section for spacing */}
      <div className="h-screen bg-gradient-to-b from-transparent to-gray-900/50"></div>
    </div>
  );
};

export default OpportunitiesSection;