
import React from 'react';

const Logo = ({ size = "default" }) => {
  const sizeClass = size === "small" ? "text-xl" : "text-3xl";
  
  return (
    <div className="flex items-center gap-2">
      <div className="language-gradient rounded-full w-8 h-8 flex items-center justify-center">
        <span className="text-white font-bold">LM</span>
      </div>
      <span className={`font-bold ${sizeClass} bg-clip-text text-transparent bg-gradient-to-r from-accent to-secondary`}>
        LanguageMate
      </span>
    </div>
  );
};

export default Logo;
