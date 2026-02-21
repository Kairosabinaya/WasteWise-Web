import React from 'react';

const CurvedHeader = ({ children, className = "" }) => {
  return (
    <div className={`relative bg-[#0C2521] pb-16 pt-12 ${className}`}>
      {/* Content */}
      <div className="relative z-10 px-5">
        {children}
      </div>
      
      {/* Curved Bottom - exact Flutter recreation */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg 
          viewBox="0 0 375 40" 
          className="w-full h-10" 
          preserveAspectRatio="none"
        >
          <path 
            d="M0,0 C125,40 250,40 375,0 L375,40 L0,40 Z" 
            fill="#F8FAFC"
          />
        </svg>
      </div>
    </div>
  );
};

export default CurvedHeader; 