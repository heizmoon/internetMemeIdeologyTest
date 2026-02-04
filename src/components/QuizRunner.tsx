'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { QUESTIONS } from '@/lib/questions';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';

export default function QuizRunner() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [answers, setAnswers] = useState<Record<string, string>>({}); // Changed to string (Option ID)
    const router = useRouter();

    const handleAnswer = (optionId: string) => {
        // Save answer
        const currentQ = QUESTIONS[currentIndex];
        const newAnswers = { ...answers, [currentQ.id]: optionId };
        setAnswers(newAnswers);

        // Initial delay for animation then next
        setTimeout(() => {
            if (currentIndex < QUESTIONS.length - 1) {
                setCurrentIndex(prev => prev + 1);
            } else {
                finishQuiz(newAnswers);
            }
        }, 250);
    };

    const finishQuiz = (finalAnswers: Record<string, string>) => {
        const params = new URLSearchParams();
        Object.entries(finalAnswers).forEach(([key, val]) => {
            params.append(key, val);
        });
        router.push(`/results?${params.toString()}`);
    };

    const currentQ = QUESTIONS[currentIndex];
    const progress = ((currentIndex + 1) / QUESTIONS.length) * 100;

    return (
        <div className="w-full max-w-2xl mx-auto px-4">
            {/* Progress Bar */}
            <div className="mb-8 flex items-center gap-4">
                <span className="text-sm font-bold text-slate-400 font-mono">
                    {String(currentIndex + 1).padStart(2, '0')}
                </span>
                <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                    <motion.div
                        className="h-full bg-slate-900 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                    />
                </div>
                <span className="text-sm font-bold text-slate-400 font-mono">
                    {QUESTIONS.length}
                </span>
            </div>

            <div className="relative min-h-[400px]">
                <AnimatePresence mode='wait'>
                    <motion.div
                        key={currentIndex}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                        className="w-full"
                    >
                        {/* Question Card */}
                        <div className="bg-white rounded-3xl p-8 md:p-10 shadow-xl shadow-slate-200/50 border border-slate-100 mb-8">
                            <h1 className="text-xl md:text-2xl font-bold text-slate-900 leading-relaxed tracking-tight">
                                {currentQ.text}
                            </h1>
                        </div>

                        {/* Options */}
                        <div className="flex flex-col gap-3">
                            {currentQ.options.map((option, idx) => (
                                <button
                                    key={option.id}
                                    onClick={() => handleAnswer(option.id)}
                                    className={cn(
                                        "group w-full text-left p-4 md:p-5 rounded-xl border-2 transition-all duration-200",
                                        "bg-white/80 border-transparent hover:bg-white hover:border-purple-200 hover:shadow-lg hover:shadow-purple-100/50 hover:scale-[1.01] active:scale-[0.99]",
                                        "flex items-center gap-4"
                                    )}
                                >
                                    <div className={cn(
                                        "flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold transition-colors",
                                        "bg-slate-100 text-slate-500 group-hover:bg-purple-600 group-hover:text-white"
                                    )}>
                                        {String.fromCharCode(65 + idx)}
                                    </div>
                                    <span className="text-base md:text-lg text-slate-600 font-medium group-hover:text-slate-900">
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
