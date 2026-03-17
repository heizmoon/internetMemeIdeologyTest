'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface RemoteStats {
  total: number;
  distribution: Record<string, number>;
  averages: Record<string, number>;
}

export default function StatsPage() {
  const [stats, setStats] = useState<RemoteStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch('/meme-test/api/stats');
        const data = await response.json();
        setStats(data);
      } catch (error) {
        console.error('Failed to fetch stats:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const sortedDistribution = stats ? Object.entries(stats.distribution)
    .sort(([, a], [, b]) => b - a)
    .map(([label, count]) => ({
      label,
      percent: Math.round((count / stats.total) * 100),
    })) : [];

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
          {loading ? '正在加载统计数据...' : `全网统计数据 (共 ${stats?.total || 0} 人)`}
        </h1>

        <div className="w-full bg-[#fdf6e3]/40 border border-[#8b6c45]/20 rounded-2xl p-6 mb-8 shadow-sm min-h-[300px] flex flex-col">
          {loading ? (
             <div className="flex-1 flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#8b6c45]"></div>
             </div>
          ) : sortedDistribution.length > 0 ? (
            <div className="flex flex-col gap-6">
              {sortedDistribution.map((stat, idx) => (
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
          ) : (
            <div className="flex-1 flex items-center justify-center text-[#8b6c45] font-serif italic">
              暂无统计数据
            </div>
          )}
        </div>

        <div className="flex flex-col items-center gap-6">
          <Link href="/quiz" className="w-[200px] h-[60px] relative group active:scale-95 transition-transform flex items-center justify-center">
            <Image 
              src="/button.png" 
              alt="按钮背景" 
              fill 
              className="object-contain"
            />
            <span className="relative z-10 text-[#2a1508] font-serif font-black text-xl tracking-widest drop-shadow-sm group-hover:text-[#5a3a18] transition-colors pb-1">
              返回测试
            </span>
          </Link>

          <a href="/" className="text-[#3f210d] font-serif font-bold text-lg hover:text-[#5a3a18] transition-colors flex items-center gap-2">
            <span>← 返回实验室首页</span>
          </a>
        </div>
      </div>
    </div>
  );
}
