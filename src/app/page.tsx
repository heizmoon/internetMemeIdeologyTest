import Link from 'next/link';
import { ArrowRight, BrainCircuit, Globe2, TrendingUp } from 'lucide-react';

export default function Home() {
    return (
        <main className="min-h-screen bg-white text-slate-900 overflow-hidden relative selection:bg-purple-100">
            {/* Dynamic Background - Light Theme */}
            <div className="absolute inset-0 z-0 opacity-60">
                <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-purple-200/40 rounded-full blur-[100px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-200/40 rounded-full blur-[100px]" />
            </div>

            <div className="relative z-10 flex flex-col items-center justify-center min-h-screen container mx-auto px-4 text-center py-20">
                <div className="mb-14 inline-flex items-center gap-3 px-8 py-4 rounded-full bg-white/80 border border-slate-200 backdrop-blur-md shadow-md text-lg font-bold text-purple-700 tracking-wide transition-transform hover:scale-105 cursor-default ring-4 ring-purple-100/50">
                    <BrainCircuit size={24} className="text-purple-600" />
                    <span>2024-2025 中国互联网梗图谱</span>
                </div>

                <h1 className="text-6xl md:text-9xl font-black tracking-tight mb-16 drop-shadow-sm text-slate-900 leading-tight">
                    <span className="bg-clip-text text-transparent bg-gradient-to-br from-purple-600 via-blue-600 to-purple-600 animate-gradient-x bg-[length:200%_auto] pb-2">
                        你的“成分”
                    </span>
                    <br />
                    <span className="text-5xl md:text-8xl mt-6 block text-slate-800">
                        到底是什么？
                    </span>
                </h1>

                <p className="text-xl md:text-2xl text-slate-500 max-w-4xl mb-20 leading-relaxed font-normal">
                    通过一系列基于热门梗（如<span className="font-bold text-slate-800 border-b-4 border-purple-200 mx-1 px-1 hover:bg-purple-50 transition-colors">润学</span>、
                    <span className="font-bold text-slate-800 border-b-4 border-blue-200 mx-1 px-1 hover:bg-blue-50 transition-colors">躺平</span>、
                    <span className="font-bold text-slate-800 border-b-4 border-red-200 mx-1 px-1 hover:bg-red-50 transition-colors">入关</span>）的灵魂拷问，
                    <br className="hidden md:block" />
                    测定你在混乱赛博空间中的真实坐标。
                </p>

                <div className="flex flex-col sm:flex-row gap-10 w-full max-w-3xl mx-auto">
                    <Link
                        href="/quiz"
                        className="group flex-1 flex items-center justify-center gap-4 bg-slate-900 text-white font-bold py-8 px-12 rounded-3xl transition-all transform hover:-translate-y-2 hover:shadow-2xl shadow-xl shadow-slate-200/50 ring-4 ring-transparent hover:ring-purple-200 text-2xl"
                    >
                        <span>立即测试</span>
                        <ArrowRight size={32} className="group-hover:translate-x-2 transition-transform" />
                    </Link>
                    <Link
                        href="/stats"
                        className="flex-1 flex items-center justify-center gap-4 bg-white hover:bg-gray-50 border-2 border-slate-100 text-slate-600 font-bold py-8 px-12 rounded-3xl transition-all hover:shadow-xl hover:border-slate-300 transform hover:-translate-y-2 text-2xl"
                    >
                        <span>全网统计</span>
                        <Globe2 size={32} />
                    </Link>
                </div>

                <div className="mt-48 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-16 text-slate-400 font-medium w-full max-w-5xl px-4">
                    <div className="flex flex-col items-center gap-4 group cursor-default">
                        <div className="p-6 bg-white rounded-3xl group-hover:bg-red-50 transition-colors shadow-sm border border-slate-100 group-hover:scale-110 duration-300">
                            <TrendingUp size={40} className="text-red-400 group-hover:text-red-500 transition-colors" />
                        </div>
                        <span className="text-lg text-slate-600 group-hover:text-slate-900 transition-colors">经济观念</span>
                    </div>
                    <div className="flex flex-col items-center gap-4 group cursor-default">
                        <div className="p-5 bg-white rounded-3xl group-hover:bg-blue-50 transition-colors shadow-sm border border-slate-100 group-hover:scale-110 duration-300">
                            <Globe2 size={36} className="text-blue-400 group-hover:text-blue-500 transition-colors" />
                        </div>
                        <span className="text-lg text-slate-600 group-hover:text-slate-900 transition-colors">社会文化</span>
                    </div>
                </div>
            </div>
        </main>
    );
}
