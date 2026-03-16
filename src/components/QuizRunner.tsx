'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { QUESTIONS } from '@/lib/config';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';

export default function QuizRunner() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const router = useRouter();

  const handleAnswer = (optionId: string) => {
    const currentQuestion = QUESTIONS[currentIndex];
    const newAnswers = { ...answers, [currentQuestion.id]: optionId };
    setAnswers(newAnswers);

    setTimeout(() => {
      if (currentIndex < QUESTIONS.length - 1) {
        setCurrentIndex((prev) => prev + 1);
      } else {
        finishQuiz(newAnswers);
      }
    }, 180);
  };

  const finishQuiz = (finalAnswers: Record<string, string>) => {
    const params = new URLSearchParams();
    Object.entries(finalAnswers).forEach(([questionId, optionId]) => {
      params.append(questionId, optionId);
    });

    router.push(`/results?${params.toString()}`);
  };

  const currentQuestion = QUESTIONS[currentIndex];
  const progress = ((currentIndex + 1) / QUESTIONS.length) * 100;

  return (
    <div className="w-full max-w-3xl mx-auto px-4">
      <div className="mb-8 flex items-center justify-center">
        <div className="w-full max-w-[80%] h-[6px] bg-[#d4c5a3]/50 rounded-full overflow-hidden shadow-inner border border-[#bba078]/30">
          <motion.div
            className="h-full bg-[#8b6c45] rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
          />
        </div>
      </div>

      <div className="relative min-h-[440px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.28, ease: 'easeOut' }}
            className="w-full"
          >
            <div className="p-4 md:p-8 mb-8 relative">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-[1px] bg-gradient-to-r from-transparent via-[#8b6c45] to-transparent opacity-60"></div>
              <p className="text-xs md:text-sm uppercase tracking-[0.2em] text-[#8b6c45] font-serif font-bold mb-4 text-center">
                第 {currentIndex + 1} 题
              </p>
              <h1 className="font-black font-serif text-[#2a1508] leading-relaxed tracking-wider text-center" style={{ fontSize: '18px', textShadow: '0 1px 1px rgba(255,255,255,0.6)' }}>
                {currentQuestion.text}
              </h1>
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-48 h-[1px] bg-gradient-to-r from-transparent via-[#8b6c45] to-transparent opacity-60"></div>
            </div>

            <div className="flex flex-col gap-4 max-w-2xl mx-auto">
              {currentQuestion.options.map((option, index) => (
                <button
                  key={option.id}
                  onClick={() => handleAnswer(option.id)}
                  className={cn(
                    'group w-full text-left p-4 md:p-5 transition-all duration-300 relative overflow-hidden',
                    'bg-[#fdf6e3]/50 border border-[#8b6c45]/20 rounded-xl hover:border-[#8b6c45]/60 hover:bg-[#fdf6e3]/80 active:bg-[#d4c5a3]/40 shadow-sm hover:shadow-md',
                    'flex items-center gap-4 md:gap-6'
                  )}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#e6d5b0]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div
                    className={cn(
                      'flex-shrink-0 w-8 h-8 md:w-10 md:h-10 border border-[#8b6c45]/30 rounded-full flex items-center justify-center text-base md:text-lg font-serif font-black transition-colors relative z-10',
                      'text-[#8b6c45] group-hover:text-[#2a1508] group-hover:bg-[#8b6c45]/10'
                    )}
                    style={{ textShadow: '0 1px 1px rgba(255,255,255,0.5)' }}
                  >
                    {String.fromCharCode(65 + index)}
                  </div>
                  <span className="text-sm md:text-base text-[#3f210d] font-serif font-bold group-hover:text-[#1a0d05] relative z-10 leading-relaxed" style={{ textShadow: '0 1px 1px rgba(255,255,255,0.4)', letterSpacing: '0.01em' }}>
                    {option.text}
                  </span>
                </button>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
