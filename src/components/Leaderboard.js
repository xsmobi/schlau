'use client';

import { useEffect, useState } from 'react';
import { createClient } from '../lib/supabase/client';

const style = {
  controls: `flex flex-wrap items-center justify-center gap-2 mt-4`,
  select: `rounded-md border border-gray-300 px-2 py-1 text-sm text-neutral-800`,
  toggleGroup: `flex rounded-md overflow-hidden border border-gray-300`,
  toggleBtn: `px-3 py-1 text-sm font-medium bg-white text-gray-700 hover:bg-gray-100`,
  toggleBtnActive: `px-3 py-1 text-sm font-medium bg-gray-800 text-white`,
  table: `w-full mt-4 border-collapse`,
  th: `text-left text-sm font-semibold text-gray-600 border-b border-gray-300 py-2 px-2 cursor-pointer select-none`,
  thActive: `text-left text-sm font-semibold text-gray-900 border-b border-gray-300 py-2 px-2 cursor-pointer select-none underline`,
  td: `text-sm text-gray-800 py-2 px-2 border-b border-gray-200`,
  empty: `text-sm text-gray-600 text-center mt-4`,
  error: `text-sm text-red-600 text-center mt-4`,
};

// 'day' | 'week' map directly to get_class_leaderboard's p_period.
const PERIODS = [
  { value: 'day', label: 'Heute' },
  { value: 'week', label: 'Diese Woche' },
];

// Which count column drives the current sort - both are always fetched
// together (get_class_leaderboard returns both per period), sorting is
// purely a client-side re-order of the same rows.
const SORT_KEYS = [
  { value: 'activity_count', label: 'Aktivität' },
  { value: 'explainer_count', label: 'Erklärungen' },
];

export default function Leaderboard({ classes }) {
  const [supabase] = useState(() => createClient());
  const [classId, setClassId] = useState(classes[0]?.id ?? null);
  const [period, setPeriod] = useState('day');
  const [sortBy, setSortBy] = useState('activity_count');
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!classId) return;
    let cancelled = false;

    const load = async () => {
      setLoading(true);
      const { data, error: rpcError } = await supabase.rpc('get_class_leaderboard', {
        p_class_id: classId,
        p_period: period,
      });
      if (cancelled) return;
      setLoading(false);
      if (rpcError) {
        setError('Bestenliste konnte nicht geladen werden.');
        return;
      }
      setError(null);
      setRows(data ?? []);
    };

    load();

    const channel = supabase
      .channel(`leaderboard:${classId}`, { config: { private: true } })
      .on('broadcast', { event: 'activity' }, load)
      .subscribe();

    return () => {
      cancelled = true;
      supabase.removeChannel(channel);
    };
  }, [supabase, classId, period]);

  const sorted = [...rows].sort((a, b) => b[sortBy] - a[sortBy]);

  return (
    <div>
      {classes.length > 1 && (
        <div className={style.controls}>
          <select
            className={style.select}
            value={classId ?? ''}
            onChange={(event) => setClassId(event.target.value)}
          >
            {classes.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>
      )}

      <div className={style.controls}>
        <div className={style.toggleGroup}>
          {PERIODS.map((p) => (
            <button
              key={p.value}
              type="button"
              className={period === p.value ? style.toggleBtnActive : style.toggleBtn}
              onClick={() => setPeriod(p.value)}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {error && <p className={style.error}>{error}</p>}

      {!error && !loading && sorted.length === 0 && (
        <p className={style.empty}>Noch keine Aktivität in diesem Zeitraum.</p>
      )}

      {!error && sorted.length > 0 && (
        <table className={style.table}>
          <thead>
            <tr>
              <th className={style.th}>#</th>
              <th className={style.th}>Name</th>
              {SORT_KEYS.map((k) => (
                <th
                  key={k.value}
                  className={sortBy === k.value ? style.thActive : style.th}
                  onClick={() => setSortBy(k.value)}
                >
                  {k.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sorted.map((row, i) => (
              <tr key={row.pseudonym}>
                <td className={style.td}>{i + 1}</td>
                <td className={style.td}>{row.pseudonym}</td>
                <td className={style.td}>{row.activity_count}</td>
                <td className={style.td}>{row.explainer_count}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
