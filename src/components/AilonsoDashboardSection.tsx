'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar, Cell } from 'recharts';
import Image from 'next/image';

// Types
interface FanActivity {
  id: string;
  name: string;
  points: number;
  action?: string;
  timestamp: number;
}

interface ChatMessage {
  id: string;
  sender: 'user' | 'ailonso';
  message: string;
  timestamp: number;
}

interface TelemetryData {
  time: string;
  speed: number;
  lapDelta: number;
  tireWear: number;
}

interface PollOption {
  label: string;
  votes: number;
}

export default function AilonsoDashboardSection() {
  // State Management
  const [fanActivities, setFanActivities] = useState<FanActivity[]>([
    { id: '1', name: 'Maria', points: 19, timestamp: Date.now() },
    { id: '2', name: 'Jaime Lopez', points: 25, timestamp: Date.now() },
    { id: '3', name: 'Emma', action: 'unlocked Speedster Tier', points: 0, timestamp: Date.now() },
  ]);

  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    { id: '1', sender: 'ailonso', message: 'Monaco GP weekend is coming! Ready to dive into the street circuit magic?', timestamp: Date.now() },
  ]);

  const [chatInput, setChatInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [selectedTriviaAnswer, setSelectedTriviaAnswer] = useState<string | null>(null);
  const [showTriviaResult, setShowTriviaResult] = useState(false);
  const [telemetryTab, setTelemetryTab] = useState<'speed' | 'lapDelta' | 'tireWear'>('speed');
  const [telemetryExpanded, setTelemetryExpanded] = useState(true);
  const [fanActivityExpanded, setFanActivityExpanded] = useState(true);
  
  const [pollData, setPollData] = useState<PollOption[]>([
    { label: 'Yes', votes: 45 },
    { label: 'No', votes: 23 },
    { label: 'Maybe', votes: 32 },
  ]);
  const [hasVoted, setHasVoted] = useState(false);

  // Telemetry mock data
  const telemetryData: TelemetryData[] = [
    { time: '0s', speed: 280, lapDelta: 0, tireWear: 10 },
    { time: '5s', speed: 295, lapDelta: -0.2, tireWear: 15 },
    { time: '10s', speed: 310, lapDelta: -0.5, tireWear: 22 },
    { time: '15s', speed: 305, lapDelta: -0.3, tireWear: 28 },
    { time: '20s', speed: 318, lapDelta: -0.7, tireWear: 35 },
    { time: '25s', speed: 300, lapDelta: -0.4, tireWear: 40 },
  ];

  // Trivia data - Monaco GP themed
  const triviaQuestion = "How many times has Fernando Alonso won the Monaco GP?";
  const triviaOptions = ['1 time', '2 times', 'Never won'];
  const correctAnswer = '2 times';

  // Auto-update fan activity every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      const names = ['Alex', 'Sarah', 'Carlos', 'Hannah', 'Luis', 'Mia'];
      const actions = ['earned', 'commented', 'shared', 'voted'];
      const randomName = names[Math.floor(Math.random() * names.length)];
      const randomPoints = Math.floor(Math.random() * 30) + 5;
      
      setFanActivities(prev => [
        { 
          id: Date.now().toString(), 
          name: randomName, 
          points: randomPoints, 
          timestamp: Date.now() 
        },
        ...prev.slice(0, 9)
      ]);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  // Handle trivia answer
  const handleTriviaAnswer = (answer: string) => {
    setSelectedTriviaAnswer(answer);
    setShowTriviaResult(true);
    
    setTimeout(() => {
      setIsTyping(true);
      setTimeout(() => {
        const message = answer === correctAnswer
          ? `Correct! Fernando won Monaco in 2006 and 2007 with Renault. Those were legendary victories!`
          : `Not quite! Fernando actually won Monaco 2 times - in 2006 and 2007 with Renault. Incredible Monaco performances!`;
        
        setChatMessages(prev => [...prev, {
          id: Date.now().toString(),
          sender: 'ailonso',
          message,
          timestamp: Date.now()
        }]);
        setIsTyping(false);
      }, 1500);
    }, 500);
  };

  // Handle poll vote
  const handlePollVote = (index: number) => {
    if (hasVoted) return;
    
    setPollData(prev => prev.map((option, i) => 
      i === index ? { ...option, votes: option.votes + 1 } : option
    ));
    setHasVoted(true);

    setTimeout(() => {
      setIsTyping(true);
      setTimeout(() => {
        setChatMessages(prev => [...prev, {
          id: Date.now().toString(),
          sender: 'ailonso',
          message: `Thanks for voting! Monaco's tight streets make podiums tough, but Aston Martin has the pace!`,
          timestamp: Date.now()
        }]);
        setIsTyping(false);
      }, 1500);
    }, 500);
  };

  // Send chat message
  const handleSendMessage = () => {
    if (!chatInput.trim()) return;

    setChatMessages(prev => [...prev, {
      id: Date.now().toString(),
      sender: 'user',
      message: chatInput,
      timestamp: Date.now()
    }]);

    setChatInput('');
    setIsTyping(true);

    setTimeout(() => {
      setChatMessages(prev => [...prev, {
        id: Date.now().toString(),
        sender: 'ailonso',
        message: 'Great question! Monaco is Fernando\'s favorite circuit. With 260 corners and zero margin for error, it\'s where legends are made!',
        timestamp: Date.now()
      }]);
      setIsTyping(false);
    }, 2000);
  };

  // Calculate total poll votes
  const totalVotes = pollData.reduce((sum, option) => sum + option.votes, 0);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#000000] to-[#050505] text-white relative overflow-hidden">
      {/* Carbon Fiber Texture / Hex Grid Overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
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
        {/* Header Section */}
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

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3">
          {/* Left Column - Fan Activity & Telemetry */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-4 space-y-3"
          >
            {/* Fan Activity Card */}
            <div className="relative group">
              {/* Garage Underlight Glow */}
              <div className="absolute -inset-[1px] bg-gradient-to-br from-[#00C39A]/20 to-[#00B0A9]/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm" />
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-3/4 h-1 bg-gradient-to-r from-transparent via-[#00C39A]/30 to-transparent blur-md" />
              
              <div className="relative bg-[#0A0A0A] border border-[#00B0A9]/20 rounded-xl p-3 backdrop-blur-sm">
                <div className="absolute inset-[1px] border border-[#00B0A9]/5 rounded-xl pointer-events-none" />
                
                <button
                  onClick={() => setFanActivityExpanded(!fanActivityExpanded)}
                  className="w-full flex items-center justify-between mb-2"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-gradient-to-br from-[#00C39A] to-[#00B0A9] rounded-lg flex items-center justify-center shadow-lg shadow-[#00C39A]/20">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 text-white">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                      </svg>
                    </div>
                    <h3 className="text-base font-semibold text-white/90" style={{ fontFamily: 'Lexend, sans-serif' }}>Fan Activity</h3>
                  </div>
                  <motion.span
                    animate={{ rotate: fanActivityExpanded ? 180 : 0 }}
                    className="text-[#00C39A]"
                  >
                    ▼
                  </motion.span>
                </button>

              <AnimatePresence>
                {fanActivityExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="space-y-2 overflow-hidden"
                  >
                    {fanActivities.slice(0, 5).map((activity, index) => (
                      <motion.div
                        key={activity.id}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="flex items-center justify-between p-2 bg-[#0A0A0A] rounded-lg border border-[#00B0A9]/10 hover:border-[#00C39A]/30 transition-colors hover:shadow-[0_0_15px_rgba(0,195,154,0.1)]"
                      >
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 bg-gradient-to-br from-[#00C39A] to-[#00B0A9] rounded-full flex items-center justify-center text-[10px] font-bold">
                            {activity.name[0]}
                          </div>
                          <span className="text-white/80 text-xs" style={{ fontFamily: 'Inter, sans-serif' }}>{activity.name}</span>
                        </div>
                        {activity.action ? (
                          <span className="text-[#00C39A] text-[10px] font-medium">{activity.action}</span>
                        ) : (
                          <span className="text-[#00C39A] text-xs font-semibold">+{activity.points} pts</span>
                        )}
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
              </div>
            </div>

            {/* Live Telemetry Card */}
            <div className="relative group">
              {/* Garage Underlight Glow */}
              <div className="absolute -inset-[1px] bg-gradient-to-br from-[#00C39A]/20 to-[#00B0A9]/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm" />
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-3/4 h-1 bg-gradient-to-r from-transparent via-[#00C39A]/30 to-transparent blur-md" />
              
              <div className="relative bg-[#0A0A0A] border border-[#00B0A9]/20 rounded-xl p-4 backdrop-blur-sm">
                <div className="absolute inset-[1px] border border-[#00B0A9]/5 rounded-xl pointer-events-none" />
                
                <button
                  onClick={() => setTelemetryExpanded(!telemetryExpanded)}
                  className="w-full flex items-center justify-between mb-3"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-gradient-to-br from-[#00C39A] to-[#00B0A9] rounded-lg flex items-center justify-center shadow-lg shadow-[#00C39A]/20">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 text-white">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
                      </svg>
                    </div>
                    <h3 className="text-base font-semibold text-white/90" style={{ fontFamily: 'Lexend, sans-serif' }}>Monaco GP Telemetry</h3>
                  </div>
                  <motion.span
                    animate={{ rotate: telemetryExpanded ? 180 : 0 }}
                    className="text-[#00C39A]"
                  >
                    ▼
                  </motion.span>
                </button>

              <AnimatePresence>
                {telemetryExpanded && (
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
                          onClick={() => setTelemetryTab(tab)}
                          className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all ${
                            telemetryTab === tab
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

                    {/* Monaco Grand Prix Track Visual - Circuit de Monaco */}
                    <div className="h-32 relative bg-[#050505] rounded-lg border border-[#00B0A9]/10 p-3">
                      {/* Track Title */}
                      <div className="absolute top-2 left-2 z-10">
                        <span className="text-[10px] font-bold bg-gradient-to-r from-[#00C39A] to-[#00B0A9] bg-clip-text text-transparent">
                          CIRCUIT DE MONACO - LIVE
                        </span>
                      </div>
                      
                      {/* Monaco Track SVG Path - More accurate layout */}
                      <svg viewBox="0 0 200 100" className="w-full h-full">
                        {/* Track outline - Monaco Circuit accurate shape */}
                        <path
                          d="M 30 75 L 40 75 L 45 60 L 47 45 L 52 35 L 60 30 L 70 28 L 80 30 L 90 35 L 95 40 L 100 45 L 110 45 L 120 42 L 128 38 L 135 32 L 140 28 L 145 30 L 150 35 L 153 42 L 155 50 L 157 60 L 155 68 L 150 75 L 142 78 L 130 78 L 120 76 L 110 72 L 100 70 L 90 72 L 80 76 L 70 78 L 60 78 L 50 78 L 40 78 L 32 76 L 30 75"
                          fill="none"
                          stroke="#00B0A9"
                          strokeWidth="1"
                          opacity="0.3"
                        />
                        
                        {/* Racing line */}
                        <motion.path
                          d="M 30 75 L 40 75 L 45 60 L 47 45 L 52 35 L 60 30 L 70 28 L 80 30 L 90 35 L 95 40 L 100 45 L 110 45 L 120 42 L 128 38 L 135 32 L 140 28 L 145 30 L 150 35 L 153 42 L 155 50 L 157 60 L 155 68 L 150 75 L 142 78 L 130 78 L 120 76 L 110 72 L 100 70 L 90 72 L 80 76 L 70 78 L 60 78 L 50 78 L 40 78 L 32 76 L 30 75"
                          fill="none"
                          stroke="#00E0FF"
                          strokeWidth="2"
                          strokeDasharray="250"
                          initial={{ strokeDashoffset: 250 }}
                          animate={{ strokeDashoffset: 0 }}
                          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                        />
                        
                        {/* Car position marker */}
                        <motion.circle
                          cx="0"
                          cy="0"
                          r="3"
                          fill="#00C39A"
                          initial={{ offsetDistance: "0%" }}
                          animate={{ offsetDistance: "100%" }}
                          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                        >
                          <animateMotion
                            dur="4s"
                            repeatCount="indefinite"
                            path="M 30 75 L 40 75 L 45 60 L 47 45 L 52 35 L 60 30 L 70 28 L 80 30 L 90 35 L 95 40 L 100 45 L 110 45 L 120 42 L 128 38 L 135 32 L 140 28 L 145 30 L 150 35 L 153 42 L 155 50 L 157 60 L 155 68 L 150 75 L 142 78 L 130 78 L 120 76 L 110 72 L 100 70 L 90 72 L 80 76 L 70 78 L 60 78 L 50 78 L 40 78 L 32 76 L 30 75"
                          />
                        </motion.circle>
                        
                        {/* Key corner markers */}
                        <circle cx="47" cy="45" r="2" fill="#00C39A" opacity="0.5" />
                        <circle cx="140" cy="28" r="2" fill="#00C39A" opacity="0.5" />
                        <circle cx="157" cy="60" r="2" fill="#00C39A" opacity="0.5" />
                        
                        {/* Corner names - Famous Monaco corners */}
                        <text x="47" y="38" fontSize="6" fill="#00B0A9" opacity="0.6">Ste Devote</text>
                        <text x="132" y="24" fontSize="6" fill="#00B0A9" opacity="0.6">Casino</text>
                        <text x="147" y="84" fontSize="6" fill="#00B0A9" opacity="0.6">Rascasse</text>
                      </svg>
                      
                      {/* Live stats overlay */}
                      <div className="absolute bottom-2 left-2 right-2 flex justify-between text-[8px]">
                        <div className="bg-[#0A0A0A]/80 px-2 py-1 rounded border border-[#00B0A9]/20">
                          <span className="text-[#00E0FF]">Speed: 298 km/h</span>
                        </div>
                        <div className="bg-[#0A0A0A]/80 px-2 py-1 rounded border border-[#00B0A9]/20">
                          <span className="text-[#00C39A]">Lap: 47/78</span>
                        </div>
                        <div className="bg-[#0A0A0A]/80 px-2 py-1 rounded border border-[#00B0A9]/20">
                          <span className="text-white/70">P6 • Gap: +12.3s</span>
                        </div>
                      </div>
                      
                      {/* Weather & Track Info */}
                      <div className="absolute top-12 right-2 text-[8px] bg-[#0A0A0A]/80 px-2 py-1 rounded border border-[#00B0A9]/20">
                        <div className="text-white/60">24°C Air • 38°C Track</div>
                      </div>
                    </div>
                    
                    {/* Team Positions */}
                    <div className="mt-3 pt-3 border-t border-[#00B0A9]/10">
                      <div className="text-[10px] text-[#00C39A] font-semibold mb-2">Constructor Standings</div>
                      <div className="space-y-1.5">
                        <div className="flex justify-between items-center text-[9px] bg-[#050505] border border-[#00B0A9]/10 rounded p-1.5">
                          <span className="text-white/70">1. Red Bull Racing</span>
                          <span className="text-[#00E0FF] font-semibold">354 pts</span>
                        </div>
                        <div className="flex justify-between items-center text-[9px] bg-[#050505] border border-[#00B0A9]/10 rounded p-1.5">
                          <span className="text-white/70">2. Ferrari</span>
                          <span className="text-[#00E0FF] font-semibold">312 pts</span>
                        </div>
                        <div className="flex justify-between items-center text-[9px] bg-[#050505] border border-[#00B0A9]/10 rounded p-1.5">
                          <span className="text-white/70">3. McLaren</span>
                          <span className="text-[#00E0FF] font-semibold">287 pts</span>
                        </div>
                        <div className="flex justify-between items-center text-[9px] bg-[#050505] border border-[#00B0A9]/10 rounded p-1.5">
                          <span className="text-white/70">4. Mercedes</span>
                          <span className="text-[#00E0FF] font-semibold">201 pts</span>
                        </div>
                        <div className="flex justify-between items-center text-[9px] bg-[#0A0A0A] border border-[#00C39A]/30 rounded p-1.5">
                          <span className="text-[#00C39A] font-semibold">5. Aston Martin</span>
                          <span className="text-[#00C39A] font-bold">98 pts</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              </div>
            </div>
          </motion.div>

          {/* Center Column - Interactive Cards */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-5 space-y-3"
          >
            {/* Trivia Challenge Card */}
            <div className="relative group">
              {/* Garage Underlight Glow */}
              <div className="absolute -inset-[1px] bg-gradient-to-br from-[#00C39A]/20 to-[#00B0A9]/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm" />
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-3/4 h-1 bg-gradient-to-r from-transparent via-[#00C39A]/30 to-transparent blur-md" />
              
              <div className="relative bg-[#0A0A0A] border border-[#00B0A9]/20 rounded-xl p-4 backdrop-blur-sm">
                <div className="absolute inset-[1px] border border-[#00B0A9]/5 rounded-xl pointer-events-none" />
                
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-[#00C39A] to-[#00B0A9] rounded-lg flex items-center justify-center shadow-lg shadow-[#00C39A]/20">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 text-white">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
                    </svg>
                  </div>
                  <h3 className="text-base font-semibold text-white/90" style={{ fontFamily: 'Lexend, sans-serif' }}>Trivia Challenge</h3>
                </div>

                <p className="text-sm text-white/80 mb-3" style={{ fontFamily: 'Inter, sans-serif' }}>{triviaQuestion}</p>

                <div className="space-y-2">
                  {triviaOptions.map((option) => (
                    <button
                      key={option}
                      onClick={() => !showTriviaResult && handleTriviaAnswer(option)}
                      disabled={showTriviaResult}
                      className={`w-full py-2 px-3 rounded-lg text-sm font-medium transition-all ${
                        showTriviaResult && option === correctAnswer
                          ? 'bg-green-600 text-white border-2 border-green-400 shadow-lg shadow-green-600/30'
                          : showTriviaResult && option === selectedTriviaAnswer && option !== correctAnswer
                          ? 'bg-red-600 text-white border-2 border-red-400 shadow-lg shadow-red-600/30'
                          : selectedTriviaAnswer === option
                          ? 'bg-gradient-to-r from-[#00C39A] to-[#00B0A9] text-white shadow-lg shadow-[#00C39A]/30'
                          : 'bg-[#0A0A0A] text-white/80 hover:bg-[#0A0A0A] hover:text-white border border-[#00B0A9]/20 hover:border-[#00C39A]/40 hover:shadow-[0_0_15px_rgba(0,195,154,0.1)]'
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Fan Poll Card */}
            <div className="relative group">
              {/* Garage Underlight Glow */}
              <div className="absolute -inset-[1px] bg-gradient-to-br from-[#00C39A]/20 to-[#00B0A9]/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm" />
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-3/4 h-1 bg-gradient-to-r from-transparent via-[#00C39A]/30 to-transparent blur-md" />
              
              <div className="relative bg-[#0A0A0A] border border-[#00B0A9]/20 rounded-xl p-4 backdrop-blur-sm">
                <div className="absolute inset-[1px] border border-[#00B0A9]/5 rounded-xl pointer-events-none" />
                
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-[#00C39A] to-[#00B0A9] rounded-lg flex items-center justify-center shadow-lg shadow-[#00C39A]/20">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 text-white">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6a7.5 7.5 0 107.5 7.5h-7.5V6z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 10.5H21A7.5 7.5 0 0013.5 3v7.5z" />
                    </svg>
                  </div>
                  <h3 className="text-base font-semibold text-white/90" style={{ fontFamily: 'Lexend, sans-serif' }}>Fan Poll</h3>
                </div>

                <p className="text-sm text-white/80 mb-3" style={{ fontFamily: 'Inter, sans-serif' }}>Will Aston Martin finish on podium this weekend?</p>

                <div className="space-y-2">
                  {pollData.map((option, index) => {
                    const percentage = totalVotes > 0 ? (option.votes / totalVotes) * 100 : 0;
                    return (
                      <button
                        key={option.label}
                        onClick={() => handlePollVote(index)}
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
                            <span className="text-sm bg-gradient-to-r from-[#00C39A] to-[#00B0A9] bg-clip-text text-transparent font-semibold">{percentage.toFixed(1)}%</span>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Reward Progress Card */}
            <div className="relative group">
              {/* Garage Underlight Glow */}
              <div className="absolute -inset-[1px] bg-gradient-to-br from-[#00C39A]/20 to-[#00B0A9]/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm" />
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-3/4 h-1 bg-gradient-to-r from-transparent via-[#00C39A]/30 to-transparent blur-md" />
              
              <div className="relative bg-[#0A0A0A] border border-[#00B0A9]/20 rounded-xl p-4 backdrop-blur-sm">
                <div className="absolute inset-[1px] border border-[#00B0A9]/5 rounded-xl pointer-events-none" />
                
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-[#00C39A] to-[#00B0A9] rounded-lg flex items-center justify-center shadow-lg shadow-[#00C39A]/20">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 text-white">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 01-.982-3.172M9.497 14.25a7.454 7.454 0 00.981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 007.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 002.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 012.916.52 6.003 6.003 0 01-5.395 4.972m0 0a6.726 6.726 0 01-2.749 1.35m0 0a6.772 6.772 0 01-3.044 0" />
                    </svg>
                  </div>
                  <h3 className="text-base font-semibold text-white/90" style={{ fontFamily: 'Lexend, sans-serif' }}>Reward Progress</h3>
                </div>

                <div className="mb-2">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm text-white/80 font-medium" style={{ fontFamily: 'Inter, sans-serif' }}>Speedster Tier</span>
                    <span className="text-sm bg-gradient-to-r from-[#00C39A] to-[#00B0A9] bg-clip-text text-transparent font-bold">65%</span>
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
              </div>
            </div>
          </motion.div>

          {/* Right Column - Ai.lonso Chatbot */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="lg:col-span-3"
          >
            {/* F1 Car with border */}
            <div className="flex flex-col items-center mb-4 relative z-20">
              <div className="relative">
                {/* Glowing border effect */}
                <div className="absolute -inset-2 bg-gradient-to-r from-[#00C39A] via-[#00B0A9] to-[#00C39A] rounded-2xl opacity-30 blur-lg"></div>
                <div className="absolute -inset-1 border-2 border-[#00C39A]/40 rounded-2xl"></div>
                <div className="relative bg-gradient-to-br from-[#0A0A0A] to-[#050505] rounded-2xl p-3 border border-[#00B0A9]/60">
                  <Image
                    src="/2025astonmartincarright.avif"
                    alt="Aston Martin F1 Car"
                    width={250}
                    height={150}
                    className="object-contain opacity-95"
                  />
                  {/* Monaco GP Badge */}
                  <div className="absolute top-1 right-1 bg-[#00C39A] text-white text-[8px] font-bold px-2 py-1 rounded-md">
                    MONACO '25
                  </div>
                </div>
              </div>
              
              {/* Driver Stats - Monaco GP */}
              <div className="w-full mt-3 bg-[#0A0A0A] border border-[#00B0A9]/20 rounded-xl p-3">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-6 h-6 bg-gradient-to-br from-[#00C39A] to-[#00B0A9] rounded-full flex items-center justify-center text-xs font-bold">
                    14
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
                    <div className="text-white/80">1st (×2)</div>
                  </div>
                  <div className="bg-[#050505] border border-[#00B0A9]/10 rounded p-1.5 text-center">
                    <div className="text-[#00C39A] font-semibold">Pole Pos.</div>
                    <div className="text-white/80">2006</div>
                  </div>
                  <div className="bg-[#050505] border border-[#00B0A9]/10 rounded p-1.5 text-center">
                    <div className="text-[#00C39A] font-semibold">Podiums</div>
                    <div className="text-white/80">4</div>
                  </div>
                </div>
                
                {/* 2025 Qualifying Result */}
                <div className="mt-2 pt-2 border-t border-[#00B0A9]/10">
                  <div className="flex justify-between items-center text-[9px]">
                    <span className="text-white/60">Qualifying 2025</span>
                    <span className="text-[#00E0FF] font-bold">P7 • 1:11.432</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="relative group h-[350px]">
              {/* Garage Underlight Glow */}
              <div className="absolute -inset-[1px] bg-gradient-to-br from-[#00C39A]/20 to-[#00B0A9]/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm" />
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-3/4 h-1 bg-gradient-to-r from-transparent via-[#00C39A]/30 to-transparent blur-md" />
              
              <div className="relative bg-[#0A0A0A] border border-[#00B0A9]/20 rounded-xl p-4 backdrop-blur-sm h-full flex flex-col">
                <div className="absolute inset-[1px] border border-[#00B0A9]/5 rounded-xl pointer-events-none" />
                
                {/* Chatbot Header */}
                <div className="flex items-center justify-between mb-3 pb-3 border-b border-[#00B0A9]/20 relative">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-gradient-to-br from-[#00C39A] to-[#00B0A9] rounded-full flex items-center justify-center shadow-lg shadow-[#00C39A]/20">
                      <span className="text-white font-bold text-sm">Ai</span>
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-white/90" style={{ fontFamily: 'Lexend, sans-serif' }}>Ai.lonso</h3>
                      <p className="text-[10px] text-[#00C39A]">● Voice Enabled</p>
                    </div>
                  </div>
                  {/* Mic Button */}
                  <button className="w-8 h-8 bg-gradient-to-br from-[#00C39A]/20 to-[#00B0A9]/20 border border-[#00C39A]/40 rounded-full flex items-center justify-center hover:bg-gradient-to-br hover:from-[#00C39A]/40 hover:to-[#00B0A9]/40 transition-all group">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 text-[#00C39A] group-hover:text-[#00E0FF]">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z" />
                    </svg>
                  </button>
                </div>

              {/* Chat Messages */}
              <div className="flex-1 overflow-y-auto space-y-2 mb-3 pr-2 relative">
                {chatMessages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] p-2 rounded-lg ${
                        msg.sender === 'user'
                          ? 'bg-gradient-to-r from-[#00C39A] to-[#00B0A9] text-white shadow-lg shadow-[#00C39A]/20'
                          : 'bg-[#0A0A0A] text-white/90 border border-[#00B0A9]/20'
                      }`}
                    >
                      <p className="text-xs" style={{ fontFamily: 'Inter, sans-serif' }}>{msg.message}</p>
                    </div>
                  </motion.div>
                ))}

                {/* Typing Indicator */}
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex gap-1 p-2 bg-[#0A0A0A] rounded-lg w-12 border border-[#00B0A9]/20"
                  >
                    <motion.div
                      animate={{ y: [0, -3, 0] }}
                      transition={{ repeat: Infinity, duration: 0.6, delay: 0 }}
                      className="w-1.5 h-1.5 bg-[#00C39A] rounded-full shadow-lg shadow-[#00C39A]/50"
                    />
                    <motion.div
                      animate={{ y: [0, -3, 0] }}
                      transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }}
                      className="w-1.5 h-1.5 bg-[#00C39A] rounded-full shadow-lg shadow-[#00C39A]/50"
                    />
                    <motion.div
                      animate={{ y: [0, -3, 0] }}
                      transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }}
                      className="w-1.5 h-1.5 bg-[#00C39A] rounded-full shadow-lg shadow-[#00C39A]/50"
                    />
                  </motion.div>
                )}
              </div>

              {/* Chat Input */}
              <div className="flex gap-2 relative">
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Ask Ai.lonso anything…"
                  className="flex-1 bg-[#0A0A0A] border border-[#00B0A9]/20 rounded-lg px-3 py-1.5 text-xs text-white/90 placeholder-white/40 focus:outline-none focus:border-[#00C39A] focus:shadow-[0_0_15px_rgba(0,195,154,0.2)] transition-all"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                />
                <button
                  onClick={handleSendMessage}
                  className="relative bg-gradient-to-r from-[#00C39A] to-[#00B0A9] hover:from-[#00C39A]/80 hover:to-[#00B0A9]/80 text-white px-3 py-1.5 rounded-lg text-xs font-medium transition-all shadow-lg shadow-[#00C39A]/30 hover:shadow-[#00C39A]/50"
                >
                  Send
                </button>
              </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Footer */}
        <motion.footer 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-3 text-center"
        >
          <p className="bg-gradient-to-r from-[#00C39A] to-[#00B0A9] bg-clip-text text-transparent italic text-sm font-medium" style={{ fontFamily: 'Inter, sans-serif' }}>
            Your digital pit wall — wherever you are.
          </p>
        </motion.footer>
      </div>
    </div>
  );
}

