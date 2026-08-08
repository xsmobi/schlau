'use client';

import Link from 'next/link';
import { useState } from 'react';
import { createClient } from '../lib/supabase/client';

const style = {
  card: `mt-4 rounded-md bg-white shadow p-4 text-center`,
  name: `text-lg font-semibold text-gray-800`,
  code: `mt-2 font-mono text-6xl tracking-[0.2em] text-gray-900`,
  copyButton: `mt-1 text-xs text-blue-700 underline disabled:no-underline disabled:text-gray-500`,
  actions: `mt-4 flex items-center justify-center gap-2`,
  button: `rounded-md px-4 py-2 text-sm font-medium text-white bg-gray-800 hover:bg-gray-900 disabled:opacity-50`,
  linkButton: `rounded-md px-4 py-2 text-sm font-medium text-white bg-gray-800 hover:bg-gray-900`,
  error: `mt-2 text-sm text-red-600`,
};

export default function JoinCodeCard({ classId, name, initialCode }) {
  const [code, setCode] = useState(initialCode);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);
  const [copyFailed, setCopyFailed] = useState(false);
  const [supabase] = useState(() => createClient());

  const regenerate = async () => {
    setLoading(true);
    setError(null);
    const { data, error } = await supabase.rpc('regenerate_join_code', { p_class_id: classId });
    setLoading(false);
    if (error) {
      setError('Code konnte nicht erneuert werden.');
      return;
    }
    setCode(data);
    // A copy of the old code would now be stale - don't leave "Copied!"
    // showing next to a code that isn't the one actually on the clipboard.
    setCopied(false);
    setCopyFailed(false);
  };

  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopyFailed(false);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // Clipboard access can fail (permissions, insecure context, etc.) -
      // the plain-text code right above is still there to copy by hand.
      setCopyFailed(true);
    }
  };

  return (
    <div className={style.card}>
      <div className={style.name}>{name}</div>
      <div className={style.code}>{code}</div>
      <button type="button" className={style.copyButton} onClick={copyCode} disabled={copied}>
        {copied ? 'Copied!' : 'Copy Code'}
      </button>
      {copyFailed && <p className={style.error}>Copy failed - please copy the code above by hand.</p>}
      <div className={style.actions}>
        <button type="button" className={style.button} onClick={regenerate} disabled={loading}>
          {loading ? 'Regenerating…' : 'Regenerate Code'}
        </button>
        <Link href={`/leaderboard?class=${classId}`} className={style.linkButton}>Leaderboard</Link>
      </div>
      {error && <p className={style.error}>{error}</p>}
    </div>
  );
}
