import QuizRunner from '@/components/QuizRunner';
import { TEST_CONFIG } from '@/lib/config';

export default function QuizPage() {
  return (
    <main 
      className="min-h-[100dvh] relative py-10 px-6 selection:bg-[#a8824f]/30"
      style={{
        backgroundImage: 'url("/background.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center bottom',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed'
      }}
    >
      <div className="max-w-3xl mx-auto mb-8 text-center relative z-10">
        <h1 className="text-3xl md:text-4xl font-black font-serif text-[#2a1508] tracking-wider" style={{ textShadow: '0 1px 2px rgba(255,255,255,0.6)' }}>
          {TEST_CONFIG.title}
        </h1>
        <p className="mt-3 font-serif text-[#3f210d] font-bold tracking-wide" style={{ textShadow: '0 1px 1px rgba(255,255,255,0.5)' }}>
          {TEST_CONFIG.description}
        </p>
      </div>
      <QuizRunner />
    </main>
  );
}
