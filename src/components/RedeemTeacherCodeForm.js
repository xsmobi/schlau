'use client';

import { useState } from 'react';
import { createClient } from '../lib/supabase/client';

const style = {
  input: `w-full text-center rounded-md border border-gray-300 px-2 py-3 text-neutral-800`,
  button: `mt-4 w-full rounded-md px-4 py-2 text-sm font-medium text-white bg-gray-800 hover:bg-gray-900 disabled:opacity-50`,
  error: `mt-2 text-sm text-red-600 text-center`,
};

function messageFor(error) {
  if (error?.message === 'code not found') {
    return 'Code ungültig oder abgelaufen.';
  }
  return 'Etwas ist schiefgelaufen, bitte versuche es erneut.';
}

export default function RedeemTeacherCodeForm() {
  const [supabase] = useState(() => createClient());
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const redeem = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    const { error } = await supabase.rpc('redeem_teacher_code', { p_code: code.trim() });
    if (error) {
      setLoading(false);
      setError(messageFor(error));
      return;
    }
    // The nav bar's role-driven branching (AuthControls) only reads its
    // initial role once at mount, so a client-side navigation wouldn't
    // pick up the change - a hard navigation guarantees every page,
    // including the nav, sees the fresh profile row. Landing on /class
    // alone read as ambiguous in testing (no confirmation, just silently
    // the teacher view) - ?welcome=1 tells that page to show an explicit
    // "You're now a teacher!" banner instead of relying on the view
    // itself to imply success.
    window.location.href = '/class?welcome=1';
  };

  return (
    <form onSubmit={redeem}>
      <input
        type="text"
        required
        placeholder="Code"
        className={style.input}
        value={code}
        onChange={(event) => setCode(event.target.value)}
      />
      <button type="submit" className={style.button} disabled={loading || code.trim().length === 0}>
        {loading ? 'Wird eingelöst…' : 'Redeem Code'}
      </button>
      {error && <p className={style.error}>{error}</p>}
    </form>
  );
}
