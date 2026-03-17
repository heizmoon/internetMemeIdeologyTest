'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { calculateScore, getResultSummary } from '@/lib/scoring';
import { DIMENSIONS, QUESTIONS } from '@/lib/config';
import ResultRadarChart from '@/components/RadarChart';
import AxisBar from '@/components/AxisBar';
import Image from 'next/image';
import { motion } from 'framer-motion';

function ResultsContent() {
  const searchParams = useSearchParams();
  const answers = useMemo(() => {
    const value: Record<string, string> = {};
    QUESTIONS.forEach((question) => {
      const selectedOption = searchParams.get(question.id);
      if (selectedOption) value[question.id] = selectedOption;
    });
    return value;
  }, [searchParams]);

  const scores = useMemo(() => calculateScore(answers, QUESTIONS), [answers]);
  const summary = useMemo(() => getResultSummary(scores), [scores]);
  
  // Submit results to the database
  useEffect(() => {
    const submitResults = async () => {
      try {
        await fetch('/api/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(scores),
        });
      } catch (error) {
        console.error('Failed to submit results:', error);
      }
    };
    submitResults();
  }, [scores]);

  // Map archetype label to the new single-image assets
  const archetypeAssets: Record<string, string> = {
    '兔友战士': '/results_rabbit.png',
    '网左先锋': '/results_leftist.png',
    '自由派知识分子': '/results_liberal.png',
    '建制皇汉': '/results_rabbit.png', // Fallback if image not provided
    '理性中间派': '/results_moderate.png',
    '解构乐子人': '/results_joy.png',
    '加速主义者': '/results_acceleration.png',
    '阶层焦虑者': '/results_anxiety.png',
  };

  const imagePath = archetypeAssets[summary.label] || '/results_网左先锋.png';

  return (
    <div
      className="min-h-[100dvh] relative py-8 px-[10vw] selection:bg-[#a8824f]/30"
      style={{
        backgroundImage: 'url("/background.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center bottom',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
      }}
    >
      <div className="max-w-[460px] mx-auto relative z-10 flex flex-col items-center">

        {/* ── Title Banner ─────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full flex justify-center mb-4"
        >
          <div className="relative w-full max-w-[400px] h-[56px]">
            <Image
              src="/results_page_resultTitle.png"
              alt="你的键政画像"
              fill
              className="object-contain"
              sizes="400px"
              priority
            />
          </div>
        </motion.div>

        {/* ── Result Image (Single Asset) ──────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.15 }}
          className="relative w-full max-w-[280px] aspect-[4/3] mb-2"
        >
          <Image
            src={imagePath}
            alt={summary.label}
            fill
            className="object-contain drop-shadow-xl"
            sizes="460px"
            priority
          />
        </motion.div>

        {/* ── Description Text ─────────────────────────────────────── */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="font-serif text-[#3f210d] text-sm md:text-base font-bold leading-relaxed text-center px-4 mb-2 max-w-[400px]"
          style={{
            textShadow: '0 1px 2px rgba(255,255,255,0.5)',
            letterSpacing: '0.05em',
          }}
        >
          {summary.description}
        </motion.p>

        {/* ── Decorative line ──────────────────────────────────────── */}
        <div className="relative w-[70%] h-[8px] mb-4">
          <Image
            src="/results_page_line_2.png"
            alt="decorative line"
            fill
            className="object-contain"
            sizes="300px"
          />
        </div>


        {/* ── Radar Chart ──────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.35 }}
          className="w-full flex items-center justify-center mb-2"
        >
          <ResultRadarChart scores={scores} />
        </motion.div>

        {/* ── Dimension Slider Bars ────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="w-full space-y-4 px-4"
        >
          {DIMENSIONS.map((dimension) => (
            <AxisBar
              key={dimension.id}
              dimension={dimension}
              score={scores[dimension.id] ?? 50}
            />
          ))}
        </motion.div>

        <div className="w-full flex flex-col items-center gap-4 mt-16 mb-12 px-4">
          <div className="w-full flex flex-col sm:flex-row gap-4">
            <Link href="/stats" className="w-full sm:flex-1 h-[60px] relative group active:scale-95 transition-transform flex items-center justify-center">
              <Image 
                src="/button.png" 
                alt="按钮背景" 
                fill 
                className="object-contain"
              />
              <span className="relative z-10 text-[#2a1508] font-serif font-black text-xl tracking-widest drop-shadow-sm group-hover:text-[#5a3a18] transition-colors pb-1">
                查看统计
              </span>
            </Link>
            
            <Link href="/quiz" className="w-full sm:flex-1 h-[60px] relative group active:scale-95 transition-transform flex items-center justify-center">
              <Image 
                src="/button.png" 
                alt="按钮背景" 
                fill 
                className="object-contain"
              />
              <span className="relative z-10 text-[#2a1508] font-serif font-black text-xl tracking-widest drop-shadow-sm group-hover:text-[#5a3a18] transition-colors pb-1">
                再次测试
              </span>
            </Link>
          </div>

          <a href="/" className="mt-4 text-[#3f210d] font-serif font-bold text-lg hover:text-[#5a3a18] transition-colors flex items-center gap-2">
            <span>← 返回实验室首页</span>
          </a>
        </div>
      </div>
    </div>
  );
}

export default function ResultsPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResultsContent />
    </Suspense>
  );
}
