import Link from 'next/link';
import { Settings2 } from 'lucide-react';

export default function Home() {
  return (
    <main 
      className="min-h-[100dvh] relative flex flex-col items-center pt-[12vh] px-6 overflow-x-hidden selection:bg-[#a8824f]/30"
    >
      {/* Top Header */}
      <div className="relative text-center">
        <h2 
          className="text-2xl md:text-3xl font-serif font-black tracking-widest bg-gradient-to-b from-[#e3caa2] via-[#c69a5a] to-[#805a30] bg-clip-text text-transparent"
          style={{ WebkitTextStroke: '1px rgba(92, 60, 30, 0.4)', filter: 'drop-shadow(0px 4px 2px rgba(0,0,0,0.5))' }}
        >
          2025年度健政话题
        </h2>
      </div>

      {/* Main Title */}
      <div className="relative mt-8 text-center">
        <h1 
          className="text-5xl md:text-7xl font-serif font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-b from-[#ffffff] via-[#f2ecd9] to-[#d6bc8b]"
          style={{ WebkitTextStroke: '1px rgba(92, 60, 30, 0.5)', filter: 'drop-shadow(0px 4px 4px rgba(0,0,0,0.6))' }}
        >
          你的身份是？
        </h1>
      </div>

      {/* Description */}
      <div className="mt-8 max-w-[85vw] md:max-w-md text-center z-10 w-full flex justify-center">
        <p className="font-serif text-[#3f210d] text-base md:text-lg font-bold leading-[1.8] tracking-wide" style={{ textShadow: '0 1px 2px rgba(255,255,255,0.4)', letterSpacing: '0.05em' }}>
          通过一系列网络热门话题（如：4+4，苹果人）<br />
          的灵魂拷问，测定你在健政圈的身位。
        </p>
      </div>

      {/* Buttons Selection */}
      <div className="mt-14 flex flex-col flex-1 items-center gap-6 w-full max-w-[280px] md:max-w-[320px] z-10">
        
        {/* Start Button */}
        <Link href="/quiz" className="block w-full no-underline hover:scale-105 active:scale-95 transition-transform drop-shadow-[0_4px_6px_rgba(0,0,0,0.5)]">
          <div
            className="w-full flex items-center justify-center font-serif font-black text-xl md:text-2xl text-[#2a1508] tracking-wider"
            style={{
              backgroundImage: 'url("/button.png")',
              backgroundSize: '100% 100%',
              backgroundRepeat: 'no-repeat',
              aspectRatio: '586 / 101',
              textShadow: '0 1px 0 rgba(255,220,160,0.6), 0 2px 4px rgba(0,0,0,0.3)',
            }}
          >
            立即测试 →
          </div>
        </Link>
        
        {/* Stats Button */}
        <Link href="/stats" className="block w-full no-underline hover:scale-105 active:scale-95 transition-transform drop-shadow-[0_4px_6px_rgba(0,0,0,0.5)]">
          <div
            className="w-full flex items-center justify-center font-serif font-black text-xl md:text-2xl text-[#2a1508] tracking-wider"
            style={{
              backgroundImage: 'url("/button.png")',
              backgroundSize: '100% 100%',
              backgroundRepeat: 'no-repeat',
              aspectRatio: '586 / 101',
              textShadow: '0 1px 0 rgba(255,220,160,0.6), 0 2px 4px rgba(0,0,0,0.3)',
              filter: 'saturate(0.85) brightness(0.95)',
            }}
          >
            统计结果 🌐
          </div>
        </Link>
      </div>

      {/* Admin Link (Unobtrusive) */}
      <div className="mt-auto pb-6 z-10 w-full flex justify-center">
        <Link
          href="/admin"
          className="inline-flex items-center gap-1.5 text-xs text-[#5c3c1e]/60 hover:text-[#5c3c1e]/90 transition-colors drop-shadow-sm font-medium bg-white/20 px-4 py-2 rounded-full backdrop-blur-sm"
        >
          <Settings2 size={14} />
          <span>管理配置 (Admin)</span>
        </Link>
      </div>

    </main>
  );
}
