'use client';

import { useEffect, useState } from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell } from 'recharts';
import { Home, Users } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface StatsData {
    total: number;
    distribution: Record<string, number>;
    averages: Record<string, number>;
}

export default function StatsPage() {
    const [data, setData] = useState<StatsData | null>(null);

    useEffect(() => {
        fetch('/api/stats')
            .then(res => res.json())
            .then(setData);
    }, []);

    if (!data) return <div className="min-h-screen flex items-center justify-center">加载数据中...</div>;

    const chartData = Object.entries(data.distribution).map(([name, count]) => ({
        name: name.split(' ')[0], // Simpler name for x-axis
        fullName: name,
        count
    })).sort((a, b) => b.count - a.count);

    const colors = ['#8884d8', '#82ca9d', '#ffc658', '#ff7f50', '#8dd1e1', '#a4de6c'];

    return (
        <div className="min-h-screen bg-slate-900 text-white p-6">
            <div className="max-w-6xl mx-auto">
                <header className="flex flex-col md:flex-row justify-between items-center mb-12 border-b border-gray-800 pb-8">
                    <div>
                        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                            全网意识形态统计
                        </h1>
                        <p className="text-gray-400 mt-2">实时更新的互联网政治光谱分布</p>
                    </div>

                    <div className="flex items-center gap-4 mt-6 md:mt-0">
                        <div className="bg-white/10 px-4 py-2 rounded-lg flex items-center gap-2">
                            <Users className="text-blue-400" size={20} />
                            <span className="font-mono text-xl font-bold">{data.total.toLocaleString()}</span>
                            <span className="text-xs text-gray-400">次测试</span>
                        </div>
                        <Link href="/" className="bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded-lg transition-colors flex items-center gap-2">
                            <Home size={18} />
                            <span>返回首页</span>
                        </Link>
                    </div>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="md:col-span-2 bg-gray-800/50 rounded-2xl p-6 border border-gray-700">
                        <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                            <span className="w-1 h-6 bg-purple-500 rounded-full" />
                            意识形态分布
                        </h2>
                        <div className="h-[400px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={chartData} layout="vertical" margin={{ left: 40, right: 40 }}>
                                    <XAxis type="number" hide />
                                    <YAxis dataKey="name" type="category" width={100} tick={{ fill: '#9ca3af' }} />
                                    <Tooltip
                                        contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '8px' }}
                                        itemStyle={{ color: '#fff' }}
                                        cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                                    />
                                    <Bar dataKey="count" radius={[0, 4, 4, 0]}>
                                        {chartData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="bg-gray-800/50 rounded-2xl p-6 border border-gray-700">
                            <h2 className="text-xl font-semibold mb-4">主要发现</h2>
                            <div className="space-y-4">
                                <div className="p-4 bg-purple-500/10 rounded-lg border border-purple-500/20">
                                    <h4 className="text-sm text-purple-300 font-medium mb-1">最主流群体</h4>
                                    <p className="text-2xl font-bold">{chartData[0]?.fullName}</p>
                                    <p className="text-xs text-gray-400 mt-1">占比 {((chartData[0]?.count / data.total) * 100).toFixed(1)}%</p>
                                </div>
                                {/* Add more insights based on average scores if needed */}
                            </div>
                        </div>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="p-6 rounded-2xl bg-gradient-to-br from-blue-600/20 to-purple-600/20 border border-white/10"
                        >
                            <p className="text-sm text-gray-300 leading-relaxed italic">
                                “互联网不是法外之地，但也绝不是除了赢就是输的角斗场。这个图表展示了我们虽然观点不同，但依然共存于此。”
                            </p>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
}
