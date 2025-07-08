import React from 'react';
import { motion } from 'framer-motion';
import { formatPrice } from '../utils/formatters';

const MarketItem = ({ item, index }) => {
  const isPositive = item.change >= 0;
  
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ 
        duration: 0.3, 
        delay: index * 0.05,
        layout: { duration: 0.4, ease: "easeInOut" }
      }}
     className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg border border-gray-700/50 hover:bg-gray-800/70 transition-all duration-300 hover:border-gray-600/50 shadow-[0_4px_12px_rgba(0,0,0,0.3)] backdrop-blur-md"
    >
      <div className="flex items-center space-x-3">
        <div className={`w-10 h-10 rounded-full ${item.color} flex items-center justify-center text-white font-bold text-sm shadow-lg`}>
          {item.icon}
        </div>
        <div>
          <div className="font-bold text-white text-sm md:text-base">{item.name}</div>
          <div className="text-gray-400 text-xs md:text-sm tracking-tight">{item.fullName}</div>
        </div>
      </div>
      <div className="text-right">
        <div className="text-white font-semibold text-sm md:text-base">
          {formatPrice(item.price)}
        </div>
        <div className={`text-xs md:text-sm font-medium ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
          {item.changePercent}
        </div>
      </div>
    </motion.div>
  );
};

export default MarketItem;