/**
 * Driver Stats Card Component
 * Displays Fernando Alonso's Monaco GP statistics
 */

import Image from 'next/image';
import { MONACO_GP } from '@/data/constants';

export function DriverStatsCard() {
  return (
    <div className="flex flex-col items-center mb-4 relative z-20">
      {/* F1 Car with glowing border */}
      <div className="relative">
        <div className="absolute -inset-2 bg-gradient-to-r from-[#00C39A] via-[#00B0A9] to-[#00C39A] rounded-2xl opacity-30 blur-lg" />
        <div className="absolute -inset-1 border-2 border-[#00C39A]/40 rounded-2xl" />
        <div className="relative bg-gradient-to-br from-[#0A0A0A] to-[#050505] rounded-2xl p-3 border border-[#00B0A9]/60">
          <Image
            src="/2025astonmartincarright.avif"
            alt="Aston Martin F1 Car"
            width={250}
            height={150}
            className="object-contain opacity-95"
          />
          <div className="absolute top-1 right-1 bg-[#00C39A] text-white text-[8px] font-bold px-2 py-1 rounded-md">
            MONACO '25
          </div>
        </div>
      </div>
      
      {/* Driver Stats */}
      <div className="w-full mt-3 bg-[#0A0A0A] border border-[#00B0A9]/20 rounded-xl p-3">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-6 h-6 bg-gradient-to-br from-[#00C39A] to-[#00B0A9] rounded-full flex items-center justify-center text-xs font-bold">
            {MONACO_GP.alonso.number}
          </div>
          <div>
            <div className="text-white text-xs font-bold">Fernando Alonso</div>
            <div className="text-[#00C39A] text-[9px]">Aston Martin Aramco</div>
          </div>
        </div>
        
        {/* Monaco Stats Grid */}
        <div className="grid grid-cols-3 gap-1.5 text-[9px]">
          <div className="bg-[#050505] border border-[#00B0A9]/10 rounded p-1.5 text-center">
            <div className="text-[#00C39A] font-semibold">Best Finish</div>
            <div className="text-white/80">1st (×{MONACO_GP.alonso.monacoWins})</div>
          </div>
          <div className="bg-[#050505] border border-[#00B0A9]/10 rounded p-1.5 text-center">
            <div className="text-[#00C39A] font-semibold">Pole Pos.</div>
            <div className="text-white/80">2006</div>
          </div>
          <div className="bg-[#050505] border border-[#00B0A9]/10 rounded p-1.5 text-center">
            <div className="text-[#00C39A] font-semibold">Podiums</div>
            <div className="text-white/80">{MONACO_GP.alonso.monacoPodiums}</div>
          </div>
        </div>
        
        {/* 2025 Qualifying Result */}
        <div className="mt-2 pt-2 border-t border-[#00B0A9]/10">
          <div className="flex justify-between items-center text-[9px]">
            <span className="text-white/60">Qualifying 2025</span>
            <span className="text-[#00E0FF] font-bold">
              P{MONACO_GP.alonso.qualifyingPosition} • {MONACO_GP.alonso.qualifyingTime}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

