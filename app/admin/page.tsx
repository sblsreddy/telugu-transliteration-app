'use client';

import { useState } from 'react';

type HistoryItem = {
  id: number;
  sourceText: string;
  resultText: string;
  createdAt: string;
};

export default function AdminPage() {
  const [secret, setSecret] = useState('');
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const loadHistory = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/history?secret=${encodeURIComponent(secret)}`);
      const body = await response.json();
      if (!response.ok) {
        throw new Error(body.error || 'Unable to load history.');
      }
      setHistory(body.history);
    } catch (err) {
      setError((err as Error).message);
      setHistory([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl rounded-3xl border border-slate-700 bg-slate-900/90 p-8 shadow-2xl shadow-slate-950/20">
        <div className="mb-8">
          <p className="text-sm uppercase tracking-[0.35em] text-cyan-300">Admin dashboard</p>
          <h1 className="mt-3 text-4xl font-semibold text-white sm:text-5xl">Translation History</h1>
          <p className="mt-4 max-w-2xl text-slate-300">
            Retrieve the latest transliteration records from the PostgreSQL history store. Enter the admin secret to view data.
          </p>
        </div>

        <div className="grid gap-4 rounded-3xl border border-slate-700 bg-slate-950/80 p-6 sm:grid-cols-[1fr_auto]">
          <input
            value={secret}
            onChange={(event) => setSecret(event.target.value)}
            type="password"
            placeholder="Admin secret"
            className="w-full rounded-2xl border border-slate-700 bg-slate-900/95 px-4 py-3 text-slate-100 outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20"
          />
          <button
            onClick={loadHistory}
            disabled={loading || !secret.trim()}
            className="rounded-2xl bg-cyan-500 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? 'Loading…' : 'Load History'}
          </button>
        </div>

        {error ? <p className="mt-4 text-sm text-rose-400">{error}</p> : null}

        <div className="mt-8 space-y-4">
          {history.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-slate-700 bg-slate-900/80 p-8 text-slate-500">
              <p>No history available yet. Add a transliteration on the home page after setting up the database.</p>
            </div>
          ) : (
            history.map((item) => (
              <div key={item.id} className="rounded-3xl border border-slate-700 bg-slate-950/80 p-6">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-sm uppercase tracking-[0.35em] text-slate-400">Record #{item.id}</p>
                  <p className="text-xs text-slate-500">{new Date(item.createdAt).toLocaleString()}</p>
                </div>
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  <div>
                    <h3 className="text-sm font-semibold text-slate-200">English</h3>
                    <p className="mt-2 text-slate-300">{item.sourceText}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-slate-200">Telugu</h3>
                    <p className="mt-2 text-slate-300">{item.resultText}</p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </main>
  );
}
