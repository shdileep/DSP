import React from 'react';
import { motion } from 'motion/react';

interface AnimatedChipCodeIconProps {
  className?: string;
  size?: number;
}

export default function AnimatedChipCodeIcon({ className = "w-8 h-8", size = 32 }: AnimatedChipCodeIconProps) {
  return (
    <motion.div 
      className={`relative flex items-center justify-center ${className}`}
      whileHover={{ scale: 1.1, rotate: [0, -3, 3, 0] }}
      transition={{ duration: 0.3 }}
      style={{ width: size, height: size }}
    >
      {/* Ambient background glow */}
      <motion.div 
        animate={{ 
          opacity: [0.3, 0.7, 0.3],
          scale: [0.95, 1.15, 0.95]
        }}
        transition={{ 
          duration: 2.4, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
        className="absolute inset-0 rounded-lg bg-sky-500/20 blur-md pointer-events-none"
      />

      <svg 
        viewBox="0 0 100 100" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full text-sky-400 drop-shadow-[0_0_8px_rgba(56,189,248,0.5)]"
      >
        {/* Top Pins (3) */}
        <g className="stroke-current stroke-[4] stroke-linecap-round stroke-linejoin-round fill-none">
          <line x1="36" y1="9" x2="36" y2="23" />
          <circle cx="36" cy="8" r="4.5" className="fill-[#050816] stroke-current stroke-[3.5]" />
          
          <line x1="50" y1="9" x2="50" y2="23" />
          <circle cx="50" cy="8" r="4.5" className="fill-[#050816] stroke-current stroke-[3.5]" />
          
          <line x1="64" y1="9" x2="64" y2="23" />
          <circle cx="64" cy="8" r="4.5" className="fill-[#050816] stroke-current stroke-[3.5]" />
        </g>

        {/* Bottom Pins (3) */}
        <g className="stroke-current stroke-[4] stroke-linecap-round stroke-linejoin-round fill-none">
          <line x1="36" y1="77" x2="36" y2="91" />
          <circle cx="36" cy="92" r="4.5" className="fill-[#050816] stroke-current stroke-[3.5]" />
          
          <line x1="50" y1="77" x2="50" y2="91" />
          <circle cx="50" cy="92" r="4.5" className="fill-[#050816] stroke-current stroke-[3.5]" />
          
          <line x1="64" y1="77" x2="64" y2="91" />
          <circle cx="64" cy="92" r="4.5" className="fill-[#050816] stroke-current stroke-[3.5]" />
        </g>

        {/* Left Pins (3) */}
        <g className="stroke-current stroke-[4] stroke-linecap-round stroke-linejoin-round fill-none">
          <line x1="9" y1="36" x2="23" y2="36" />
          <circle cx="8" cy="36" r="4.5" className="fill-[#050816] stroke-current stroke-[3.5]" />
          
          <line x1="9" y1="50" x2="23" y2="50" />
          <circle cx="8" cy="50" r="4.5" className="fill-[#050816] stroke-current stroke-[3.5]" />
          
          <line x1="9" y1="64" x2="23" y2="64" />
          <circle cx="8" cy="64" r="4.5" className="fill-[#050816] stroke-current stroke-[3.5]" />
        </g>

        {/* Right Pins (3) */}
        <g className="stroke-current stroke-[4] stroke-linecap-round stroke-linejoin-round fill-none">
          <line x1="77" y1="36" x2="91" y2="36" />
          <circle cx="92" cy="36" r="4.5" className="fill-[#050816] stroke-current stroke-[3.5]" />
          
          <line x1="77" y1="50" x2="91" y2="50" />
          <circle cx="92" cy="50" r="4.5" className="fill-[#050816] stroke-current stroke-[3.5]" />
          
          <line x1="77" y1="64" x2="91" y2="64" />
          <circle cx="92" cy="64" r="4.5" className="fill-[#050816] stroke-current stroke-[3.5]" />
        </g>

        {/* Outer Chip Body */}
        <rect 
          x="23" 
          y="23" 
          width="54" 
          height="54" 
          rx="11" 
          className="stroke-current stroke-[4.5] fill-[#081226]/80"
        />

        {/* Inner Die Border */}
        <rect 
          x="30" 
          y="30" 
          width="40" 
          height="40" 
          rx="2" 
          className="stroke-current stroke-[2] opacity-60 fill-none"
        />

        {/* Center Code Symbol < / > with Motion Animation */}
        <motion.g 
          className="stroke-current stroke-[4.5] stroke-linecap-round stroke-linejoin-round fill-none"
          animate={{ 
            opacity: [0.85, 1, 0.85],
            scale: [1, 1.04, 1]
          }}
          transition={{ 
            duration: 1.8, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
          style={{ transformOrigin: '50px 50px' }}
        >
          {/* < Bracket */}
          <path d="M 45 40 L 36 50 L 45 60" />
          
          {/* / Slash */}
          <path d="M 52 37 L 48 63" />
          
          {/* > Bracket */}
          <path d="M 55 40 L 64 50 L 55 60" />
        </motion.g>

        {/* Pulsing signal dots on 4 corner pins */}
        <motion.circle 
          cx="50" 
          cy="8" 
          r="2" 
          className="fill-sky-300"
          animate={{ opacity: [0.2, 1, 0.2] }}
          transition={{ duration: 1.2, repeat: Infinity, delay: 0 }}
        />
        <motion.circle 
          cx="92" 
          cy="50" 
          r="2" 
          className="fill-sky-300"
          animate={{ opacity: [0.2, 1, 0.2] }}
          transition={{ duration: 1.2, repeat: Infinity, delay: 0.3 }}
        />
        <motion.circle 
          cx="50" 
          cy="92" 
          r="2" 
          className="fill-sky-300"
          animate={{ opacity: [0.2, 1, 0.2] }}
          transition={{ duration: 1.2, repeat: Infinity, delay: 0.6 }}
        />
        <motion.circle 
          cx="8" 
          cy="50" 
          r="2" 
          className="fill-sky-300"
          animate={{ opacity: [0.2, 1, 0.2] }}
          transition={{ duration: 1.2, repeat: Infinity, delay: 0.9 }}
        />
      </svg>
    </motion.div>
  );
}
