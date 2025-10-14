/**
 * Team Standings Component
 * Displays Constructor Championship standings with Aston Martin highlighted
 */

import { TEAM_STANDINGS } from '@/data/constants';

export function TeamStandings() {
  return (
    <div className="mt-3 pt-3 border-t border-[#00B0A9]/10">
      <div className="text-[10px] text-[#00C39A] font-semibold mb-2">Constructor Standings</div>
      <div className="space-y-1.5">
        {TEAM_STANDINGS.map((team) => (
          <div
            key={team.team}
            className={`flex justify-between items-center text-[9px] rounded p-1.5 ${
              team.isHighlighted
                ? 'bg-[#0A0A0A] border border-[#00C39A]/30'
                : 'bg-[#050505] border border-[#00B0A9]/10'
            }`}
          >
            <span className={team.isHighlighted ? 'text-[#00C39A] font-semibold' : 'text-white/70'}>
              {team.position}. {team.team}
            </span>
            <span className={team.isHighlighted ? 'text-[#00C39A] font-bold' : 'text-[#00E0FF] font-semibold'}>
              {team.points} pts
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

