/**
 * Ai.lonso Dashboard Main Component
 * 
 * Architecture Overview:
 * - Modular component structure organized by feature domain
 * - Separated concerns: UI, data, hooks, and types
 * - Clean state management using custom hooks
 * - Reusable Card component for consistent styling
 * - Premium F1 design system with glassmorphic effects
 * 
 * Organization:
 * /components/dashboard - Layout components (Header, Footer)
 * /components/fan-activity - Fan engagement tracking
 * /components/telemetry - Race data and standings
 * /components/interactive - Trivia, polls, rewards
 * /components/chatbot - AI assistant interface
 * /components/ui - Reusable UI primitives
 * /hooks - Custom React hooks for state
 * /types - TypeScript definitions
 * /data - Constants and mock data
 */

'use client';

import Image from 'next/image';
import { useChat } from '@/hooks/useChat';
import { Header } from './Header';
import { Footer } from './Footer';
import { FanActivityCard } from '@/components/fan-activity/FanActivityCard';
import { TelemetryCard } from '@/components/telemetry/TelemetryCard';
import { TriviaCard } from '@/components/interactive/TriviaCard';
import { FanPollCard } from '@/components/interactive/FanPollCard';
import { RewardProgressCard } from '@/components/interactive/RewardProgressCard';
import { ChatbotPanel } from '@/components/chatbot/ChatbotPanel';

export default function AilonsoDashboard() {
  const { addBotMessage } = useChat();

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
      
      {/* F1 Car Overlay - Top Left */}
      <div className="absolute top-0 left-0 w-[800px] h-[600px] opacity-25 pointer-events-none overflow-hidden">
        <Image
          src="/2025astonmartincarright.avif"
          alt="Aston Martin F1 Car"
          width={800}
          height={600}
          className="object-contain blur-[15px] scale-110"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#00C39A]/10 via-transparent to-transparent" />
      </div>

      <div className="max-w-[1400px] mx-auto px-6 py-3 relative z-10">
        <Header />

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3">
          {/* Left Column - Fan Activity & Telemetry */}
          <div className="lg:col-span-4 space-y-3">
            <FanActivityCard />
            <TelemetryCard />
          </div>

          {/* Center Column - Interactive Cards */}
          <div className="lg:col-span-5 space-y-3">
            <TriviaCard onAnswer={addBotMessage} />
            <FanPollCard onVote={addBotMessage} />
            <RewardProgressCard />
          </div>

          {/* Right Column - Chatbot */}
          <ChatbotPanel addBotMessage={addBotMessage} />
        </div>

        <Footer />
      </div>
    </div>
  );
}

