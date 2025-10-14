/**
 * Reward Progress Card Component
 * Displays user tier progress and team stats
 */

import { motion } from 'framer-motion';
import { Card } from '@/components/ui/Card';

export function RewardProgressCard() {
  return (
    <Card delay={0.4}>
      <div className="flex items-center gap-2 mb-3">
        <div className="w-8 h-8 bg-gradient-to-br from-[#00C39A] to-[#00B0A9] rounded-lg flex items-center justify-center shadow-lg shadow-[#00C39A]/20">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 text-white">
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 01-.982-3.172M9.497 14.25a7.454 7.454 0 00.981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 007.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 002.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 012.916.52 6.003 6.003 0 01-5.395 4.972m0 0a6.726 6.726 0 01-2.749 1.35m0 0a6.772 6.772 0 01-3.044 0" />
          </svg>
        </div>
        <h3 className="text-base font-semibold text-white/90" style={{ fontFamily: 'Lexend, sans-serif' }}>
          Reward Progress
        </h3>
      </div>

      <div className="mb-2">
        <div className="flex justify-between items-center mb-1">
          <span className="text-sm text-white/80 font-medium" style={{ fontFamily: 'Inter, sans-serif' }}>
            Speedster Tier
          </span>
          <span className="text-sm bg-gradient-to-r from-[#00C39A] to-[#00B0A9] bg-clip-text text-transparent font-bold">
            65%
          </span>
        </div>
        <div className="h-2 bg-[#0A0A0A] border border-[#00B0A9]/20 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: '65%' }}
            transition={{ duration: 1, delay: 0.5 }}
            className="h-full bg-gradient-to-r from-[#00C39A] to-[#00B0A9] shadow-lg shadow-[#00C39A]/50"
          />
        </div>
      </div>

      <p className="text-white/60 text-xs mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>
        Stay active to earn badges, exclusive merch, and recognition.
      </p>
      
      {/* Team Stats */}
      <div className="mt-2 pt-2 border-t border-[#00B0A9]/20">
        <div className="grid grid-cols-2 gap-2 text-[10px]">
          <div className="bg-[#050505] border border-[#00B0A9]/10 rounded p-1.5">
            <div className="text-[#00C39A] font-semibold">Constructor</div>
            <div className="text-white/70">P5 • 98 pts</div>
          </div>
          <div className="bg-[#050505] border border-[#00B0A9]/10 rounded p-1.5">
            <div className="text-[#00C39A] font-semibold">Best Finish</div>
            <div className="text-white/70">P3 Bahrain</div>
          </div>
        </div>
      </div>
    </Card>
  );
}

