import React from 'react';

const TabButton = ({ active, onClick, children, icon }) => (
  <button
    onClick={onClick}
    className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 ${
      active 
        ? 'bg-gray-700 text-white shadow-lg' 
        : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
    }`}
  >
    <span className="text-sm">{icon}</span>
    <span className="text-sm font-semibold tracking-wide uppercase">{children}</span>
  </button>
);

export default TabButton;