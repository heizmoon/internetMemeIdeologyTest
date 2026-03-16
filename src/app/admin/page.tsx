import Link from 'next/link';
import { DIMENSIONS, QUESTIONS } from '@/lib/config';

export default function AdminPage() {
  return (
    <main className="min-h-screen bg-slate-100 py-10 px-4">
      <div className="max-w-5xl mx-auto space-y-6">
        <header className="bg-white rounded-2xl border border-slate-200 p-6">
          <h1 className="text-3xl font-black text-slate-900">Admin Configuration</h1>
          <p className="text-slate-600 mt-2">
            Edit <code className="bg-slate-100 px-1 py-0.5 rounded">src/data/ideology-config.json</code> to add, update,
            or remove dimensions, questions, answer options, and scoring logic.
          </p>
          <div className="flex gap-3 mt-4">
            <Link href="/" className="px-4 py-2 rounded-lg bg-slate-900 text-white hover:bg-black">Home</Link>
            <Link href="/quiz" className="px-4 py-2 rounded-lg bg-slate-200 text-slate-900 hover:bg-slate-300">Run Test</Link>
          </div>
        </header>

        <section className="bg-white rounded-2xl border border-slate-200 p-6">
          <h2 className="text-xl font-bold text-slate-900 mb-4">Dimensions ({DIMENSIONS.length})</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {DIMENSIONS.map((dimension) => (
              <div key={dimension.id} className="rounded-xl border border-slate-200 p-4">
                <p className="font-semibold text-slate-900">{dimension.name}</p>
                <p className="text-sm text-slate-500">ID: {dimension.id}</p>
                <p className="text-sm mt-2">
                  <span className="font-medium">Left:</span> {dimension.leftLabel}
                </p>
                <p className="text-sm">
                  <span className="font-medium">Right:</span> {dimension.rightLabel}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-white rounded-2xl border border-slate-200 p-6">
          <h2 className="text-xl font-bold text-slate-900 mb-4">Questions ({QUESTIONS.length})</h2>
          <div className="space-y-4">
            {QUESTIONS.map((question, index) => (
              <article key={question.id} className="rounded-xl border border-slate-200 p-4">
                <p className="text-xs uppercase tracking-wide text-slate-500">Question {index + 1} / {question.id}</p>
                <h3 className="text-lg font-semibold text-slate-900 mt-1">{question.text}</h3>
                <ul className="mt-3 space-y-2 text-sm text-slate-700">
                  {question.options.map((option) => (
                    <li key={option.id}>
                      <span className="font-medium">{option.id.toUpperCase()}.</span> {option.text}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
