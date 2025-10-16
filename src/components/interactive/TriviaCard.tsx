/**
 * Trivia Challenge Card Component
 * Interactive quiz with Monaco GP themed questions
 */

import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { TRIVIA, TRIVIA_QUESTIONS } from '@/data/constants';

interface TriviaCardProps {
  onAnswer: (message: string) => void;
}

export function TriviaCard({ onAnswer }: TriviaCardProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(() => {
    if (Array.isArray(TRIVIA_QUESTIONS) && TRIVIA_QUESTIONS.length > 0) {
      const index = Math.floor(Math.random() * TRIVIA_QUESTIONS.length);
      return TRIVIA_QUESTIONS[index];
    }
    // Fallback to legacy single-question shape
    return {
      question: TRIVIA.question,
      options: TRIVIA.options,
      correctAnswer: TRIVIA.correctAnswer,
      correctMessage:
        'Correct! Fernando won Monaco in 2006 and 2007 with Renault. Those were legendary victories!',
      incorrectMessage:
        'Not quite! Fernando actually won Monaco 2 times - in 2006 and 2007 with Renault. Incredible Monaco performances!',
    } as {
      question: string;
      options: string[];
      correctAnswer: string;
      correctMessage: string;
      incorrectMessage: string;
    };
  });

  const handleAnswer = (answer: string) => {
    if (showResult) return;
    
    setSelectedAnswer(answer);
    setShowResult(true);
    
    setTimeout(() => {
      const message = answer === currentQuestion.correctAnswer
        ? currentQuestion.correctMessage
        : currentQuestion.incorrectMessage;
      
      onAnswer(message);
    }, 500);

    // After showing result, wait 2 seconds and then load a new random question
    setTimeout(() => {
      if (Array.isArray(TRIVIA_QUESTIONS) && TRIVIA_QUESTIONS.length > 0) {
        let nextIndex = Math.floor(Math.random() * TRIVIA_QUESTIONS.length);
        // Try to avoid repeating the same question consecutively
        if (TRIVIA_QUESTIONS[nextIndex].question === currentQuestion.question && TRIVIA_QUESTIONS.length > 1) {
          nextIndex = (nextIndex + 1) % TRIVIA_QUESTIONS.length;
        }
        setCurrentQuestion(TRIVIA_QUESTIONS[nextIndex]);
      }
      setSelectedAnswer(null);
      setShowResult(false);
    }, 2500); // 500ms feedback delay + 2000ms wait
  };

  return (
    <Card delay={0.4}>
      <div className="flex items-center gap-2 mb-3">
        <div className="w-8 h-8 bg-gradient-to-br from-[#00C39A] to-[#00B0A9] rounded-lg flex items-center justify-center shadow-lg shadow-[#00C39A]/20">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 text-white">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
          </svg>
        </div>
        <h3 className="text-base font-semibold text-white/90" style={{ fontFamily: 'Lexend, sans-serif' }}>
          Trivia Challenge
        </h3>
      </div>

      <p className="text-sm text-white/80 mb-3" style={{ fontFamily: 'Inter, sans-serif' }}>
        {currentQuestion.question}
      </p>

      <div className="space-y-2">
        {currentQuestion.options.map((option) => (
          <button
            key={option}
            onClick={() => handleAnswer(option)}
            disabled={showResult}
            className={`w-full py-2 px-3 rounded-lg text-sm font-medium transition-all ${
              showResult && option === currentQuestion.correctAnswer
                ? 'bg-green-600 text-white border-2 border-green-400 shadow-lg shadow-green-600/30'
                : showResult && option === selectedAnswer && option !== currentQuestion.correctAnswer
                ? 'bg-red-600 text-white border-2 border-red-400 shadow-lg shadow-red-600/30'
                : selectedAnswer === option
                ? 'bg-gradient-to-r from-[#00C39A] to-[#00B0A9] text-white shadow-lg shadow-[#00C39A]/30'
                : 'bg-[#0A0A0A] text-white/80 hover:bg-[#0A0A0A] hover:text-white border border-[#00B0A9]/20 hover:border-[#00C39A]/40 hover:shadow-[0_0_15px_rgba(0,195,154,0.1)]'
            }`}
          >
            {option}
          </button>
        ))}
      </div>
    </Card>
  );
}

