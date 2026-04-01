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
    <div className="w-full max-w-3xl mx-auto px-3 sm:px-4">
      <div className="mb-10 max-w-2xl mx-auto px-4 py-3 md:px-5 md:py-4 border border-[#8b6c45]/14 bg-[rgba(255,248,228,0.16)] shadow-[0_8px_24px_rgba(93,61,25,0.06)]">
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
            <div className="max-w-2xl mx-auto px-5 py-8 md:px-6 md:py-10 mb-10 relative border border-[#8b6c45]/14 bg-[linear-gradient(180deg,rgba(255,248,228,0.34),rgba(248,236,205,0.16))] shadow-[0_6px_18px_rgba(93,61,25,0.05)] backdrop-blur-[1px]">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-[1px] bg-gradient-to-r from-transparent via-[#8b6c45] to-transparent opacity-60"></div>
              <p className="text-[11px] md:text-xs uppercase tracking-[0.28em] text-[#8b6c45]/80 font-serif font-bold mb-5 text-center">
                第 {currentIndex + 1} 题 / 共 {QUESTIONS.length} 题
              </p>
              <div className="mx-auto max-w-[38ch] md:max-w-[36ch]">
                <h1
                  className="font-black font-serif text-[#2a1508] leading-[1.64] tracking-[0.02em] text-left"
                  style={{ fontSize: '21px', textShadow: '0 1px 1px rgba(255,255,255,0.6)' }}
                >
                  {currentQuestion.text}
                </h1>
              </div>
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-48 h-[1px] bg-gradient-to-r from-transparent via-[#8b6c45] to-transparent opacity-60"></div>
            </div>

            <div className="flex flex-col gap-2.5 md:gap-3 max-w-2xl mx-auto">
              {currentQuestion.options.map((option, index) => (
                <button
                  key={option.id}
                  onClick={() => handleAnswer(option.id)}
                  className={cn(
                    'group w-full text-left px-2 py-2.5 md:px-3 md:py-3 transition-all duration-300 relative overflow-hidden',
                    'bg-[rgba(255,248,228,0.3)] border border-[#8b6c45]/10 rounded-[12px] hover:bg-[rgba(255,248,228,0.38)] hover:border-[#8b6c45]/14 active:bg-[rgba(226,208,165,0.2)]',
                    'grid grid-cols-[2.4rem_minmax(0,1fr)] items-center gap-x-2.5 md:grid-cols-[2.8rem_minmax(0,1fr)] md:gap-x-3'
                  )}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#e6d5b0]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div
                    className={cn(
                      'w-[2.4rem] md:w-[2.8rem] text-[18px] md:text-[20px] font-serif font-normal leading-[1.2] transition-colors duration-300 relative z-10 self-center text-center',
                      'text-[#8b6c45]/85 group-hover:text-[#6f5434]'
                    )}
                    style={{ textShadow: '0 1px 1px rgba(255,255,255,0.35)' }}
                  >
                    <span className="leading-none">
                      {String.fromCharCode(65 + index)}
                    </span>
                  </div>
                  <div className="relative z-10 pr-0.5">
                    <span className="block text-[17px] md:text-[19px] text-[#3f210d] font-serif font-bold group-hover:text-[#1a0d05] leading-[1.72]" style={{ textShadow: '0 1px 1px rgba(255,255,255,0.28)', letterSpacing: '0.006em' }}>
                      {option.text}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
