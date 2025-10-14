/**
 * Fan Poll Card Component
 * Interactive poll with animated bar charts
 */

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/Card';
import { PollOption } from '@/types/dashboard';

interface FanPollCardProps {
  onVote: (message: string) => void;
}

export function FanPollCard({ onVote }: FanPollCardProps) {
  const [pollData, setPollData] = useState<PollOption[]>([
    { label: 'Yes', votes: 45 },
    { label: 'No', votes: 23 },
    { label: 'Maybe', votes: 32 },
  ]);
  const [hasVoted, setHasVoted] = useState(false);

  const totalVotes = pollData.reduce((sum, option) => sum + option.votes, 0);

  const handleVote = (index: number) => {
    if (hasVoted) return;
    
    setPollData(prev => prev.map((option, i) => 
      i === index ? { ...option, votes: option.votes + 1 } : option
    ));
    setHasVoted(true);

    setTimeout(() => {
      onVote(`Thanks for voting! Monaco's tight streets make podiums tough, but Aston Martin has the pace!`);
    }, 500);
  };

  return (
    <Card delay={0.4}>
      <div className="flex items-center gap-2 mb-3">
        <div className="w-8 h-8 bg-gradient-to-br from-[#00C39A] to-[#00B0A9] rounded-lg flex items-center justify-center shadow-lg shadow-[#00C39A]/20">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 text-white">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6a7.5 7.5 0 107.5 7.5h-7.5V6z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 10.5H21A7.5 7.5 0 0013.5 3v7.5z" />
          </svg>
        </div>
        <h3 className="text-base font-semibold text-white/90" style={{ fontFamily: 'Lexend, sans-serif' }}>
          Fan Poll
        </h3>
      </div>

      <p className="text-sm text-white/80 mb-3" style={{ fontFamily: 'Inter, sans-serif' }}>
        Will Aston Martin finish on podium this weekend?
      </p>

      <div className="space-y-2">
        {pollData.map((option, index) => {
          const percentage = totalVotes > 0 ? (option.votes / totalVotes) * 100 : 0;
          return (
            <button
              key={option.label}
              onClick={() => handleVote(index)}
              disabled={hasVoted}
              className="w-full relative"
            >
              <div className="relative overflow-hidden rounded-lg border border-[#00B0A9]/20 p-2 bg-[#0A0A0A] hover:border-[#00C39A]/40 transition-colors">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${percentage}%` }}
                  transition={{ duration: 0.5 }}
                  className="absolute left-0 top-0 h-full bg-gradient-to-r from-[#00C39A]/30 to-[#00B0A9]/30"
                />
                <div className="relative flex justify-between items-center">
                  <span className="text-sm text-white/80 font-medium">{option.label}</span>
                  <span className="text-sm bg-gradient-to-r from-[#00C39A] to-[#00B0A9] bg-clip-text text-transparent font-semibold">
                    {percentage.toFixed(1)}%
                  </span>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </Card>
  );
}

