/**
 * Chatbot Panel Component
 * Voice-enabled chat interface with Ai.lonso
 */

import { motion } from 'framer-motion';
import { ChatMessage } from './ChatMessage';
import { DriverStatsCard } from './DriverStatsCard';
import { useChat } from '@/hooks/useChat';

interface ChatbotPanelProps {
  addBotMessage: (message: string) => void;
}

export function ChatbotPanel({ addBotMessage }: ChatbotPanelProps) {
  const { messages, input, setInput, isTyping, sendMessage } = useChat();

  const handleSend = () => {
    if (!input.trim()) return;
    sendMessage(input);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.5 }}
      className="lg:col-span-3"
    >
      <DriverStatsCard />
      
      <div className="relative group h-[350px]">
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
                <h3 className="text-sm font-semibold text-white/90" style={{ fontFamily: 'Lexend, sans-serif' }}>
                  Ai.lonso
                </h3>
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
            {messages.map((msg) => (
              <ChatMessage key={msg.id} message={msg} />
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
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask Ai.lonso anything…"
              className="flex-1 bg-[#0A0A0A] border border-[#00B0A9]/20 rounded-lg px-3 py-1.5 text-xs text-white/90 placeholder-white/40 focus:outline-none focus:border-[#00C39A] focus:shadow-[0_0_15px_rgba(0,195,154,0.2)] transition-all"
              style={{ fontFamily: 'Inter, sans-serif' }}
            />
            <button
              onClick={handleSend}
              className="relative bg-gradient-to-r from-[#00C39A] to-[#00B0A9] hover:from-[#00C39A]/80 hover:to-[#00B0A9]/80 text-white px-3 py-1.5 rounded-lg text-xs font-medium transition-all shadow-lg shadow-[#00C39A]/30 hover:shadow-[#00C39A]/50"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

