"use client";

import { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Header } from '@/components/dashboard/Header';
import { Footer } from '@/components/dashboard/Footer';
import { Card } from '@/components/ui/Card';

const PHOTOS = [
  '/photo1.jpg',
  '/photo2.jpg',
  '/photo3.jpg',
  '/photo4.jpg',
  '/photo5.jpg',
  '/photo6.jpg',
];

export default function GalleryPage() {
  const [index, setIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const total = PHOTOS.length;

  const goNext = () => setIndex((prev) => (prev + 1) % total);
  const goPrev = () => setIndex((prev) => (prev - 1 + total) % total);

  useEffect(() => {
    if (!isPlaying) return;
    const id = setInterval(goNext, 3500);
    return () => clearInterval(id);
  }, [isPlaying, total]);

  const currentSrcA = useMemo(() => PHOTOS[index], [index]);
  const currentSrcB = useMemo(() => PHOTOS[(index + 1) % total], [index, total]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#000000] to-[#050505] text-white relative overflow-hidden">
      {/* Carbon Fiber Texture / Hex Grid Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none" 
        style={{
          backgroundImage: `
            linear-gradient(30deg, #00B0A9 12%, transparent 12.5%, transparent 87%, #00B0A9 87.5%, #00B0A9),
            linear-gradient(150deg, #00B0A9 12%, transparent 12.5%, transparent 87%, #00B0A9 87.5%, #00B0A9),
            linear-gradient(30deg, #00B0A9 12%, transparent 12.5%, transparent 87%, #00B0A9 87.5%, #00B0A9),
            linear-gradient(150deg, #00B0A9 12%, transparent 12.5%, transparent 87%, #00B0A9 87.5%, #00B0A9)
          `,
          backgroundSize: '80px 140px',
          backgroundPosition: '0 0, 0 0, 40px 70px, 40px 70px'
        }}
      />

      <div className="max-w-[1400px] mx-auto px-6 py-3 relative z-10">
        <Header />

        <div className="flex items-center justify-between mb-3">
          <Link href="/" className="text-xs text-white/80 hover:text-white underline decoration-[#00C39A]/60">
            ← Back to Dashboard
          </Link>
          <div className="flex items-center gap-2 text-xs text-white/70">
            <button
              onClick={() => setIsPlaying((p) => !p)}
              className="px-3 py-1 rounded-full border border-[#00B0A9]/30 hover:border-[#00C39A]/50 bg-[#0A0A0A] hover:text-white"
            >
              {isPlaying ? 'Pause' : 'Play'}
            </button>
          </div>
        </div>

        <Card>
          <div className="flex flex-col items-center">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full">
              <div className="relative w-full aspect-[16/10] rounded-lg overflow-hidden bg-black/40">
                <Image
                  key={`a-${currentSrcA}`}
                  src={currentSrcA}
                  alt="Aston Martin F1 Car"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 700px"
                  className="object-cover transition-opacity duration-500"
                  priority
                />
              </div>
              <div className="relative w-full aspect-[16/10] rounded-lg overflow-hidden bg-black/40">
                <Image
                  key={`b-${currentSrcB}`}
                  src={currentSrcB}
                  alt="Aston Martin F1 Car"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 700px"
                  className="object-cover transition-opacity duration-500"
                />
              </div>
            </div>

            <div className="flex items-center justify-center gap-2 mt-3">
              <button
                onClick={goPrev}
                className="px-3 py-1 rounded-lg text-sm bg-[#0A0A0A] text-white/80 hover:text-white border border-[#00B0A9]/20 hover:border-[#00C39A]/40"
              >
                Prev
              </button>
              <div className="flex items-center gap-1">
                {PHOTOS.map((_, i) => (
                  <span
                    key={i}
                    className={`h-1.5 w-4 rounded-full transition-colors ${i === index || i === (index + 1) % total ? 'bg-[#00C39A]' : 'bg-white/20'}`}
                  />
                ))}
              </div>
              <button
                onClick={goNext}
                className="px-3 py-1 rounded-lg text-sm bg-[#0A0A0A] text-white/80 hover:text-white border border-[#00B0A9]/20 hover:border-[#00C39A]/40"
              >
                Next
              </button>
            </div>
          </div>
        </Card>

        <Footer />
      </div>
    </div>
  );
}


