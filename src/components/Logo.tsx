import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  showText?: boolean;
}

const Logo: React.FC<LogoProps> = ({ size = 'md', className = '', showText = true }) => {
  const sizeClasses = {
    sm: 'h-6 w-6',
    md: 'h-8 w-8',
    lg: 'h-12 w-12',
    xl: 'h-16 w-16'
  };

  const textSizeClasses = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl',
    xl: 'text-3xl'
  };

  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      <div className={sizeClasses[size]}>
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          {/* Main Building Structure */}
          <rect x="8" y="20" width="48" height="36" rx="4" fill="url(#buildingGradient)" stroke="url(#borderGradient)" strokeWidth="1.5"/>
          
          {/* Roof/Spire */}
          <path d="M32 8L8 20H56L32 8Z" fill="url(#roofGradient)" stroke="url(#borderGradient)" strokeWidth="1.5"/>
          
          {/* Central Tower */}
          <rect x="28" y="12" width="8" height="8" fill="url(#towerGradient)" stroke="url(#borderGradient)" strokeWidth="1"/>
          
          {/* Cryptic Symbols/Patterns */}
          <circle cx="20" cy="32" r="2" fill="url(#symbolGradient)"/>
          <circle cx="44" cy="32" r="2" fill="url(#symbolGradient)"/>
          <circle cx="32" cy="40" r="2" fill="url(#symbolGradient)"/>
          
          {/* Encryption Lines */}
          <path d="M16 28L20 32L16 36" stroke="url(#encryptionGradient)" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
          <path d="M48 28L44 32L48 36" stroke="url(#encryptionGradient)" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
          <path d="M28 44L32 40L36 44" stroke="url(#encryptionGradient)" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
          
          {/* Vault Doors */}
          <rect x="24" y="44" width="16" height="12" rx="2" fill="url(#doorGradient)" stroke="url(#borderGradient)" strokeWidth="1"/>
          <rect x="26" y="46" width="2" height="8" fill="url(#handleGradient)"/>
          <rect x="36" y="46" width="2" height="8" fill="url(#handleGradient)"/>
          
          {/* Mystical Aura */}
          <circle cx="32" cy="32" r="30" fill="none" stroke="url(#auraGradient)" strokeWidth="0.5" opacity="0.3"/>
          <circle cx="32" cy="32" r="26" fill="none" stroke="url(#auraGradient)" strokeWidth="0.3" opacity="0.2"/>
          
          {/* Gradients */}
          <defs>
            <linearGradient id="buildingGradient" x1="32" y1="20" x2="32" y2="56" gradientUnits="userSpaceOnUse">
              <stop stopColor="#4A148C"/>
              <stop offset="0.3" stopColor="#6A1B9A"/>
              <stop offset="0.7" stopColor="#8E24AA"/>
              <stop offset="1" stopColor="#AB47BC"/>
            </linearGradient>
            
            <linearGradient id="roofGradient" x1="32" y1="8" x2="32" y2="20" gradientUnits="userSpaceOnUse">
              <stop stopColor="#7B1FA2"/>
              <stop offset="0.5" stopColor="#9C27B0"/>
              <stop offset="1" stopColor="#BA68C8"/>
            </linearGradient>
            
            <linearGradient id="towerGradient" x1="32" y1="12" x2="32" y2="20" gradientUnits="userSpaceOnUse">
              <stop stopColor="#E1BEE7"/>
              <stop offset="1" stopColor="#F8BBD9"/>
            </linearGradient>
            
            <linearGradient id="symbolGradient" x1="0" y1="0" x2="1" y2="1" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FFD700"/>
              <stop offset="1" stopColor="#FFA000"/>
            </linearGradient>
            
            <linearGradient id="encryptionGradient" x1="0" y1="0" x2="1" y2="1" gradientUnits="userSpaceOnUse">
              <stop stopColor="#00BCD4"/>
              <stop offset="1" stopColor="#0097A7"/>
            </linearGradient>
            
            <linearGradient id="doorGradient" x1="32" y1="44" x2="32" y2="56" gradientUnits="userSpaceOnUse">
              <stop stopColor="#3F51B5"/>
              <stop offset="1" stopColor="#303F9F"/>
            </linearGradient>
            
            <linearGradient id="handleGradient" x1="0" y1="0" x2="1" y2="1" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FFC107"/>
              <stop offset="1" stopColor="#FF8F00"/>
            </linearGradient>
            
            <linearGradient id="borderGradient" x1="0" y1="0" x2="1" y2="1" gradientUnits="userSpaceOnUse">
              <stop stopColor="#E1BEE7"/>
              <stop offset="1" stopColor="#CE93D8"/>
            </linearGradient>
            
            <radialGradient id="auraGradient" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#9C27B0" stopOpacity="0.8"/>
              <stop offset="100%" stopColor="#673AB7" stopOpacity="0.2"/>
            </radialGradient>
          </defs>
        </svg>
      </div>
      
      {showText && (
        <div className={`font-bold text-white ${textSizeClasses[size]}`}>
          <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Arcane Treasury
          </span>
        </div>
      )}
    </div>
  );
};

export default Logo;
