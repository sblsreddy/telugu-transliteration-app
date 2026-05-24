'use client';

import { useState } from 'react';

type HomePageProps = {
  fallbackMode: boolean;
};

export default function HomePage({ fallbackMode }: HomePageProps) {
  const [sourceText, setSourceText] = useState('');
  const [resultText, setResultText] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!sourceText.trim()) return;

    setStatus('Transliterating...');

    try {
      const response = await fetch('/api/transliterate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: sourceText }),
      });

      const contentType = response.headers.get('content-type') || '';
      const body: { result?: string; error?: string } =
        contentType.includes('application/json')
          ? await response.json()
          : { error: `Server returned non-JSON response: ${await response.text() || response.statusText}` };

      if (response.ok) {
        setResultText(body.result ?? '');
        setStatus('Saved to history.');
      } else {
        setResultText('');
        setStatus(body.error || `Unable to transliterate (status ${response.status}).`);
      }
    } catch (error) {
      console.error('Transliteration fetch error:', error);
      setResultText('');
      setStatus('Unable to reach transliteration service. Please try again later.');
    }
  };

  return (
    <main className="min-h-screen px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl rounded-3xl border border-slate-700 bg-slate-900/90 p-8 shadow-2xl shadow-slate-950/20">
        <div className="mb-10 flex flex-col gap-4 text-center">
          <p className="text-sm uppercase tracking-[0.35em] text-cyan-300">Telugu Transliteration</p>
          <h1 className="text-4xl font-semibold text-white sm:text-5xl">English &rarr; Telugu</h1>
          <p className="mx-auto max-w-2xl text-slate-300">
            Enter English text and generate Telugu script instantly. The app stores each transliteration so you can review your history in the admin dashboard.
          </p>
        </div>

        {fallbackMode ? (
          <div className="mb-8 rounded-3xl border border-amber-500/40 bg-amber-500/10 p-4 text-amber-100">
            <p className="text-sm font-semibold">Sandbox fallback mode active</p>
            <p className="mt-1 text-sm text-amber-200">
              Translation history is stored in-memory only. Configure `DATABASE_URL` for persistent storage.
            </p>
          </div>
        ) : null}

        <form onSubmit={handleSubmit} className="grid gap-6">
          <label className="block">
            <span className="mb-2 block text-sm font-medium text-slate-200">English text</span>
            <textarea
              value={sourceText}
              onChange={(event) => setSourceText(event.target.value)}
              rows={5}
              className="w-full rounded-2xl border border-slate-700 bg-slate-950/80 p-4 text-slate-100 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20"
              placeholder="Enter a sentence like: namaste, telugu ante enta chala ramyam"
            />
          </label>

          <button type="submit" className="inline-flex items-center justify-center rounded-2xl bg-cyan-500 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400">
            Transliterate
          </button>

          {status ? <p className="text-sm text-slate-300">{status}</p> : null}
        </form>

        <section className="mt-10 rounded-3xl bg-slate-950/80 p-6 ring-1 ring-slate-700">
          <h2 className="text-xl font-semibold text-white">Transliteration result</h2>
          <div className="mt-4 min-h-[5rem] rounded-2xl border border-slate-700 bg-slate-900/95 p-5 text-slate-200">
            {resultText ? <p className="whitespace-pre-wrap text-lg leading-relaxed">{resultText}</p> : <p className="text-slate-500">Your Telugu output appears here after transliteration.</p>}
          </div>
        </section>

        <section className="mt-10 grid gap-4 rounded-3xl bg-slate-950/80 p-6 ring-1 ring-slate-700 sm:grid-cols-2">
          <div>
            <h3 className="text-lg font-semibold text-white">Admin Dashboard</h3>
            <p className="mt-2 text-slate-300">Review translation history and manage results from the admin dashboard.</p>
          </div>
          <div className="rounded-3xl border border-slate-700 bg-slate-900/90 p-4">
            <p className="text-sm text-slate-400">Open</p>
            <a href="/admin" className="mt-3 inline-flex rounded-2xl bg-slate-800 px-4 py-3 text-sm font-medium text-cyan-300 hover:bg-slate-700">Admin history</a>
          </div>
        </section>
      </div>
    </main>
  );
}
