import QuizRunner from '@/components/QuizRunner';
import TopBar from '@/components/TopBar';

export default function QuizPage() {
  return (
    <main
      className="min-h-[100dvh] relative pt-2 md:pt-4 px-5 md:px-6 pb-12 selection:bg-[#a8824f]/30"
    >
      <TopBar className="mb-7" />

      <div className="max-w-2xl mx-auto mb-8 text-left relative z-10 px-5 py-4 md:px-6 rounded-[24px] border border-[#8b6c45]/14 bg-[rgba(255,248,228,0.18)] shadow-[0_8px_26px_rgba(93,61,25,0.06)]">
        <div className="mx-auto max-w-[34ch] md:max-w-[36ch]">
          <p
            className="font-serif text-[#3f210d] font-bold tracking-[0.03em] leading-[1.65]"
            style={{ textShadow: '0 1px 1px rgba(255,255,255,0.5)' }}
          >
            通过一系列网络热门话题的灵魂拷问，测定你在键政圈的身份。
          </p>
        </div>
      </div>

      <QuizRunner />
    </main>
  );
}
