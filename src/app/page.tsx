import Link from 'next/link';

export default function Home() {
  return (
    <main 
      className="min-h-[100dvh] relative flex flex-col items-center pt-2 md:pt-4 px-6 overflow-x-hidden selection:bg-[#a8824f]/30"
    >
      {/* Top Header Section - Align with dark banner area of background */}
      <div className="w-full h-12 md:h-16 flex items-center justify-center relative z-20 mb-10">
        <h2 
          className="text-xl md:text-2xl font-serif font-black tracking-[0.2em] text-[#f2ecd9] drop-shadow-lg"
          style={{ textShadow: '0 2px 4px rgba(0,0,0,0.8), 0 0 10px rgba(0,0,0,0.4)' }}
        >
          2025年度键政话题
        </h2>
      </div>

      {/* Main Title - Hero Section */}
      <div className="relative mt-2 text-center z-10">
        <h1 
          className="text-5xl md:text-7xl font-serif font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-b from-[#ffffff] via-[#f2ecd9] to-[#d6bc8b]"
          style={{ WebkitTextStroke: '2px rgba(62, 40, 20, 0.8)', filter: 'drop-shadow(0px 8px 6px rgba(0,0,0,0.5))' }}
        >
          你的身份是？
        </h1>
      </div>

      {/* Description */}
      <div className="mt-10 max-w-[85vw] md:max-w-md text-center z-10 w-full flex justify-center">
        <p className="font-serif text-[#3f210d] text-lg md:text-xl font-black leading-[1.8] tracking-wide" style={{ textShadow: '0 1px 2px rgba(255,255,255,0.6)', letterSpacing: '0.05em' }}>
          通过一系列网络热门话题（如：4+4，苹果人）<br />
          的灵魂拷问，测定你在键政圈的身位。
        </p>
      </div>

      {/* Buttons Selection */}
      <div className="mt-14 flex flex-col items-center gap-6 w-full max-w-[280px] md:max-w-[320px] z-10">
        
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

      <div className="mt-auto w-full max-w-[85vw] md:max-w-md px-0 pb-10 md:pb-12 pt-16 text-center z-10 flex justify-center">
        <p
          className="font-serif text-xs md:text-sm font-bold leading-7 text-[#5a3a18]"
          style={{ textShadow: '0 1px 2px rgba(255,255,255,0.45)', letterSpacing: '0.03em' }}
        >
          本测试中的题目与结果分析均由 AI 基于公开网络舆论素材整理生成，仅供娱乐与讨论参考，不代表开发者本人立场。
        </p>
      </div>


    </main>
  );
}
