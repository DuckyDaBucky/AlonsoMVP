/**
 * Individual Fan Activity Item Component
 * Displays a single fan interaction with animated entrance
 */

import { motion } from 'framer-motion';
import { FanActivity } from '@/types/dashboard';

interface FanActivityItemProps {
  activity: FanActivity;
  index: number;
}

export function FanActivityItem({ activity, index }: FanActivityItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="flex items-center justify-between p-2 bg-[#0A0A0A] rounded-lg border border-[#00B0A9]/10 hover:border-[#00C39A]/30 transition-colors hover:shadow-[0_0_15px_rgba(0,195,154,0.1)]"
    >
      <div className="flex items-center gap-2">
        <div className="w-6 h-6 bg-gradient-to-br from-[#00C39A] to-[#00B0A9] rounded-full flex items-center justify-center text-[10px] font-bold">
          {activity.name[0]}
        </div>
        <span className="text-white/80 text-xs" style={{ fontFamily: 'Inter, sans-serif' }}>
          {activity.name}
        </span>
      </div>
      {activity.action ? (
        <span className="text-[#00C39A] text-[10px] font-medium">{activity.action}</span>
      ) : (
        <span className="text-[#00C39A] text-xs font-semibold">+{activity.points} pts</span>
      )}
    </motion.div>
  );
}

