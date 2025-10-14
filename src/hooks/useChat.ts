/**
 * Custom hook for managing chatbot state and interactions
 */

import { useState } from 'react';
import { ChatMessage } from '@/types/dashboard';

const INITIAL_MESSAGE: ChatMessage = {
  id: '1',
  sender: 'ailonso',
  message: 'Monaco GP weekend is coming! Ready to dive into the street circuit magic?',
  timestamp: Date.now(),
};

export function useChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([INITIAL_MESSAGE]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const sendMessage = (message: string) => {
    if (!message.trim()) return;

    setMessages(prev => [...prev, {
      id: Date.now().toString(),
      sender: 'user',
      message,
      timestamp: Date.now()
    }]);

    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        sender: 'ailonso',
        message: 'Great question! Monaco is Fernando\'s favorite circuit. With 260 corners and zero margin for error, it\'s where legends are made!',
        timestamp: Date.now()
      }]);
      setIsTyping(false);
    }, 2000);
  };

  const addBotMessage = (message: string) => {
    setIsTyping(true);
    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        sender: 'ailonso',
        message,
        timestamp: Date.now()
      }]);
      setIsTyping(false);
    }, 1500);
  };

  return {
    messages,
    input,
    setInput,
    isTyping,
    sendMessage,
    addBotMessage,
  };
}

