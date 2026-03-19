import QuizRunner from '@/components/QuizRunner';
import { TEST_CONFIG } from '@/lib/config';

export default function QuizPage() {
  return (
    <main 
      className="min-h-[100dvh] relative pt-2 md:pt-4 px-6 selection:bg-[#a8824f]/30"
    >
      <div className="w-full h-12 md:h-16 flex items-center justify-center relative z-10 mb-8">
        <h1 
          className="text-xl md:text-2xl font-serif font-black tracking-[0.2em] text-[#f2ecd9] drop-shadow-lg"
          style={{ textShadow: '0 2px 4px rgba(0,0,0,0.8), 0 0 10px rgba(0,0,0,0.4)' }}
        >
          {TEST_CONFIG.title}
        </h1>
      </div>

      <div className="max-w-3xl mx-auto mb-8 text-center relative z-10">
        <p className="mt-3 font-serif text-[#3f210d] font-bold tracking-wide" style={{ textShadow: '0 1px 1px rgba(255,255,255,0.5)' }}>
          {TEST_CONFIG.description}
        </p>
      </div>
      <QuizRunner />
    </main>
  );
}
