import { Question } from './types';

export const QUESTIONS: Question[] = [
    // --- 特权与公信力 (Privilege & Credibility) ---
    {
        id: 'q1_dong',
        text: "【特权三连】董袭莹（“4+4”进协和）、黄杨甜（天价耳环）、纳尔那茜（定向委培）。看到这些新闻，你的第一反应是？",
        options: [
            { id: 'a', text: "非常愤怒，这是“逆向淘汰”，寒门再难出贵子。", effect: { economic: -10, environmental: 5 } }, // Anti-Privilege (Left/Pop)
            { id: 'b', text: "麻了，这就是现实。人家几代人的努力凭什么输给你十年寒窗？", effect: { economic: 10, environmental: 10 } }, // Status Quo / Doomer
            { id: 'c', text: "只恨自己不是特权阶级，有机会我也想走后门。", effect: { cultural: -5 } }, // Realist/Egoist
            { id: 'd', text: "不要被带节奏，官方通报已经澄清了部分事实。", effect: { national: -10 } }, // Pro-Establishment (Tu)
            { id: 'e', text: "没听说过 / 不知道。", effect: {} }
        ]
    },
    {
        id: 'q2_drug',
        text: "南通文旅宣传“吸毒记录封存”，评论区热评“哪位少爷吸了”。你支持封存吗？",
        options: [
            { id: 'a', text: "坚决反对！这是为特权阶级量身定做的保护伞。", effect: { economic: -15, environmental: 5 } }, // Anti-Privilege
            { id: 'b', text: "支持，应当给人改过自新的机会（人权/法治）。", effect: { cultural: 10 } }, // Liberal
            { id: 'c', text: "严查造谣网民！这种阴谋论是在破坏公信力。", effect: { national: -15 } }, // Authority (Tu)
            { id: 'd', text: "无所谓，反正普通人吸了肯定没好果子吃。", effect: { environmental: 10 } }, // Doomer
            { id: 'e', text: "不了解相关法律。", effect: {} }
        ]
    },
    {
        id: 'q3_license',
        text: "广西“亮证姐”事件，官方称证件是其丈夫的且双方是远亲。你信吗？",
        options: [
            { id: 'a', text: "信通报是粉红，不信是境外势力（屁股大战）。", effect: { environmental: 15 } }, // Deconstruction/Chaos
            { id: 'b', text: "侮辱智商，这不仅是特权，更是公权力的私用。", effect: { national: 10 } }, // Critical
            { id: 'c', text: "相信官方调查，网络舆论容易反转。", effect: { national: -15 } }, // Trust Authority
            { id: 'd', text: "这剧情太典了，经典的“临时工/远方亲戚”。", effect: { cultural: -5 } }, // Cynic
            { id: 'e', text: "没关注这个新闻。", effect: {} }
        ]
    },

    // --- 社会结构与性别理论 (Three Theories) ---
    {
        id: 'q4_daimeng',
        text: "戴梦提出“力工梭哈”理论（男性是供养者，女性有退出机制，所以男性不该梭哈婚姻）。你怎么看？",
        options: [
            { id: 'a', text: "集美们/郭楠们别吵了，都是底层互害。", effect: { economic: -10 } }, // Class conscious
            { id: 'b', text: "支持！这揭示了男性在婚恋市场的被剥夺感。", effect: { cultural: -15 } }, // Gender Conservative/MRA
            { id: 'c', text: "极端言论，制造性别对立，不利于社会稳定。", effect: { national: -10, cultural: 5 } }, // Establishment/Conservative
            { id: 'd', text: "不想结婚就不结，哪来这么多理论（现充）。", effect: { environmental: -5 } }, // Normie
            { id: 'e', text: "我不懂什么叫力工梭哈。", effect: {} }
        ]
    },
    {
        id: 'q5_fengge',
        text: "峰哥（王命天涯）的“性压抑大一统理论”认为戾气源于底层男性的绝望。你觉得？",
        options: [
            { id: 'a', text: "话糙理不糙，刺破了那种虚幻的自尊。", effect: { cultural: -5, economic: -5 } }, // Realist
            { id: 'b', text: "低俗博眼球，把社会问题下三路化。", effect: { cultural: 10 } }, // Moralist
            { id: 'c', text: "峰哥现在都装怂了，咱也别冲塔了。", effect: { environmental: 5 } }, // Self-preservation
            { id: 'd', text: "典型的小市民视角，格局小了。", effect: { national: -5 } }, // Grand Narrative
            { id: 'e', text: "不知道峰哥是谁。", effect: {} }
        ]
    },
    {
        id: 'q6_android',
        text: "户晨风提出“苹果人”vs“安卓人”的阶层划分。你认为？",
        options: [
            { id: 'a', text: "很真实，消费习惯确实折射了阶层认知隔阂。", effect: { economic: 10 } }, // Market/Class Realist
            { id: 'b', text: "刻意制造对立，用消费主义标签化人群。", effect: { economic: -10 } }, // Anti-Consumerism
            { id: 'c', text: "因为这个被封杀？太敏感了吧。", effect: { cultural: 10 } }, // Liberal (Free Speech)
            { id: 'd', text: "不知道，我用华为（手动狗头）。", effect: { national: -10, environmental: 5 } }, // Meme/Nationalist
            { id: 'e', text: "我不了解这个理论。", effect: {} }
        ]
    },

    // --- 意识形态与历史解构 (Ideology & History) ---
    {
        id: 'q7_1644',
        text: "【1644史观】认为中国近代衰落始于清军入关，汉文明本身是先进的。你认同吗？",
        options: [
            { id: 'a', text: "非常认同！崖山之后无中华，满清误我三百年！", effect: { national: -20, cultural: -10 } }, // Han Nationalist (Strong)
            { id: 'b', text: "历史虚无主义，封建王朝本质都一样，别搞皇汉那套。", effect: { economic: -15, national: 10 } }, // Marxist/Class View
            { id: 'c', text: "这是为了论证“集权合理性”的变体（虽坏但那是外族坏）。", effect: { cultural: 10 } }, // Critical Analysis
            { id: 'd', text: "明朝有蒸汽机？这伪史论也太离谱了。", effect: { cultural: 5 } }, // Rationalist
            { id: 'e', text: "我历史不好，不清楚。", effect: {} }
        ]
    },
    {
        id: 'q8_kvisa',
        text: "面对“K字签证”引才争议，以及可能的“出口转内销”漏洞。你的态度？",
        options: [
            { id: 'a', text: "坚决反对！非我族类其心必异，还挤占就业。", effect: { national: -15 } }, // Xenophobic/Nationalist
            { id: 'b', text: "支持开放，引入竞争才能进步，还能缓解老龄化。", effect: { economic: 15, national: 15 } }, // Globalist/Neoliberal
            { id: 'c', text: "如果我也能润出去变K签回来就好了（润学）。", effect: { national: 10, environmental: 5 } }, // Runologist
            { id: 'd', text: "只要不给超国民待遇就行。", effect: { economic: 5 } }, // Moderate
            { id: 'e', text: "不关心签证政策。", effect: {} }
        ]
    },
    {
        id: 'q9_maipian',
        text: "博主“麦片”论证“现行政策没问题，困难全怪外部产业链压迫”。这种观点是？",
        options: [
            { id: 'a', text: "高屋建瓴！必须一致对外，打破霸权。", effect: { national: -15 } }, // Establishment/Nationalist
            { id: 'b', text: "典型的“保皇党”/修正主义，无视内部矛盾。", effect: { economic: -15, national: 5 } }, // Leftist
            { id: 'c', text: "一种精神胜利法（赢学），听听就好。", effect: { environmental: 5 } }, // Cynic
            { id: 'd', text: "比较客观，涵盖了地缘政治视角。", effect: { national: -5 } }, // Moderate Pro-Gov
            { id: 'e', text: "没看过他的视频。", effect: {} }
        ]
    },

    // --- 舆论生态 (Deconstruction) ---
    {
        id: 'q10_dufu',
        text: "有人指责杜甫写《茅屋为秋风所破歌》是收了境外势力的钱，“恨唐党”。这是？",
        options: [
            { id: 'a', text: "这就是现在的网络“魔法对轰”，用荒谬解构荒谬。", effect: { cultural: 10, environmental: 10 } }, // Deconstruction/Liberal
            { id: 'b', text: "虽然极端，但爱国心是好的，要警惕文化渗透。", effect: { national: -10 } }, // Deep Pink
            { id: 'c', text: "反智主义狂欢，文化大革命2.0？", effect: { cultural: 15 } }, // Old School Liberal
            { id: 'd', text: "太乐了，建议严查李白是不是双重国籍。", effect: { environmental: 20 } }, // Pure Doomer (Lezi)
            { id: 'e', text: "不知道这个梗。", effect: {} }
        ]
    },
    {
        id: 'q11_waimai',
        text: "央视宣传外卖员“看风景搞摄影”，网民狂发“鲜花+鼓掌”表情包。你觉得这种现象说明？",
        options: [
            { id: 'a', text: "公信力崩塌，官媒完全脱离了现实。", effect: { national: 10, economic: -5 } },
            { id: 'b', text: "阴阳怪气成风，必须整治网络环境。", effect: { national: -15 } },
            { id: 'c', text: "无声的抗议，这是唯一安全的表达方式。", effect: { cultural: 10 } },
            { id: 'd', text: "不想看这些负能量。", effect: { environmental: -10 } },
            { id: 'e', text: "没看过这个短片。", effect: {} }
        ]
    },
    {
        id: 'q12_left',
        text: "针对“辽火儿”等传播的文革叙事/毛派观点回潮现象：",
        options: [
            { id: 'a', text: "盼他归！只有他能解决现在的贫富差距。", effect: { economic: -20, cultural: -10 } }, // Maoist
            { id: 'b', text: "那是动乱年代，千万不能重演。", effect: { cultural: 15 } }, // Liberal/Reviewer
            { id: 'c', text: "都是流量生意，现在的“左”大多是跟风。", effect: { economic: -5 } }, // Skeptic
            { id: 'd', text: "不管是左是右，能过好日子就行。", effect: { economic: 10 } }, // Pragmatist
            { id: 'e', text: "不了解相关历史争论。", effect: {} }
        ]
    },
    {
        id: 'q13_run',
        text: "如果未来局势不稳，关于“润”（移民），你的真实想法是？",
        options: [
            { id: 'a', text: "死也要死在种花家，绝不背叛。", effect: { national: -20 } },
            { id: 'b', text: "早就身在曹营心在汉，机会合适立马走。", effect: { national: 20 } },
            { id: 'c', text: "贫贱不能移，润是富人的游戏。", effect: { economic: -10 } },
            { id: 'd', text: "只想找个桃花源躺平（比如鹤岗）。", effect: { environmental: 10 } },
            { id: 'e', text: "没考虑过这个问题。", effect: {} }
        ]
    },
    {
        id: 'q14_future',
        text: "你认为现在的互联网舆论环境（键政圈）是？",
        options: [
            { id: 'a', text: "百花齐放，虽然乱但体现了觉醒。", effect: { cultural: 10 } },
            { id: 'b', text: "大屎坑，充满了戾气、极端和反智。", effect: { environmental: 15 } }, // Doomer
            { id: 'c', text: "信息茧房，只有立场没有真相。", effect: { cultural: 5 } },
            { id: 'd', text: "敌对势力渗透严重的战场，需严防死守。", effect: { national: -15 } },
            { id: 'e', text: "我不怎么看评论区。", effect: {} }
        ]
    },
    // Replaced Final Question
    {
        id: 'q15_lifestyle',
        text: "如果让你选择一种理想的生活状态，你会选择？",
        options: [
            { id: 'a', text: "大国崛起，成为世界霸主，即使个人要牺牲一些。", effect: { national: -20 } }, // Collective
            { id: 'b', text: "北欧模式，高福利、高税收、平权。", effect: { economic: -10, cultural: 10, national: 10 } }, // Social Dem
            { id: 'c', text: "美国模式，自由竞争，赢家通吃。", effect: { economic: 20, cultural: 10 } }, // Lib Right
            { id: 'd', text: "回归田园/小县城，虽然钱少但心里踏实。", effect: { environmental: -10 } }, // Trad/Normie
            { id: 'e', text: "赛博朋克，高科技低生活，只要有乐子就行。", effect: { environmental: 20 } } // Cyber/Doomer
        ]
    }
];
