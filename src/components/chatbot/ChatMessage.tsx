/**
 * Chat Message Component
 * Displays individual chat messages with styling based on sender
 */

import { motion } from 'framer-motion';
import { ChatMessage as ChatMessageType } from '@/types/dashboard';

interface ChatMessageProps {
  message: ChatMessageType;
}

export function ChatMessage({ message }: ChatMessageProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
    >
      <div
        className={`max-w-[80%] p-2 rounded-lg ${
          message.sender === 'user'
            ? 'bg-gradient-to-r from-[#00C39A] to-[#00B0A9] text-white shadow-lg shadow-[#00C39A]/20'
            : 'bg-[#0A0A0A] text-white/90 border border-[#00B0A9]/20'
        }`}
      >
        <p className="text-xs" style={{ fontFamily: 'Inter, sans-serif' }}>
          {message.message}
        </p>
      </div>
    </motion.div>
  );
}

