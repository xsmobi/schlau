'use client';

import { useState } from 'react';
import { createClient } from '../lib/supabase/client';

const style = {
  card: `mt-4 rounded-md bg-white shadow p-4 text-center`,
  name: `text-lg font-semibold text-gray-800`,
  code: `mt-2 font-mono text-6xl tracking-[0.2em] text-gray-900`,
  button: `mt-4 rounded-md px-4 py-2 text-sm font-medium text-white bg-gray-800 hover:bg-gray-900 disabled:opacity-50`,
  error: `mt-2 text-sm text-red-600`,
};

export default function JoinCodeCard({ classId, name, initialCode }) {
  const [code, setCode] = useState(initialCode);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
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
  };

  return (
    <div className={style.card}>
      <div className={style.name}>{name}</div>
      <div className={style.code}>{code}</div>
      <button type="button" className={style.button} onClick={regenerate} disabled={loading}>
        {loading ? 'Wird erneuert...' : 'Code erneuern'}
      </button>
      {error && <p className={style.error}>{error}</p>}
    </div>
  );
}
