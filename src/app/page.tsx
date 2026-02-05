import Link from 'next/link';
import { TrendingUp, Globe2 } from 'lucide-react';

export default function Home() {
    return (
        <main className="min-h-screen relative overflow-hidden font-serif flex flex-col items-center">
            {/* Background Image (User provided or CSS fallback) */}
            <div
                className="absolute top-0 left-0 w-full h-full z-0 bg-cover bg-center bg-no-repeat"
                style={{
                    backgroundImage: "url('/background.jpg')",
                    backgroundColor: '#e6d5b0'
                }}
            />
            {/* Vignette Overlay for atmosphere */}
            <div className="absolute inset-0 z-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,rgba(60,40,20,0.4)_100%)] opacity-80 mix-blend-multiply" />

            {/* Main Content */}
            <div className="relative z-10 flex flex-col items-center w-full max-w-lg px-4 pt-16 md:pt-24 space-y-8">

                {/* Header: 2025年度键政话题 */}
                <h2 className="text-xl md:text-3xl font-bold tracking-[0.2em] text-[#5a3a18] drop-shadow-md font-[family-name:var(--font-noto-serif)] opacity-90">
                    2025年度键政话题
                </h2>

                {/* Main Title: 你的身份是？ - Enhanced 3D Effect */}
                <h1 className="relative text-7xl md:text-8xl font-black text-[#f3e5c7] drop-shadow-xl z-20 font-[family-name:var(--font-noto-serif)]">
                    {/* Shadow/Stroke Layer */}
                    <span className="absolute inset-0 text-stroke-1 text-[#4a2e12] blur-[1px] select-none" aria-hidden="true">
                        <span className="relative inline-block">你</span>
                        <span className="relative inline-block">的</span>
                        <span className="relative inline-block transform -rotate-3 translate-y-2 text-8xl">身</span>
                        <span className="relative inline-block transform rotate-3 -translate-y-1 text-8xl">份</span>
                        <span className="relative inline-block">是</span>
                        <span className="relative inline-block">？</span>
                    </span>

                    {/* Main Text Layer with Gradient */}
                    <span className="relative text-gradient-gold drop-shadow-[0_4px_4px_rgba(0,0,0,0.5)]">
                        <span className="relative inline-block">你</span>
                        <span className="relative inline-block">的</span>
                        <span className="relative inline-block transform -rotate-3 translate-y-2 text-8xl">身</span>
                        <span className="relative inline-block transform rotate-3 -translate-y-1 text-8xl">份</span>
                        <span className="relative inline-block">是</span>
                        <span className="relative inline-block">？</span>
                    </span>
                </h1>

                {/* Subtitle/Description text */}
                <p className="text-base md:text-xl text-[#3e2b18] font-bold text-center leading-relaxed px-4 drop-shadow-sm bg-[#e6d5b0]/60 p-4 rounded-xl border border-[#bfa87a] backdrop-blur-sm">
                    通过一系列网络热门话题（如：4+4，苹果人）
                    的灵魂拷问，测定你在键政圈的身位。
                </p>

                {/* Buttons Container */}
                <div className="flex flex-col gap-5 w-full mt-8">
                    {/* Primary Button: 立即测试 */}
                    <Link
                        href="/quiz"
                        className="group relative w-full h-20 flex items-center justify-center transition-all transform hover:scale-[1.02] active:scale-95"
                    >
                        {/* Button Frame - Mimicking the ornate bar */}
                        <div className="absolute inset-0 rounded-lg shadow-2xl bg-[#5c4731] border-2 border-[#3e260e]">
                            {/* Inner Gold Bar */}
                            <div className="absolute top-[2px] bottom-[2px] left-[2px] right-[2px] bg-gradient-to-b from-[#f7eac8] via-[#d4b679] to-[#8b6c45] rounded-md border border-[#fdf6e3]">
                                {/* Texture Overlay */}
                                <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/aged-paper.png')] mix-blend-overlay"></div>
                                {/* Shine effect */}
                                <div className="absolute top-0 w-full h-1/2 bg-gradient-to-b from-white/40 to-transparent rounded-t-md"></div>
                            </div>

                            {/* Ornate End Decorations (Gems) */}
                            <div className="absolute left-2 top-1/2 -translate-y-1/2 w-4 h-8 bg-[#2a2a2a] border border-[#6b583e] flex items-center justify-center rounded-sm shadow-inner">
                                <div className="w-2 h-4 bg-emerald-600 rounded-full shadow-[inset_0_0_2px_rgba(0,0,0,0.5),0_0_4px_rgba(16,185,129,0.5)]"></div>
                            </div>
                            <div className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-8 bg-[#2a2a2a] border border-[#6b583e] flex items-center justify-center rounded-sm shadow-inner">
                                <div className="w-2 h-4 bg-emerald-600 rounded-full shadow-[inset_0_0_2px_rgba(0,0,0,0.5),0_0_4px_rgba(16,185,129,0.5)]"></div>
                            </div>

                            {/* Ornate Swirls (CSS only approximation) */}
                            <div className="absolute left-8 top-1/2 -translate-y-1/2 w-8 h-full border-t border-b border-[#8b6c45] opacity-30"></div>
                            <div className="absolute right-8 top-1/2 -translate-y-1/2 w-8 h-full border-t border-b border-[#8b6c45] opacity-30"></div>
                        </div>

                        {/* Button Text */}
                        <span className="relative z-20 text-3xl font-black text-[#422a10] drop-shadow-[0_1px_0_rgba(255,255,255,0.4)] flex items-center gap-3 tracking-widest font-[family-name:var(--font-noto-serif)]">
                            立即测试 <span className="text-2xl opacity-80">→</span>
                        </span>
                    </Link>

                    {/* Secondary Button: 统计结果 */}
                    <Link
                        href="/stats"
                        className="group relative w-full h-16 flex items-center justify-center transition-all transform hover:scale-[1.02] active:scale-95 mt-2"
                    >
                        <div className="absolute inset-0 rounded-lg shadow-xl bg-[#5c4731] border-2 border-[#3e260e]">
                            <div className="absolute top-[2px] bottom-[2px] left-[2px] right-[2px] bg-gradient-to-b from-[#e6d5b0] via-[#c2a676] to-[#7a5d38] rounded-md border border-[#ebd5a5]">
                                <div className="absolute top-0 w-full h-1/2 bg-gradient-to-b from-white/30 to-transparent rounded-t-md"></div>
                            </div>
                            {/* Gems (Ruby for secondary) */}
                            <div className="absolute left-2 top-1/2 -translate-y-1/2 w-3 h-6 bg-[#2a2a2a] border border-[#6b583e] flex items-center justify-center rounded-sm">
                                <div className="w-1.5 h-3 bg-red-700 rounded-full shadow-[inset_0_0_2px_rgba(0,0,0,0.5)]"></div>
                            </div>
                            <div className="absolute right-2 top-1/2 -translate-y-1/2 w-3 h-6 bg-[#2a2a2a] border border-[#6b583e] flex items-center justify-center rounded-sm">
                                <div className="w-1.5 h-3 bg-red-700 rounded-full shadow-[inset_0_0_2px_rgba(0,0,0,0.5)]"></div>
                            </div>
                        </div>

                        <span className="relative z-20 text-2xl font-black text-[#5a3a18] drop-shadow-[0_1px_0_rgba(255,255,255,0.4)] flex items-center gap-2 tracking-widest font-[family-name:var(--font-noto-serif)]">
                            统计结果 <Globe2 size={20} className="opacity-70" />
                        </span>
                    </Link>
                </div>

                {/* Bottom Icons */}
                <div className="pt-12 grid grid-cols-2 gap-16 w-full max-w-sm">
                    <div className="flex flex-col items-center gap-3 group cursor-pointer transition-transform hover:scale-110">
                        <div className="p-3 bg-gradient-to-br from-[#f3e5c7] to-[#d4b679] rounded-xl border-2 border-[#8b6c45] shadow-lg">
                            <TrendingUp size={32} className="text-[#5a3a18]" />
                        </div>
                        <span className="text-[#4a3b2a] font-bold text-lg drop-shadow-sm font-[family-name:var(--font-noto-serif)]">经济增速</span>
                    </div>
                    <div className="flex flex-col items-center gap-3 group cursor-pointer transition-transform hover:scale-110">
                        <div className="p-3 bg-gradient-to-br from-[#f3e5c7] to-[#d4b679] rounded-xl border-2 border-[#8b6c45] shadow-lg">
                            <Globe2 size={32} className="text-[#5a3a18]" />
                        </div>
                        <span className="text-[#4a3b2a] font-bold text-lg drop-shadow-sm font-[family-name:var(--font-noto-serif)]">社会文化</span>
                    </div>
                </div>

            </div>
        </main>
    );
}
