/**
 * Reusable Card component with premium glassmorphic styling
 * Provides consistent garage underlight glow effect
 */

import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export function Card({ children, className = '', delay = 0 }: CardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className={className}
    >
      <div className="relative group">
        {/* Garage Underlight Glow */}
        <div className="absolute -inset-[1px] bg-gradient-to-br from-[#00C39A]/20 to-[#00B0A9]/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm" />
        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-3/4 h-1 bg-gradient-to-r from-transparent via-[#00C39A]/30 to-transparent blur-md" />
        
        <div className="relative bg-[#0A0A0A] border border-[#00B0A9]/20 rounded-xl p-3 backdrop-blur-sm">
          <div className="absolute inset-[1px] border border-[#00B0A9]/5 rounded-xl pointer-events-none" />
          {children}
        </div>
      </div>
    </motion.div>
  );
}

