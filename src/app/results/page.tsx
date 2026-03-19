'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense, useMemo, useEffect, useState, useRef } from 'react';
import * as htmlToImage from 'html-to-image';
import Link from 'next/link';
import { calculateScore, getResultSummary } from '@/lib/scoring';
import { DIMENSIONS, QUESTIONS } from '@/lib/config';
import ResultRadarChart from '@/components/RadarChart';
import AxisBar from '@/components/AxisBar';
import Image from 'next/image';
import { motion } from 'framer-motion';

function ResultsContent() {
  const searchParams = useSearchParams();
  const captureRef = useRef<HTMLDivElement>(null);
  const [isSharing, setIsSharing] = useState(false);

  const handleShare = async () => {
    if (!captureRef.current) return;
    setIsSharing(true);
    try {
      // 稍微延迟一下确保DOM渲染完毕
      await new Promise(resolve => setTimeout(resolve, 100));
      
      const targetNode = captureRef.current;
      
      // 临时应用背景样式，确保被截图工具克隆
      const prevBg = targetNode.style.backgroundImage;
      const prevSize = targetNode.style.backgroundSize;
      const prevPos = targetNode.style.backgroundPosition;
      
      targetNode.style.backgroundImage = 'url("/background.jpg")';
      targetNode.style.backgroundSize = 'cover';
      targetNode.style.backgroundPosition = 'center';

      // 等待样式生效
      await new Promise(resolve => setTimeout(resolve, 100));
      
      let blob: Blob | null = null;
      try {
        blob = await htmlToImage.toBlob(targetNode, {
          pixelRatio: 2,
          backgroundColor: '#2a1508', // 配合全局底色
        });
      } finally {
        // 恢复原始样式
        targetNode.style.backgroundImage = prevBg;
        targetNode.style.backgroundSize = prevSize;
        targetNode.style.backgroundPosition = prevPos;
      }
      
      if (!blob) {
        setIsSharing(false);
        return;
      }
      
      const file = new File([blob], 'my_ideology_result.png', { type: 'image/png' });
        
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
        setIsSharing(false);
    } catch (error) {
      console.error('Capture failed', error);
      setIsSharing(false);
    }
  };

  const fallbackDownload = (blob: Blob) => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'ideology_result.png';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    alert('截图已保存到您的设备，您可以手动分享！');
  };
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
    '自由派公知': '/results_liberal.png',
    '建制皇汉': '/results_rabbit.png', // Fallback if image not provided
    '理性中间派': '/results_moderate.png',
    '解构乐子人': '/results_joy.png',
    '神友观察员': '/results_acceleration.png',
    '阶层焦虑者': '/results_anxiety.png',
  };

  const imagePath = archetypeAssets[summary.label] || '/results_网左先锋.png';

  return (
    <div
      ref={captureRef}
      className="min-h-[100dvh] relative py-8 px-6 selection:bg-[#a8824f]/30"
    >
      <div className="w-full relative z-10 flex flex-col items-center">

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
              unoptimized
            />
          </div>
        </motion.div>

        {/* ── Result Image (Single Asset) ──────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.15 }}
          className="relative w-full max-w-[280px] aspect-[4/3] -mb-4 z-20"
        >
          <Image
            src={imagePath}
            alt={summary.label}
            fill
            className="object-contain drop-shadow-xl"
            sizes="460px"
            priority
            unoptimized
          />
        </motion.div>

        {/* ── Description Text ─────────────────────────────────────── */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="relative z-30 font-serif text-[#3f210d] text-sm md:text-base font-bold leading-relaxed text-center px-4 mb-1 max-w-[400px]"
          style={{
            textShadow: '0 1px 2px rgba(255,255,255,0.5)',
            letterSpacing: '0.05em',
          }}
        >
          {summary.description}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.34 }}
          className="w-full flex justify-center px-4 mt-0 mb-4 inline-block z-30 relative"
        >
          <div className="flex flex-col items-center text-center">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-[1px] bg-gradient-to-r from-transparent to-[#8b6c45]/60"></div>
              <p className="text-[11px] md:text-xs tracking-[0.3em] text-[#6f5138] font-serif font-bold">
                气质参考人物
              </p>
              <div className="w-10 h-[1px] bg-gradient-to-l from-transparent to-[#8b6c45]/60"></div>
            </div>
            <p className="text-xl md:text-2xl text-[#2a1508] font-serif font-black tracking-wide" style={{ textShadow: '0 1px 2px rgba(255,255,255,0.4)' }}>
              {summary.figureReferences.join(' / ')}
            </p>
            <p className="mt-3 text-[10px] md:text-[11px] text-[#8b6c45]/80 font-serif tracking-widest">
              {summary.figureNote}
            </p>
          </div>
        </motion.div>

        {/* ── Decorative line ──────────────────────────────────────── */}
        <div className="relative w-[70%] h-[8px] mb-4">
          <Image
            src="/results_page_line_2.png"
            alt="decorative line"
            fill
            className="object-contain"
            sizes="300px"
            unoptimized
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

        <div className="w-full max-w-[320px] mx-auto flex flex-col items-center gap-4 mt-12 mb-12 px-2">
          <div 
            role="button"
            onClick={isSharing ? undefined : handleShare}
            className={`w-full h-[60px] relative group transition-transform flex items-center justify-center cursor-pointer ${isSharing ? 'opacity-70' : 'active:scale-95'}`}
          >
            <Image 
              src="/button.png" 
              alt="分享按钮背景" 
              fill 
              className="object-contain"
              unoptimized
              priority
            />
            <span className="relative z-10 text-[#2a1508] font-serif font-black text-xl tracking-[0.2em] drop-shadow-sm group-hover:text-[#5a3a18] transition-colors pb-1">
              {isSharing ? '生成中...' : '截图分享'}
            </span>
          </div>

          <Link href="/stats" className="w-full h-[60px] relative group active:scale-95 transition-transform flex items-center justify-center">
            <Image 
              src="/button.png" 
              alt="按钮背景" 
              fill 
              className="object-contain"
              unoptimized
              priority
            />
            <span className="relative z-10 text-[#2a1508] font-serif font-black text-xl tracking-widest drop-shadow-sm group-hover:text-[#5a3a18] transition-colors pb-1">
              查看统计
            </span>
          </Link>
          
          <Link href="/quiz" className="w-full h-[60px] relative group active:scale-95 transition-transform flex items-center justify-center">
            <Image 
              src="/button.png" 
              alt="按钮背景" 
              fill 
              className="object-contain"
              unoptimized
              priority
            />
            <span className="relative z-10 text-[#2a1508] font-serif font-black text-xl tracking-widest drop-shadow-sm group-hover:text-[#5a3a18] transition-colors pb-1">
              再次测试
            </span>
          </Link>

          <a href="https://20061019.xyz" className="mt-4 text-[#3f210d] font-serif font-bold text-lg hover:text-[#5a3a18] transition-colors flex items-center gap-2">
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
