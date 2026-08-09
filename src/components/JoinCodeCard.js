'use client';

import Link from 'next/link';
import { useState } from 'react';
import { LuRefreshCw, LuTrophy, LuUsers } from 'react-icons/lu';
import { createClient } from '../lib/supabase/client';

const style = {
  card: `mt-4 rounded-md bg-white shadow p-4 text-center`,
  name: `text-lg font-semibold text-gray-800`,
  code: `mt-2 font-mono text-6xl tracking-[0.2em] text-gray-900`,
  copyButton: `mt-1 text-xs text-blue-700 underline disabled:no-underline disabled:text-gray-500`,
  // Icon above a small label, not inline icon+text or text alone - German
  // labels ("Regenerate Code" etc.) don't reliably fit at readable sizes
  // in a 3-across row otherwise. w-full so all three buttons/links share
  // equal width regardless of being a <button> or <Link>.
  actions: `mt-4 flex items-center justify-center gap-2`,
  actionButton: `flex w-full flex-col items-center gap-1 rounded-md px-2 py-2 text-xs font-medium text-gray-700 hover:bg-gray-100 disabled:opacity-50`,
  actionIcon: `w-6 h-6`,
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
        <button type="button" className={style.actionButton} onClick={regenerate} disabled={loading}>
          <LuRefreshCw className={style.actionIcon} />
          <span>{loading ? 'Regenerating…' : 'Regenerate Code'}</span>
        </button>
        <Link href={`/leaderboard?class=${classId}`} className={style.actionButton}>
          <LuTrophy className={style.actionIcon} />
          <span>Leaderboard</span>
        </Link>
        <Link href={`/class/members?class=${classId}`} className={style.actionButton}>
          <LuUsers className={style.actionIcon} />
          <span>Members</span>
        </Link>
      </div>
      {error && <p className={style.error}>{error}</p>}
    </div>
  );
}
