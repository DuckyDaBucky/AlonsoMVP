/**
 * Dashboard Header Component
 * Displays Ai.lonso branding, Aston Martin logo, title, and Monaco GP info
 */

import { motion } from 'framer-motion';
import Image from 'next/image';

export function Header() {
  return (
    <header className="mb-3">
      <div className="flex items-center justify-between mb-2">
        {/* Left: Ai.lonso Logo */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-3"
        >
          <Image
            src="/736x1000_Mobile_Article_Hero_1-removebg-preview(1).png"
            alt="Ai.lonso"
            width={180}
            height={180}
            className="object-contain"
          />
        </motion.div>

        {/* Right: Partner Logo */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-4"
        >
          <Image
            src="/Aston_Martin_Cognizant_F1_Team.png"
            alt="Aston Martin Cognizant F1 Team"
            width={280}
            height={90}
            className="object-contain invert"
          />
        </motion.div>
      </div>

      {/* Centered Title */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-center"
      >
        <h1 className="text-2xl font-bold mb-1 text-white/90 tracking-tight" style={{ fontFamily: 'Lexend, sans-serif' }}>
          The Ai.lonso Fan Dashboard
        </h1>
        <p className="text-xs text-white/70 mb-1" style={{ fontFamily: 'Inter, sans-serif' }}>
          A unified home where Ai.lonso connects fans, content, and community.
        </p>
        
        {/* Monaco GP Info Banner */}
        <div className="flex items-center justify-center gap-4 text-[10px] mb-2">
          <div className="flex items-center gap-1 bg-[#00C39A]/10 border border-[#00C39A]/30 px-3 py-1 rounded-full">
            <span className="text-white/80">Next: Monaco GP • May 25, 2025</span>
          </div>
          <div className="flex items-center gap-1 bg-[#00B0A9]/10 border border-[#00B0A9]/30 px-3 py-1 rounded-full">
            <span className="text-white/80">Alonso P6 • Stroll P11</span>
          </div>
        </div>
        
        {/* Animated Teal Underline Pulse */}
        <div className="flex justify-center">
          <motion.div 
            className="w-64 h-0.5 bg-gradient-to-r from-transparent via-[#00C39A] to-transparent rounded-full"
            animate={{
              opacity: [0.5, 1, 0.5],
              scaleX: [1, 1.05, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>
      </motion.div>
    </header>
  );
}

