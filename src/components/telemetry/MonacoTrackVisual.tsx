/**
 * Monaco GP Track Visual Component
 * Animated SVG representation of Circuit de Monaco with live data
 */

import { motion } from 'framer-motion';
import { MONACO_GP } from '@/data/constants';

const MONACO_PATH = "M 30 75 L 40 75 L 45 60 L 47 45 L 52 35 L 60 30 L 70 28 L 80 30 L 90 35 L 95 40 L 100 45 L 110 45 L 120 42 L 128 38 L 135 32 L 140 28 L 145 30 L 150 35 L 153 42 L 155 50 L 157 60 L 155 68 L 150 75 L 142 78 L 130 78 L 120 76 L 110 72 L 100 70 L 90 72 L 80 76 L 70 78 L 60 78 L 50 78 L 40 78 L 32 76 L 30 75";

export function MonacoTrackVisual() {
  return (
    <div className="h-32 relative bg-[#050505] rounded-lg border border-[#00B0A9]/10 p-3">
      {/* Track Title */}
      <div className="absolute top-2 left-2 z-10">
        <span className="text-[10px] font-bold bg-gradient-to-r from-[#00C39A] to-[#00B0A9] bg-clip-text text-transparent">
          CIRCUIT DE MONACO - LIVE
        </span>
      </div>
      
      {/* Monaco Track SVG */}
      <svg viewBox="0 0 200 100" className="w-full h-full">
        {/* Track outline */}
        <path
          d={MONACO_PATH}
          fill="none"
          stroke="#00B0A9"
          strokeWidth="1"
          opacity="0.3"
        />
        
        {/* Racing line */}
        <motion.path
          d={MONACO_PATH}
          fill="none"
          stroke="#00E0FF"
          strokeWidth="2"
          strokeDasharray="250"
          initial={{ strokeDashoffset: 250 }}
          animate={{ strokeDashoffset: 0 }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        />
        
        {/* Car position marker */}
        <motion.circle
          cx="0"
          cy="0"
          r="3"
          fill="#00C39A"
          initial={{ offsetDistance: "0%" }}
          animate={{ offsetDistance: "100%" }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        >
          <animateMotion
            dur="4s"
            repeatCount="indefinite"
            path={MONACO_PATH}
          />
        </motion.circle>
        
        {/* Key corner markers */}
        <circle cx="47" cy="45" r="2" fill="#00C39A" opacity="0.5" />
        <circle cx="140" cy="28" r="2" fill="#00C39A" opacity="0.5" />
        <circle cx="157" cy="60" r="2" fill="#00C39A" opacity="0.5" />
        
        {/* Corner names */}
        <text x="47" y="38" fontSize="6" fill="#00B0A9" opacity="0.6">Ste Devote</text>
        <text x="132" y="24" fontSize="6" fill="#00B0A9" opacity="0.6">Casino</text>
        <text x="147" y="84" fontSize="6" fill="#00B0A9" opacity="0.6">Rascasse</text>
      </svg>
      
      {/* Live stats overlay */}
      <div className="absolute bottom-2 left-2 right-2 flex justify-between text-[8px]">
        <div className="bg-[#0A0A0A]/80 px-2 py-1 rounded border border-[#00B0A9]/20">
          <span className="text-[#00E0FF]">Speed: 298 km/h</span>
        </div>
        <div className="bg-[#0A0A0A]/80 px-2 py-1 rounded border border-[#00B0A9]/20">
          <span className="text-[#00C39A]">Lap: {MONACO_GP.currentLap}/{MONACO_GP.totalLaps}</span>
        </div>
        <div className="bg-[#0A0A0A]/80 px-2 py-1 rounded border border-[#00B0A9]/20">
          <span className="text-white/70">P{MONACO_GP.alonso.position} • Gap: {MONACO_GP.alonso.gap}</span>
        </div>
      </div>
      
      {/* Weather & Track Info */}
      <div className="absolute top-12 right-2 text-[8px] bg-[#0A0A0A]/80 px-2 py-1 rounded border border-[#00B0A9]/20">
        <div className="text-white/60">{MONACO_GP.temperature.air}°C Air • {MONACO_GP.temperature.track}°C Track</div>
      </div>
    </div>
  );
}

