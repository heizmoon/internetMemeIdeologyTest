'use client';

import { Suspense, useEffect, useMemo, useRef, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import * as htmlToImage from 'html-to-image';
import { DIMENSIONS, QUESTIONS } from '@/lib/config';
import { calculateScore, getResultSummary } from '@/lib/scoring';
import ResultRadarChart from '@/components/RadarChart';
import AxisBar from '@/components/AxisBar';
import TopBar from '@/components/TopBar';

function ResultsContent() {
  const searchParams = useSearchParams();
  const captureRef = useRef<HTMLDivElement>(null);
  const [isSharing, setIsSharing] = useState(false);

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

  useEffect(() => {
    const submitResults = async () => {
      try {
        const response = await fetch('/api/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(scores),
        });

        if (!response.ok) {
          const payload = await response.text();
          console.warn('Submit skipped:', payload);
        }
      } catch (error) {
        console.error('Failed to submit results:', error);
      }
    };

    submitResults();
  }, [scores]);

  const handleShare = async () => {
    if (!captureRef.current) return;
    setIsSharing(true);

    try {
      const blob = await htmlToImage.toBlob(captureRef.current, {
        pixelRatio: 2,
        backgroundColor: '#2a1508',
      });

      if (!blob) return;

      const file = new File([blob], 'ideology-result.png', { type: 'image/png' });

      if (navigator.share && navigator.canShare && navigator.canShare({ files: [file] })) {
        try {
          await navigator.share({
            title: '你的键政画像',
            files: [file],
          });
        } catch (error) {
          if ((error as Error).name !== 'AbortError') {
            fallbackDownload(blob);
          }
        }
      } else {
        fallbackDownload(blob);
      }
    } catch (error) {
      console.error('Capture failed', error);
    } finally {
      setIsSharing(false);
    }
  };

  const fallbackDownload = (blob: Blob) => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'ideology-result.png';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    alert('截图已保存到你的设备，可以手动分享。');
  };

  const archetypeAssets: Record<string, string> = {
    兔友战士: '/results_rabbit.png',
    网左先锋: '/results_leftist.png',
    自由派公知: '/results_liberal.png',
    建制皇汉: '/results_rabbit.png',
    理性中间派: '/results_moderate.png',
    解构乐子人: '/results_joy.png',
    神友观察员: '/results_acceleration.png',
    阶层焦虑者: '/results_anxiety.png',
  };

  const imagePath = archetypeAssets[summary.label] || '/results_moderate.png';

  return (
    <main
      ref={captureRef}
      className="min-h-[100dvh] relative px-5 md:px-6 pt-1 pb-10 selection:bg-[#a8824f]/30"
    >
      <TopBar className="mb-6" />

      <motion.section
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 w-full max-w-[356px] mx-auto px-1"
      >
        <div className="flex flex-col items-center text-center">
          <div
            className="relative w-[220px] mt-8 overflow-hidden"
            style={{ height: '150px' }}
          >
            <Image
              src={imagePath}
              alt={summary.label}
              fill
              className="object-contain object-top drop-shadow-[0_14px_22px_rgba(77,49,22,0.18)] scale-[1.06]"
              sizes="440px"
              unoptimized
            />
          </div>

          <p
            className="mt-5 w-full max-w-[39ch] text-left text-[15px] text-[#3f210d] font-serif font-bold leading-[1.92]"
            style={{ textShadow: '0 1px 1px rgba(255,255,255,0.45)' }}
          >
            {summary.description}
          </p>

          <div className="mt-5 w-full max-w-[39ch] pt-4 border-t border-[#8b6c45]/16">
            <p className="text-[11px] tracking-[0.24em] text-[#8b6c45] font-serif font-bold text-center">
              气质参考人物
            </p>
            <p
              className="mt-2 text-center text-xl text-[#2a1508] font-serif font-black tracking-[0.05em]"
              style={{ textShadow: '0 1px 2px rgba(255,255,255,0.35)' }}
            >
              {summary.figureReferences.join(' / ')}
            </p>
            <p className="mt-2 text-center text-[11px] text-[#7a5d3d] font-serif leading-[1.75]">
              {summary.figureNote}
            </p>
          </div>
        </div>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.12 }}
        className="relative z-10 w-full max-w-[356px] mx-auto mt-6 px-1"
      >
        <div className="flex items-center justify-center gap-3 mb-2">
          <div className="w-10 h-px bg-gradient-to-r from-transparent to-[#8b6c45]/60"></div>
          <p className="text-[11px] tracking-[0.28em] text-[#6f5138] font-serif font-bold">
            维度分布
          </p>
          <div className="w-10 h-px bg-gradient-to-l from-transparent to-[#8b6c45]/60"></div>
        </div>

        <div className="w-full flex items-center justify-center mb-3">
          <ResultRadarChart scores={scores} />
        </div>

        <div className="w-full space-y-4 px-1">
          {DIMENSIONS.map((dimension) => (
            <AxisBar
              key={dimension.id}
              dimension={dimension}
              score={scores[dimension.id] ?? 50}
            />
          ))}
        </div>
      </motion.section>

      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="relative z-10 w-full max-w-[300px] mx-auto flex flex-col items-center gap-4 mt-12 px-2"
      >
        <div
          role="button"
          onClick={isSharing ? undefined : handleShare}
          className={`w-full h-[60px] relative group transition-transform flex items-center justify-center cursor-pointer ${
            isSharing ? 'opacity-70' : 'hover:scale-[1.02] active:scale-95'
          }`}
        >
          <Image src="/button.png" alt="截图分享按钮" fill className="object-contain" unoptimized />
          <span className="relative z-10 text-[#2a1508] font-serif font-black text-xl tracking-[0.14em] drop-shadow-sm group-hover:text-[#5a3a18] transition-colors pb-1">
            {isSharing ? '生成中…' : '截图分享'}
          </span>
        </div>

        <Link href="/stats" className="w-full h-[60px] relative group hover:scale-[1.02] active:scale-95 transition-transform flex items-center justify-center">
          <Image src="/button.png" alt="查看统计按钮" fill className="object-contain" unoptimized />
          <span className="relative z-10 text-[#2a1508] font-serif font-black text-xl tracking-[0.14em] drop-shadow-sm group-hover:text-[#5a3a18] transition-colors pb-1">
            查看统计
          </span>
        </Link>

        <Link href="/quiz" className="w-full h-[60px] relative group hover:scale-[1.02] active:scale-95 transition-transform flex items-center justify-center">
          <Image src="/button.png" alt="再次测试按钮" fill className="object-contain" unoptimized />
          <span className="relative z-10 text-[#2a1508] font-serif font-black text-xl tracking-[0.14em] drop-shadow-sm group-hover:text-[#5a3a18] transition-colors pb-1">
            再次测试
          </span>
        </Link>

        <a
          href="https://20061019.xyz"
          className="mt-4 text-[#3f210d] font-serif font-bold text-lg hover:text-[#5a3a18] transition-colors"
        >
          返回实验室首页
        </a>
      </motion.div>
    </main>
  );
}

export default function ResultsPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResultsContent />
    </Suspense>
  );
}
