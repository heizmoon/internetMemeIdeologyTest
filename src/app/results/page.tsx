'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';
import { calculateScore, getIdeologyLabel } from '@/lib/scoring';
import { QUESTIONS } from '@/lib/questions';
import { DIMENSIONS } from '@/lib/types';
import ResultRadarChart from '@/components/RadarChart';
import AxisBar from '@/components/AxisBar';
import Link from 'next/link';
import { Home, Share2, Download } from 'lucide-react';
import { motion } from 'framer-motion';

function ResultsContent() {
    const searchParams = useSearchParams();
    const [scores, setScores] = useState<any>(null);
    const [label, setLabel] = useState("");

    useEffect(() => {
        const answers: Record<string, string> = {};
        QUESTIONS.forEach(q => {
            const val = searchParams.get(q.id);
            if (val) answers[q.id] = val; // Store as string ID
        });

        const calculatedScores = calculateScore(answers, QUESTIONS);
        setScores(calculatedScores);
        setLabel(getIdeologyLabel(calculatedScores));

        // Simulate submitting to API (fire and forget)
        fetch('/api/submit', {
            method: 'POST',
            body: JSON.stringify(calculatedScores)
        }).catch(console.error);

    }, [searchParams]);

    if (!scores) return <div className="min-h-screen flex items-center justify-center">计算中...</div>;

    return (
        <div className="min-h-screen bg-slate-50 py-12 px-4">
            <div className="max-w-4xl mx-auto space-y-8">

                {/* Header Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-3xl shadow-xl p-8 text-center border border-purple-100 overflow-hidden relative"
                >
                    <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-purple-500 to-blue-500" />

                    <h2 className="text-lg text-gray-500 mb-2 uppercase tracking-wider font-semibold">测试结果</h2>
                    <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600">
                            {label}
                        </span>
                    </h1>

                    <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed">
                        根据你的回答，你的互联网意识形态更偏向于上述标签。
                        这不仅是一个标签，更是你在赛博空间中的生存姿态。
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Radar Chart */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="bg-white rounded-3xl shadow-lg p-6 flex flex-col items-center justify-center"
                    >
                        <h3 className="text-xl font-bold text-gray-800 mb-4">综合雷达图</h3>
                        <ResultRadarChart scores={scores} />
                    </motion.div>

                    {/* Axis Bars */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                        className="bg-white rounded-3xl shadow-lg p-8"
                    >
                        <h3 className="text-xl font-bold text-gray-800 mb-6">详细维度分析</h3>
                        <div className="space-y-2">
                            {DIMENSIONS.map(dim => (
                                <AxisBar key={dim.id} dimension={dim} score={scores[dim.id]} />
                            ))}
                        </div>
                    </motion.div>
                </div>

                {/* Actions */}
                <div className="flex justify-center gap-4 mt-12">
                    <Link href="/" className="flex items-center gap-2 px-6 py-3 bg-gray-800 text-white rounded-xl hover:bg-gray-900 transition-colors">
                        <Home size={20} />
                        返回首页
                    </Link>
                    <Link href="/stats" className="flex items-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-colors">
                        查看全网统计
                    </Link>
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
    )
}
