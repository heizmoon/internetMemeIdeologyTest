import Link from 'next/link';
import TopBar from '@/components/TopBar';

export default function Home() {
  return (
    <main
      className="min-h-[100dvh] relative flex flex-col items-center pt-2 md:pt-4 px-5 md:px-6 overflow-x-hidden selection:bg-[#a8824f]/30"
    >
      <TopBar />

      <section className="relative z-10 w-full max-w-md flex flex-col items-center">
        <div className="absolute inset-x-2 top-2 h-[13.5rem] rounded-[36px] bg-[radial-gradient(circle_at_top,rgba(255,244,214,0.36),rgba(255,244,214,0.12)_58%,transparent_85%)] blur-md"></div>

        <div className="relative text-center">
          <h1
            className="text-[2.7rem] md:text-[4.3rem] font-serif font-black tracking-[0.04em] text-transparent bg-clip-text bg-gradient-to-b from-[#fbf4e4] via-[#e8d5ad] to-[#8e6b42]"
            style={{
              WebkitTextStroke: '0.2px rgba(78, 52, 27, 0.7)',
              textShadow: '0 -2px 0 rgba(255,245,221,1), 0 4px 6px rgba(64,41,20,1)',
            }}
          >
            你的身份是?
          </h1>
        </div>

        <div className="relative mt-8 w-full max-w-[36ch]">
          <div className="mb-4 h-px w-20 bg-gradient-to-r from-[#8b6c45]/0 via-[#8b6c45]/55 to-[#8b6c45]/0"></div>
          <p
            className="font-serif text-[#3f210d] text-[1.2rem] font-bold leading-[1.5] tracking-[0.03em] text-left"
            style={{ textShadow: '0 1px 2px rgba(255,255,255,0.55)' }}
          >
            {'通过一系列网络热门话题的灵魂拷问，测定你在键政圈的身份。'}
          </p>
        </div>
      </section>

      <section className="relative z-10 w-full max-w-md flex flex-col items-center">
        <div className="mt-12 flex flex-col items-center gap-4 w-full max-w-[290px] md:max-w-[320px]">
          <Link href="/quiz" className="block w-full no-underline hover:scale-[1.03] active:scale-95 transition-transform drop-shadow-[0_4px_6px_rgba(0,0,0,0.45)]">
            <div
              className="w-full flex items-center justify-center font-serif font-black text-[1.45rem] md:text-[1.7rem] text-[#2a1508] tracking-[0.08em]"
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

          <Link href="/stats" className="block w-full no-underline hover:scale-[1.03] active:scale-95 transition-transform drop-shadow-[0_4px_6px_rgba(0,0,0,0.45)]">
            <div
              className="w-full flex items-center justify-center font-serif font-black text-[1.45rem] md:text-[1.7rem] text-[#2a1508] tracking-[0.08em]"
              style={{
                backgroundImage: 'url("/button.png")',
                backgroundSize: '100% 100%',
                backgroundRepeat: 'no-repeat',
                aspectRatio: '586 / 101',
                textShadow: '0 1px 0 rgba(255,220,160,0.6), 0 2px 4px rgba(0,0,0,0.3)',
                filter: 'saturate(0.88) brightness(0.96)',
              }}
            >
              统计结果 🌐
            </div>
          </Link>
        </div>
      </section>

      <div className="mt-auto w-full max-w-[85vw] md:max-w-lg pb-8 md:pb-10 pt-16 z-10">
        <div className="relative px-4 py-4 md:px-5">
          <div className="absolute inset-x-2 inset-y-1 rounded-[26px] bg-[linear-gradient(180deg,rgba(77,48,21,0.26),rgba(77,48,21,0.16))] backdrop-blur-[2px]"></div>
          <div className="absolute left-1/2 top-0 h-px w-32 -translate-x-1/2 bg-gradient-to-r from-transparent via-[rgba(91,62,27,0.4)] to-transparent"></div>
          <p
            className="relative mx-auto max-w-[38ch] text-center font-serif text-[13px] md:text-[14px] font-bold leading-[1.9] text-[#f4ead3]"
            style={{ textShadow: '0 1px 2px rgba(49,29,10,0.7)', letterSpacing: '0.02em' }}
          >
            本测试中的题目与结果分析均由 AI 基于公开网络舆论素材整理生成，仅供娱乐与讨论参考，不代表开发者本人立场。
          </p>
        </div>
      </div>
    </main>
  );
}
