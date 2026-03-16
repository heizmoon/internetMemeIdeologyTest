'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function StatsPage() {
  const mockStats = [
    { label: '兔友战士', percent: 28, color: '#e63946' },
    { label: '网左先锋', percent: 22, color: '#457b9d' },
    { label: '自由派知识分子', percent: 15, color: '#1d3557' },
    { label: '加速主义者', percent: 12, color: '#f1faee' },
    { label: '解构乐子人', percent: 10, color: '#a8dadc' },
    { label: '理性中间派', percent: 8, color: '#8d99ae' },
    { label: '其他', percent: 5, color: '#adb5bd' },
  ];

  return (
    <div 
      className="min-h-[100dvh] relative py-12 px-8 selection:bg-[#a8824f]/30"
      style={{
        backgroundImage: 'url("/background.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center bottom',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
      }}
    >
      <div className="max-w-[460px] mx-auto relative z-10 flex flex-col items-center">
        <h1 className="text-3xl font-black font-serif text-[#2a1508] mb-8 tracking-widest text-center" style={{ textShadow: '0 1px 2px rgba(255,255,255,0.6)' }}>
          全网统计数据 (示例)
        </h1>

        <div className="w-full bg-[#fdf6e3]/40 border border-[#8b6c45]/20 rounded-2xl p-6 mb-8 shadow-sm">
          <div className="flex flex-col gap-6">
            {mockStats.map((stat, idx) => (
              <div key={idx} className="flex flex-col gap-2">
                <div className="flex justify-between items-end px-1">
                  <span className="font-serif font-black text-[#3f210d] text-lg">{stat.label}</span>
                  <span className="font-serif font-bold text-[#8b6c45]">{stat.percent}%</span>
                </div>
                <div className="h-3 bg-[#d4c5a3]/50 rounded-full overflow-hidden border border-[#bba078]/20">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${stat.percent}%` }}
                    transition={{ duration: 0.8, delay: idx * 0.1 }}
                    className="h-full bg-[#8b6c45]"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <Link href="/quiz" className="w-[200px] h-[60px] relative group active:scale-95 transition-transform flex items-center justify-center">
          <Image 
            src="/button.png" 
            alt="按钮背景" 
            fill 
            className="object-contain"
          />
          <span className="relative z-10 text-[#2a1508] font-serif font-black text-xl tracking-widest drop-shadow-sm group-hover:text-[#5a3a18] transition-colors pb-1">
            返回
          </span>
        </Link>
      </div>
    </div>
  );
}
