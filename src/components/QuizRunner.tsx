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
      <div className="mb-10 max-w-2xl mx-auto px-3 py-3 md:px-4 md:py-4 border border-[#8b6c45]/14 bg-[rgba(255,248,228,0.16)] shadow-[0_8px_24px_rgba(93,61,25,0.06)]">
        <div className="flex items-center justify-center">
          <div className="w-full h-[8px] bg-[#d4c5a3]/50 rounded-full overflow-hidden shadow-inner border border-[#bba078]/30">
            <motion.div
              className="h-full bg-gradient-to-r from-[#8b6c45] via-[#a78255] to-[#8b6c45] rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.35, ease: 'easeInOut' }}
            />
          </div>
        </div>
      </div>

      <div className="relative min-h-[460px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.28, ease: 'easeOut' }}
            className="w-full"
          >
            <div className="max-w-2xl mx-auto px-5 py-6 md:px-7 md:py-8 mb-10 relative border border-[#8b6c45]/18 bg-[linear-gradient(180deg,rgba(255,248,228,0.4),rgba(248,236,205,0.24))] shadow-[0_10px_30px_rgba(93,61,25,0.08)] backdrop-blur-[1px]">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-[1px] bg-gradient-to-r from-transparent via-[#8b6c45] to-transparent opacity-60"></div>
              <p className="text-[11px] md:text-xs uppercase tracking-[0.28em] text-[#8b6c45]/80 font-serif font-bold mb-4 text-center">
                第 {currentIndex + 1} 题 / 共 {QUESTIONS.length} 题
              </p>
              <h1
                className="font-black font-serif text-[#2a1508] leading-[1.62] tracking-[0.025em] text-left md:text-center"
                style={{ fontSize: '18px', textShadow: '0 1px 1px rgba(255,255,255,0.6)' }}
              >
                {currentQuestion.text}
              </h1>
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-48 h-[1px] bg-gradient-to-r from-transparent via-[#8b6c45] to-transparent opacity-60"></div>
            </div>

            <div className="flex flex-col gap-7 max-w-2xl mx-auto">
              {currentQuestion.options.map((option, index) => (
                <button
                  key={option.id}
                  onClick={() => handleAnswer(option.id)}
                  className={cn(
                    'group w-full text-left px-4 py-4 md:px-5 md:py-5 transition-all duration-300 relative overflow-hidden',
                    'bg-[rgba(253,246,227,0.6)] border border-[#8b6c45]/20 rounded-2xl hover:border-[#8b6c45]/60 hover:bg-[rgba(253,246,227,0.84)] active:bg-[#d4c5a3]/40 shadow-[0_8px_18px_rgba(93,61,25,0.08)] hover:shadow-[0_12px_24px_rgba(93,61,25,0.14)]',
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
                  <span className="text-base md:text-lg text-[#3f210d] font-serif font-bold group-hover:text-[#1a0d05] relative z-10 leading-[1.75]" style={{ textShadow: '0 1px 1px rgba(255,255,255,0.4)', letterSpacing: '0.01em' }}>
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
