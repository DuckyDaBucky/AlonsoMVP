/**
 * Telemetry Card Component
 * Displays Monaco GP track visual and team standings
 * Collapsible but defaults to expanded
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/Card';
import { MonacoTrackVisual } from './MonacoTrackVisual';
import { TeamStandings } from './TeamStandings';
import { TelemetryTab } from '@/types/dashboard';

export function TelemetryCard() {
  const [isExpanded, setIsExpanded] = useState(true);
  const [selectedTab, setSelectedTab] = useState<TelemetryTab>('speed');

  return (
    <Card delay={0.3}>
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between mb-3"
      >
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-[#00C39A] to-[#00B0A9] rounded-lg flex items-center justify-center shadow-lg shadow-[#00C39A]/20">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 text-white">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
            </svg>
          </div>
          <h3 className="text-base font-semibold text-white/90" style={{ fontFamily: 'Lexend, sans-serif' }}>
            Monaco GP Telemetry
          </h3>
        </div>
        <motion.span
          animate={{ rotate: isExpanded ? 180 : 0 }}
          className="text-[#00C39A]"
        >
          ▼
        </motion.span>
      </button>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
          >
            {/* Tab Navigation */}
            <div className="flex gap-2 mb-4">
              {(['speed', 'lapDelta', 'tireWear'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setSelectedTab(tab)}
                  className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all ${
                    selectedTab === tab
                      ? 'bg-gradient-to-r from-[#00C39A] to-[#00B0A9] text-white shadow-lg shadow-[#00C39A]/30'
                      : 'bg-[#0A0A0A] text-white/60 hover:bg-[#0A0A0A] hover:text-white/80 border border-[#00B0A9]/20'
                  }`}
                >
                  {tab === 'speed' && 'Speed'}
                  {tab === 'lapDelta' && 'Lap Delta'}
                  {tab === 'tireWear' && 'Tire Wear'}
                </button>
              ))}
            </div>

            <MonacoTrackVisual />
            <TeamStandings />
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  );
}

