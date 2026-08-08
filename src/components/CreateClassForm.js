'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '../lib/supabase/client';

const style = {
  primaryCard: `mt-4 rounded-md bg-white shadow p-4`,
  secondaryCard: `mt-4 rounded-md border border-dashed border-gray-300 p-3`,
  heading: `text-sm font-semibold text-gray-800 mb-2`,
  input: `w-full rounded-md border border-gray-300 px-3 py-2 text-neutral-800`,
  button: `mt-3 w-full rounded-md px-4 py-2 text-sm font-medium text-white bg-gray-800 hover:bg-gray-900 disabled:opacity-50`,
  error: `mt-2 text-sm text-red-600 text-center`,
};

export default function CreateClassForm({ primary }) {
  const router = useRouter();
  const [supabase] = useState(() => createClient());
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const label = primary ? 'Create your first class' : 'Add class';

  const create = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    const { error } = await supabase.rpc('create_class', { p_name: name.trim() });
    setLoading(false);
    if (error) {
      setError('Klasse konnte nicht erstellt werden, bitte versuche es erneut.');
      return;
    }
    setName('');
    // The new class (and its join code) is server-rendered via JoinCodeCard
    // on the page above this form - router.refresh() re-fetches that list
    // so the new card, code included, shows up immediately.
    router.refresh();
  };

  return (
    <form onSubmit={create} className={primary ? style.primaryCard : style.secondaryCard}>
      <p className={style.heading}>{label}</p>
      <input
        type="text"
        required
        placeholder="Class name"
        className={style.input}
        value={name}
        onChange={(event) => setName(event.target.value)}
      />
      <button type="submit" className={style.button} disabled={loading || name.trim().length === 0}>
        {loading ? 'Creating…' : label}
      </button>
      {error && <p className={style.error}>{error}</p>}
    </form>
  );
}
